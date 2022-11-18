// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * Model for the single source scene.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundModel from './SoundModel.js';

class SingleSourceModel extends SoundModel {
  constructor() {
    super();

    // @public - indicates the user selection for the audio control setting
    this.audioControlSettingProperty = new Property( SoundModel.AudioControlOptions.SPEAKER, {
      validValues: SoundModel.AudioControlOptions.VALUES
    } );

    // @public - position of the listener
    this.listenerPositionProperty = new Vector2Property( new Vector2( 1 / 2 * SoundConstants.WAVE_AREA_WIDTH, SoundConstants.WAVE_AREA_WIDTH / 2 ) );
  }

  reset() {
    super.reset();

    this.isAudioEnabledProperty.reset();
    this.audioControlSettingProperty.reset();
    this.listenerPositionProperty.reset();
  }
}

sound.register( 'SingleSourceModel', SingleSourceModel );
export default SingleSourceModel;