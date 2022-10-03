// Copyright 2020, University of Colorado Boulder

/**
 * @author Piet Goris
 * Model for the measure screen.
 */

import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import sound from '../../sound.js';
import SoundModel from './SoundModel.js';

class MeasureModel extends SoundModel {
  constructor() {
    super( {
      initialAmplitude: 10
    } );

    // @public {Stopwatch}
    this.stopwatch = new Stopwatch( {
      position: new Vector2( 450, 50 ),
      timePropertyOptions: {
        range: new Range( 0, 999.99 )
      },
      isVisible: true
    } );

    // @public - position of the ruler
    this.rulerPositionProperty = new Vector2Property( new Vector2( 200, 460 ) );
  }

  /**
   * Resets the model.
   * @public
   */
  reset() {
    super.reset();
    this.stopwatch.reset();
    this.rulerPositionProperty.reset();
  }
}

sound.register( 'MeasureModel', MeasureModel );
export default MeasureModel;