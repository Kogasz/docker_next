"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Settings({setuser}) {
  const pb = new PocketBase('http://192.168.0.104:8080');

  const [zdjecia,setzdjecia] = useState(null)



  const handlezdjecia = async (e)=>{
    setzdjecia(e.target.files[0])
    
    
  }
  const forma = async  ()=>{
  const formData = new FormData()

      formData.append("avatar",zdjecia)
      

      try{
          const record = await pb.collection('users').update(pb.authStore.model.id,formData);
          setuser(pb.authStore.model)
      }catch(err){

      }
    }
  
  return (
    <Dialog>
  <DialogTrigger className="w-full">Settings</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Change Profile Picture</DialogTitle>
    </DialogHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="profile" className="text-right">Avatar</Label>
                            <Input
                              id="profile"
                              className="col-span-3"
                              onChange={(e)=>{handlezdjecia(e)}}
                              type="file"
                            />
                          </div>
                          <Button onClick={forma}>Zamień</Button>
  </DialogContent>
</Dialog>

  )
}
