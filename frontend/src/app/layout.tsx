import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { AudioProvider } from '../context/AudioContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GlobalAudioBar } from '../components/GlobalAudioBar';
import { AuthModal } from '../components/AuthModal';

export const metadata: Metadata = {
  title: 'Living Heritage, Searchable — Preserving Oral Traditions & Living Crafts',
  description:
    'A contemporary digital sanctuary and ethical archive platform for documenting, preserving, searching, and exploring traditional Indian stories, folk songs, crafts, customs, and regional art forms.',
  keywords: [
    'Living Heritage',
    'Cultural Preservation',
    'Theyyam',
    'Aranmula Kannadi',
    'Kalaripayattu',
    'Kathakali',
    'Kerala Folklore',
    'Oral History',
    'Folk Songs',
    'Traditional Crafts',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between selection:bg-terracotta-100 selection:text-terracotta-900">
        <AuthProvider>
          <AudioProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <GlobalAudioBar />
            <AuthModal />
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

