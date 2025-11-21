-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ALUMNO', 'DOCENTE', 'PRECEPTOR', 'DIRECTIVO', 'ADMIN')),
  avatar TEXT,
  preferences JSONB DEFAULT '{"emailNotifications": true, "darkMode": false, "theme": "indigo"}'::jsonb,
  academic_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de carreras
CREATE TABLE IF NOT EXISTS careers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  years TEXT[] NOT NULL,
  subjects JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de aulas
CREATE TABLE IF NOT EXISTS classrooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de eventos del calendario
CREATE TABLE IF NOT EXISTS calendar_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('exam', 'holiday', 'deadline', 'meeting', 'other')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de notificaciones
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL, -- 'all' o user_id específico
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  type TEXT NOT NULL CHECK (type IN ('info', 'alert', 'success')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de grupos de chat
CREATE TABLE IF NOT EXISTS chat_groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  members TEXT[] NOT NULL,
  admins TEXT[] NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mensajes de chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  group_id TEXT,
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de usuarios bloqueados
CREATE TABLE IF NOT EXISTS blocked_users (
  user_id TEXT NOT NULL,
  blocked_user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, blocked_user_id)
);

-- Tabla de solicitudes de justificación
CREATE TABLE IF NOT EXISTS justification_requests (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  date DATE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de exámenes finales
CREATE TABLE IF NOT EXISTS final_exams (
  id TEXT PRIMARY KEY,
  subject_name TEXT NOT NULL,
  career_id TEXT,
  subject_id TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  professor TEXT NOT NULL,
  classroom TEXT NOT NULL,
  registered_student_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender ON chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_receiver ON chat_messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_group ON chat_messages(group_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON calendar_events(date);
CREATE INDEX IF NOT EXISTS idx_justification_requests_status ON justification_requests(status);
CREATE INDEX IF NOT EXISTS idx_final_exams_date ON final_exams(date);

-- Habilitar Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE justification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE final_exams ENABLE ROW LEVEL SECURITY;

-- Políticas básicas de RLS (ajustar según necesidades de seguridad)
-- Permitir acceso público completo para desarrollo (ajustar según necesidades en producción)
CREATE POLICY "Allow public read access to careers" ON careers FOR SELECT USING (true);
CREATE POLICY "Allow public write access to careers" ON careers FOR ALL USING (true);

CREATE POLICY "Allow public read access to classrooms" ON classrooms FOR SELECT USING (true);
CREATE POLICY "Allow public write access to classrooms" ON classrooms FOR ALL USING (true);

CREATE POLICY "Allow public read access to calendar_events" ON calendar_events FOR SELECT USING (true);
CREATE POLICY "Allow public write access to calendar_events" ON calendar_events FOR ALL USING (true);

CREATE POLICY "Allow public access to chat_groups" ON chat_groups FOR ALL USING (true);
CREATE POLICY "Allow public access to blocked_users" ON blocked_users FOR ALL USING (true);
CREATE POLICY "Allow public access to justification_requests" ON justification_requests FOR ALL USING (true);
CREATE POLICY "Allow public access to final_exams" ON final_exams FOR ALL USING (true);

-- Políticas para usuarios (permitir acceso público por ahora - ajustar según necesidades)
-- Nota: Como no estamos usando autenticación de Supabase Auth, estas políticas permiten acceso público
CREATE POLICY "Allow public read access to users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public update access to users" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow public insert access to users" ON users FOR INSERT WITH CHECK (true);

-- Políticas para notificaciones (acceso público por ahora)
CREATE POLICY "Allow public read access to notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Allow public update access to notifications" ON notifications FOR UPDATE USING (true);
CREATE POLICY "Allow public insert access to notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Políticas para mensajes de chat (acceso público por ahora)
CREATE POLICY "Allow public read access to chat_messages" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to chat_messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to chat_messages" ON chat_messages FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to chat_messages" ON chat_messages FOR DELETE USING (true);

-- Nota: Para producción, estas políticas deben ser más restrictivas y específicas según los roles de usuario

