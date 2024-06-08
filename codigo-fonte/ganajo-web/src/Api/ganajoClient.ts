import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ClienteDTO } from "../DTOs/Cliente";
import { Bairro } from "../DTOs/Bairro";
import { toast } from "react-toastify";
import { Admin } from "../DTOs/Admin";
import { PedidoDTO } from "../DTOs/Pedido";
import { Produto } from "../DTOs/Produto";
import { StatusPedido } from "../DTOs/Status";
import { StatisticsDTO } from './../DTOs/Statistics';
import { FormaPagamento } from './../DTOs/FormaPagamento.ts';

const isLocalTest = false;

const getBaseUrl = () => {
  return isLocalTest ? 'https://localhost:7245/' : 'https://ganajoapi-s3e6uywyma-rj.a.run.app/'
};

const getBaseUrlAuthApi = () => {
  return isLocalTest ? 'https://localhost:7161/' : 'https://ganajoauthapi-s3e6uywyma-rj.a.run.app/'
}

export const getHubUrl = () => {
  return getBaseUrl() + 'realtime';
}

export const BASE_URL = getBaseUrl();
export const BASE_URL_AUTH = getBaseUrlAuthApi();

// PRODUCTS AREA

export function getProductsAxiosConfig(){
    return {
      method: 'GET',
      url: `${BASE_URL}products` ,
      headers: {
        'Access-Control-Allow-Origin': '*', 
      }
    }
}

export function getProductAxiosConfig(id : number){
  return {
    method: 'GET',
    url: `${BASE_URL}product/${id}`
  }
}

export function updateProductAxiosConfig(product: Produto): AxiosRequestConfig {
  return {
    method: 'PUT',
    url: `${BASE_URL}products/${product.id}`,
    data: product
  };
}

// BAIRROS AREA
export const getBairrosAxiosConfig = () => {
  return {
    method: 'GET',
    url: `${BASE_URL}postalcodes`
  };
}

export const getBairroByIdAxiosConfig = async (idBairro: number) => {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}postalcode/${idBairro}`
    };
    const response: AxiosResponse<Bairro> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error) {
    throw new Error('Erro no get de bairro');
  }
}

export const postBairroAxiosConfig = async (bairroData: Bairro) => {
  try {
    const options = {
      method: 'POST',
      url: `${BASE_URL}postalcode/`,
      data: bairroData
    };
    const response: AxiosResponse<Bairro> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error) {
    throw new Error('Erro ao criar bairro');
  }
}

export const deleteBairroByIdAxiosConfig = async (idBairro: number) => {
  try {
    const options = {
      method: 'DELETE',
      url: `${BASE_URL}postalcode/${idBairro}?removido=true`
    };
    const response: AxiosResponse<Bairro> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error) {
    throw new Error('Erro no delete de bairro');
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
      toast.error(error.response?.data, {
        toastId: 'login',
        position: 'top-right',
        autoClose: false,
      });
    }
  }
}
// PEDIDO AREA 

export const getPedidoByUserAxiosRequest = async (admin : boolean, idUser : number | undefined) => {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}orders/${admin}?idUser=${idUser}`
    };
    const response: AxiosResponse<PedidoDTO[]> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error){
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data, {
        toastId: 'getPedidoByUser',
        position: 'top-right',
        autoClose: false,
      });
    }
  }
}

export const updateStatusPedido = async (id : number, status : StatusPedido) => {
  try {
    const options = {
      method: 'PUT',
      url: `${BASE_URL}order/${id}/status/${status}`
    };
    const response: AxiosResponse<boolean> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error){
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data, {
        toastId: 'updateStatusPedido',
        position: 'top-right',
        autoClose: false,
      });
    }
  }
}

// CUSTOMER AREA

export const postPedidoAsync = async (pedido : PedidoDTO) => {
  try {
    const response: AxiosResponse<PedidoDTO> = await axios.post(`${BASE_URL}order`, pedido);
    return response.data;
  } catch(error){
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data, {
        toastId: 'postPedidoAsync',
        position: 'top-right',
        autoClose: false,
      });
    }
  }
}

// STATISTICS AREA

export const getStatistics = async (start : string, end : string, metodo : FormaPagamento) => {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}statistics?start=${start}&end=${end}&tipoPagamento=${metodo.valueOf()}`
    };
    const response: AxiosResponse<StatisticsDTO> = await axios(options?.url ?? '', options);
    return response.data;
  } catch(error){
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data, {
        toastId: 'getStatistics',
        position: 'top-right',
        autoClose: false,
      });
    }
  }
}
