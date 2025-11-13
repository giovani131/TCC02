export interface IMesaRequest{
    area_id: string
    codigo_mesa: string
    status: number
    capacidade_maxima: number
    pos_x: number
    pos_y: number
}

export interface IMesaDTO{
    id: number
    codigo_mesa: string
    status: number
    capacidade_maxima: number
    pos_x: number
    pos_y: number
}