import { User, Club, TrainingSession, AttendanceRecord, Performance, SheetMusic, Instrument, Clothing } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@musicclub.com',
    role: 'admin',
    joinDate: '2023-01-01',
    status: 'active',
  },
  {
    id: '2',
    name: 'Club Leader',
    email: 'leader@musicclub.com',
    role: 'club_leader',
    joinDate: '2023-02-01',
    status: 'active',
  },
  {
    id: '3',
    name: 'John Instructor',
    email: 'john@musicclub.com',
    role: 'instructor',
    joinDate: '2023-03-01',
    status: 'active',
  },
  {
    id: '4',
    name: 'Jane Member',
    email: 'jane@musicclub.com',
    role: 'member',
    joinDate: '2023-06-01',
    status: 'active',
  },
  {
    id: '5',
    name: 'New Trainee',
    email: 'trainee@musicclub.com',
    role: 'trainee',
    joinDate: '2024-11-01',
    status: 'active',
  },
];

export const mockClub: Club = {
  id: '1',
  name: 'Classical Music Club',
  description: 'A dedicated club for classical music enthusiasts and performers',
  foundedDate: '2022-01-15',
  leader: '2',
  members: 45,
  averageAttendance: 32,
};

export const mockTrainingSessions: TrainingSession[] = [
  {
    id: '1',
    title: 'Violin Fundamentals',
    description: 'Basic violin techniques and posture',
    instructorId: '3',
    date: '2024-11-20',
    time: '18:00',
    duration: 60,
    maxParticipants: 10,
    topic: 'Instrument Technique',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Music Theory Basics',
    description: 'Introduction to music theory',
    instructorId: '3',
    date: '2024-11-22',
    time: '19:00',
    duration: 90,
    maxParticipants: 15,
    topic: 'Theory',
    status: 'scheduled',
  },
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    userId: '4',
    sessionId: '1',
    date: '2024-11-13',
    status: 'present',
  },
  {
    id: '2',
    userId: '5',
    sessionId: '1',
    date: '2024-11-13',
    status: 'late',
  },
];

export const mockSheetMusic: SheetMusic[] = [
  {
    id: '1',
    title: 'Symphony No. 5',
    composer: 'Ludwig van Beethoven',
    difficulty: 'advanced',
    instrument: 'Violin',
    uploadedBy: '3',
    uploadDate: '2024-09-01',
    filePath: '/music/symphony5.pdf',
  },
  {
    id: '2',
    title: 'Für Elise',
    composer: 'Ludwig van Beethoven',
    difficulty: 'intermediate',
    instrument: 'Piano',
    uploadedBy: '3',
    uploadDate: '2024-10-15',
    filePath: '/music/fur_elise.pdf',
  },
];

export const mockInstruments: Instrument[] = [
  {
    id: '1',
    name: 'Violin - Student 1',
    type: 'Violin',
    condition: 'good',
    notes: 'Well-maintained instrument',
  },
  {
    id: '2',
    name: 'Cello - Professional',
    type: 'Cello',
    condition: 'excellent',
    currentUser: '4',
    checkoutDate: '2024-11-10',
  },
];

export const mockClothing: Clothing[] = [
  {
    id: '1',
    type: 'Performance Jacket',
    size: 'M',
    color: 'Black',
    quantity: 8,
    condition: 'good',
    lastIssuedDate: '2024-11-01',
  },
  {
    id: '2',
    type: 'Concert Dress',
    size: 'S',
    color: 'Black',
    quantity: 5,
    condition: 'good',
  },
];
