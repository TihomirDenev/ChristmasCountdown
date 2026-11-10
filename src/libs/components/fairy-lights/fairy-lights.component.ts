import { Component, inject } from '@angular/core';

import {
  FAIRY_LIGHT_COLORS,
  FAIRY_LIGHT_SAG_PX,
  FAIRY_LIGHT_SCALLOPS,
  FAIRY_LIGHTS_PER_SCALLOP,
} from '@libs/constants/app.constants';
import { buildFairyLightBulbs, buildFairyLightWirePath } from '@libs/helpers/fairy-lights.helpers';
import { SceneEffectsService } from '@libs/services/scene-effects.service';

@Component({
  selector: 'app-fairy-lights',
  templateUrl: './fairy-lights.component.html',
  styleUrl: './fairy-lights.component.scss',
  host: {
    'aria-hidden': 'true',
    '[class.is-disco]': "sceneEffectsService.isActive('disco-lights')",
  },
})
export class FairyLightsComponent {
  readonly sceneEffectsService = inject(SceneEffectsService);

  readonly wirePath = buildFairyLightWirePath(FAIRY_LIGHT_SCALLOPS, FAIRY_LIGHT_SAG_PX);
  readonly bulbs = buildFairyLightBulbs(
    FAIRY_LIGHT_SCALLOPS,
    FAIRY_LIGHTS_PER_SCALLOP,
    FAIRY_LIGHT_SAG_PX,
    FAIRY_LIGHT_COLORS,
  );
}
