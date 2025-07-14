import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activities = [
  {
    id: 1,
    user: {
      name: 'John Martinez',
      email: 'john@example.com',
      avatar: '/avatars/01.png',
    },
    action: 'Created a new equipment listing',
    time: '2 minutes ago',
    type: 'marketplace',
  },
  {
    id: 2,
    user: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: '/avatars/02.png',
    },
    action: 'Booked a music professional',
    time: '5 minutes ago',
    type: 'booking',
  },
  {
    id: 3,
    user: {
      name: 'Mike Chen',
      email: 'mike@example.com',
      avatar: '/avatars/03.png',
    },
    action: 'Updated their profile',
    time: '10 minutes ago',
    type: 'profile',
  },
  {
    id: 4,
    user: {
      name: 'Emma Wilson',
      email: 'emma@example.com',
      avatar: '/avatars/04.png',
    },
    action: 'Started a new collaboration',
    time: '15 minutes ago',
    type: 'collaboration',
  },
  {
    id: 5,
    user: {
      name: 'David Brown',
      email: 'david@example.com',
      avatar: '/avatars/05.png',
    },
    action: 'Registered as a music school',
    time: '20 minutes ago',
    type: 'registration',
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt="Avatar" />
            <AvatarFallback>
              {activity.user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.user.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.action}
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}