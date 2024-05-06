import axios, { AxiosResponse } from "axios";
import { ClienteDTO } from "../DTOs/Cliente";
import { toast } from "react-toastify";
import { PedidoDTO } from './../DTOs/Pedido';

const isLocalTest = true;

const getBaseUrl = () => {
  return isLocalTest ? 'https://localhost:7245/' : 'https://ganajoapi-s3e6uywyma-uc.a.run.app/'
};

export const BASE_URL = getBaseUrl();

// PRODUCTS AREA

export function getProductsAxiosConfig(){
    return {
      method: 'GET',
      url: `${BASE_URL}products`
    }
}

export function getProductAxiosConfig(id : number){
  return {
    method: 'GET',
    url: `${BASE_URL}product/${id}`
  }
}

// BAIRROS AREA

export function getBairrosAxiosConfig(){
  return {
    method: 'GET',
    url: `${BASE_URL}postalcodes`
  }
}

// CUSTOMER AREA

export const getCustomerByTelephoneNumberAxiosRequest = async (telephone : string) => {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}customer/${telephone}`
    };
    const response: AxiosResponse<ClienteDTO> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error){
    if (axios.isAxiosError(error)) {
      console.log(error)
      toast.error(error.response?.data, {
        toastId: 'getCustomerByTelephone',
        position: 'top-right',
        autoClose: false,
      });
    }
  }
}

// PEDIDO AREA 

// CUSTOMER AREA

export const postPedidoAsync = async (pedido : PedidoDTO) => {
  try {
    const response: AxiosResponse<PedidoDTO> = await axios.post(`${BASE_URL}order`, pedido);
    return response.data;
  } catch(error){
    if (axios.isAxiosError(error)) {
      console.log(error)
      toast.error(error.response?.data, {
        toastId: 'postPedidoAsync',
        position: 'top-right',
        autoClose: false,
      });
    }
  }
}