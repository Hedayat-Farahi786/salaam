import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Compass, MapPin } from 'lucide-react';
import PrayerCard from '@/components/prayer-card';
import QiblaCompass from '@/components/qibla-compass';

interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
  isPassed: boolean;
}

export default function Prayers() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to London coordinates
          fetchPrayerTimes(51.5074, -0.1278);
        }
      );
    }
  }, []);

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lng}&method=2`
      );
      const data = await response.json();
      const timings = data.data.timings;

      const prayers: PrayerTime[] = [
        { name: 'Fajr', time: timings.Fajr, isNext: false, isPassed: false },
        { name: 'Sunrise', time: timings.Sunrise, isNext: false, isPassed: false },
        { name: 'Dhuhr', time: timings.Dhuhr, isNext: false, isPassed: false },
        { name: 'Asr', time: timings.Asr, isNext: false, isPassed: false },
        { name: 'Maghrib', time: timings.Maghrib, isNext: false, isPassed: false },
        { name: 'Isha', time: timings.Isha, isNext: false, isPassed: false },
      ];

      // Calculate which prayers have passed and which is next
      const now = new Date();
      let nextPrayerFound = false;

      prayers.forEach((prayer) => {
        const prayerTime = new Date();
        const [hours, minutes] = prayer.time.split(':');
        prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);

        if (prayerTime > now && !nextPrayerFound) {
          prayer.isNext = true;
          nextPrayerFound = true;
        } else if (prayerTime < now) {
          prayer.isPassed = true;
        }
      });

      setPrayerTimes(prayers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Prayer Times</h1>
          <Button variant="outline" size="sm" className="gap-2">
            <MapPin className="h-4 w-4" />
            {loading ? 'Loading location...' : 'Update Location'}
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={33} className="h-2" />
            <p className="mt-2 text-sm text-muted-foreground">2/6 prayers completed</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Prayer Schedule</h2>
          <div className="space-y-4">
            {loading ? (
              <Card>
                <CardContent className="p-6">Loading prayer times...</CardContent>
              </Card>
            ) : (
              prayerTimes.map((prayer) => (
                <PrayerCard
                  key={prayer.name}
                  name={prayer.name}
                  time={prayer.time}
                  isNext={prayer.isNext}
                  isPassed={prayer.isPassed}
                />
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Qibla Direction</h2>
          <Card>
            <CardContent className="p-6">
              <QiblaCompass latitude={location.latitude} longitude={location.longitude} />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}