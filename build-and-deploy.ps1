# Script de construcción y despliegue para Sponzo Dashboard - Windows PowerShell
# Uso: .\build-and-deploy.ps1 [development|production]

param(
    [ValidateSet("development", "production")]
    [string]$Environment = "production"
)

$ErrorActionPreference = "Stop"

function Write-Log {
    param([string]$Message)
    Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Message"
}

function Test-ServiceHealth {
    param([string]$Url, [int]$TimeoutSeconds = 60)
    
    $timeout = $TimeoutSeconds
    while ($timeout -gt 0) {
        try {
            $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
            if ($response.StatusCode -eq 200) {
                return $true
            }
        }
        catch {
            # Ignorar errores y continuar intentando
        }
        Start-Sleep -Seconds 2
        $timeout -= 2
    }
    return $false
}

Write-Log "🚀 Iniciando construcción de Sponzo Dashboard para ambiente: $Environment"

try {
    switch ($Environment) {
        "development" {
            Write-Log "🔧 Construyendo para desarrollo..."
            
            & docker-compose -f docker-compose.yaml down --remove-orphans
            & docker-compose -f docker-compose.yaml up --build -d
            
            Write-Log "✅ Ambiente de desarrollo iniciado en http://localhost:3001"
            Write-Log "📋 Para ver logs: docker-compose -f docker-compose.yaml logs -f grafana-dev"
        }
        
        "production" {
            Write-Log "🏗️  Construyendo imagen de producción..."
            
            # Detener contenedores existentes
            & docker-compose -f docker-compose.prod.yml down --remove-orphans
            
            # Limpiar imágenes viejas (opcional)
            Write-Log "🧹 Limpiando imágenes antiguas..."
            try {
                & docker image prune -f --filter label=org.opencontainers.image.title=sponzo-dashboard
            }
            catch {
                Write-Log "⚠️  No se pudieron limpiar las imágenes antiguas"
            }
            
            # Construir nueva imagen
            Write-Log "🔨 Construyendo nueva imagen..."
            & docker-compose -f docker-compose.prod.yml build --no-cache sponzo-dashboard
            
            # Iniciar servicios
            Write-Log "🚀 Iniciando servicios..."
            & docker-compose -f docker-compose.prod.yml up -d
            
            # Esperar que el servicio esté listo
            Write-Log "⏳ Esperando que el servicio esté disponible..."
            
            if (Test-ServiceHealth -Url "http://localhost:3001/api/health" -TimeoutSeconds 60) {
                Write-Log "✅ Sponzo Dashboard está disponible en http://localhost:3001"
                Write-Log "👤 Usuario: admin | Contraseña: admin"
                Write-Log "📋 Para ver logs: docker-compose -f docker-compose.prod.yml logs -f sponzo-dashboard"
                Write-Log "🛑 Para detener: docker-compose -f docker-compose.prod.yml down"
            }
            else {
                Write-Log "❌ El servicio no respondió en el tiempo esperado"
                Write-Log "📋 Logs del contenedor:"
                & docker-compose -f docker-compose.prod.yml logs sponzo-dashboard
                exit 1
            }
        }
    }
    
    Write-Log "🎉 Proceso completado exitosamente!"
}
catch {
    Write-Log "❌ Error durante la ejecución: $($_.Exception.Message)"
    Write-Log "💡 Uso: .\build-and-deploy.ps1 [development|production]"
    exit 1
}
