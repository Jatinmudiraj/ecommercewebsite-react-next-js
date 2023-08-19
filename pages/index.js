import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from '@/components/nav'
import Layout from '@/components/layout'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session} = useSession();
  // if(!session) return;
  return<Layout>
    <div className='text-blue-900 flex justify-between'>
      <h2>
      Hello, {session?.user?.name}
      </h2>
      <div className='flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden'>
      <img src={session?.user?.image} alt='Profile image' className='w-6 h-6'/>
      <span className='py-1 px-2'>
      {session?.user?.name}
      </span>
      </div>
    </div>
  </Layout>
}
