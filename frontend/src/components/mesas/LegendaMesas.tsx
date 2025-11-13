export function LegendaMesas()
{
    return(
        <>
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm bg-emerald-100 border border-emerald-300" />
                <span className="text-gray-600">Livre</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm bg-amber-100 border border-amber-300" />
                <span className="text-gray-600">Reservada</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm bg-rose-100 border border-rose-300" />
                <span className="text-gray-600">Ocupada</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-sm border border-dashed border-gray-300 bg-gray-50" />
                <span className="text-gray-600">Vazio</span>
              </div>
            </div>
        </>
    )
}