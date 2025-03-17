# Guía Completa para la Administración del Sitio Web de Plakor Divisiones

## Índice
1. [Introducción](#introducción)
2. [Acceso al Panel de Administración (Strapi)](#acceso-al-panel-de-administración-strapi)
3. [Gestión de Contenido en Strapi](#gestión-de-contenido-en-strapi)
   - [Gestión de Proyectos](#gestión-de-proyectos)
   - [Gestión de Reseñas](#gestión-de-reseñas)
   - [Gestión de Servicios](#gestión-de-servicios)
   - [Gestión de Preguntas Frecuentes (FAQ)](#gestión-de-preguntas-frecuentes-faq)
   - [Gestión de Formularios de Contacto](#gestión-de-formularios-de-contacto)
4. [Acceso al Código Fuente](#acceso-al-código-fuente)
5. [Modificación del Código](#modificación-del-código)
6. [Compilación y Despliegue](#compilación-y-despliegue)
7. [Solución de Problemas Comunes](#solución-de-problemas-comunes)
8. [Contacto de Soporte](#contacto-de-soporte)

## Introducción

Esta guía está diseñada para ayudarle a administrar el sitio web de Plakor Divisiones sin necesidad de tener conocimientos profundos de programación. El sitio web consta de dos partes principales:

1. **Frontend**: La parte visible del sitio web que ven los visitantes (desarrollada con Next.js)
2. **Backend**: El panel de administración donde se gestiona el contenido (Strapi CMS)

## Acceso al Panel de Administración (Strapi)

Strapi es el sistema de gestión de contenido (CMS) que utilizamos para administrar el contenido del sitio web.

### Cómo acceder:

1. Abra su navegador y vaya a: `https://www.plakordivisiones.es/admin`
2. Introduzca sus credenciales:
   - **Usuario**: [su correo electrónico]
   - **Contraseña**: [su contraseña]

### Si ha olvidado su contraseña:

1. Haga clic en "¿Olvidó su contraseña?" en la página de inicio de sesión
2. Introduzca su correo electrónico
3. Siga las instrucciones enviadas a su correo para restablecer la contraseña

## Gestión de Contenido en Strapi

### Gestión de Proyectos

Los proyectos son los trabajos realizados que se muestran en la sección "Proyectos" del sitio web.

#### Para ver todos los proyectos:
1. En el menú lateral, haga clic en "Proyectos"
2. Verá una lista de todos los proyectos existentes

#### Para crear un nuevo proyecto:
1. Haga clic en el botón "Crear nuevo proyecto"
2. Complete los siguientes campos:
   - **Título**: Nombre del proyecto
   - **Descripción**: Breve descripción del proyecto
   - **SEO Description**: Descripción para motores de búsqueda
   - **Slug**: URL amigable (sin espacios, solo guiones, ej: "reforma-cocina-tarragona")
   - **Imágenes**: Suba las fotos del proyecto (recomendado: 1200x800px)
   - **Desafío**: Descripción del desafío del proyecto
   - **Solución**: Cómo se resolvió el desafío
   - **Características**: Lista de características del proyecto
   - **Categoría**: Tipo de proyecto
   - **Fecha de finalización**: Cuándo se completó el proyecto
   - **Ubicación**: Dónde se realizó el proyecto
   - **Etiquetas**: Palabras clave relacionadas
   - **Área**: Tamaño del área en metros cuadrados
   - **Servicios**: Servicios utilizados en el proyecto
   - **Destacado**: Marque esta casilla si desea que aparezca en la página principal

3. Haga clic en "Guardar" para crear el proyecto

#### Para editar un proyecto existente:
1. En la lista de proyectos, haga clic en el proyecto que desea editar
2. Modifique los campos necesarios
3. Haga clic en "Guardar" para aplicar los cambios

#### Para eliminar un proyecto:
1. En la lista de proyectos, haga clic en los tres puntos (...) junto al proyecto
2. Seleccione "Eliminar"
3. Confirme la eliminación

### Gestión de Reseñas

Las reseñas son opiniones de clientes que se muestran en la sección "Reseñas" del sitio web.

#### Para ver todas las reseñas:
1. En el menú lateral, haga clic en "Reseñas"
2. Verá una lista de todas las reseñas existentes

#### Para moderar una reseña nueva:
1. Las reseñas nuevas tendrán el estado "pending" (pendiente)
2. Haga clic en la reseña para abrirla
3. Revise el contenido
4. Cambie el estado a:
   - **approved**: Para publicar la reseña en el sitio
   - **rejected**: Para rechazar la reseña

> **IMPORTANTE**: El campo "estado" debe tener exactamente 5 espacios antes del valor. Por ejemplo: "     approved" (5 espacios + "approved"). Esto es crucial para que las reseñas se muestren correctamente.

#### Para crear una reseña manualmente:
1. Haga clic en el botón "Crear nueva reseña"
2. Complete los siguientes campos:
   - **Nombre**: Nombre del cliente
   - **Valoración**: Número de estrellas (1-5)
   - **Comentario**: Texto de la reseña
   - **Servicio**: Tipo de servicio recibido (debe comenzar con 5 espacios)
   - **Estado**: Estado de la reseña (debe comenzar con 5 espacios)
   - **Fecha de creación**: Fecha de la reseña

3. Haga clic en "Guardar" para crear la reseña

### Gestión de Servicios

Los servicios son los diferentes tipos de trabajos que ofrece Plakor Divisiones.

#### Para ver todos los servicios:
1. En el menú lateral, haga clic en "Servicios"
2. Verá una lista de todos los servicios existentes

#### Para crear un nuevo servicio:
1. Haga clic en el botón "Crear nuevo servicio"
2. Complete los siguientes campos:
   - **Título**: Nombre del servicio
   - **Descripción**: Descripción detallada del servicio
   - **Slug**: URL amigable (sin espacios, solo guiones)
   - **Icono**: Suba un icono representativo
   - **Destacado**: Marque esta casilla si desea que aparezca en la página principal
   - **Categoría**: Seleccione la categoría del servicio

3. Haga clic en "Guardar" para crear el servicio

#### Para editar un servicio existente:
1. En la lista de servicios, haga clic en el servicio que desea editar
2. Modifique los campos necesarios
3. Haga clic en "Guardar" para aplicar los cambios

### Gestión de Preguntas Frecuentes (FAQ)

Las preguntas frecuentes se muestran en la sección "FAQ" del sitio web.

#### Para ver todas las preguntas:
1. En el menú lateral, haga clic en "FAQs"
2. Verá una lista de todas las preguntas existentes

#### Para crear una nueva pregunta:
1. Haga clic en el botón "Crear nueva FAQ"
2. Complete los siguientes campos:
   - **Pregunta**: La pregunta
   - **Respuesta**: La respuesta detallada
   - **Categoría**: Categoría de la pregunta
   - **Orden**: Número que determina el orden de aparición (menor número = aparece primero)

3. Haga clic en "Guardar" para crear la pregunta

#### Para editar una pregunta existente:
1. En la lista de preguntas, haga clic en la pregunta que desea editar
2. Modifique los campos necesarios
3. Haga clic en "Guardar" para aplicar los cambios

### Gestión de Formularios de Contacto

Los formularios de contacto son las solicitudes enviadas por los visitantes del sitio web.

#### Para ver todas las solicitudes:
1. En el menú lateral, haga clic en "Contact Submissions"
2. Verá una lista de todas las solicitudes recibidas

#### Para ver los detalles de una solicitud:
1. Haga clic en la solicitud que desea ver
2. Podrá ver toda la información proporcionada por el visitante
3. Puede cambiar el estado a:
   - **new**: Solicitud nueva
   - **in-progress**: En proceso de atención
   - **completed**: Solicitud completada

## Acceso al Código Fuente

Si necesita realizar cambios más profundos en el sitio web, necesitará acceder al código fuente. Esta sección es para usuarios con conocimientos básicos de programación o para situaciones donde necesite proporcionar acceso a un desarrollador.

### Requisitos previos:
- Git instalado en su ordenador
- Node.js (versión 18 o superior) instalado
- Un editor de código como Visual Studio Code

### Para clonar el repositorio:

1. Abra una terminal (CMD en Windows o Terminal en Mac/Linux)
2. Navegue a la carpeta donde desea guardar el proyecto
3. Ejecute el siguiente comando:
   ```
   git clone https://github.com/ClownOfCrowd/plakordivisiones.git
   ```
4. Ingrese a la carpeta del proyecto:
   ```
   cd plakordivisiones
   ```

## Modificación del Código

Si necesita modificar el código, aquí hay una guía básica de la estructura del proyecto:

### Estructura de carpetas principales:
- **src/app**: Contiene las páginas principales del sitio
- **src/components**: Contiene los componentes reutilizables
  - **src/components/sections**: Secciones principales de cada página
  - **src/components/ui**: Componentes de interfaz de usuario
- **src/lib**: Contiene funciones de utilidad y conexión con Strapi

### Archivos importantes:
- **src/lib/strapi.ts**: Contiene la configuración de conexión con Strapi
- **src/components/sections/reviews-page.tsx**: Página de reseñas
- **src/components/sections/projects-page.tsx**: Página de proyectos
- **src/components/ui/review-form.tsx**: Formulario para enviar reseñas

### Para realizar cambios:

1. Abra el proyecto en su editor de código
2. Modifique los archivos necesarios
3. Guarde los cambios

## Compilación y Despliegue

Después de realizar cambios en el código, necesitará compilar y desplegar el sitio web.

### Para compilar el proyecto localmente:

1. Abra una terminal en la carpeta del proyecto
2. Instale las dependencias (solo la primera vez):
   ```
   npm install
   ```
3. Ejecute el servidor de desarrollo:
   ```
   npm run dev
   ```
4. Abra su navegador y vaya a `http://localhost:3000` para ver los cambios

### Para compilar para producción:

1. En la terminal, ejecute:
   ```
   npm run build
   ```
2. Si la compilación es exitosa, verá un mensaje de confirmación

### Para desplegar en el servidor:

#### Opción 1: Despliegue automático (recomendado)

Si el repositorio está configurado con despliegue automático, simplemente necesita subir los cambios a GitHub:

1. Añada los cambios:
   ```
   git add .
   ```
2. Cree un commit con un mensaje descriptivo:
   ```
   git commit -m "Descripción de los cambios realizados"
   ```
3. Suba los cambios:
   ```
   git push
   ```

El servidor detectará automáticamente los cambios y actualizará el sitio web.

#### Opción 2: Despliegue manual

Si necesita desplegar manualmente:

1. Conéctese al servidor mediante SSH:
   ```
   ssh usuario@plakordivisiones.es
   ```
2. Navegue a la carpeta del proyecto:
   ```
   cd /ruta/al/proyecto
   ```
3. Actualice el código:
   ```
   git pull
   ```
4. Instale dependencias y compile:
   ```
   npm install
   npm run build
   ```
5. Reinicie el servidor:
   ```
   pm2 restart plakordivisiones
   ```

## Solución de Problemas Comunes

### Las reseñas no se muestran en el sitio web:
- Verifique que el estado sea exactamente "     approved" (con 5 espacios al inicio)
- Compruebe que la reseña esté publicada (botón "Publicar")

### Los proyectos no aparecen en la página de proyectos:
- Verifique que el proyecto esté publicado
- Compruebe que todas las imágenes se hayan subido correctamente
- Asegúrese de que el slug sea único y no contenga caracteres especiales

### Error al compilar el proyecto:
- Verifique que todas las dependencias estén instaladas:
  ```
  npm install
  ```
- Limpie la caché:
  ```
  npm run clean
  ```
- Intente compilar nuevamente:
  ```
  npm run build
  ```

### El formulario de contacto no envía mensajes:
- Verifique la configuración de correo electrónico en Strapi
- Compruebe que el endpoint de la API esté funcionando correctamente

## Contacto de Soporte

Si encuentra problemas que no puede resolver, contacte al soporte técnico:

- **Email**: [correo del desarrollador]
- **Teléfono**: [número de teléfono]

---

Esta guía se actualizará periódicamente con nueva información y soluciones a problemas comunes. Última actualización: [fecha actual]. 