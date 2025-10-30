import { BatteryFull, Check, ClosedCaption, X } from "lucide-react";

export function Areas()
{
    return(
        <>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <span className="font-bold text-[20px] text-black">Áreas</span>
                    <button className="bg-purple-500 p-2 rounded text-[15px] text-white cursor-pointer hover:bg-purple-600">Criar Área</button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl shadow-xl p-4 transition-transform">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-semibold">Área Externa</span>
                            <span className="flex items-center gap-1 text-green-300 font-medium">
                                <Check size={18} /> Liberado
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                            <span className="text-sm opacity-90">Capacidade total: <strong>12 mesas</strong></span>
                            <span className="text-sm opacity-90">Disponíveis: <strong>3 mesas</strong></span>
                            <span className="text-sm opacity-75">Próxima reserva: 19:30</span>
                        </div>

                        <div className="mt-auto flex justify-center">
                            <button className="cursor-pointer bg-white px-4 py-2 text-purple-800 font-semibold rounded-lg shadow hover:bg-purple-100">
                                Acessar Área
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl shadow-xl p-4 transition-transform">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-semibold">Balcão</span>
                            <span className="flex items-center gap-1 text-blue-300 font-medium">
                                <BatteryFull size={18} /> Lotado
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                            <span className="text-sm opacity-90">Capacidade total: <strong>12 mesas</strong></span>
                            <span className="text-sm opacity-90"><s> Disponíveis: <strong>0</strong></s></span>
                            <span className="text-sm opacity-75">Próxima reserva: 19:30</span>
                        </div>

                        <div className="mt-auto flex justify-center">
                            <button className="cursor-pointer bg-white px-4 py-2 text-purple-800 font-semibold rounded-lg shadow hover:bg-purple-100">
                                Acessar Área
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gradient-to-br from-gray-500 to-gray-700 text-white rounded-2xl shadow-xl p-4 transition-transform">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-lg font-semibold"><s> Área Interna </s></span>
                            <span className="flex items-center gap-1 text-red-400 font-medium">
                                <X size={18} /> Fechado
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                            <span className="text-sm opacity-90">Capacidade total: <strong>12 mesas</strong></span>
                            <span className="text-sm opacity-90">Disponíveis: <strong>3 mesas</strong></span>
                            <span className="text-sm opacity-75">Próxima reserva: 19:30</span>
                            <span className="text-sm opacity-95">Motivo: <strong>Reforma</strong></span>
                        </div>

                        <div className="mt-auto flex justify-center">
                            <button className="cursor-pointer bg-white px-4 py-2 text-purple-800 font-semibold rounded-lg shadow hover:bg-purple-100">
                                Acessar Área
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}