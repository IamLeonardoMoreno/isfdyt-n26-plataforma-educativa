import { supabase } from './supabaseClient';
import { 
  User, 
  UserRole, 
  CalendarEvent, 
  Notification, 
  StudentCourse, 
  TeacherCourse, 
  CourseStudent, 
  JustificationRequest, 
  Career, 
  ChatMessage, 
  Classroom, 
  ChatGroup, 
  FinalExamSession 
} from '../types';

export interface StoredUser extends User {
  password?: string;
}

// ============ USERS ============
export const getUsers = async (): Promise<StoredUser[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  
  return data.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role as UserRole,
    avatar: u.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.name)}`,
    preferences: u.preferences,
    academicData: u.academic_data
  }));
};

export const getUserById = async (id: string): Promise<StoredUser | undefined> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !data) return undefined;
  
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role as UserRole,
    avatar: data.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`,
    preferences: data.preferences,
    academicData: data.academic_data
  };
};

export const addUser = async (user: Omit<StoredUser, 'id'>): Promise<StoredUser> => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      name: user.name,
      email: user.email,
      password: user.password || '',
      role: user.role,
      avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`,
      preferences: user.preferences || { emailNotifications: true, darkMode: false, theme: 'indigo' },
      academic_data: user.academicData
    })
    .select()
    .single();
  
  if (error) throw error;
  
  const { password, ...safeUser } = data;
  return safeUser as StoredUser;
};

export const updateUser = async (id: string, updates: Partial<StoredUser>): Promise<StoredUser | null> => {
  const updateData: any = {};
  if (updates.name) updateData.name = updates.name;
  if (updates.email) updateData.email = updates.email;
  if (updates.password) updateData.password = updates.password;
  if (updates.role) updateData.role = updates.role;
  if (updates.avatar) updateData.avatar = updates.avatar;
  if (updates.preferences) updateData.preferences = updates.preferences;
  if (updates.academicData) updateData.academic_data = updates.academicData;
  updateData.updated_at = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error || !data) return null;
  
  const { password, ...safeUser } = data;
  return safeUser as StoredUser;
};

export const deleteUser = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .eq('password', password)
    .single();
  
  if (error || !data) return null;
  
  const { password: _, ...safeUser } = data;
  return safeUser as User;
};

// ============ CAREERS ============
export const getCareers = async (): Promise<Career[]> => {
  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching careers:', error);
    return [];
  }
  
  return data.map(c => ({
    id: c.id,
    name: c.name,
    years: c.years,
    subjects: c.subjects || []
  }));
};

export const saveCareer = async (career: Career): Promise<Career> => {
  const { data, error } = await supabase
    .from('careers')
    .upsert({
      id: career.id,
      name: career.name,
      years: career.years,
      subjects: career.subjects,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })
    .select()
    .single();
  
  if (error) throw error;
  return data as Career;
};

export const deleteCareer = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('careers')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// ============ CLASSROOMS ============
export const getClassrooms = async (): Promise<Classroom[]> => {
  const { data, error } = await supabase
    .from('classrooms')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching classrooms:', error);
    return [];
  }
  
  return data.map(c => ({
    id: c.id,
    name: c.name,
    capacity: c.capacity,
    location: c.location
  }));
};

export const saveClassroom = async (classroom: Classroom): Promise<Classroom> => {
  const { data, error } = await supabase
    .from('classrooms')
    .upsert({
      id: classroom.id,
      name: classroom.name,
      capacity: classroom.capacity,
      location: classroom.location,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' })
    .select()
    .single();
  
  if (error) throw error;
  return data as Classroom;
};

export const deleteClassroom = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('classrooms')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// ============ CALENDAR EVENTS ============
export const getEvents = async (): Promise<CalendarEvent[]> => {
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .order('date');
  
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  
  return data.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date,
    type: e.type,
    description: e.description
  }));
};

export const addEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> => {
  const { data, error } = await supabase
    .from('calendar_events')
    .insert({
      id: Date.now().toString(),
      title: event.title,
      date: event.date,
      type: event.type,
      description: event.description
    })
    .select()
    .single();
  
  if (error) throw error;
  return data as CalendarEvent;
};

export const deleteEvent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('calendar_events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// ============ NOTIFICATIONS ============
export const getNotifications = async (userId: string): Promise<Notification[]> => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .or(`user_id.eq.${userId},user_id.eq.all`)
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
  
  return data.map(n => ({
    id: n.id,
    userId: n.user_id,
    title: n.title,
    message: n.message,
    date: n.date,
    read: n.read,
    type: n.type
  }));
};

export const getUnreadCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .or(`user_id.eq.${userId},user_id.eq.all`)
    .eq('read', false);
  
  if (error) return 0;
  return count || 0;
};

export const addNotification = async (notification: Omit<Notification, 'id' | 'date' | 'read'>): Promise<Notification> => {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      id: Date.now().toString(),
      user_id: notification.userId,
      title: notification.title,
      message: notification.message,
      date: new Date().toISOString(),
      read: false,
      type: notification.type
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    userId: data.user_id,
    title: data.title,
    message: data.message,
    date: data.date,
    read: data.read,
    type: data.type
  };
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id);
  
  if (error) throw error;
};

export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .or(`user_id.eq.${userId},user_id.eq.all`);
  
  if (error) throw error;
};

export const deleteNotification = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// ============ CHAT ============
export const getGroups = async (userId: string): Promise<ChatGroup[]> => {
  const { data, error } = await supabase
    .from('chat_groups')
    .select('*')
    .contains('members', [userId]);
  
  if (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
  
  return data.map(g => ({
    id: g.id,
    name: g.name,
    members: g.members,
    admins: g.admins,
    avatar: g.avatar
  }));
};

export const createGroup = async (name: string, memberIds: string[], adminId: string): Promise<ChatGroup> => {
  const { data, error } = await supabase
    .from('chat_groups')
    .insert({
      id: `g${Date.now()}`,
      name,
      members: [...memberIds, adminId],
      admins: [adminId],
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
    })
    .select()
    .single();
  
  if (error) throw error;
  return data as ChatGroup;
};

export const getMessages = async (userId: string, otherId: string, isGroup: boolean = false): Promise<ChatMessage[]> => {
  let query = supabase.from('chat_messages').select('*');
  
  if (isGroup) {
    query = query.eq('group_id', otherId);
  } else {
    query = query.or(`and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`);
  }
  
  const { data, error } = await query.order('timestamp', { ascending: true });
  
  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  
  return data.map(m => ({
    id: m.id,
    senderId: m.sender_id,
    receiverId: m.receiver_id,
    groupId: m.group_id,
    content: m.content,
    timestamp: m.timestamp,
    read: m.read
  }));
};

export const sendMessage = async (senderId: string, receiverId: string, content: string): Promise<ChatMessage> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      id: Date.now().toString(),
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    senderId: data.sender_id,
    receiverId: data.receiver_id,
    groupId: data.group_id,
    content: data.content,
    timestamp: data.timestamp,
    read: data.read
  };
};

export const sendGroupMessage = async (senderId: string, groupId: string, content: string): Promise<ChatMessage> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      id: Date.now().toString(),
      sender_id: senderId,
      receiver_id: groupId,
      group_id: groupId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    senderId: data.sender_id,
    receiverId: data.receiver_id,
    groupId: data.group_id,
    content: data.content,
    timestamp: data.timestamp,
    read: data.read
  };
};

export const markMessagesAsRead = async (userId: string, senderId: string): Promise<void> => {
  const { error } = await supabase
    .from('chat_messages')
    .update({ read: true })
    .eq('receiver_id', userId)
    .eq('sender_id', senderId)
    .is('group_id', null);
  
  if (error) throw error;
};

export const clearChat = async (userId: string, otherId: string): Promise<void> => {
  const isGroup = otherId.startsWith('g');
  
  if (isGroup) {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('group_id', otherId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${userId})`)
      .is('group_id', null);
    if (error) throw error;
  }
};

export const getUnreadMessagesCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from('chat_messages')
    .select('*', { count: 'exact', head: true })
    .eq('receiver_id', userId)
    .eq('read', false)
    .is('group_id', null);
  
  if (error) return 0;
  return count || 0;
};

export const toggleBlockUser = async (userId: string, targetId: string): Promise<boolean> => {
  const { data: existing } = await supabase
    .from('blocked_users')
    .select('*')
    .eq('user_id', userId)
    .eq('blocked_user_id', targetId)
    .single();
  
  if (existing) {
    const { error } = await supabase
      .from('blocked_users')
      .delete()
      .eq('user_id', userId)
      .eq('blocked_user_id', targetId);
    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from('blocked_users')
      .insert({
        user_id: userId,
        blocked_user_id: targetId
      });
    if (error) throw error;
    return true;
  }
};

export const isUserBlocked = async (userId: string, targetId: string): Promise<boolean> => {
  const { data } = await supabase
    .from('blocked_users')
    .select('*')
    .eq('user_id', userId)
    .eq('blocked_user_id', targetId)
    .single();
  
  return !!data;
};

export const getContacts = async (currentUserId: string): Promise<(User & { unread: number, lastMessage?: string, isBlocked: boolean })[]> => {
  const users = await getUsers();
  const filteredUsers = users.filter(u => u.id !== currentUserId);
  
  const contacts = await Promise.all(filteredUsers.map(async (u) => {
    const messages = await getMessages(currentUserId, u.id);
    const unreadMessages = messages.filter(m => m.senderId === u.id && !m.read);
    const blocked = await isUserBlocked(currentUserId, u.id);
    
    return {
      ...u,
      unread: unreadMessages.length,
      lastMessage: messages.length > 0 ? messages[messages.length - 1].content : undefined,
      isBlocked: blocked
    };
  }));
  
  return contacts;
};

// ============ JUSTIFICATIONS ============
export const getJustificationRequests = async (): Promise<JustificationRequest[]> => {
  const { data, error } = await supabase
    .from('justification_requests')
    .select('*')
    .order('request_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching justification requests:', error);
    return [];
  }
  
  return data.map(r => ({
    id: r.id,
    studentId: r.student_id,
    studentName: r.student_name,
    courseName: r.course_name,
    date: r.date,
    reason: r.reason,
    status: r.status,
    requestDate: r.request_date
  }));
};

export const addJustificationRequest = async (req: Omit<JustificationRequest, 'id' | 'status' | 'requestDate'>): Promise<JustificationRequest> => {
  const { data, error } = await supabase
    .from('justification_requests')
    .insert({
      id: Date.now().toString(),
      student_id: req.studentId,
      student_name: req.studentName,
      course_name: req.courseName,
      date: req.date,
      reason: req.reason,
      status: 'PENDING',
      request_date: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    studentId: data.student_id,
    studentName: data.student_name,
    courseName: data.course_name,
    date: data.date,
    reason: data.reason,
    status: data.status,
    requestDate: data.request_date
  };
};

export const updateJustificationStatus = async (id: string, status: 'APPROVED' | 'REJECTED'): Promise<JustificationRequest[]> => {
  const { error } = await supabase
    .from('justification_requests')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
  return getJustificationRequests();
};

// ============ FINAL EXAMS ============
export const getFinalExams = async (userId: string): Promise<FinalExamSession[]> => {
  const { data, error } = await supabase
    .from('final_exams')
    .select('*')
    .order('date');
  
  if (error) {
    console.error('Error fetching final exams:', error);
    return [];
  }
  
  return data.map(f => ({
    id: f.id,
    subjectName: f.subject_name,
    subjectId: f.subject_id,
    careerId: f.career_id,
    date: f.date,
    time: f.time,
    professor: f.professor,
    classroom: f.classroom,
    isRegistered: f.registered_student_ids?.includes(userId) || false,
    registeredCount: f.registered_student_ids?.length || 0
  }));
};

export const addFinalExam = async (exam: Omit<FinalExamSession, 'id' | 'isRegistered' | 'registeredCount'> & { registeredStudentIds?: string[] }): Promise<FinalExamSession> => {
  const { data, error } = await supabase
    .from('final_exams')
    .insert({
      id: Date.now().toString(),
      subject_name: exam.subjectName,
      subject_id: exam.subjectId,
      career_id: exam.careerId,
      date: exam.date,
      time: exam.time,
      professor: exam.professor,
      classroom: exam.classroom,
      registered_student_ids: exam.registeredStudentIds || []
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return {
    id: data.id,
    subjectName: data.subject_name,
    subjectId: data.subject_id,
    careerId: data.career_id,
    date: data.date,
    time: data.time,
    professor: data.professor,
    classroom: data.classroom,
    isRegistered: false,
    registeredCount: 0
  };
};

export const deleteFinalExam = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('final_exams')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const toggleFinalRegistration = async (userId: string, examId: string): Promise<boolean> => {
  const { data: exam, error: fetchError } = await supabase
    .from('final_exams')
    .select('registered_student_ids')
    .eq('id', examId)
    .single();
  
  if (fetchError || !exam) throw fetchError;
  
  const registeredIds = exam.registered_student_ids || [];
  const isRegistered = registeredIds.includes(userId);
  
  const newIds = isRegistered
    ? registeredIds.filter(id => id !== userId)
    : [...registeredIds, userId];
  
  const { error } = await supabase
    .from('final_exams')
    .update({ registered_student_ids: newIds })
    .eq('id', examId);
  
  if (error) throw error;
  return !isRegistered;
};

// ============ MOCK DATA FUNCTIONS (para mantener compatibilidad) ============
// Estas funciones devuelven datos mock ya que no están en la base de datos
export const getStudentCourses = async (studentId: string): Promise<StudentCourse[]> => {
  // Mock data - en producción esto vendría de la base de datos
  return [
    {
      id: 'prog1',
      name: 'Programación I',
      professor: 'Prof. Alejandro Gomez',
      schedule: 'Lun 18:00 - 22:00',
      attendance: 92,
      nextExams: [{ date: '2024-06-10', title: 'Parcial Estructuras de Control' }],
      resources: [
        { id: 'r1', title: 'Introducción a Algoritmos', type: 'pdf', url: '#', date: '2024-03-15' },
        { id: 'r2', title: 'Clase Grabada: Variables y Tipos', type: 'video', url: '#', date: '2024-03-20' }
      ],
      academicStatus: 'Cursada Aprobada'
    },
    {
      id: 'sis1',
      name: 'Sistemas Operativos',
      professor: 'Prof. Maria Sanchez',
      schedule: 'Mar 18:00 - 20:00',
      attendance: 85,
      nextExams: [],
      resources: [],
      academicStatus: 'Cursando'
    }
  ];
};

export const getTeacherCourses = async (teacherId: string): Promise<TeacherCourse[]> => {
  // Mock data - en producción esto vendría de la base de datos
  return [
    {
      id: 'soft1-prog1',
      name: 'Programación I',
      career: 'Tec. Sup. en Desarrollo de Software',
      year: '1° Año',
      schedule: 'Lun 18:00 - 22:00',
      totalStudents: 32,
      nextClass: 'Hoy 18:00',
      status: 'active'
    }
  ];
};

export const getCourseStudents = async (courseId: string): Promise<CourseStudent[]> => {
  // Mock data
  const names = ['Alvarez', 'Benitez', 'Castro', 'Dominguez'];
  const firstNames = ['Juan', 'Maria', 'Pedro', 'Ana'];
  return names.map((name, i) => ({
    id: `st-${courseId}-${i}`,
    name: `${name}, ${firstNames[i]}`,
    attendance: 70 + Math.floor(Math.random() * 30),
    lastGrade: Math.floor(Math.random() * 4) + 6
  }));
};

// Función de inicialización (para migrar datos iniciales si es necesario)
export const initializeDatabase = async () => {
  // Esta función puede usarse para migrar datos iniciales desde localStorage a Supabase
  // Por ahora, solo verificamos la conexión
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) {
      console.warn('Supabase connection issue:', error);
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

