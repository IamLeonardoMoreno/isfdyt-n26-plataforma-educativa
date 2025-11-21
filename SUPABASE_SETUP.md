# Configuración de Supabase

## Pasos para configurar la base de datos

### 1. Crear el archivo .env

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=https://qevqzkgiifozshzbdvmh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldnF6a2dpaWZvenNoemJkdm1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NzU0MzYsImV4cCI6MjA3OTI1MTQzNn0.uoFtmR-njtUt3KQZ3A19y6ohGOAQNUyYcEZ_SHw059k
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldnF6a2dpaWZvenNoemJkdm1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzY3NTQzNiwiZXhwIjoyMDc5MjUxNDM2fQ.7jjbTjfJI4USiElJWpd8HwLPDO3CKh9gpobmyFxOOJc
```

### 2. Ejecutar el script SQL

1. Ve al panel de Supabase: https://qevqzkgiifozshzbdvmh.supabase.co
2. Navega a **SQL Editor**
3. Copia y pega el contenido del archivo `supabase/schema.sql`
4. Ejecuta el script para crear todas las tablas necesarias

### 3. Configurar Row Level Security (RLS)

El script SQL ya incluye políticas básicas de RLS. Para producción, deberás ajustar estas políticas según tus necesidades de seguridad específicas.

### 4. Migrar datos iniciales (opcional)

Si tienes datos en localStorage que quieres migrar a Supabase, puedes crear un script de migración o usar la función `initializeDatabase` en el servicio.

### 5. Instalar dependencias

```bash
npm install
```

### 6. Ejecutar la aplicación

```bash
npm run dev
```

## Estructura de la base de datos

Las siguientes tablas se crearán:

- `users` - Usuarios del sistema
- `careers` - Carreras académicas
- `classrooms` - Aulas físicas
- `calendar_events` - Eventos del calendario
- `notifications` - Notificaciones del sistema
- `chat_groups` - Grupos de chat
- `chat_messages` - Mensajes de chat
- `blocked_users` - Usuarios bloqueados
- `justification_requests` - Solicitudes de justificación
- `final_exams` - Exámenes finales

## Notas importantes

- Las credenciales de Supabase están configuradas en el archivo `.env`
- El cliente de Supabase se inicializa en `services/supabaseClient.ts`
- El servicio de base de datos está en `services/supabaseDatabase.ts`
- Las funciones mantienen la misma interfaz que `mockDatabase.ts` para facilitar la migración

