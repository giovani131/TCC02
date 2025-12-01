import { GroupButtons } from "@/core/components/GroupButtons";
import { Input } from "@/core/components/Input";
import { ModalEscructure } from "@/core/components/ModalEstructure";
import { Select } from "@/core/components/Select";
import { IAreaRequest } from "@/models/Areas";
import { createArea } from "@/services/area.services";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

interface ModalCriarArea{
    close: () => void
}
export function ModalCriarArea({close} : ModalCriarArea)
{
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, reset, watch } = useForm<IAreaRequest>()
    const statusValue = watch("status")
    const width = watch("width")
    const height = watch("height")
    const maxMesas = (Number(width) || 0) * (Number(height) || 0)
    const status: Record<string, number> = {
        "Ativo" : 1,
        "Inativo": 2,
        "Reforma" : 3,
        "Bloqueado": 4
    }

    const onSubmit = async (data: IAreaRequest) => {
        setIsLoading(true)
        const res = await createArea(data)
        setIsLoading(false)
        console.log(data)
        if(res.ok)
            toast.success(res.message)
        else
            toast.error(res.message)
        reset()
    }
    return(
        <>
            <ModalEscructure 
                children={
                    <div className="bg-white/50 min-w-[50%] min-h-[50%] rounded-3xl p-3 border-[2px] border-white/30">
                        <div className="flex flex-row justify-between p-2">
                            <span className="text-black text-[20px] font-bold">Criar Área</span>
                            <X 
                                className="cursor-pointer" 
                                onClick={close} 
                            />
                        </div>
                        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                            <Input 
                                label={"Nome da Área"} 
                                placeholder="Ex: Área Externa" 
                                register={register("nome_area")} 
                            />
                            <Select 
                                label={"Status"} 
                                options={status} 
                                register={register("status")}
                            />
                            <Input 
                                label={"Quantidade de espacos na horizontal"} 
                                placeholder="Ex: 10" 
                                type="number" 
                                register={register("width")}
                            />
                            <Input 
                                label={"Quantidade de espacos na vertical"} 
                                placeholder="Ex: 10" 
                                type="number" 
                                register={register("height")}
                            />
                            <Input 
                                label={"Capacidade Maxima de Mesas"} 
                                placeholder="Ex: 10" 
                                type="number" 
                                register={register("capacidade_mesa")}
                                value={maxMesas}
                                disabled={true}
                            />
                            <GroupButtons 
                                isLoading={isLoading}
                                cancelOnClick={close} 
                            />
                        </form>
                    </div>
                } 
            />
            <ToastContainer position="top-right" />
        </>
    )
}