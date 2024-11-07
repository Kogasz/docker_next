import { Button } from "@/components/ui/button"
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

export function Login_form({onlogin}) {
    const pb = new PocketBase('http://172.16.15.135:8080');


    const [user,setuser] = useState(null)
    const [pass,setpass] = useState(null)
    const [eror,seteror] = useState(false)
    const [open,setopen] = useState(false)


    useEffect(()=>{
        seteror(false)
    },[open])

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
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <h1 className="pl-[80%] underline">Login </h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
        <DialogFooter>
            <div className="flex flex-col">
          <Button onClick={handlesubmit}>Submit</Button>
          {eror && <p className="mt-2">Nie udało się zalogować</p> }
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
