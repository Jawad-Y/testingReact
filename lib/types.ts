export type UserRole = 'admin' | 'club_leader' | 'instructor' | 'assistant_instructor' | 'member' | 'external_instructor' | 'trainee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  profileImage?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  sessionId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface TrainingSession {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  date: string;
  time: string;
  duration: number; // minutes
  maxParticipants: number;
  topic: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Performance {
  id: string;
  userId: string;
  sessionId: string;
  rating: number; // 1-5
  feedback: string;
  date: string;
  evaluatedBy: string;
}

export interface SheetMusic {
  id: string;
  title: string;
  composer: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instrument: string;
  uploadedBy: string;
  uploadDate: string;
  filePath: string;
}

export interface Instrument {
  id: string;
  name: string;
  type: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs_repair';
  currentUser?: string;
  checkoutDate?: string;
  notes?: string;
}

export interface Clothing {
  id: string;
  type: string;
  size: string;
  color: string;
  quantity: number;
  condition: 'new' | 'good' | 'worn' | 'needs_replacement';
  assignedTo?: string;
  lastIssuedDate?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  foundedDate: string;
  leader: string;
  members: number;
  averageAttendance: number;
}
