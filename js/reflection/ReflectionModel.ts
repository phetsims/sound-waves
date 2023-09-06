// Copyright 2022-2023, University of Colorado Boulder
/**
 * Model for the reflection screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../axon/js/NumberProperty.js';
import Property from '../../../axon/js/Property.js';
import Range from '../../../dot/js/Range.js';
import SoundWavesConstants from '../common/SoundWavesConstants.js';
import soundWaves from '../soundWaves.js';
import SoundWavesModel from '../common/model/SoundWavesModel.js';
import Multilink from '../../../axon/js/Multilink.js';

export default class ReflectionModel extends SoundWavesModel {

  // x coordinate of the wall origin position
  public readonly wallPositionXProperty: NumberProperty;

  // angle of the wall in radians
  public readonly wallAngleProperty: NumberProperty;

  // indicates the user selection for the sound mode control setting
  public readonly soundModeProperty: Property<'CONTINUOUS' | 'PULSE'>;

  public constructor() {
    super( {
      hasReflection: true,
      showAudioControls: false
    } );

    this.wallPositionXProperty = new NumberProperty( 1 / 3 * SoundWavesConstants.WAVE_AREA_WIDTH, {
      range: new Range( 1 / 3 * SoundWavesConstants.WAVE_AREA_WIDTH, 2 / 3 * SoundWavesConstants.WAVE_AREA_WIDTH )
    } );

    this.wallAngleProperty = new NumberProperty( Math.PI / 4, {
      range: new Range( 1 / 10 * Math.PI, 1 / 2 * Math.PI )
    } );

    this.soundModeProperty = new Property<'CONTINUOUS' | 'PULSE'>( 'CONTINUOUS', {
      validValues: [ 'CONTINUOUS', 'PULSE' ]
    } );

    // Update the lattice if the wall position or angle are changed, so that the waves update if the sim is paused
    Multilink.multilink( [ this.wallPositionXProperty, this.wallAngleProperty ], () => {
      this.lattice.changedEmitter.emit();
    } );
  }

  public override reset(): void {
    this.wallPositionXProperty.reset();
    this.wallAngleProperty.reset();
    this.soundModeProperty.reset();

    super.reset();
  }
}

soundWaves.register( 'ReflectionModel', ReflectionModel );