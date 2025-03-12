
import React from 'react';
import { Activity } from '../types/activity';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Activity as ActivityIcon, LogIn, LogOut, AlertCircle, RefreshCw } from 'lucide-react';

interface ActivityItemProps {
  activity: Activity;
}

const getIconForActivityType = (type: Activity['type']) => {
  switch (type) {
    case 'login':
      return <LogIn className="w-4 h-4" />;
    case 'logout':
      return <LogOut className="w-4 h-4" />;
    case 'update':
      return <RefreshCw className="w-4 h-4" />;
    case 'error':
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <ActivityIcon className="w-4 h-4" />;
  }
};

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const typeColorClass = {
    login: 'bg-activity-login text-white',
    logout: 'bg-activity-logout text-white',
    update: 'bg-activity-update text-white',
    error: 'bg-activity-error text-white',
  }[activity.type] || 'bg-gray-600 text-white';

  const timeAgo = formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true });

  return (
    <div className="flex items-center p-3 rounded-lg bg-secondary mb-2 animate-fade-in">
      <div className={cn("p-2 rounded-full mr-3", typeColorClass)}>
        {getIconForActivityType(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="font-medium truncate">
            {activity.username}
          </p>
          <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
            {timeAgo}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{activity.details}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
