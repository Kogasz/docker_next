import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import PocketBase from "pocketbase";
import { useState } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function EditItem({ item, onupdated }) {
    const pb = new PocketBase("http://192.168.0.104:8080");

    const [dane, setdane] = useState({
        nazwa: null,
        opis: null,
        cena: null,
        dostepnosc: null,
    });
    const [zdjecia, setzdjecia] = useState(null);

    const handlezdjecia = (e) => {
        setzdjecia(e.target.files[0]);
    };

    const handleinpitchange = (id, e) => {
        const value = id === "dostepnosc" ? e : e.target.value;
        setdane((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleedit = async () => {
        try {
            const formData = new FormData();
            formData.append("nazwa", dane.nazwa);
            formData.append("opis", dane.opis)
            formData.append("cena", dane.cena);
            formData.append("dostepnosc", dane.dostepnosc);
            if (zdjecia) formData.append("zdjecie", zdjecia);

            const record = await pb.collection("games").update(item.id, formData);
            onupdated(record);
        } catch (error) {
            console.error("Failed to update item:", error);
        }
    };


    return (
<Dialog>
    <DialogTrigger asChild>
        <Button onClick={(e) => e.stopPropagation()}>Edit</Button>
    </DialogTrigger>
    <DialogContent
        onClick={(e) => e.stopPropagation()} // Prevent dialog from closing
        className="sm:max-w-[425px]"
    >
        <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nazwa">Nazwa</Label>
                <Input
                    defaultValue={item.nazwa}
                    onChange={(e) => handleinpitchange("nazwa", e)}
                    type="text"
                    id="nazwa"
                    placeholder="Nazwa"
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="opis">Opis</Label>
                <Input
                    defaultValue={item.opis}
                    onChange={(e) => handleinpitchange("opis", e)}
                    type="text"
                    id="opis"
                    placeholder="Opis"
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="cena">Cena</Label>
                <Input
                    defaultValue={item.cena}
                    onChange={(e) => handleinpitchange("cena", e)}
                    type="number"
                    id="cena"
                    placeholder="Cena"
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="dostepnosc">Dostepnosc</Label>
                <Switch
                    checked={dane.dostepnosc}
                    onCheckedChange={(checked) => handleinpitchange("dostepnosc", checked)}
                    id="dostepnosc"
                />

            </div>
            <div className="m-0 p-0 ml-[34%] w-[100px] h-[50px] relative">
                <Image
                    src={pb.files.getUrl(item, item.zdjecie)}
                    alt={item.zdjecie}
                    objectFit="cover"
                    fill={true}
                    className="rounded-md"
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="zdjecie">Zdjęcie</Label>
                <Input onChange={handlezdjecia} type="file" id="zdjecie" placeholder="Zdjęcie"  />
            </div>
        </div>
        <DialogFooter>
            <Button onClick={handleedit}>Save changes</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>

    );
}
