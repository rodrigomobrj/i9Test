import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from "@angular/router";
import {LoginService} from "../../../login/services/login/login.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  pages = [
    {title: "Nova Cirurgia", url: 'main/new-surgery'},
  ];
  selectedPath = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}

  goToRoute(urlParams: string[]) {
    this.router.navigate(urlParams).then();
  }

  logout() {
    this.loginService.logout().pipe(take(1)).subscribe(data => {
      this.goToRoute(['']);
    })
  }

}
