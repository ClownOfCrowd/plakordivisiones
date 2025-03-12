# Plakor Divisiones - Sitio Web

Este repositorio contiene el código fuente del sitio web de Plakor Divisiones, una empresa especializada en construcción en seco y reformas en Tarragona, España.

## Tecnologías utilizadas

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Strapi CMS, PostgreSQL
- **Servidor**: Nginx, PM2, Node.js
- **Email**: Resend API

## Estructura del proyecto

```
frontend/
├── public/          # Archivos estáticos
├── src/
│   ├── app/         # Rutas de la aplicación
│   ├── components/  # Componentes React
│   ├── data/        # Datos estáticos
│   ├── hooks/       # Hooks personalizados
│   ├── lib/         # Utilidades y funciones
│   └── middleware.ts # Middleware de Next.js
├── .env.example     # Variables de entorno de ejemplo
├── next.config.js   # Configuración de Next.js
└── package.json     # Dependencias
```

## Requisitos

- Node.js 18.x o superior
- PostgreSQL 14.x o superior
- Nginx
- PM2

## Configuración del entorno de desarrollo

1. Clona el repositorio:

```bash
git clone https://github.com/ClownOfCrowd/plakordivisiones.git
cd plakordivisiones
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env.local` basado en `.env.example` y configura las variables de entorno:

```bash
cp .env.example .env.local
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Configuración del servidor de producción

### Requisitos del servidor

- Ubuntu 20.04 LTS o superior
- Nginx
- Node.js 18.x o superior
- PM2
- PostgreSQL 14.x o superior

### Pasos para la configuración

1. Conectarse al servidor mediante SSH:

```bash
ssh root@75.119.150.68
```

2. Actualizar el sistema:

```bash
sudo apt update && sudo apt upgrade -y
```

3. Instalar dependencias:

```bash
sudo apt install -y nginx postgresql postgresql-contrib
```

4. Instalar Node.js:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

5. Instalar PM2:

```bash
sudo npm install -g pm2
```

6. Configurar PostgreSQL para Strapi:

```bash
sudo -u postgres psql -c "CREATE USER strapi WITH PASSWORD 'tu_contraseña_segura';"
sudo -u postgres psql -c "CREATE DATABASE strapi OWNER strapi;"
```

7. Configurar Nginx:

```bash
sudo nano /etc/nginx/sites-available/plakordivisiones.es
```

Añadir la siguiente configuración:

```nginx
server {
    listen 80;
    server_name plakordivisiones.es www.plakordivisiones.es;

    # Redirección a HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name plakordivisiones.es www.plakordivisiones.es;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/plakordivisiones.es/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/plakordivisiones.es/privkey.pem;

    # Frontend Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Strapi API y admin
    location /admin {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Archivos estáticos de Strapi
    location /uploads {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. Activar la configuración de Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/plakordivisiones.es /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. Instalar Certbot para SSL:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d plakordivisiones.es -d www.plakordivisiones.es
```

### Despliegue del frontend

1. Clonar el repositorio:

```bash
cd /var/www
git clone https://github.com/tu-usuario/plakordivisiones.git frontend
cd frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env.local`:

```bash
cp .env.example .env.local
nano .env.local
```

4. Configurar variables de entorno:

```
RESEND_API_KEY=tu_clave_api_resend
NEXT_PUBLIC_STRAPI_API_URL=https://plakordivisiones.es
STRAPI_API_TOKEN=tu_token_api_strapi
```

5. Construir la aplicación:

```bash
npm run build
```

6. Configurar PM2:

```bash
pm2 start npm --name "nextjs" -- start
pm2 save
pm2 startup
```

### Instalación y configuración de Strapi

1. Crear directorio para Strapi:

```bash
cd /var/www
npx create-strapi-app@latest backend --quickstart=false --typescript --dbforce --database=postgres --dbhost=127.0.0.1 --dbport=5432 --dbname=strapi --dbuser=strapi --dbpass=tu_contraseña_segura
cd backend
```

2. Configurar variables de entorno:

```bash
nano .env
```

Añadir:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=tu_app_key_1,tu_app_key_2
API_TOKEN_SALT=tu_api_token_salt
ADMIN_JWT_SECRET=tu_admin_jwt_secret
JWT_SECRET=tu_jwt_secret
```

3. Iniciar Strapi:

```bash
npm run build
pm2 start npm --name "strapi" -- run start
pm2 save
```

4. Acceder al panel de administración:

Abre `https://plakordivisiones.es/admin` en tu navegador y crea una cuenta de administrador.

### Configuración de Strapi

1. Crear tipos de contenido:

- **Projects**: Para el portafolio de proyectos
- **Reviews**: Para los testimonios de clientes
- **ContactForms**: Para los mensajes de contacto

2. Configurar permisos:

- Ir a Settings > Roles > Public
- Permitir acceso de lectura a Projects y Reviews
- Permitir acceso de creación a ContactForms

3. Generar API Token:

- Ir a Settings > API Tokens
- Crear un nuevo token con permisos completos
- Copiar el token y añadirlo a las variables de entorno del frontend

## Mantenimiento y actualización

### Actualización del frontend

1. Conectarse al servidor:

```bash
ssh usuario@ip_del_servidor
```

2. Navegar al directorio del frontend:

```bash
cd /var/www/frontend
```

3. Obtener los últimos cambios:

```bash
git pull origin main
```

4. Instalar dependencias (si hay nuevas):

```bash
npm install
```

5. Reconstruir la aplicación:

```bash
npm run build
```

6. Reiniciar el servicio:

```bash
pm2 restart nextjs
```

### Actualización de Strapi

1. Navegar al directorio de Strapi:

```bash
cd /var/www/backend
```

2. Obtener los últimos cambios (si es un repositorio Git):

```bash
git pull origin main
```

3. Instalar dependencias (si hay nuevas):

```bash
npm install
```

4. Reconstruir la aplicación:

```bash
npm run build
```

5. Reiniciar el servicio:

```bash
pm2 restart strapi
```

## Copias de seguridad

### Base de datos

Configurar una tarea cron para hacer copias de seguridad diarias:

```bash
sudo crontab -e
```

Añadir:

```
0 2 * * * pg_dump -U strapi strapi > /var/backups/strapi_$(date +\%F).sql
```

### Archivos de Strapi

Configurar una tarea cron para hacer copias de seguridad de los archivos subidos:

```bash
sudo crontab -e
```

Añadir:

```
0 2 * * * rsync -a /var/www/backend/public/uploads /var/backups/uploads_$(date +\%F)
```

## Solución de problemas comunes

### El sitio web no carga

1. Verificar que los servicios estén funcionando:

```bash
pm2 status
```

2. Verificar los logs de Next.js:

```bash
pm2 logs nextjs
```

3. Verificar los logs de Nginx:

```bash
sudo tail -f /var/log/nginx/error.log
```

### Strapi no funciona

1. Verificar que el servicio esté funcionando:

```bash
pm2 status
```

2. Verificar los logs de Strapi:

```bash
pm2 logs strapi
```

3. Verificar la conexión a la base de datos:

```bash
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname='strapi'"
```

# #   A u t o m a t i c   D e p l o y m e n t  
 # #   A u t o m a t i c   D e p l o y m e n t  
 