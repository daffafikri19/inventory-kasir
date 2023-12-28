"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { CircleDashedIcon, Plus } from "lucide-react"
import { useState } from "react"

export const Actions = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    const addBooth = async () => {
        setLoading(true)
        try {
            await axios.post('/api/booth/create', {
                location: location
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(response => {
                console.log(response.data)
                toast({
                    title: response.data.message
                });
                setLoading(false)
                setOpenDialog(false);
                window.location.reload();
            });
        } catch (error : any) {
            if(error) {
                toast({
                    title: error.message,
                    description: error.response.data.message ? error.response.data.message : null,
                    variant: 'destructive'
                });
                setLoading(false)
            }
        } 
    }

    return (
        <div className="w-full h-full px-4">
            <div className="w-full flex items-center justify-end">
                <Button onClick={() => setOpenDialog(true)}>Tambah Booth <Plus className='w-4 h-4 ml-4' /></Button>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Booth</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        addBooth();
                    }}>
                        <div className="w-full mt-5">
                            <Label>Lokasi</Label>
                            <Input type="text" placeholder="misal: Pondok Rejeki, Kotabumi"
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value)
                                }}
                            />
                        </div>
                        <div className="mt-10 flex items-center justify-end">
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <CircleDashedIcon className="animate-spin w-4 h-4" />
                                ) : (
                                    "Simpan"
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}