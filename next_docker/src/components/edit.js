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
import { DialogClose } from "@radix-ui/react-dialog"
import { Pencil } from "lucide-react"
import PocketBase from 'pocketbase';
import { useState } from "react"
import Image from "next/image"

export default function EditItem({item,onupdated}) {
    const pb = new PocketBase('http://172.16.15.135:8080');

    const [dane,setdane] = useState({marka: item.marka,model: item.model,czas_parkowania:item.czas_parkowania})
    const [zdjecia,setzdjecia] = useState(null)



    const handlezdjecia = (e)=>{
        console.log(e)
        setzdjecia(e.target.files[0])
      }

    const handleinpitchange = (id, e)=>{
        setdane((prev)=>({
          ...prev,
          [id]: e.target.value
        }))
      
        console.log(dane)
    }
    const handleedit = async ()=>{

        const formData = new FormData()

        formData.append("marka",dane.marka)
        formData.append("model",dane.model)
        formData.append("czas_parkowania",dane.czas_parkowania)
        formData.append("zdjecie", zdjecia)

        const record = await pb.collection('samochody').update(item.id, formData);


        onupdated(record)
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
            <Pencil/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="marka">Marka</Label>
          <Input defaultValue={item.marka} onChange={(e)=> {handleinpitchange("marka",e)}} type="text" id="marka" placeholder="Marka" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="model">Model</Label>
          <Input defaultValue={item.model} onChange={(e)=> {handleinpitchange("model",e)}} type="text" id="model" placeholder="Model" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="czas_p">Czas Parkowania</Label>
          <Input defaultValue={item.czas_parkowania} onChange={(e)=> {handleinpitchange("czas_parkowania",e)}} type="number" id="czas_parkowania" placeholder="Czas Parkowania" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="m-0 p-0 ml-[34%] w-[100px] h-[50px] relative">
        <Image
        src={pb.files.getUrl(item, item.zdjecie)}
        alt={item.zdjecie}
        objectFit='cover'
        fill={true}
        className='rounded-md'
    />
    </div>
          <Label htmlFor="zdjecie">Zdjęcie</Label>
          <Input onChange={(e)=> {handlezdjecia(e)}} type="file" id="zdjecie" placeholder="Zdjęcie" />
        </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
          <Button onClick={handleedit}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
