import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GithubService } from '../../services/github.service';

import { url } from 'node:inspector';
import { NgFor, NgIf } from '@angular/common';
import { PaginatePipe } from 'ngx-pagination';
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgIf,NgFor,NgxSkeletonLoaderModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  Username: string;
  currentPage = 1;
  totalPages :number;
  limit = 10;
  public searchResults: any;
  public searchResult:any[];
  
  constructor(private githubService:GithubService){  
  
}
  // searchF: FormGroup;
  ngOnInit(): void {
  
  }
  senduser(){
    this.githubService.getUser(this.Username).subscribe((repos : any)=> {
      this.searchResults = repos;
      console.log(this.searchResults);});
    this.githubService.getRepo(this.Username,this.currentPage,this.limit).subscribe((repo : any)=> {
        this.searchResult = repo;
        this.totalPages=this.searchResults.public_repos;
        
        console.log(this.searchResult);});
        
        
  } 
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.senduser();
    }
  }
  resetCurrentPage() {
    // Reset current page to 0 when search button is clicked
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.senduser();
    }
  }
  totalPage(){
    if(this.totalPages<10){
      return 1;
    }
    if(Math.floor(this.totalPages%10)<this.totalPages/10){
      return this.totalPages%10+1;
      
    }
    else{
      this.totalPages=this.totalPages%10;
      return this.totalPages;
    }
  }
}



