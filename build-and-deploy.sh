#!/bin/bash

# Script de construcción y despliegue para Sponzo Dashboard
# Uso: ./build-and-deploy.sh [development|production]

set -e

ENVIRONMENT=${1:-production}

echo "🚀 Iniciando construcción de Sponzo Dashboard para ambiente: $ENVIRONMENT"

# Función para logging
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Función para manejar errores
handle_error() {
    log "❌ Error en línea $1. Saliendo..."
    exit 1
}

trap 'handle_error $LINENO' ERR

case $ENVIRONMENT in
    "development")
        log "🔧 Construyendo para desarrollo..."
        docker-compose -f docker-compose.yaml down --remove-orphans
        docker-compose -f docker-compose.yaml up --build -d
        log "✅ Ambiente de desarrollo iniciado en http://localhost:3001"
        log "📋 Para ver logs: docker-compose -f docker-compose.yaml logs -f grafana-dev"
        ;;
    
    "production")
        log "🏗️  Construyendo imagen de producción..."
        
        # Detener contenedores existentes
        docker-compose -f docker-compose.prod.yml down --remove-orphans
        
        # Limpiar imágenes viejas (opcional)
        log "🧹 Limpiando imágenes antiguas..."
        docker image prune -f --filter label=org.opencontainers.image.title=sponzo-dashboard || true
        
        # Construir nueva imagen
        log "🔨 Construyendo nueva imagen..."
        docker-compose -f docker-compose.prod.yml build --no-cache sponzo-dashboard
        
        # Iniciar servicios
        log "🚀 Iniciando servicios..."
        docker-compose -f docker-compose.prod.yml up -d
        
        # Esperar que el servicio esté listo
        log "⏳ Esperando que el servicio esté disponible..."
        timeout=60
        while [ $timeout -gt 0 ]; do
            if curl -f http://localhost:3001/api/health >/dev/null 2>&1; then
                break
            fi
            sleep 2
            timeout=$((timeout-2))
        done
        
        if [ $timeout -le 0 ]; then
            log "❌ El servicio no respondió en el tiempo esperado"
            log "📋 Logs del contenedor:"
            docker-compose -f docker-compose.prod.yml logs sponzo-dashboard
            exit 1
        fi
        
        log "✅ Sponzo Dashboard está disponible en http://localhost:3001"
        log "👤 Usuario: admin | Contraseña: admin"
        log "📋 Para ver logs: docker-compose -f docker-compose.prod.yml logs -f sponzo-dashboard"
        log "🛑 Para detener: docker-compose -f docker-compose.prod.yml down"
        ;;
    
    *)
        log "❌ Ambiente no válido: $ENVIRONMENT"
        log "💡 Uso: $0 [development|production]"
        exit 1
        ;;
esac

log "🎉 Proceso completado exitosamente!"
