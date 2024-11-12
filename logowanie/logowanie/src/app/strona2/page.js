"use client"
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';


export default function Home() {
  const pb = new PocketBase('http://192.168.0.104:8080');

  const [user, setuser] = useState(null)

  useEffect(() => {
    setuser(pb.authStore.model)
  }, [])

  return (
    <div>
        {user ? "zalogowany" : "zaloguj sie"}
    </div>
  )
}
