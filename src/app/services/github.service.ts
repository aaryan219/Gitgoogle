import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../components/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  limit :10;
  current_page=1;
  start_index=(this.current_page-1)*GithubService.limit;
  end_index=this.start_index+GithubService.limit;
  
  url : string="https://api.github.com/users/";
  static limit: number;
  constructor(private http : HttpClient) { }
  getUser(Username : string){
    //https://api.github.com/users/
    return this.http.get(this.url+Username);
  }
  // getRepo(Username:string,current_page:number,limit:number){
  //   // https://api.github.com/users/9aditya9/repos
  //   return this.http.get(this.url+Username+"/repos"?current_page=${current_page}&limit=${limit});

  // }
  getRepo(
    username: string,
    current_page: number,
    limit: number
  ){
    const userUrl = `${this.url}${username}/repos?page=${current_page}&per_page=${limit}`;
    return this.http.get(userUrl);
  }
  
}
