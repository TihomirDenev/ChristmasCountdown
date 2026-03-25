import { Component } from '@angular/core';

import { SNOWFLAKE_CHAR, SNOWFLAKE_COUNT } from '@libs/constants/app.constants';

@Component({
  selector: 'app-snowflakes',
  templateUrl: './snowflakes.component.html',
  styleUrl: './snowflakes.component.scss',
})
export class SnowflakesComponent {
  readonly snowflakeChar = SNOWFLAKE_CHAR;
  readonly snowflakes = Array.from({ length: SNOWFLAKE_COUNT }, (_, i) => i + 1);
}
