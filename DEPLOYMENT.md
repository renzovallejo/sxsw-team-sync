# Guía de Despliegue - SXSW Team Sync

¡La aplicación ya está lista para producción! Sigue estos pasos para subir el código a la nube gratuitamente utilizando GitHub, Render y Vercel.

## Paso 1: Subir el código a GitHub
Actualmente, el proyecto ya es un repositorio local de Git (las carpetas `frontend` y `backend` están unificadas mediante el `.gitignore` raíz). 

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio vacío (ej. `sxsw-team-sync`).
2. Abre tu terminal en la ruta principal del proyecto y ejecuta:
```bash
git remote add origin https://github.com/TU_USUARIO/sxsw-team-sync.git
git push -u origin main
```

## Paso 2: Desplegar el Backend (Render)
Usaremos Render.com para la API en Python por su facilidad de uso con FastAPI.

1. Crea una cuenta en [Render.com](https://render.com).
2. Haz clic en **New +** y selecciona **Web Service**.
3. Conecta tu cuenta de GitHub y selecciona el repositorio `sxsw-team-sync`.
4. Configura el servicio:
   - **Name:** `sxsw-api`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Haz clic en **Create Web Service**. 
6. Render generará una URL pública (ej. `https://sxsw-api-xyz.onrender.com`). Cópiala para el siguiente paso.

## Paso 3: Desplegar el Frontend (Netlify)
Netlify es una de las opciones más robustas (junto a Vercel) para aplicaciones en Next.js. Funciona de manera extremadamente sencilla, y ya he preparado el archivo de configuración `netlify.toml`.

1. Crea una cuenta en [Netlify.com](https://www.netlify.com) usando tu GitHub.
2. En tu panel principal o "Team Overview", haz clic en **Add new site** -> **Import an existing project**.
3. Conéctate a GitHub y escoge tu repositorio `sxsw-team-sync`.
4. Netlify detectará automáticamente que es un proyecto configurado mediante `netlify.toml`, por lo tanto, **el Build command y Publish directory ya estarán pre-llenados correctamente**.
5. Antes de hacer clic en el botón de Deploy, dale a **Show advanced**:
   - Haz clic en **New Variable**.
   - **Key:** Escribe exactamente `NEXT_PUBLIC_API_URL`
   - **Value:** Pega la URL del backend de Render (ej. `https://sxsw-api-xyz.onrender.com`).
6. Haz clic en **Deploy sxsw-team-sync**.

En un minuto a más tardar, Netlify te proporcionará una URL pública (terminada en `.netlify.app`) que cargará exactamente igual que tu versión de `localhost:3000`.
