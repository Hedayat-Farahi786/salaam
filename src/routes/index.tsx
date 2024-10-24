import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/home';
import Prayers from '@/pages/prayers';
import Quran from '@/pages/quran';
import Duas from '@/pages/duas';
import Dhikr from '@/pages/dhikr';
import Login from '@/pages/auth/login';
import Signup from '@/pages/auth/signup';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prayers" element={<Prayers />} />
      <Route path="/quran" element={<Quran />} />
      <Route path="/duas" element={<Duas />} />
      <Route path="/dhikr" element={<Dhikr />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}