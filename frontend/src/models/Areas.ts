export interface IAreaDTO{
    id: string
    nome_area: string
    status: number
    capacidade_mesa: number
    mesas_disponiveis: number
    motivo?: string | ""
}

export interface IAreaRequest{
    nome_area: string
    status: number
    capacidade_mesa: number
    motivo?: string | ""
}

export interface IAreaRequestUpdate{
    id: number
    nome_area: string
    status: number
    capacidade_mesa: number
}