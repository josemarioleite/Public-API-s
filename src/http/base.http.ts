import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> { }
}

export abstract class HttpCliente {
  public readonly instance: AxiosInstance

  public constructor () {
    const BASE_URL = process.env.VUE_API_ACCESS

    this.instance = axios.create({
      baseURL: BASE_URL,
    })
  }
}
