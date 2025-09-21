// src/remoteService.ts
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:4001";

// Generic GET
export async function remoteGet<T>(path: string): Promise<T> {
  const response: AxiosResponse<T> = await axios.get(path);
  return response.data;
}

// Generic DELETE
export async function remoteDelete<T>(path: string): Promise<T> {
  const response: AxiosResponse<T> = await axios.delete(path);
  return response.data;
}

// Generic POST
export async function remotePost<Req, Res>(path: string, data?: Req): Promise<Res> {
  const response: AxiosResponse<Res> = await axios.post(path, data);
  return response.data;
}
