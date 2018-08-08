import { Component, OnInit, ViewChildren,} from '@angular/core';
import { FindMainComponent } from '../find-main/find-main.component';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-find-panel',
  templateUrl: './find-panel.component.html',
  styleUrls: ['./find-panel.component.css']
})
export class FindPanelComponent implements OnInit, AfterViewInit {
  @ViewChildren(FindMainComponent) fmc: FindMainComponent
  constructor(
    
  ) {
    
   }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log(this.fmc)
  }

}