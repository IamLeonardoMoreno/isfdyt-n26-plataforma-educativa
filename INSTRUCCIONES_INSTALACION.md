# Instrucciones de Instalación y Configuración

## ✅ Pasos Completados

1. ✅ Cliente de Supabase configurado (`services/supabaseClient.ts`)
2. ✅ Servicio de base de datos de Supabase creado (`services/supabaseDatabase.ts`)
3. ✅ Servicio unificado creado (`services/database.ts`) - usa Supabase si está configurado, sino usa mockDatabase
4. ✅ Script SQL para crear tablas (`supabase/schema.sql`)
5. ✅ Todos los componentes actualizados para usar el servicio unificado
6. ✅ Configuración de Vite actualizada para variables de entorno

## 📋 Pasos Pendientes

### 1. Instalar Dependencias

Ejecuta en la terminal:

```bash
npm install
```

Esto instalará `@supabase/supabase-js` y todas las demás dependencias.

### 2. Crear Archivo .env

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_SUPABASE_URL=https://qevqzkgiifozshzbdvmh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldnF6a2dpaWZvenNoemJkdm1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzU0MzYsImV4cCI6MjA3OTI1MTQzNn0.uoFtmR-njtUt3KQZ3A19y6ohGOAQNUyYcEZ_SHw059k
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldnF6a2dpaWZvenNoemJkdm1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY3NTQzNiwiZXhwIjoyMDc5MjUxNDM2fQ.7jjbTjfJI4USiElJWpd8HwLPDO3CKh9gpobmyFxOOJc
```

**Nota:** El archivo `.env` está en `.gitignore` por seguridad.

### 3. Ejecutar Script SQL en Supabase

1. Ve al panel de Supabase: https://qevqzkgiifozshzbdvmh.supabase.co
2. Inicia sesión en tu cuenta
3. Navega a **SQL Editor** en el menú lateral
4. Haz clic en **New Query**
5. Copia y pega todo el contenido del archivo `supabase/schema.sql`
6. Haz clic en **Run** o presiona `Ctrl+Enter` (o `Cmd+Enter` en Mac)
7. Verifica que todas las tablas se hayan creado correctamente

### 4. Verificar Tablas Creadas

En el panel de Supabase:
1. Ve a **Table Editor**
2. Deberías ver las siguientes tablas:
   - users
   - careers
   - classrooms
   - calendar_events
   - notifications
   - chat_groups
   - chat_messages
   - blocked_users
   - justification_requests
   - final_exams

### 5. (Opcional) Migrar Datos Iniciales

Si quieres migrar los datos de ejemplo desde `mockDatabase.ts` a Supabase, puedes:

1. Usar el SQL Editor de Supabase para insertar datos manualmente
2. O crear un script de migración que lea de localStorage y escriba a Supabase

### 6. Ejecutar la Aplicación

```bash
npm run dev
```

La aplicación debería iniciarse y conectarse automáticamente a Supabase si las variables de entorno están configuradas correctamente.

## 🔍 Verificación

Para verificar que todo funciona:

1. Abre la consola del navegador (F12)
2. Busca mensajes de error relacionados con Supabase
3. Intenta iniciar sesión con las credenciales de demo
4. Si hay errores, verifica:
   - Que el archivo `.env` existe y tiene las variables correctas
   - Que las tablas se crearon en Supabase
   - Que las políticas RLS permiten las operaciones necesarias

## 🔒 Seguridad

**IMPORTANTE:** Las políticas de Row Level Security (RLS) en el script SQL son básicas. Para producción, deberás:

1. Revisar y ajustar las políticas según tus necesidades
2. Considerar usar autenticación de Supabase en lugar de autenticación por contraseña simple
3. Implementar validación y sanitización de datos
4. Configurar políticas más restrictivas según los roles de usuario

## 📝 Notas

- El servicio `database.ts` detecta automáticamente si Supabase está configurado
- Si Supabase no está configurado, la aplicación usará `mockDatabase.ts` (localStorage) como fallback
- Todas las funciones son asíncronas cuando usan Supabase
- Los componentes ya están actualizados para manejar funciones asíncronas

## 🆘 Solución de Problemas

### Error: "Missing Supabase environment variables"
- Verifica que el archivo `.env` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo después de crear/modificar `.env`

### Error: "relation does not exist"
- Ejecuta el script SQL en Supabase para crear las tablas

### Error: "new row violates row-level security policy"
- Revisa las políticas RLS en Supabase
- Ajusta las políticas según sea necesario

### La aplicación no se conecta a Supabase
- Verifica que las variables de entorno empiezan con `VITE_` para que Vite las exponga
- Reinicia el servidor de desarrollo

