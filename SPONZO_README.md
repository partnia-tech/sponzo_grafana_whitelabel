# Sponzo Dashboard - White Label Grafana

🚀 **Una versión personalizada de Grafana para Sponzo, desarrollada por partnia.tech**

## 📋 Descripción

Sponzo Dashboard es una versión white-label de Grafana, totalmente personalizada con:

- ✨ **Branding completo**: Logo, colores y temas de Sponzo
- 🎨 **Animación de carga mejorada**: Isotipo de Sponzo con animación personalizada
- 🏷️ **Nombres personalizados**: "Sponzo Dashboard" en lugar de "Grafana"
- 👥 **Footer personalizado**: Enlaces a partnia.tech y código fuente
- 🎯 **Totalmente funcional**: Mantiene todas las capacidades de Grafana

## 🔗 Enlaces Importantes

- **Código fuente**: [https://github.com/partnia-tech/sponzo_grafana_whitelabel](https://github.com/partnia-tech/sponzo_grafana_whitelabel)
- **Desarrollado por**: [partnia.tech](https://partnia.tech)
- **Basado en**: [Grafana](https://github.com/grafana/grafana)

## ⚖️ Licencia y Cumplimiento

### Licencia Original
Este proyecto está basado en **Grafana**, que está licensed bajo la licencia **AGPL-3.0**.

- **Grafana Original**: https://github.com/grafana/grafana
- **Licencia AGPL-3.0**: https://github.com/grafana/grafana/blob/main/LICENSE

### Cumplimiento de Licencia
✅ **Cumplimos completamente** con los términos de la licencia AGPL-3.0:

1. **Código fuente disponible**: Todo el código fuente de esta personalización está disponible públicamente
2. **Atribución mantenida**: Se mantienen las referencias a Grafana y su licencia
3. **Cambios documentados**: Todos los cambios están documentados y versionados
4. **Misma licencia**: Esta versión también se distribuye bajo AGPL-3.0

### Qué se ha modificado
- 🎨 Branding visual (logos, colores, nombres)
- 📱 Animación de carga personalizada
- 🔗 Enlaces del footer
- 🏷️ Texto de bienvenida y títulos

### Qué NO se ha modificado
- ⚙️ Funcionalidad core de Grafana
- 🔧 APIs y endpoints
- 📊 Capacidades de visualización
- 🔌 Sistema de plugins

## 🚀 Uso de la Imagen

### 📦 Imagen Pre-compilada desde GitHub Packages
```bash
# Uso básico
docker run -d \
  --name sponzo-dashboard \
  -p 3001:3000 \
  -e GF_SECURITY_ADMIN_PASSWORD=tu_password_segura \
  ghcr.io/partnia-tech/sponzo_grafana_whitelabel:latest

# Con configuración personalizada
docker run -d \
  --name sponzo-dashboard \
  -p 3001:3000 \
  -e GF_SECURITY_ADMIN_PASSWORD=tu_password_segura \
  -e GF_SECURITY_SECRET_KEY=clave_muy_larga_y_aleatoria_para_cookies \
  -e GF_DATABASE_TYPE=postgres \
  -e GF_DATABASE_HOST=tu-db-host:5432 \
  -e GF_DATABASE_NAME=grafana \
  -e GF_DATABASE_USER=grafana \
  -e GF_DATABASE_PASSWORD=db_password \
  -e GF_SERVER_ROOT_URL=https://dashboard.tudominio.com \
  -e GF_SMTP_ENABLED=true \
  -e GF_SMTP_HOST=smtp.gmail.com:587 \
  -e GF_SMTP_USER=tu-email@gmail.com \
  -e GF_SMTP_PASSWORD=tu-app-password \
  -v grafana-data:/var/lib/grafana \
  ghcr.io/partnia-tech/sponzo_grafana_whitelabel:latest

# Acceder a Sponzo Dashboard
# http://localhost:3001 (o tu dominio configurado)
# Usuario: admin | Contraseña: la que configuraste
```

### 🔧 Variables de Entorno Principales

La imagen acepta todas las variables de entorno estándar de Grafana con el prefijo `GF_`:

#### 🔐 Seguridad (Obligatorias)
```bash
GF_SECURITY_ADMIN_PASSWORD=tu_password_muy_segura
GF_SECURITY_SECRET_KEY=clave_secreta_larga_para_cookies
```

#### 🗄️ Base de Datos
```bash
# PostgreSQL (recomendado)
GF_DATABASE_TYPE=postgres
GF_DATABASE_HOST=localhost:5432
GF_DATABASE_NAME=grafana
GF_DATABASE_USER=grafana
GF_DATABASE_PASSWORD=password

# MySQL
GF_DATABASE_TYPE=mysql
GF_DATABASE_HOST=localhost:3306
GF_DATABASE_NAME=grafana
```

#### 🌐 Servidor
```bash
GF_SERVER_ROOT_URL=https://dashboard.tudominio.com
GF_SERVER_DOMAIN=tudominio.com
GF_SERVER_HTTP_PORT=3000
```

#### 📧 SMTP
```bash
GF_SMTP_ENABLED=true
GF_SMTP_HOST=smtp.gmail.com:587
GF_SMTP_USER=tu-email@gmail.com
GF_SMTP_PASSWORD=tu-app-password
GF_SMTP_FROM_ADDRESS=dashboard@tudominio.com
```

## 🏗️ Construcción Local

### Prerrequisitos para Desarrollo
- Docker y Docker Compose
- Git
- Node.js 22+ (solo para desarrollo)
- Go 1.24+ (solo para desarrollo)

### 🔧 Desarrollo (con código fuente editable)
```bash
# Clonar el repositorio
git clone https://github.com/partnia-tech/sponzo_grafana_whitelabel.git
cd sponzo_grafana_whitelabel

# Desarrollo con hot-reload
docker-compose up --build -d

# Acceder para desarrollo
# http://localhost:3001
```

### 🏭 Construcción Local de Imagen de Producción
```bash
# Clonar el repositorio
git clone https://github.com/partnia-tech/sponzo_grafana_whitelabel.git
cd sponzo_grafana_whitelabel

# Método 1: Script automatizado (Windows)
.\build-and-deploy.ps1 production

# Método 2: Script automatizado (Linux/Mac)
chmod +x build-and-deploy.sh
./build-and-deploy.sh production

# Método 3: Docker manual
docker build -f Dockerfile.prod -t sponzo-dashboard:local .

# Ejecutar imagen local
docker run -d \
  --name sponzo-dashboard \
  -p 3001:3000 \
  -e GF_SECURITY_ADMIN_PASSWORD=admin \
  sponzo-dashboard:local
```

### 📋 Comandos de desarrollo
```bash
# Ver logs de desarrollo
docker-compose logs -f grafana-dev

# Ver logs de producción local
docker-compose -f docker-compose.prod.yml logs -f sponzo-dashboard

# Detener desarrollo
docker-compose down

# Verificar estado de salud
curl http://localhost:3001/api/health
```

## 🎨 Personalización Implementada

### Branding Visual
- **Logo principal**: Reemplazado por isotipo de Sponzo
- **Favicon**: Actualizado con isotipo de Sponzo
- **Colores**: Paleta de colores personalizada de Sponzo
- **Animación de carga**: Logo de Sponzo con rebote mejorado

### Texto Personalizado
- **Welcome to Grafana** → **Bienvenido a Sponzo**
- **Grafana** → **Sponzo Dashboard** (en títulos)
- **Footer**: Enlaces a código fuente y partnia.tech

### Archivos Modificados
```
public/views/index.html          # Plantilla HTML principal y animación
pkg/api/index.go                 # Configuración de logos en backend
public/img/                      # Imágenes de Sponzo
public/app/core/components/Footer/Footer.tsx  # Footer personalizado
```

## 🤝 Contribución

¿Quieres contribuir? ¡Genial!

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**partnia.tech**
- 🌐 Website: [https://partnia.tech](https://partnia.tech)
- 📧 Email: contacto@partnia.tech
- 💼 LinkedIn: [partnia-tech](https://linkedin.com/company/partnia-tech)

## 🙏 Reconocimientos

- **Grafana Team**: Por crear una herramienta increíble y mantenerla open source
- **Grafana Community**: Por la documentación y soporte continuos
- **Sponzo**: Por confiar en partnia.tech para esta personalización

---

**⚖️ IMPORTANTE**: Este proyecto cumple completamente con la licencia AGPL-3.0 de Grafana. El código fuente está disponible públicamente y se mantienen todas las atribuciones requeridas.

**🔗 Enlaces de licencia**:
- [Grafana License (AGPL-3.0)](https://github.com/grafana/grafana/blob/main/LICENSE)
- [Este proyecto (mismo license)](LICENSE)
