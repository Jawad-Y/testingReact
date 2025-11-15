import { UserRole } from './types';

export const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    'manage_users',
    'view_all_data',
    'manage_club',
    'manage_roles',
    'manage_inventory',
    'manage_training',
    'view_attendance',
    'manage_performance',
  ],
  club_leader: [
    'manage_members',
    'schedule_training',
    'view_attendance',
    'manage_inventory',
    'manage_performance',
    'view_members',
  ],
  instructor: [
    'schedule_training',
    'manage_performance',
    'view_attendance',
    'upload_sheet_music',
    'view_members',
  ],
  assistant_instructor: [
    'view_training',
    'record_attendance',
    'view_members',
    'upload_sheet_music',
  ],
  member: ['view_training', 'view_attendance', 'view_sheet_music', 'download_sheet_music'],
  external_instructor: ['schedule_training', 'manage_performance', 'view_members'],
  trainee: ['view_training', 'view_sheet_music'],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function canAccessPage(role: UserRole, page: string): boolean {
  const pagePermissions: Record<string, string[]> = {
    'dashboard': ['admin', 'club_leader', 'instructor', 'assistant_instructor', 'member'],
    'users': ['admin', 'club_leader'],
    'attendance': ['admin', 'club_leader', 'instructor', 'assistant_instructor'],
    'training': ['admin', 'club_leader', 'instructor', 'external_instructor'],
    'performance': ['admin', 'club_leader', 'instructor'],
    'inventory': ['admin', 'club_leader'],
    'sheet-music': ['admin', 'instructor', 'member', 'trainee'],
  };

  return pagePermissions[page]?.includes(role) ?? false;
}

export function getDashboardRoute(role: UserRole): string {
  const routeMap: Record<UserRole, string> = {
    admin: '/dashboard/admin',
    club_leader: '/dashboard/leader',
    instructor: '/dashboard/instructor',
    assistant_instructor: '/dashboard/assistant',
    member: '/dashboard/member',
    external_instructor: '/dashboard/external',
    trainee: '/dashboard/trainee',
  };
  return routeMap[role];
}
