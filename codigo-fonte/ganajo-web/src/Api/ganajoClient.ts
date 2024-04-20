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