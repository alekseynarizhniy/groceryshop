import { Component, OnInit } from '@angular/core';
import { GoodsService } from './services/goods.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{

  constructor(private data: GoodsService){
    this.data.getGoodsServer();
  }
}
