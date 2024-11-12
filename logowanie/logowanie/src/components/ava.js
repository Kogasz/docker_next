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
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import PocketBase from 'pocketbase';
import { useEffect,useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


export default function Ava_log({}) {
    const pb = new PocketBase('http://172.16.15.135:8080');

    const [user,setuser] = useState(null)
    const [pass,setpass] = useState(null)
    const [eror,seteror] = useState(false)
    const [open,setopen] = useState(false)

    useEffect(()=>{
      setuser(pb.authStore.model)
    },[])

    const handleuser = (e)=>{
        setuser(e.target.value)
    }
    const handlepass = (e)=>{
        setpass(e.target.value)
    }
    const handlesubmit = async ()=>{

        try{
            const authData = await pb.collection('users').authWithPassword(
                user,
                pass,
              
            );
        }catch(err){
           seteror(true)
        }

        onlogin()
    }

    return (
          <div className='flex flex-row justify-between w-full h-[100px] '> 
          {  user &&    console.log(user)}
            <div className="ml-5 flex gap-6">
              <Link href="/">Main</Link>
              <Link href="/strona2">Strona2</Link>
            </div>
            <div>
        <DropdownMenu>
        <DropdownMenuTrigger>
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src={user && pb.files.getUrl(user, user.avatar) || 'https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png'} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
          <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <h1 className="pl-[80%] underline">Login </h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="login">Log in</TabsTrigger>
    <TabsTrigger value="signin">Sign In</TabsTrigger>
  </TabsList>
  <TabsContent value="login">   
  <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>     
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              User
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange = {(e)=>{handleuser(e)}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Password" className="text-right">
              Password
            </Label>
            <Input
              id="Password"
              className="col-span-3"
              onChange = {(e)=>{handlepass(e)}}
              type="password"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Button onClick={handlesubmit}>Submit</Button>
          {eror && <p className="mt-2 text-center text-red-500">Nie udało się zalogować</p> }
          </div>
        </TabsContent>
  <TabsContent value="signin"></TabsContent>
</Tabs>
      </DialogContent>
    </Dialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
            </div>
          </div>
    )
  }
  