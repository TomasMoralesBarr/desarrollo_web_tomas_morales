

# Tarea 1 - Desarrollo Web

## Descripción
Esta tarea implementa una página web para la adopción de mascotas, utilizando HTML, CSS y JavaScript. El sistema permite publicar avisos de adopción, ver un listado dinámico de mascotas disponibles, consultar estadísticas y visualizar detalles e imágenes de cada aviso.

## Estructura de Archivos

- **index.html**: Archivo principal que contiene la estructura de la página. Incluye:
   - Portada con bienvenida y últimos avisos.
   - Formulario para agregar avisos de adopción, con selects dinámicos de región y comuna.
   - Listado de avisos de adopción, tabla dinámica.
   - Sección de estadísticas con gráficos.
   - Modales para confirmación y visualización ampliada de fotos.

- **styles.css**: Archivo de estilos que define la apariencia y el diseño responsivo del sitio. Incluye:
   - Estilos generales para layout, tablas, formularios y botones.
   - Media queries para adaptar la portada y el listado de adopciones a pantallas móviles.
   - Estilos para modales y visualización de fotos.

- **main.js**: Archivo JavaScript que gestiona la lógica dinámica del sitio. Incluye:
   - Población dinámica de selects de región y comuna usando `region_comuna.js`.
   - Manejo de datos de avisos de adopción (`adoptionDetails`).
   - Renderizado dinámico de la tabla de avisos y detalles.
   - Funcionalidad para ampliar fotos en modal.
   - Validaciones de formulario y manejo de inputs dinámicos.

## Decisiones tomadas
- Se utiliza manipulación dinámica del DOM para poblar selects y tablas desde datos JS.
- Las imágenes se muestran desde la carpeta `assets`.
- Se agregaron media queries para mejorar la experiencia en dispositivos móviles.
- Se implementaron validaciones en el formulario para asegurar datos correctos.

## Cómo funciona
1. Al cargar la página, se muestra la portada con los últimos avisos.
2. El usuario puede agregar un aviso completando el formulario, seleccionando región y comuna de forma dinámica.
3. Los avisos se muestran en el listado, y al hacer clic se puede ver el detalle y las fotos.
4. Las fotos pueden ampliarse en un modal a tamaño grande.
5. El usuario puede acceder a las estadisticas de adopcion.
6. El sitio es responsivo y se adapta a pantallas pequeñas.
 