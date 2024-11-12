"use client"
import PocketBase from 'pocketbase';




export default function Home() {
  const pb = new PocketBase('http://192.168.0.104:8080');

  return (
    <div className='w-full'>
      <h1 className='text-center'>Strona głowna</h1>
    </div>
  );
}
