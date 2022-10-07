// Copyright 2022, University of Colorado Boulder

/**
 * @author Piet Goris
 * Model for the reflection screen.
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundModel from './SoundModel.js';

class ReflectionModel extends SoundModel {
  constructor() {
    super( {
      hasReflection: true
    } );

    // @public - x coordinate of the wall origin position
    this.wallPositionXProperty = new NumberProperty( 1 / 3 * SoundConstants.WAVE_AREA_WIDTH, {
      range: new Range( 1 / 3 * SoundConstants.WAVE_AREA_WIDTH, 2 / 3 * SoundConstants.WAVE_AREA_WIDTH )
    } );

    // @public - angle of the wall in radians
    this.wallAngleProperty = new NumberProperty( Math.PI / 4, {
      range: new Range( 1 / 10 * Math.PI, 1 / 2 * Math.PI )
    } );

    // @public - indicates the user selection for the sound mode control setting
    this.soundModeProperty = new Property( SoundModel.SoundModeOptions.CONTINUOUS, {
      validValues: SoundModel.SoundModeOptions.VALUES
    } );
  }

  /**
   * Resets the model.
   * @public
   */
  reset() {
    super.reset();

    this.wallPositionXProperty.reset();
    this.wallAngleProperty.reset();
    this.soundModeProperty.reset();
  }
}

sound.register( 'ReflectionModel', ReflectionModel );
export default ReflectionModel;