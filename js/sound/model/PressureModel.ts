// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * Model for the pressure screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundModel from './SoundModel.js';

class PressureModel extends SoundModel {
  pressureProperty: NumberProperty;
  public readonly audioControlSettingProperty: Property<'SPEAKER' | 'LISTENER'>;
  listenerPositionProperty: Vector2Property;
  public constructor() {
    super();

    // @public - controls the air pressure in the box.
    this.pressureProperty = new NumberProperty( 1, {
      range: new Range( 0, 1 )
    } );

    // @public - indicates the user selection for the audio control setting
    this.audioControlSettingProperty = new Property( SoundModel.AudioControlOptions.SPEAKER, {
      validValues: SoundModel.AudioControlOptions.VALUES
    } );

    // @public - position of the listener
    this.listenerPositionProperty = new Vector2Property( new Vector2( SoundConstants.WAVE_AREA_WIDTH / 2, SoundConstants.WAVE_AREA_WIDTH / 2 ) );

  }

  /**
   * Resets the model.
   */
  public override reset(): void {
    super.reset();

    this.pressureProperty.reset();
    this.audioControlSettingProperty.reset();
    this.listenerPositionProperty.reset();
  }
}

sound.register( 'PressureModel', PressureModel );
export default PressureModel;