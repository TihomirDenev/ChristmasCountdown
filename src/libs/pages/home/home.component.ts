import { Component, inject } from '@angular/core';

import { CountdownService } from '@libs/services/countdown.service';
import { ThemeService } from '@libs/services/theme.service';
import { SnowflakesComponent } from '@libs/components/snowflakes/snowflakes.component';

@Component({
  selector: 'app-home',
  imports: [SnowflakesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly countdownService = inject(CountdownService);
  readonly themeService = inject(ThemeService);
}
