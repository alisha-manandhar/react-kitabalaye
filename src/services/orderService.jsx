
import http from "./httpService";

const tokenKey = "token";

const apiEndpoint = "http://localhost:8000/api/";


export  function placeOrder(request_data) {
  
  http.setToken(getToken());
  let result =  http.post(apiEndpoint + 'order',request_data)
  return result

}

export  function getRequestedOrder() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'getSellerResponse')
  return result

}

export  function getConfirmList() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'getConfirmList')
  return result

}

export function cancelOrder(id)
{
  console.log(id)
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'cancel-order/' + id)
  return result
}

export function updateSeller(request_data,id)
{
  console.log(id)
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'order/updateSeller/' + id, request_data)
  return result
}

export function confirmSold(request_data,id)
{
  
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'confirmSold/' + id, request_data)
  return result
}

export  function getOrdersToBeResponded() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'getBuyers')
  return result

}

export function getToken() {
    return localStorage.getItem(tokenKey);
  }





