
import http from "./httpService";

const tokenKey = "token";

const apiEndpoint = "http://localhost:8000/api/";


export  function addBook(request_data) {
  
  http.setToken(getToken());
  let result =  http.post(apiEndpoint + 'books',request_data)
  return result

}
export  function getBooks() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'books')
  return result

}

export  function getBook(id) {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + "books/" + id)
  return result

}

export  function deleteBook(id) {
  
  http.setToken(getToken());
  let result =  http.delete(apiEndpoint + "books/" + id)
  return result

}

export  function updateBook(request_data,id) {
  console.log(id)
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'books/' + id,request_data)
  return result

}

export  function updateBookImage(request_data,id) {
  
  http.setToken(getToken());
  let result =  http.post(apiEndpoint + 'update-book-image/' + id,request_data)
  return result

}



export  function getAddedBooks() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + "getAddedBooks")
  return result

}








export function getToken() {
  return localStorage.getItem(tokenKey);
}

// const val = {
  
//   getToken,
//   getBooks,
//   getBook,
//   addBook
// };
// export default val;
