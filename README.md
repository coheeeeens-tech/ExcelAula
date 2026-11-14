# ExcelAula

Plataforma de clases de Excel: funciones explicadas (español/inglés) y actividades descargables.

## Publicar en GitHub Pages
1. Crea un repositorio y sube estos archivos.
2. En Settings → Pages elige la rama `main` y la carpeta `/ (root)`.
3. Tu sitio quedará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Agregar contenido
- Funciones: agrega una línea en `funciones.js` (nivel 1 básico, 2 intermedio, 3 avanzado).
- Actividades: pon el .xlsx en `actividades/` y agrégalo a la lista `ACTS`.

## Acceso de alumnos con Firebase
1. Entra a console.firebase.google.com → crea un proyecto → Build → Authentication → Sign-in method → activa **Correo/contraseña**.
2. Project settings → Your apps → Web (`</>`) → copia la configuración en `firebase-config.js`.
3. Authentication → Users → Add user: correo `profesor@excelaula.app` y la contraseña que quieras. Ese es tu acceso (ID: `profesor`).
4. Authentication → Settings → Authorized domains → agrega `TU-USUARIO.github.io`.
5. Entra al sitio como `profesor`: verás el panel **Alta de alumnos** para crear cada ID y contraseña.
6. Para borrar alumnos o restablecer contraseñas, usa Authentication → Users en Firebase.
