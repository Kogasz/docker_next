import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import PocketBase from 'pocketbase';
  import { useState,useEffect } from "react";
import { Login_form } from "./forml";
  
  
  export default function AvatarDemo({onlogin,user,setuser}) {
    const pb = new PocketBase('http://172.16.15.135:8080');


    useEffect(()=>{
        setuser(pb.authStore.model)
    },[])

    
    const logout = ()=>{
        pb.authStore.clear();
        console.log(pb.authStore)
        setuser(null)
    }


    return (
      <DropdownMenu>
      <DropdownMenuTrigger>
      <Avatar className="w-[100px] h-[100px]">
        <AvatarImage src={user && pb.files.getUrl(user, user.avatar) || 'https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png'} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user ? user.username : "niezalogowany"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ?  
        <DropdownMenuItem className="text-red-500" onClick={logout}>Logout</DropdownMenuItem>
        : <DropdownMenuItem asChild>
            <Login_form onlogin={onlogin}/>
        </DropdownMenuItem> }
      </DropdownMenuContent>
    </DropdownMenu>
    )
  }
  