// Copyright 2022-2023, University of Colorado Boulder
/**
 * Model for the single source scene.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Vector2 from '../../../dot/js/Vector2.js';
import Vector2Property from '../../../dot/js/Vector2Property.js';
import SoundWavesConstants from '../common/SoundWavesConstants.js';
import soundWaves from '../soundWaves.js';
import SoundWavesModel from '../common/model/SoundWavesModel.js';

export default class IntroModel extends SoundWavesModel {

  // indicates the user selection for the audio control setting
  public readonly audioControlSettingProperty: Property<'SPEAKER' | 'LISTENER'>;
  public readonly listenerPositionProperty: Vector2Property;

  public constructor() {
    super();

    this.audioControlSettingProperty = new Property( 'LISTENER', {
      validValues: [ 'SPEAKER', 'LISTENER' ]
    } );

    this.listenerPositionProperty = new Vector2Property( new Vector2( 1 / 2 * SoundWavesConstants.WAVE_AREA_WIDTH, SoundWavesConstants.WAVE_AREA_WIDTH / 2 ) );
  }

  public override reset(): void {
    super.reset();

    this.isAudioEnabledProperty.reset();
    this.audioControlSettingProperty.reset();
    this.listenerPositionProperty.reset();
  }
}

soundWaves.register( 'IntroModel', IntroModel );