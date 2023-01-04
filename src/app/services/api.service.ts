import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL : any = "http://localhost:3000/detailList/"
  
  constructor(private http :HttpClient) {  }
 
  postDetails(data : any){
      return this.http.post(this.URL, data)
  }
  getDetails(){
    return this.http.get(this.URL);
  }
  putDetails(data : any, id: number){
    return this.http.put(this.URL +id, data)
  }
  deleteDetails(id: number){
    return this.http.delete(this.URL +id)
  }
}
