import { IAreaDTO } from "@/models/Areas";
import { BatteryFull, Check, ClosedCaption, Pencil, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ModalCriarArea } from "./ModalCriarArea";
import { ModalEditarArea } from "./ModalEditarArea";
import { confirmAlert } from "react-confirm-alert";
export function Areas()
{
    const [stateModal, setStateModal] = useState(false)
    const [stateModalUpdate, setStateModalUpdate] = useState(false)
    const [idArea, setIdArea] = useState("")
    const [areas, setAreas] = useState<IAreaDTO[]>([])

    function openModalUpdate(id: string)
    {
        setStateModalUpdate(true)
        setIdArea(id)
    }

    useEffect(() => {
        async function fetchAreas(){
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch("http://localhost:5500/api/area/listar", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json();

            setAreas(data)
        }
        fetchAreas()
    }, [stateModal, stateModalUpdate]);

    function handleDelete() {
    confirmAlert({
      title: "Confirmar exclusão",
      message: "Tem certeza que deseja excluir esta área?",
      buttons: [
        {
          label: "Sim, excluir",
          onClick: () => {
            console.log("Item excluído!");
          },
        },
        {
          label: "Cancelar",
          onClick: () => console.log("Ação cancelada"),
        },
      ],
    });
  }
    return(
        <>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <span className="font-bold text-[20px] text-black">Áreas</span>
                    <button className="bg-purple-500 p-2 rounded text-[15px] text-white cursor-pointer hover:bg-purple-600" onClick={() => setStateModal(true)}>Criar Área</button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {areas.map((item) => {
                    let bgColor = "from-purple-600 to-purple-700";
                    let statusLabel = "Ativo";
                    let statusColor = "text-green-300";
                    let extraInfo = null;

                    switch (item.status) {
                        case 1:
                        bgColor = "from-purple-600 to-purple-700";
                        statusLabel = "Ativo";
                        statusColor = "text-green-300";
                        break;
                        case 2:
                        case 3:
                        bgColor = "from-red-600 to-red-700";
                        statusLabel = item.status === 2 ? "Indisponível" : "Em manutenção";
                        statusColor = "text-red-300";
                        extraInfo = (
                            <span className="text-sm opacity-75 italic">
                            ⚠️ A área está temporariamente fora de uso.
                            </span>
                        );
                        break;
                        case 4:
                        bgColor = "from-gray-600 to-gray-700";
                        statusLabel = "Inativa";
                        statusColor = "text-gray-300";
                        extraInfo = (
                            <>
                            <span className="text-sm opacity-75 italic">
                                Motivo: {item.motivo || "Não informado"}
                            </span>
                            </>
                        );
                        break;
                    }

                    return (
                        <div
                        key={item.id}
                        className={`flex flex-col bg-gradient-to-br ${bgColor} text-white rounded-2xl shadow-xl p-4 transition-transform`}
                        >
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-semibold">{item.nome_area}</span>
                            <span className={`flex items-center gap-1 font-medium ${statusColor}`}>
                            <Check size={18} /> {statusLabel}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                            <span className="text-sm opacity-90">
                            Capacidade total: <strong>{item.capacidade_mesa}</strong>
                            </span>
                            <span className="text-sm opacity-90">
                            Disponíveis: <strong>{item.mesas_disponiveis} mesas</strong>
                            </span>
                            <span className="text-sm opacity-75">Próxima reserva: 19:30</span>
                            {extraInfo}
                        </div>

                        <div className="mt-auto flex justify-between items-center">
                            <button
                            className={`cursor-pointer px-4 py-2 font-semibold rounded-lg shadow  bg-white text-purple-800 hover:bg-purple-100`}
                            >
                            Acessar Área
                            </button>
                            <div className="flex flex-row gap-2">
                                <Trash size={20} color="white" className="cursor-pointer" onClick={handleDelete}/>
                                <Pencil color="white" size={20} className="cursor-pointer" onClick={() => openModalUpdate(item.id)}/>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </div>
            </div>
            {
                stateModal && <ModalCriarArea close={() => setStateModal(false)} />
            }
            {
                stateModalUpdate && <ModalEditarArea id={idArea} close={() => setStateModalUpdate(false)}/>
            }

        </>
    )
}