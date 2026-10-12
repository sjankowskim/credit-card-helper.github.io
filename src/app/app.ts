import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ToastContainerComponent } from './shared/toast-container/toast-container.component';
import { WipBannerComponent } from './shared/wip-banner/wip-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WipBannerComponent, NavbarComponent, ToastContainerComponent],
  templateUrl: './app.html'
})
export class App {}
