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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import PocketBase from 'pocketbase';
import { Switch } from "@/components/ui/switch";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Deleteitem from "@/components/deleteitem";
import EditItem from "@/components/edit";

const pb = new PocketBase('http://172.16.15.135:8080/');

export default function Home() {

  const [games,setgames] = useState(null) 
  const [dane,setdane] = useState({nazwa: null,opis: null,cena:null,dostepnosc:false})
  const [zdjecia,setzdjecia] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);


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

  const deleted = (id)=>{
    setgames((prev)=>(
      prev.filter((el)=>{
        return el.id != id
      }
        )
    ))
    console.log(":dwa")
}
const handleinpitchange = (id, e) => {
  const value = id === "dostepnosc" ? e : e.target.value
  setdane((prev) => ({
    ...prev,
    [id]: value,
  }));
};
const handlesubmit = async ()=>{
  const formData = new FormData()

  formData.append("nazwa",dane.nazwa)
  formData.append("opis",dane.opis)
  formData.append("cena",dane.cena)
  formData.append("dostepnosc",dane.dostepnosc)
  if(zdjecia){
  formData.append("zdjecie", zdjecia)
  }

  try{
    const record = await pb.collection('games').create(formData);
    setgames((prev)=>([
      ...prev,
      record
    ]))
  }catch(error){

  }
  handleClose();
}
const handlezdjecia = (e)=>{
  console.log(e)
  setzdjecia(e.target.files[0])
}

const updated = (item)=>{
  console.log(item)
  var index=null
  var tmpGames = [...games]

  for(let i in games){
    if(games[i].id == item.id){
      index = i
    }
  }

  tmpGames[index] = item
  setgames(tmpGames)
  console.log("index: "+index)
}
const changes = async (item)=>{
  const data={
    dostepnosc:!item.dostepnosc
  }
  const record = await pb.collection("games").update(item.id,data)
  var tmpArr = [...games]
  var index = null
  for(let i in tmpArr){
    if(tmpArr[i].id==record.id){
      index=i
      tmpArr[i] = record
    }
  }
  setgames(tmpArr)
}


  return (
    <div  className='flex w-full justify-center flex-wrap gap-5'>
    <div className='flex w-full justify-center flex-wrap gap-5'>
      {console.log(games)}
     { games && 
     games.map((games)=>(
      <Card className="w-[300px] b-[3px] border-black">
      <CardHeader className="flex m-0 p-0 w-[300px] h-[200px] relative">
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
        <h1 className="text-center">{"Cena: "+games.cena+"zł"}</h1>
        <CardDescription>{games.opis}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex w-[290px] justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger>...</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex">MENU</DropdownMenuLabel>
            <DropdownMenuSeparator  />
            <div className="flex flex-row gap-2">
            <DropdownMenuItem asChild><Deleteitem id={games.id} ondeleted={deleted}/></DropdownMenuItem>
            <DropdownMenuItem asChild><EditItem item={games} onupdated={updated}/></DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
          <h1>Dostępność: <Switch checked={games.dostepnosc} onCheckedChange={()=> { changes(games) }}/></h1>
        </div>
      </CardFooter>
    </Card>
         ))
}
    </div>
    <Card className="border-black">
      <CardContent>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger onClick={handleOpen}><Plus size={300}/></SheetTrigger>
        <SheetContent key={"right"}>
        <div className='mt-5 flex flex-col w-full items-center flex-wrap gap-5'>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="nazwa">Nazwa</Label>
          <Input onChange={(e)=> {handleinpitchange("nazwa",e)}} type="text" id="nazwa" placeholder="Nazwa" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="opis">Opis</Label>
          <Input onChange={(e)=> {handleinpitchange("opis",e)}} type="text" id="opis" placeholder="Opis" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="cena">Cena</Label>
          <Input onChange={(e)=> {handleinpitchange("cena",e)}} type="number" id="cena" placeholder="Cena" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="dostepnosc">Dostepnosc</Label>
          <Switch onCheckedChange={(checked) => handleinpitchange("dostepnosc", checked)} id="dostepnosc" placeholder="Dostepnosc"/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="zdjecie">Zdjęcie</Label>
          <Input onChange={(e)=> {handlezdjecia(e)}}  type="file" id="zdjecie" placeholder="Zdjęcie" />
        </div>
        <Button onClick={handlesubmit} >Dodaj</Button>
      </div>
        </SheetContent>
      </Sheet>
      </CardContent>
    </Card>
    </div>
  );
}
