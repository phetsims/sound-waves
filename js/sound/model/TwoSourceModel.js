// Copyright 2020, University of Colorado Boulder

/**
 * @author Piet Goris
 * Model for the twe source screen.
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundModel from './SoundModel.js';

class TwoSourceModel extends SoundModel {
  constructor() {
    super( {
      speaker1PositionY: 1 / 3 * SoundConstants.WAVE_AREA_WIDTH,
      hasSecondSource: true
    } );


    // @public - whether audio is enabled
    this.isAudioEnabledProperty = new BooleanProperty( false );

    // @public - position of the listener
    this.listenerPositionProperty = new Vector2Property( new Vector2( 1 / 2 * SoundConstants.WAVE_AREA_WIDTH, 1 / 2 * SoundConstants.WAVE_AREA_WIDTH ) );

    // @public - position of the second speaker
    this.speaker2PositionProperty = new Vector2Property( new Vector2( this.modelToLatticeTransform.viewToModelX( SoundConstants.SOURCE_POSITION_X ), 2 / 3 * SoundConstants.WAVE_AREA_WIDTH ) );
  }

  /**
   * Resets the model.
   * @public
   */
  reset() {
    super.reset();

    this.isAudioEnabledProperty.reset();
    this.listenerPositionProperty.reset();
    this.speaker2PositionProperty.reset();
  }
}

sound.register( 'TwoSourceModel', TwoSourceModel );
export default TwoSourceModel;