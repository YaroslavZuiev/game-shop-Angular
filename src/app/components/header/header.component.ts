import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

import {MatButton} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButton,
    NgOptimizedImage,
    MatIcon,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);

  public async logOut(): Promise<void> {
    sessionStorage.removeItem('access_token');
    await this.router.navigate(['sign-in']);
  }

  public async createPost(): Promise<void> {
    await this.router.navigate(['dashboard/create-post']);
  }
}
