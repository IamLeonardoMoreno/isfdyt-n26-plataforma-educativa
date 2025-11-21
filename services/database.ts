// Database service - Unified interface that uses Supabase if available, otherwise falls back to mockDatabase
import * as supabaseDb from './supabaseDatabase';
import * as mockDb from './mockDatabase';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && url !== '' && key !== '');
};

// Use Supabase if configured, otherwise use mock database
const useSupabase = isSupabaseConfigured();

// Export all database functions with automatic fallback
export const initializeDatabase = async () => {
  if (useSupabase) {
    return await supabaseDb.initializeDatabase();
  } else {
    return mockDb.initializeDatabase();
  }
};

// Users
export const getUsers = async () => {
  if (useSupabase) {
    return await supabaseDb.getUsers();
  } else {
    return mockDb.getUsers();
  }
};

export const getUserById = async (id: string) => {
  if (useSupabase) {
    return await supabaseDb.getUserById(id);
  } else {
    return mockDb.getUserById(id);
  }
};

export const addUser = async (user: Parameters<typeof mockDb.addUser>[0]) => {
  if (useSupabase) {
    return await supabaseDb.addUser(user);
  } else {
    return mockDb.addUser(user);
  }
};

export const updateUser = async (id: string, updates: Parameters<typeof mockDb.updateUser>[1]) => {
  if (useSupabase) {
    return await supabaseDb.updateUser(id, updates);
  } else {
    return mockDb.updateUser(id, updates);
  }
};

export const deleteUser = async (id: string) => {
  if (useSupabase) {
    return await supabaseDb.deleteUser(id);
  } else {
    return mockDb.deleteUser(id);
  }
};

export const authenticateUser = async (email: string, password: string) => {
  if (useSupabase) {
    return await supabaseDb.authenticateUser(email, password);
  } else {
    return mockDb.authenticateUser(email, password);
  }
};

// Careers
export const getCareers = async () => {
  if (useSupabase) {
    return await supabaseDb.getCareers();
  } else {
    return mockDb.getCareers();
  }
};

export const saveCareer = async (career: Parameters<typeof mockDb.saveCareer>[0]) => {
  if (useSupabase) {
    return await supabaseDb.saveCareer(career);
  } else {
    return mockDb.saveCareer(career);
  }
};

export const deleteCareer = async (id: string) => {
  if (useSupabase) {
    return await supabaseDb.deleteCareer(id);
  } else {
    return mockDb.deleteCareer(id);
  }
};

// Classrooms
export const getClassrooms = async () => {
  if (useSupabase) {
    return await supabaseDb.getClassrooms();
  } else {
    return mockDb.getClassrooms();
  }
};

export const saveClassroom = async (classroom: Parameters<typeof mockDb.saveClassroom>[0]) => {
  if (useSupabase) {
    return await supabaseDb.saveClassroom(classroom);
  } else {
    return mockDb.saveClassroom(classroom);
  }
};

export const deleteClassroom = async (id: string) => {
  if (useSupabase) {
    return await supabaseDb.deleteClassroom(id);
  } else {
    return mockDb.deleteClassroom(id);
  }
};

// Events
export const getEvents = async () => {
  if (useSupabase) {
    return await supabaseDb.getEvents();
  } else {
    return mockDb.getEvents();
  }
};

export const addEvent = async (event: Parameters<typeof mockDb.addEvent>[0]) => {
  if (useSupabase) {
    return await supabaseDb.addEvent(event);
  } else {
    return mockDb.addEvent(event);
  }
};

export const deleteEvent = async (id: string) => {
  if (useSupabase) {
    return await supabaseDb.deleteEvent(id);
  } else {
    return mockDb.deleteEvent(id);
  }
};

// Notifications
export const getNotifications = async (userId: string) => {
  if (useSupabase) {
    return await supabaseDb.getNotifications(userId);
  } else {
    return mockDb.getNotifications(userId);
  }
};

export const getUnreadCount = async (userId: string) => {
  if (useSupabase) {
    return await supabaseDb.getUnreadCount(userId);
  } else {
    return mockDb.getUnreadCount(userId);
  }
};

export const addNotification = async (notification: Parameters<typeof mockDb.addNotification>[0]) => {
  if (useSupabase) {
    return await supabaseDb.addNotification(notification);
  } else {
    return mockDb.addNotification(notification);
  }
};

export const markNotificationAsRead = async (id: string) => {
  if (useSupabase) {
    return await supabaseDb.markNotificationAsRead(id);
  } else {
    return mockDb.markNotificationAsRead(id);
  }
};

export const markAllNotificationsAsRead = async (userId: string) => {
  if (useSupabase) {
    return await supabaseDb.markAllNotificationsAsRead(userId);
  } else {
    return mockDb.markAllNotificationsAsRead(userId);
  }
};

export const deleteNotification = async (id: string) => {
  if (useSupabase) {
    return await supabaseDb.deleteNotification(id);
  } else {
    return mockDb.deleteNotification(id);
  }
};

// Chat
export const getGroups = async (userId: string) => {
  if (useSupabase) {
    return await supabaseDb.getGroups(userId);
  } else {
    return mockDb.getGroups(userId);
  }
};

export const createGroup = async (name: string, memberIds: string[], adminId: string) => {
  if (useSupabase) {
    return await supabaseDb.createGroup(name, memberIds, adminId);
  } else {
    return mockDb.createGroup(name, memberIds, adminId);
  }
};

export const getMessages = async (userId: string, otherId: string, isGroup?: boolean) => {
  if (useSupabase) {
    return await supabaseDb.getMessages(userId, otherId, isGroup);
  } else {
    return mockDb.getMessages(userId, otherId, isGroup);
  }
};

export const sendMessage = async (senderId: string, receiverId: string, content: string) => {
  if (useSupabase) {
    return await supabaseDb.sendMessage(senderId, receiverId, content);
  } else {
    return mockDb.sendMessage(senderId, receiverId, content);
  }
};

export const sendGroupMessage = async (senderId: string, groupId: string, content: string) => {
  if (useSupabase) {
    return await supabaseDb.sendGroupMessage(senderId, groupId, content);
  } else {
    return mockDb.sendGroupMessage(senderId, groupId, content);
  }
};

export const markMessagesAsRead = async (userId: string, senderId: string) => {
  if (useSupabase) {
    return await supabaseDb.markMessagesAsRead(userId, senderId);
  } else {
    return mockDb.markMessagesAsRead(userId, senderId);
  }
};

export const clearChat = async (userId: string, otherId: string) => {
  if (useSupabase) {
    return await supabaseDb.clearChat(userId, otherId);
  } else {
    return mockDb.clearChat(userId, otherId);
  }
};

export const getUnreadMessagesCount = async (userId: string) => {
  if (useSupabase) {
    return await supabaseDb.getUnreadMessagesCount(userId);
  } else {
    return mockDb.getUnreadMessagesCount(userId);
  }
};

export const toggleBlockUser = async (userId: string, targetId: string) => {
  if (useSupabase) {
    return await supabaseDb.toggleBlockUser(userId, targetId);
  } else {
    return mockDb.toggleBlockUser(userId, targetId);
  }
};

export const isUserBlocked = async (userId: string, targetId: string) => {
  if (useSupabase) {
    return await supabaseDb.isUserBlocked(userId, targetId);
  } else {
    return mockDb.isUserBlocked(userId, targetId);
  }
};

export const getContacts = async (currentUserId: string) => {
  if (useSupabase) {
    return await supabaseDb.getContacts(currentUserId);
  } else {
    return mockDb.getContacts(currentUserId);
  }
};

// Justifications
export const getJustificationRequests = async () => {
  if (useSupabase) {
    return await supabaseDb.getJustificationRequests();
  } else {
    return mockDb.getJustificationRequests();
  }
};

export const addJustificationRequest = async (req: Parameters<typeof mockDb.addJustificationRequest>[0]) => {
  if (useSupabase) {
    return await supabaseDb.addJustificationRequest(req);
  } else {
    return mockDb.addJustificationRequest(req);
  }
};

export const updateJustificationStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
  if (useSupabase) {
    return await supabaseDb.updateJustificationStatus(id, status);
  } else {
    return mockDb.updateJustificationStatus(id, status);
  }
};

// Final Exams
export const getFinalExams = async (userId: string) => {
  if (useSupabase) {
    return await supabaseDb.getFinalExams(userId);
  } else {
    return mockDb.getFinalExams(userId);
  }
};

export const addFinalExam = async (exam: Parameters<typeof mockDb.addFinalExam>[0]) => {
  if (useSupabase) {
    return await supabaseDb.addFinalExam(exam);
  } else {
    return mockDb.addFinalExam(exam);
  }
};

export const deleteFinalExam = async (id: string) => {
  if (useSupabase) {
    return await supabaseDb.deleteFinalExam(id);
  } else {
    return mockDb.deleteFinalExam(id);
  }
};

export const toggleFinalRegistration = async (userId: string, examId: string) => {
  if (useSupabase) {
    return await supabaseDb.toggleFinalRegistration(userId, examId);
  } else {
    return mockDb.toggleFinalRegistration(userId, examId);
  }
};

// Student/Teacher Courses (Mock data for now)
export const getStudentCourses = async (studentId: string) => {
  if (useSupabase) {
    return await supabaseDb.getStudentCourses(studentId);
  } else {
    return mockDb.getStudentCourses(studentId);
  }
};

export const getTeacherCourses = async (teacherId: string) => {
  if (useSupabase) {
    return await supabaseDb.getTeacherCourses(teacherId);
  } else {
    return mockDb.getTeacherCourses(teacherId);
  }
};

export const getCourseStudents = async (courseId: string) => {
  if (useSupabase) {
    return await supabaseDb.getCourseStudents(courseId);
  } else {
    return mockDb.getCourseStudents(courseId);
  }
};

export const toggleCourseStatus = async (courseId: string) => {
  if (useSupabase) {
    // Not implemented in Supabase yet
    return mockDb.toggleCourseStatus(courseId);
  } else {
    return mockDb.toggleCourseStatus(courseId);
  }
};

// Export types
export type { StoredUser } from './supabaseDatabase';

