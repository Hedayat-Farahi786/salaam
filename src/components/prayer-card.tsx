import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  time: string;
  isNext: boolean;
  isPassed: boolean;
}

export default function PrayerCard({ name, time, isNext, isPassed }: PrayerCardProps) {
  return (
    <Card className={cn(
      'transition-colors',
      isNext && 'border-primary',
      isPassed && 'opacity-50'
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className={cn(
              'h-4 w-4',
              isNext && 'text-primary'
            )} />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{time}</p>
            </div>
          </div>
          {isNext && (
            <span className="text-xs font-medium text-primary">Next Prayer</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}