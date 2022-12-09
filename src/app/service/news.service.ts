import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//commande pour créer un service : ng g s news

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  api_key="2ac57cd18cf74a96b9d02f79a9b499a9";
  constructor(private http : HttpClient) { }
  initSource(){
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key)
  }
  initArticles(){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key)
  }
  getArticlesByid(source : string){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apikey=' + this.api_key)
  }
}
