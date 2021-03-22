import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Publication } from './publication.model';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders ( {'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = 'http://localhost:3000/publications';


  selectedUser: User = {
    username: '',
    email: '',
    password: ''
  };



  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods
 listePublication(): Observable<Publication[]>{
   return this.http.get<Publication[]>(this.apiURL);
 }
ajouterPublication(publ : Publication) : Observable<Publication>{
  return this.http.post<Publication>(this.apiURL,publ,httpOptions);
}
supprimerPublication(id:string){
  const url=`${this.apiURL}/${id}`;
  return this.http.delete(url,httpOptions);}

//auth http Methods
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/signup',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/users/login', authCredentials,this.noAuthHeader);
  }

  /*getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/publications');
  }*/


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
