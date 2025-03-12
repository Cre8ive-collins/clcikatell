
export type ActivityType = 'login' | 'logout' | 'update' | 'error';

export interface Activity {
  id: string;
  userId: string;
  username: string;
  type: ActivityType;
  timestamp: Date;
  details?: string;
}
