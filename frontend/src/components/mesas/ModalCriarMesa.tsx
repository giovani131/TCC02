import { GroupButtons } from "@/core/components/GroupButtons";
import { Input } from "@/core/components/Input";
import { ModalEscructure } from "@/core/components/ModalEstructure";
import { Select } from "@/core/components/Select";
import { IMesaRequest } from "@/models/Mesa";
import { createChair } from "@/services/mesa.services";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

interface ModalCriarMesaProps{
    close: () => void,
    pos_x: number
    pos_y: number
}

export function ModalCriarMesa({close, pos_x, pos_y} : ModalCriarMesaProps)
{
    const router = useRouter()
    const { id } = router.query;
    const { register, handleSubmit, reset, watch } = useForm<IMesaRequest>()
    const status: Record<string, number> = {
        "Ativo" : 1,
        "Inativo": 2,
        "Reforma" : 3,
        "Bloqueado": 4
    }
    const onSubmit = async (data: IMesaRequest) => {
        data.area_id = id?.toString()!
        const res = await createChair(data)
        if(res.ok)
            toast.success(res.message)
        else
            toast.error(res.message)
    }
    return(
                <>
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <ModalEscructure 
                children={
                    <div className="bg-white/50 min-w-[50%] min-h-[50%] rounded-3xl p-3 border-[2px] border-white/30">
                        <div className="flex flex-row justify-between p-2">
                            <span className="text-black text-[20px] font-bold">Criar Mesa</span>
                            <X 
                                className="cursor-pointer" 
                                onClick={close} 
                            />
                        </div>
                        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                            <Input 
                                label={"Codigo da Mesa"} 
                                placeholder="Ex: M12"  
                                register={register("codigo_mesa")}
                            />
                            <Select 
                                label={"Status"} 
                                options={status} 
                                register={register("status")}
                            />
                            <Input 
                                label={"Capacidade Maxima"} 
                                placeholder="Ex: 4" 
                                type="number" 
                                register={register("capacidade_maxima")}
                            />
                            <Input 
                                label={"Posicao horizontal"} 
                                placeholder="Ex: 10" 
                                type="number"
                                register={register("pos_x")}
                                value={pos_x} 
                                disabled={true}
                            />
                            <Input 
                                label={"Posicao vertical"} 
                                placeholder="Ex: 10" 
                                type="number" 
                                register={register("pos_y")}
                                value={pos_y}
                                disabled={true}
                            />
                            <GroupButtons 
                                cancelOnClick={close} 
                            />
                        </form>
                    </div>
                } 
            />
            <ToastContainer position="top-right" />
            </div>
        </>
    )
}