'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/assets/css/input.css'
import store from '@/store';
import { Provider } from 'react-redux';
import Navbar from '@/components/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar>
            {children}
          </Navbar>
        </Provider>
      </body>
    </html>
  )
}
