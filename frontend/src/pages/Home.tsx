export default function Home() {
  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Meus Dados</h2>
          <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
            <img
              src="https://i.pravatar.cc/100"
              alt="Perfil"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-center mt-2 font-bold">João Silva</h3>
            <p className="text-center text-purple-600 text-sm">Ativo</p>
            <p className="text-sm text-gray-600 mt-4">joao.silva@email.com</p>
            <p className="text-sm text-gray-600">(11) 99999-9999</p>
            <p className="text-sm text-gray-600">Membro desde Janeiro 2024</p>
          </div>

          <button className="w-full border rounded-lg p-2 flex items-center gap-2 mb-2">
            ✏️ Editar Dados
          </button>
          <button className="w-full border rounded-lg p-2 flex items-center gap-2 text-red-600 mb-2">
            🗑 Apagar Conta
          </button>
        </div>

        <button className="w-full bg-purple-500 text-white p-3 rounded-lg">
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">📍 Mapa de restaurantes</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 h-full">
          <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">[Mapa interativo aqui]</p>
          </div>
        </div>
      </main>
    </div>
  );
}
