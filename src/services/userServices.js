import http from "./httpService";

// import { getJwt } from "./authServices"

const apiEndpoint = "http://localhost:8000/api/";
// http.setJwt(getJwt());

export  function login(request_data) {

  let result =  http.post(apiEndpoint + 'login',request_data)
  return result

}

export  function getMe() {
  http.setToken(localStorage.getItem("token"));
  let result =  http.get(apiEndpoint + 'me')
  return result

}

export  function registerUser(request_data) {
  let result = http.post(apiEndpoint + 'register',request_data)
  return result
}

export  function updateContact(request_data) {
  http.setToken(localStorage.getItem("token"));
  let result = http.put(apiEndpoint + 'updateContact',request_data)
  return result
}

export  function updateEmail(request_data) {
  http.setToken(localStorage.getItem("token"));
  let result = http.put(apiEndpoint + 'updateEmail',request_data)
  return result
}


export function logout() {
  http.setToken(localStorage.getItem("token"));
  let result = http.post(apiEndpoint + 'logout')
  return result
}
export function updateProfilePicture(request_data) {
  http.setToken(localStorage.getItem("token"));
  let result = http.post(apiEndpoint + 'updateProfilePicture',request_data)
  return result
}

export function updatePassword(request_data) {
  http.setToken(localStorage.getItem("token"));
  let result = http.put(apiEndpoint + 'updatePassword',request_data)
  return result
}


export function getToken() {
  return localStorage.getItem("token");
}

