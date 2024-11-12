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
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Settings from "./settings";

export default function Ava_log() {
  const pb = new PocketBase('http://192.168.0.104:8080');

  const [user, setuser] = useState(null)
  const [username,setusername] = useState(null)
  const [pass, setpass] = useState(null)
  const [eror, seteror] = useState(false)

  useEffect(() => {
    setuser(pb.authStore.model)
  }, [])

  const handlesubmit = async () => {
    try {
      const authData = await pb.collection('users').authWithPassword(
        username,
        pass,
      );
      console.log(pb.authStore)
      seteror(false); // Reset error on successful login
      setuser(pb.authStore.model)
    } catch (err) {
      seteror(true)
    }
  }

  const logout = () => {
    pb.authStore.clear();
    setuser(null)
  }

  return (
    <div className='flex flex-row justify-between w-full h-[100px] '>
      {user && console.log(user)}
      <div className="ml-5 flex gap-6">
        <Link href="/">Main</Link>
        <Link href="/strona2">Strona2</Link>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage
                src={
                  user && pb.files.getUrl(user, user.avatar) ||
                  'https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png'
                }
                alt={user ? user.username : "Avatar"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger >

          <DropdownMenuContent>
            <DropdownMenuLabel>
              {user ? user.username : "Niezalogowany"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {user ? 
              <DropdownMenuItem className="text-red-500 w-full" onClick={logout}>
                <h1 className="ml-6 text-[17px]">Logout</h1>
              </DropdownMenuItem>
             : 
              <Dialog>
                <DialogTrigger  className="w-full">
                Login
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
                          <Label htmlFor="name" className="text-right">User</Label>
                          <Input
                            id="name"
                            className="col-span-3"
                            onChange={(e) => {setusername(e.target.value)}}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="Password" className="text-right">Password</Label>
                          <Input
                            id="Password"
                            className="col-span-3"
                            onChange={(e) => {setpass(e.target.value)}}
                            type="password"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <Button onClick={handlesubmit}>Submit</Button>
                        {eror && <p className="mt-2 text-center text-red-500">Nie udało się zalogować</p>}
                      </div>
                    </TabsContent>

                    <TabsContent value="signin">
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            }
              <DropdownMenuItem className="text-red-500" asChild>
                <Settings setuser={setuser}/>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
