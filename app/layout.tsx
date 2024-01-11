import { Toaster } from 'react-hot-toast'
import { Header } from './components/header'
import './globals.css'

export const metadata = {
  title: 'Chess',
  description: 'Chess game built with React, TypeScript, and TailwindCSS. Made by @aIv4ro'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-white/95 font-roboto flex flex-col h-screen">
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
