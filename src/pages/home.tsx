import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bookmark, Clock, Moon, Sun } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">
            Begin Your Spiritual Journey
          </h1>
          <p className="text-lg text-muted-foreground">
            Strengthen your connection with Allah through guided prayers,
            meditation, and daily remembrance
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="lg">Start Prayer</Button>
          <Button size="lg" variant="outline">
            Explore Quran
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Sun className="h-8 w-8 mb-2" />
            <CardTitle>Daily Prayers</CardTitle>
            <CardDescription>
              Never miss a prayer with accurate prayer times and reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              View Prayer Times
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Bookmark className="h-8 w-8 mb-2" />
            <CardTitle>Quran & Du'a</CardTitle>
            <CardDescription>
              Access Quran recitations, translations, and daily Du'a
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              Open Library
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Moon className="h-8 w-8 mb-2" />
            <CardTitle>Evening Adhkar</CardTitle>
            <CardDescription>
              End your day with peaceful evening remembrance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              Start Adhkar
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Today's Schedule</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <CardTitle>Upcoming Prayer</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Asr</div>
              <p className="text-muted-foreground">In 2 hours 30 minutes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Daily Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Read Surah Al-Kahf</p>
              <p className="text-muted-foreground">Friday's blessed deed</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}