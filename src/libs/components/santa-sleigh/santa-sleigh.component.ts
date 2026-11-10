import { Component, input } from '@angular/core';

import { REINDEER_OFFSETS_X } from '@libs/constants/landscape.constants';

@Component({
  selector: 'app-santa-sleigh',
  templateUrl: './santa-sleigh.component.html',
  styleUrl: './santa-sleigh.component.scss',
  host: { '[class.is-golden]': 'isGolden()' },
})
export class SantaSleighComponent {
  /** A glowing gold sleigh instead of a dark silhouette. */
  readonly isGolden = input(false);

  readonly reindeerOffsets = REINDEER_OFFSETS_X;
}
