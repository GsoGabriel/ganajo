import axios, { AxiosResponse } from "axios";
import { ClienteDTO } from "../DTOs/Cliente";
import { Bairro } from "../DTOs/Bairro";
import { toast } from "react-toastify";

const isLocalTest = true;

const getBaseUrl = () => {
  return isLocalTest ? 'http://localhost:5022/' : 'https://ganajoapi-s3e6uywyma-uc.a.run.app/'
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
export const getBairrosAxiosConfig = async () => {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}postalcodes/`
    };
    const response: AxiosResponse<Bairro[]> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error) {
    console.log(error);
    throw new Error('Erro no get de bairros');
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