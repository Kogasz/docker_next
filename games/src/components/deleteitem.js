import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import PocketBase from 'pocketbase';
  
  export default function Deleteitem({id, ondeleted}) {
    const pb = new PocketBase('http://172.16.15.135:8080/');


    const handledelete = async ()=>{
        console.log(id)
        try{
            await pb.collection('games').delete(id);
            ondeleted(id)
        }catch(err){

        }
    }

    return (
<AlertDialog>
  <AlertDialogTrigger onClick={(event) => event.stopPropagation()}>
    <Button variant="destructive"><Trash2 /></Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handledelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )
  }