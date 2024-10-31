"use client"
import PocketBase from 'pocketbase';
import Image from 'next/image';
import { useEffect,useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Timer } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import  Deleteitem  from '@/components/deleteitem';
import EditItem from '@/components/edit';

const pb = new PocketBase('http://172.16.15.135:8080');


export default function Home() {
  
const [samochody,setsamochody] = useState(null)
const [dane,setdane] = useState({marka: null,model: null,czas_parkowania:null})
const [zdjecia,setzdjecia] = useState(null)

  useEffect(()=>{
    
    const getData = async ()=>{
      try{
        const records = await pb.collection('samochody').getFullList({
          sort: '-created',
      });
      console.log(records)
      setsamochody(records)
      }
      catch(error){
        console.log(error)
      }
      finally{

      }
    }

    getData()
  },[])
  
  const handleinpitchange = (id, e)=>{
  setdane((prev)=>({
    ...prev,
    [id]: e.target.value
  }))

  console.log(dane)
  }


  const handlesubmit = async ()=>{
    const formData = new FormData()

    formData.append("marka",dane.marka)
    formData.append("model",dane.model)
    formData.append("czas_parkowania",dane.czas_parkowania)
    formData.append("zdjecie", zdjecia)


    try{
      const record = await pb.collection('samochody').create(formData);
      setsamochody((prev)=>([
        ...prev,
        record
      ]))
    }catch(error){

    }

  }

  const handlezdjecia = (e)=>{
    console.log(e)
    setzdjecia(e.target.files[0])
  }

  const deleted = (id)=>{
      setsamochody((prev)=>(
        prev.filter((el)=>{
          return el.id != id
        }
          )
      ))
  }

  const updated = (item)=>{
    console.log(item)
    var index=null
    var tmpSamochody = [...samochody]

    for(let i in samochody){
      if(samochody[i].id == item.id){
        index = i
      }
    }

    tmpSamochody[index] = item
    setsamochody(tmpSamochody)
    console.log("index: "+index)
  }

  return (
    <div>
<div className='flex w-full justify-center flex-wrap gap-5'>
{
  samochody && 

  samochody.map((samochody)=>(
    <Card className="w-[400px] border-[3px]">
    <CardTitle className='text-center'>{samochody.marka}</CardTitle>
    <CardDescription className='text-center'>{samochody.model}</CardDescription>
    <CardContent className="m-0 p-0 w-[390px] h-[200px] relative">
    <Image
    src={pb.files.getUrl(samochody, samochody.zdjecie)}
    alt={samochody.zdjecie}
    objectFit='cover'
    fill={true}
    className='rounded-md'
    />
    </CardContent>
    <CardFooter>
      <div className='w-full flex justify-between'>
        <div className='mt-3 flex flex-row gap-1'>
          <Deleteitem id={samochody.id} ondeleted={deleted}/>
          <EditItem item={samochody} onupdated={updated}/>
          </div>
        <div className='flex justify-center mt-5'>
        <Timer/>
        <p>Czas parkowania: </p>
        {samochody.czas_parkowania+"min"}
        </div>
      </div>
    </CardFooter>
   </Card>
  ))

}
</div>

      <div className='mt-5 flex flex-col w-full items-center flex-wrap gap-5'>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="marka">Marka</Label>
          <Input onChange={(e)=> {handleinpitchange("marka",e)}} type="text" id="marka" placeholder="Marka" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="model">Model</Label>
          <Input onChange={(e)=> {handleinpitchange("model",e)}} type="text" id="model" placeholder="Model" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="czas_p">Czas Parkowania</Label>
          <Input onChange={(e)=> {handleinpitchange("czas_parkowania",e)}} type="number" id="czas_parkowania" placeholder="Czas Parkowania" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="zdjecie">Zdjęcie</Label>
          <Input onChange={(e)=> {handlezdjecia(e)}} type="file" id="zdjecie" placeholder="Zdjęcie" />
        </div>
        <Button onClick={handlesubmit}>Dodaj</Button>
      </div>

    </div>
  );
}
