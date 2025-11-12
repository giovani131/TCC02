export interface IResponseApi<T = unknown> {
  ok: boolean;        
  status: number;       
  message: string;      
  data?: T;             
}