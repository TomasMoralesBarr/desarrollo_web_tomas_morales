# Tarea 2 - Desarrollo Web
## Descripción
Esta tarea implementa el backend de un sistema web para la adopción de mascotas, utilizando Flask, Python y MySQL. 
El sistema permite publicar avisos de adopción con validaciones tanto del lado del cliente como del servidor, almacenar información en una base de datos relacional, subir múltiples fotos, consultar avisos paginados y 
visualizar detalles completos de cada publicación.

## Estructura de Archivos
- **app.py**: Aplicación Flask principal. Incluye:
   - Configuración de Flask y SQLAlchemy
   - Modelos de base de datos (Region, Comuna, AvisoAdopcion, Foto, ContactarPor).
   - Rutas para todas las funcionalidades.
   - Validaciones del lado del servidor.
   - Manejo de subida y almacenamiento de archivos.

- **requirements.txt**: Dependencias Python necesarias para ejecutar el proyecto.

- **base.html**: Template base con header, navegación y estructura común
     
- **index.html**: Portada que muestra los últimos 5 avisos desde la base de datos

- **agregar_aviso.html**: Formulario completo con validaciones cliente y servidor. Incluye:
   - Carga dinámica de comunas según región seleccionada.
   - Validación de campos obligatorios y formatos.
   - Subida de 1-5 fotos.
   - Múltiples métodos de contacto.

-  **listado_adopciones.html**:  Listado paginado de avisos (5 por página) con navegación.

- **detalle_aviso.html:**: Detalle completo de un aviso con:
   - Información de ubicación, contacto y mascota.
   - Galería de fotos con ampliación en modal

- **estadisticas.html**: En la tarea 3 se hace.
   
