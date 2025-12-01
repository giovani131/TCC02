import { GroupButtons } from "@/core/components/GroupButtons";
import { Input } from "@/core/components/Input";
import { IReservePayload } from "@/models/Payment";
import { createProcess } from "@/services/payment.services";
import { useParams } from "next/navigation";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function Reserve()
{
    const { register, handleSubmit, reset } = useForm<IReservePayload>()
    const route = useRouter()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const  id_estabelecimento  = params.id_estabelecimento
    const onSubmit = async (data: IReservePayload) => {
        setIsLoading(true)
        if (data.data_solicitado_string === "hoje") {
          const hoje = new Date();
          const yyyy = hoje.getFullYear();
          const mm = String(hoje.getMonth() + 1).padStart(2, "0");
          const dd = String(hoje.getDate()).padStart(2, "0");

          data.data_solicitado = `${yyyy}-${mm}-${dd}`; // formato ideal p/ BD
        }
        else{
          const hoje = new Date();
          const amanha = new Date();

          amanha.setDate(hoje.getDate() + 1);

          const yyyy = amanha.getFullYear();
          const mm = String(amanha.getMonth() + 1).padStart(2, "0");
          const dd = String(amanha.getDate()).padStart(2, "0");

          data.data_solicitado = `${yyyy}-${mm}-${dd}`;
        }
        if(data.tipo_string  === "almoco")
          data.tipo = 1 
        else
          data.tipo = 2

        data.estabelecimento_id = Number(id_estabelecimento)
        const response = await createProcess(data)
        if(response.ok)
          route.push("/ReservaConcluida")
        console.log(response);
        setIsLoading(false)
    }

    return(
        <>
        <form id="panel-reserva" role="tabpanel" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-lg font-semibold">Reserva</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Input label={"Quantidade de pessoas"} register={register("quantidade_pessoas")}/>
              </div>
              <div className="flex flex-col">
                <Input label={"Nome do Responsável"} register={register("nome_responsavel")} />
              </div>
              <div className="flex flex-col sm:col-span-2">
                <Input label={"Telefone do Responsável"} register={register("telefone_responsavel")}/>
              </div>
              <div className="flex flex-col sm:col-span-2">
                <Input label={"Email do responsável"} register={register("email_responsavel")} />
              </div>
              <div className="flex flex-col sm:col-span-2">
                <Input label={"Observacao"} register={register("observacao")} placeholder="Caso necessite de um horario especifico"/>
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2 p-3">
                <span className="font-medium text-gray-800 text-sm">Data desejada</span>

                <div className="flex flex-row gap-4">

                  {/* Hoje */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="hoje"
                      className="peer hidden"
                      {...register("data_solicitado_string")}
                    />
                    <div className="
                      w-4 h-4 rounded-full border border-gray-400 bg-white
                      peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition
                    "></div>
                    <span className="text-sm text-gray-700 peer-checked:text-indigo-600">
                      Hoje
                    </span>
                  </label>

                  {/* Amanhã */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="amanha"
                      className="peer hidden"
                      {...register("data_solicitado_string")}
                    />
                    <div className="
                      w-4 h-4 rounded-full border border-gray-400 bg-white
                      peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition
                    "></div>
                    <span className="text-sm text-gray-700 peer-checked:text-indigo-600">
                      Amanhã
                    </span>
                  </label>

                </div>
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2 p-3">
                <span className="font-medium text-gray-800 text-sm">Horario</span>

                <div className="flex flex-row gap-4">

                  {/* Hoje */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="almoco"
                      className="peer hidden"
                      {...register("tipo_string")}
                    />
                    <div className="
                      w-4 h-4 rounded-full border border-gray-400 bg-white
                      peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition
                    "></div>
                    <span className="text-sm text-gray-700 peer-checked:text-indigo-600">
                      Almoco
                    </span>
                  </label>

                  {/* Amanhã */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="janta"
                      className="peer hidden"
                      {...register("tipo_string")}
                    />
                    <div className="
                      w-4 h-4 rounded-full border border-gray-400 bg-white
                      peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition
                    "></div>
                    <span className="text-sm text-gray-700 peer-checked:text-indigo-600">
                      Janta
                    </span>
                  </label>

                </div>
              </div>

              <div className="flex flex-col gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <span className="font-semibold text-gray-800 text-sm">
                  Horários disponíveis para reserva
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-gray-700 text-sm">
                    Segunda a Sexta
                  </span>
                  <ul className="ml-3 list-disc text-xs text-gray-600">
                    <li>Almoço: <span className="font-semibold text-gray-800">12:00 às 15:00</span></li>
                    <li>Jantar: <span className="font-semibold text-gray-800">18:00 às 21:00</span></li>
                  </ul>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-gray-700 text-sm">
                    Sábado, Domingo e Feriados
                  </span>
                  <ul className="ml-3 list-disc text-xs text-gray-600">
                    <li>Almoço: <span className="font-semibold text-gray-800">12:00 às 14:00</span></li>
                    <li>Jantar: <span className="font-semibold text-gray-800">19:00 às 23:00</span></li>
                  </ul>
                </div>
                <span className="text-[11px] text-gray-500 mt-2">
                  * Horários sujeitos à disponibilidade. A confirmação será enviada após análise do restaurante.
                </span>
              </div>
            </div>
            <GroupButtons isLoading={isLoading} saveLabel="Solicitar Reserva" cancelLabel="Redefinir" cancelOnClick={() => reset()}/>
          </form>
        </>
    )
}