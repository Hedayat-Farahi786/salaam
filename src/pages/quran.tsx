import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Bookmark, PlayCircle, Search } from 'lucide-react';
import QuranReader from '@/components/quran-reader';
import AudioPlayer from '@/components/audio-player';

export default function Quran() {
  const [selectedSurah, setSelectedSurah] = useState('1');
  const [selectedReciter, setSelectedReciter] = useState('mishary');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Quran</h1>
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Bookmarks
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-2">
            <Select value={selectedSurah} onValueChange={setSelectedSurah}>
              <SelectTrigger>
                <SelectValue placeholder="Select Surah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1. Al-Fatihah</SelectItem>
                <SelectItem value="2">2. Al-Baqarah</SelectItem>
                <SelectItem value="3">3. Ali 'Imran</SelectItem>
                {/* Add more surahs */}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Select value={selectedReciter} onValueChange={setSelectedReciter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Reciter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mishary">Mishary Rashid Alafasy</SelectItem>
                <SelectItem value="sudais">Abdurrahman As-Sudais</SelectItem>
                <SelectItem value="ghamdi">Saad Al-Ghamdi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Search in Quran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Tabs defaultValue="read" className="space-y-4">
        <TabsList>
          <TabsTrigger value="read" className="gap-2">
            <Book className="h-4 w-4" />
            Read
          </TabsTrigger>
          <TabsTrigger value="listen" className="gap-2">
            <PlayCircle className="h-4 w-4" />
            Listen
          </TabsTrigger>
        </TabsList>

        <TabsContent value="read" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <QuranReader surahId={selectedSurah} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listen" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <AudioPlayer
                reciter={selectedReciter}
                surahId={selectedSurah}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}