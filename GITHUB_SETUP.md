# Instrucciones para Subir a GitHub

## 1. Configurar Git (si no lo has hecho antes)

Ejecuta estos comandos con tu información:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

O solo para este repositorio:

```bash
git config user.name "Tu Nombre"
git config user.email "tu-email@ejemplo.com"
```

## 2. Hacer el commit inicial

Ya se agregaron los archivos, ahora haz el commit:

```bash
git commit -m "Initial commit: Plataforma educativa ISFDyT N°26 con integración Supabase"
```

## 3. Crear el repositorio en GitHub

1. Ve a https://github.com
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Completa:
   - **Repository name**: `isfdyt-n26-plataforma-educativa` (o el nombre que prefieras)
   - **Description**: "Plataforma educativa para ISFDyT N°26 con React, TypeScript y Supabase"
   - **Visibility**: Elige Público o Privado
   - **NO marques** "Initialize this repository with a README" (ya tenemos archivos)
5. Haz clic en **"Create repository"**

## 4. Conectar y subir el código

GitHub te mostrará comandos. Ejecuta estos (reemplaza `TU_USUARIO` con tu usuario de GitHub):

```bash
git remote add origin https://github.com/TU_USUARIO/isfdyt-n26-plataforma-educativa.git
git branch -M main
git push -u origin main
```

Si GitHub te pide autenticación:
- Usa un **Personal Access Token** (no tu contraseña)
- Para crear uno: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token

## 5. Verificar

Ve a tu repositorio en GitHub y verifica que todos los archivos estén subidos.

## ⚠️ Importante

- El archivo `.env` **NO** se subirá (está en `.gitignore`)
- Las credenciales de Supabase están protegidas
- Si otros desarrolladores clonan el repo, necesitarán crear su propio `.env` usando `.env.example` como referencia

