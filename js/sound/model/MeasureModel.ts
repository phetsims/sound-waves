// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * @author Piet Goris (University of Leuven)
 * Model for the measure screen.
 */

import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import sound from '../../sound.js';
import SoundModel from './SoundModel.js';

class MeasureModel extends SoundModel {
  public readonly stopwatch: Stopwatch;
  public readonly rulerPositionProperty: Vector2Property;

  constructor() {
    super( {
      initialAmplitude: 10
    } );

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
   */
  public override reset(): void {
    super.reset();
    this.stopwatch.reset();
    this.rulerPositionProperty.reset();
  }
}

sound.register( 'MeasureModel', MeasureModel );
export default MeasureModel;