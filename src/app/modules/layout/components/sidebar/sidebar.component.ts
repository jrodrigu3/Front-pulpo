import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() openCloseSideBar: boolean = true;

  @ViewChild('sidebarMenu') public rSidenav: any;
  @Output() changeWidthSideBar: EventEmitter<boolean> = new EventEmitter();


  sidebar: {
    name: string,
    childs: {
      icon: string,
      name: string,
      link: string,
    }[]
  }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setSidebar();
  }

  closeMenu(): void {
    this.changeWidthSideBar.emit(!this.openCloseSideBar);
  }

  setSidebar(): void {
    this.sidebar = [{
      name: 'Vehiculos',

      childs: [{
        name: 'View All vehicle',
        icon: 'directions_bus',
        link: 'vehicles',
      }, {
        name: '+ Add a New User',
        icon: 'directions_bus',
        link: 'vehicles/add',

      }],
    }];
  }

}
