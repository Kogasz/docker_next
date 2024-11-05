"use client"
import Image from "next/image";
import { useEffect,useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://172.16.15.135:8080');

export default function Home() {

  const [games,setgames] = useState(null) 


  useEffect(()=>{
   const getData = async ()=>{
    try{
      const records = await pb.collection('games').getFullList({
        sort: '-created',
    });
    setgames(records)
    }
    catch(err){
      console.log(err)
    }
   }
getData()

  },[])


  return (
    <div>
    <div>
     { games && 
     games.map((games)=>(
      <Card className="w-[300px] h-[400px]">
      <CardHeader>
      <Image
          src={pb.files.getUrl(games, games.zdjecie)}
          alt={games.zdjecie}
          objectFit='cover'
          fill={true}
          className='rounded-md'
      />
      </CardHeader>
      <CardContent>
        <CardTitle>{games.nazwa}</CardTitle>
        <CardDescription>{games.opis}</CardDescription>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
         ))
}
    </div>
    </div>
  );
}
