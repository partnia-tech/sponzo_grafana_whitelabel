# 🛠️ Guía para Desarrolladores - Sponzo Dashboard

Esta guía está dirigida a desarrolladores que quieren contribuir al proyecto o entender cómo funciona la construcción de la imagen.

## 🏗️ Arquitectura del Proyecto

### Estructura de Archivos Clave
```
├── .github/workflows/
│   └── build-and-publish.yml    # Pipeline CI/CD
├── public/
│   ├── img/                     # Imágenes de Sponzo (logos, favicons)
│   ├── views/index.html         # Template HTML con animación de carga
│   └── app/core/components/Footer/Footer.tsx  # Footer personalizado
├── pkg/api/index.go             # Configuración de logos en backend
├── Dockerfile.dev               # Imagen para desarrollo
├── Dockerfile.prod              # Imagen para producción (CI/CD)
├── docker-compose.yaml          # Desarrollo local
├── docker-compose.prod.yml      # Build local de producción
└── build-and-deploy.*           # Scripts de build y deploy
```

## 🔄 Pipeline de CI/CD

### Flujo Automatizado
1. **Trigger**: Push a `master` o creación de tag `v*`
2. **Build Multi-stage**: 
   - Dependencias Go y Node.js
   - Compilación frontend y backend
   - Imagen final optimizada
3. **Multi-architecture**: AMD64 y ARM64
4. **Publish**: GitHub Container Registry (`ghcr.io`)
5. **Testing**: Verificación automática de la imagen
6. **Security**: Escaneo con Anchore + SBOM generation
7. **Release**: Automático para tags con documentación

### Variables de Build
```yaml
BUILD_DATE: Fecha de construcción
VCS_REF: SHA del commit
VERSION: Versión desde tag o branch
```

## 🎨 Personalización Implementada

### 1. Branding Visual
**Archivos modificados:**
- `public/img/`: Logos y favicons de Sponzo
- `pkg/api/index.go`: Configuración de rutas de imágenes
- `public/views/index.html`: CSS de animación de carga

**Cambios específicos:**
```go
// pkg/api/index.go
LoadingLogo: "public/img/Sponzo_IsotipoRGB-Positivo.png"
FavIcon: "public/img/Sponzo_IsotipoRGB-Positivo.png" 
AppleTouchIcon: "public/img/Sponzo_IsotipoRGB-Positivo.png"
```

### 2. Animación de Carga
**Ubicación:** `public/views/index.html`
```css
.preloader-bounce {
  animation: preloader-bounce 1s infinite ease-in-out;
  transform-origin: bottom;
  background-image: url('[[.LoadingLogo]]');
  width: 80px;
  height: 80px;
}

@keyframes preloader-bounce {
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0,-60px,0); }
}
```

### 3. Footer Personalizado
**Ubicación:** `public/app/core/components/Footer/Footer.tsx`
```typescript
export let getFooterLinks = (): FooterLink[] => {
  return [
    // Enlaces de documentación estándar de Grafana
    // + Enlaces personalizados de Sponzo:
    {
      target: '_blank',
      id: 'sponzo-source',
      text: 'Sponzo Source Code',
      icon: 'github',
      url: 'https://github.com/partnia-tech/sponzo_grafana_whitelabel',
    },
    {
      target: '_blank', 
      id: 'developed-by',
      text: 'Desarrollado por partnia.tech',
      icon: 'code-branch',
      url: 'https://partnia.tech',
    }
  ];
};
```

## 🐳 Docker Strategies

### Desarrollo (Dockerfile.dev)
- **Propósito**: Desarrollo con hot-reload
- **Características**: 
  - Volúmenes para código fuente
  - Instalación de dependencias en tiempo de ejecución
  - Herramientas de desarrollo incluidas

### Producción (Dockerfile.prod)
- **Propósito**: Imagen optimizada para CI/CD
- **Características**:
  - Multi-stage build
  - Código compilado incluido en la imagen
  - Imagen final mínima basada en Alpine
  - Usuario no-root para seguridad
  - Metadatos OCI completos

## 🔧 Desarrollo Local

### Setup Inicial
```bash
git clone https://github.com/partnia-tech/sponzo_grafana_whitelabel.git
cd sponzo_grafana_whitelabel

# Desarrollo con hot-reload
docker-compose up --build -d

# Ver logs
docker-compose logs -f grafana-dev
```

### Modificar Branding
1. **Cambiar logos**: Reemplazar archivos en `public/img/`
2. **Modificar animación**: Editar CSS en `public/views/index.html`
3. **Actualizar footer**: Modificar `Footer.tsx`
4. **Configurar backend**: Ajustar rutas en `pkg/api/index.go`

### Testing Local
```bash
# Build imagen de producción localmente
docker build -f Dockerfile.prod -t sponzo-test .

# Probar imagen
docker run -d --name test -p 3001:3000 \
  -e GF_SECURITY_ADMIN_PASSWORD=test123 \
  sponzo-test

# Verificar branding
curl http://localhost:3001/login | grep -i "sponzo"
```

## 🚀 Deployment y Release

### Crear Release
```bash
# Tag y push activará el pipeline automáticamente
git tag v1.0.0
git push origin v1.0.0

# El pipeline generará:
# - ghcr.io/partnia-tech/sponzo_grafana_whitelabel:v1.0.0
# - ghcr.io/partnia-tech/sponzo_grafana_whitelabel:latest
```

### Verificar Build
```bash
# Verificar imagen publicada
docker pull ghcr.io/partnia-tech/sponzo_grafana_whitelabel:latest

# Inspeccionar metadatos
docker inspect ghcr.io/partnia-tech/sponzo_grafana_whitelabel:latest

# Probar funcionamiento
docker run -d --name sponzo-test -p 3001:3000 \
  -e GF_SECURITY_ADMIN_PASSWORD=test123 \
  ghcr.io/partnia-tech/sponzo_grafana_whitelabel:latest
```

## 📋 Checklist para Contributors

### Antes de hacer PR:
- [ ] Código compila sin errores
- [ ] Tests locales pasan
- [ ] Branding de Sponzo funciona correctamente
- [ ] Footer incluye enlaces apropiados
- [ ] Documentación actualizada si es necesario
- [ ] Cumplimiento de licencia AGPL-3.0 mantenido

### Para nuevas features:
- [ ] No romper funcionalidad existente de Grafana
- [ ] Mantener compatibilidad con variables de entorno estándar
- [ ] Documentar cambios en README
- [ ] Probar con diferentes configuraciones de base de datos

## 🤝 Contribución

1. Fork el repositorio
2. Crear rama feature: `git checkout -b feature/nueva-feature`
3. Desarrollar y probar localmente
4. Commit: `git commit -m 'Agregar nueva feature'`
5. Push: `git push origin feature/nueva-feature`
6. Crear Pull Request

## 📞 Soporte para Desarrolladores

- **Issues**: https://github.com/partnia-tech/sponzo_grafana_whitelabel/issues
- **Discussions**: https://github.com/partnia-tech/sponzo_grafana_whitelabel/discussions
- **Email**: contacto@partnia.tech
