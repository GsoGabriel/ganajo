import axios, { AxiosRequestConfig } from "axios";

const getBaseUrl = () => {
  return 'https://ganajoapi-s3e6uywyma-uc.a.run.app/'
};

export const BASE_URL = getBaseUrl();
export const BASE_API_URL = `${BASE_URL}/api`;

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