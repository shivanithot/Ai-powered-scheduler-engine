  import { Component } from '@angular/core';
  import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';



  @Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, NgIf],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
  })
  export class NavbarComponent {
    showAssistant: boolean = false;

    toggleShowAssistant() {
      console.log(this.showAssistant)
      this.showAssistant = !this.showAssistant;
    }
  }
