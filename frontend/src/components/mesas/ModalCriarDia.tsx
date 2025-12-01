import { GroupButtons } from "@/core/components/GroupButtons";
import { Input } from "@/core/components/Input";
import { ModalEscructure } from "@/core/components/ModalEstructure";
import { Select } from "@/core/components/Select";
import { div } from "framer-motion/client";
import { X } from "lucide-react";

interface ModalCriarDiaProps{
    close: () => void,
}
export function ModalCriarDia({ close }: ModalCriarDiaProps)
{
    return(
        <>
            <ModalEscructure children={
                    <div className="bg-white/50 min-w-[50%] min-h-[50%] rounded-3xl p-3 border-[2px] border-white/30">
                        <div className="flex flex-row justify-between p-2">
                            <span className="text-black text-[20px] font-bold">Configuração</span>
                            <X 
                                className="cursor-pointer" 
                                onClick={close} 
                            />
                        </div>
                        <form className="flex flex-col">
                            <Input label={"Tempo entre as reservas"} type="number" />
                            <Input label={"Valor mínimo (Entrada)"} type="number"/>
                            <GroupButtons 
                                cancelOnClick={close} 
                            />
                        </form>
                    </div>
            } />
        </>
    )
}