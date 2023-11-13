import { Nunito } from 'next/font/google'
import NavBar from '@/components/NavBar'

const nunito = Nunito({
  subsets: ['latin'],
  variable: "--font-nuni"
});

export default function Home() {
  return (
    <main className={`${nunito.variable} min-h-screen w-full dark:bg-black bg-white`}>
      <NavBar />
    </main>
  )
}

