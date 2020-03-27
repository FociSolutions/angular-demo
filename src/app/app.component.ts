import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome To Angular Demo';

  constructor(private router: Router) {}

  isLandingPage(): boolean {
    return this.router.url === '/';
  }
}
