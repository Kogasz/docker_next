"use client"


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useEffect, useState } from "react"
import PocketBase from 'pocketbase';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Page(){
    const pb = new PocketBase('http://172.16.15.135:8080');

    const [dane,setdane] = useState(null)
    const [wd,setwd] = useState(null)
    const userId =  "31w8agc5hqs4huz"

    useEffect(()=>{
        const geData = async ()=>{
        try{

        const resultList = await pb.collection('chat1').getList(1, 50, {
            sort: "-created"
       });
       setdane(resultList.items)
       console.log(resultList)
    }catch(err){}
    }
    geData()
    },[])

    useEffect(()=>{

    pb.collection('chat1').subscribe('*', function (e) {
        console.log(e.action);
        console.log(e.record);
        
        if(e.action == "create"){
        setdane((prev)=>(
            [...prev,e.record]
        ))
    }
    },);

    return () =>{
        pb.collection('chat1').unsubscribe();
    }
},[])
    
    const handleSend = (e)=>{
        setwd(e.target.value)
    }
    const handleSub = async ()=>{

        const data = {
            "user_id": userId,
            "tresc": wd
        };
        const record = await pb.collection('chat1').create(data);
    }
    const getClasName = (id_msg)=>{

        const classname2 = "flex justify-start"
        if(userId==id_msg){
            const classname1 = "flex justify-end"
            return classname1
        }else return classname2

    }

    return(
    <div className="flex flex-col justify-center items-center">

        <Card className="w-[50%] h-[50vh] border-black overflow-auto ">
        {
            dane &&
            dane.map((wiadomosc)=>(
                <div key={wiadomosc.id} className={getClasName(wiadomosc.user_id)}>
                    <Card className="border-2 border-red-500 w-auto m-2 flex-none">
                        <p className="p-1">{wiadomosc.tresc}</p>
                    </Card>

                </div>

               
            ))

        }
        </Card>
        <div className="flex mt-5 w--[50%] gap-2">
            <Input onChange={(e)=>{handleSend(e)}}></Input>
            <Button onClick={handleSub}>
                <Send></Send>
            </Button>
        </div>
    </div>
    )
}