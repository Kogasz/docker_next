import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import PocketBase from 'pocketbase';

export function NewUser({setOpen}) {
    const pb = new PocketBase('http://172.16.15.135:8080');
    
    const [eror,seteror] = useState(false)
    const [user,setuser] = useState(null)
    const [pass1,setpass1] = useState(null)
    const [pass2,setpass2] = useState(null)
    const [zdjecia,setzdjecia] = useState(null)


    const handleuser = (e)=>{
        setuser(e.target.value)
    }
    const handlezdjecia = (e)=>{
        setzdjecia(e.target.files[0])
    }
    const handlepass1 = (e)=>{
        setpass1(e.target.value)
    }
    const handlepass2 = (e)=>{
        setpass2(e.target.value)
    }
    const handlesubmit = async ()=>{
        console.log(user)
        console.log(pass1)
        console.log(pass2)

        const formData = new FormData()

        formData.append("username",user)
        formData.append("password",pass1)
        formData.append("passwordConfirm",pass2)
        if(zdjecia){
        formData.append("avatar",zdjecia)
        }

        try{
            const record = await pb.collection('users').create(formData);
            setOpen()
        }catch(err){
           seteror(true)
        }

    }
  return (
    <div>
  <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>     
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              User
            </Label>
            <Input
              id="name"
              className="col-span-3"
              type="text"
              onChange={(e)=>{handleuser(e)}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Password" className="text-right">
              Password
            </Label>
            <Input
              id="Password"
              className="col-span-3"
              type="password"
              onChange={(e)=>{handlepass1(e)}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Password2" className="text-right">
              Password
            </Label>
            <Input
              id="Password2"
              className="col-span-3"
              type="password"
              onChange={(e)=>{handlepass2(e)}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="awatar" className="text-right">
              Avatar
            </Label>
            <Input
              id="awatar"
              className="col-span-3"
              type="file"
              onChange={(e)=>{handlezdjecia(e)}}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Button onClick={handlesubmit}>Submit</Button>
          {eror && <p className="mt-2 text-center text-red-500">Nie udało się zalogować</p> }
          </div>
          </div>
  )
}
