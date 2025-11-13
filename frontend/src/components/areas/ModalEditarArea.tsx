import { GroupButtons } from "@/core/components/GroupButtons";
import { Input } from "@/core/components/Input";
import { ModalEscructure } from "@/core/components/ModalEstructure";
import { Select } from "@/core/components/Select";
import { IAreaDTO, IAreaRequest, IAreaRequestUpdate } from "@/models/Areas";
import { getAreaById, updateArea } from "@/services/area.services";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

interface ModalEditarAreaProps{
    id: string
    close: () => void
}
export function ModalEditarArea({ id, close }: ModalEditarAreaProps)
{   
    const status: Record<string, number> = {
        "Ativo" : 1,
        "Inativo": 2,
        "Bloqueado" : 3,
        "Reforma": 4
    }
    const { register, handleSubmit, reset } = useForm<IAreaDTO>();
    const [isLoadingQuery, setIsLoadingQuery] = useState(false)
    const [isLoadingReq, setIsLoadingReq] = useState(false)
    useEffect(() => {
        async function fetchArea()
        {
            try{
                setIsLoadingQuery(true)
                const res = await getAreaById(id)
                reset(res)
                setIsLoadingQuery(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchArea()

    }, [id, reset])

    const onSubmit = async(data: IAreaRequest) => {
        const payload : IAreaRequestUpdate = {
            id: Number(id),
            nome_area: data.nome_area,
            status: Number(data.status),
            capacidade_mesa: Number(data.capacidade_mesa),
            width: Number(data.width),
            height: Number(data.height)
        }
        setIsLoadingReq(true)
        const res = await updateArea(payload)
        if(res.ok)
            toast.success(res.message)
        else
            toast.error(res.message)
        setIsLoadingReq(false)
    }
    
    return(
        <>
            <ModalEscructure 
                content={
                    <div className="bg-white/50 min-w-[50%] min-h-[50%] rounded-3xl p-3 border-[2px] border-white/30">
                        <div className="flex flex-row justify-between p-2">
                            <span className="text-black text-[20px] font-bold">Editar Área</span>
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
                                isLoading={isLoadingQuery}
                            />
                            <Select 
                                label={"Status"} 
                                options={status} 
                                register={register("status")}
                                isLoading={isLoadingQuery}
                            />
                            <Input 
                                label={"Capacidade Maxima"} 
                                placeholder="Ex: 10" 
                                type="number" 
                                isLoading={isLoadingQuery}
                                register={(register("capacidade_mesa"))}
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
                            <GroupButtons 
                                cancelOnClick={close} 
                                isLoading={isLoadingReq}
                            />
                        </form>
                    </div>
                } 
            />
            <ToastContainer position="top-right" />
        </>
    )
}