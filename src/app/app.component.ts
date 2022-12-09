import {BreakpointObserver} from "@angular/cdk/layout";
import { Component,ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit,OnInit{
  title = 'demo1';
  public sources : any = [];
  public articles : any = [];
  public selectedNewsChannel : string = "Top 10 Trending news !";
  @ViewChild(MatSidenav) sideNav!:MatSidenav;

  constructor(private observer : BreakpointObserver,
    private cdr : ChangeDetectorRef,
    private newApi : NewsService
    ){

  }
  ngOnInit(): void {
    this.newApi.initArticles()
    .subscribe((res:any)=>{
      console.log(res);
      this.articles = res.articles;
    });
    this.newApi.initSource()
    .subscribe((res:any)=>{
      console.log(res);
      this.sources = res.sources;
    })
  }
  ngAfterViewInit(): void {
    this.sideNav.opened= true;
    this.observer.observe(['(max-width:800px)'])
    .subscribe((res)=>{
      if(res?.matches){
        this.sideNav.mode='over';
        this.sideNav.close();
      }else{
        this.sideNav.mode='side';
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }
  getSources(){

  }
  searchSource(source:any){
    this.newApi.getArticlesByid(source.id)
    .subscribe((res:any)=>{
      this.articles = res.articles;
      this.selectedNewsChannel = source.name;
    })
  }
}
