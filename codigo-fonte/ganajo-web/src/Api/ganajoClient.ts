import axios, { AxiosResponse } from "axios";
import { ClienteDTO } from "../DTOs/Cliente";
import { Bairro } from "../DTOs/Bairro";
import { toast } from "react-toastify";
import { Admin } from "../DTOs/Admim";

const isLocalTest = false;

const getBaseUrl = () => {
  return isLocalTest ? 'http://localhost:5022/' : 'https://ganajoapi-s3e6uywyma-uc.a.run.app/'
};

const getBaseUrlAuthApi = () => {
  return isLocalTest ? 'http://localhost:5082/' : 'https://ganajoauthapi-s3e6uywyma-rj.a.run.app/'
}

export const BASE_URL = getBaseUrl();
export const BASE_URL_AUTH = getBaseUrlAuthApi();

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

// LOGIN AREA

export const loginAxiosRequest = async (email: string, senha: string) => {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL_AUTH}login?email=${email}&senha=${senha}`
    };
    const response: AxiosResponse<Admin> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.log(error)
      toast.error(error.response?.data, {
        toastId: 'login',
        position: 'top-right',
        autoClose: false,
      });
    }
  }
}


