import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggleTheme() {
    let body = document.body;
    // let searchDiv = document.getElementsByClassName('search');
    document.getElementById('search')!.style.backgroundColor=('#555555');
    document.getElementById('search')!.style.color=('#ffffff');
    body.classList.toggle('dark-mode');
    // searchDiv!.classList.toggle('dark-mode');
  }
}
