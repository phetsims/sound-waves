// Copyright 2022-2024, University of Colorado Boulder
/**
 * Model for the twe source screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../axon/js/Multilink.js';
import Vector2 from '../../../dot/js/Vector2.js';
import Vector2Property from '../../../dot/js/Vector2Property.js';
import SoundWavesModel from '../common/model/SoundWavesModel.js';
import SoundWavesConstants from '../common/SoundWavesConstants.js';
import soundWaves from '../soundWaves.js';

export default class TwoSourceModel extends SoundWavesModel {

  //TODO https://github.com/phetsims/sound-waves/issues/41 This appears elsewhere
  public readonly listenerPositionProperty: Vector2Property;
  public readonly speaker2PositionProperty: Vector2Property;

  public constructor() {
    super( {
      speaker1PositionY: 1 / 3 * SoundWavesConstants.WAVE_AREA_WIDTH,
      hasSecondSource: true
    } );

    this.listenerPositionProperty = new Vector2Property( new Vector2( 1 / 2 * SoundWavesConstants.WAVE_AREA_WIDTH, 1 / 2 * SoundWavesConstants.WAVE_AREA_WIDTH ) );

    this.speaker2PositionProperty = new Vector2Property( new Vector2( this.modelToLatticeTransform.viewToModelX( SoundWavesConstants.SOURCE_POSITION_X ), 2 / 3 * SoundWavesConstants.WAVE_AREA_WIDTH ) );

    Multilink.multilink( [ this.listenerPositionProperty, this.speaker2PositionProperty, this.frequencyProperty, this.amplitudeProperty ],
      ( listenerPosition, speaker2Position, frequency, amplitude ) => {
        this.updateListenerSound();
      } );

    // Update the lattice if speaker 2 position is changed, so that the waves update if the sim is paused
    this.speaker2PositionProperty.link( () => {
      this.lattice.changedEmitter.emit();
    } );
  }

  private updateListenerSound(): void {

    // Determine the difference in distance of the listener's ear to each audio source in units of phase angle of the current frequency
    const distToTopSpeaker = this.listenerPositionProperty.value.distance( this.speaker1Position );
    const distToBottomSpeaker = this.listenerPositionProperty.value.distance( this.speaker2PositionProperty.value );

    const wavelength = 36 / this.frequencyProperty.value;
    const theta = ( ( distToTopSpeaker - distToBottomSpeaker ) / wavelength ) * Math.PI;

    // The amplitude factor for max amplitude is the sum of the two wavefront amplitudes times the cosine of the phase angle
    const amplitudeFactor = this.amplitudeProperty.value * Math.abs( Math.cos( theta ) );

    this.interferenceAmplitudeFactorProperty.set( amplitudeFactor );
  }


  /**
   * Resets the model.
   */
  public override reset(): void {
    super.reset();

    this.isAudioEnabledProperty.reset();
    this.listenerPositionProperty.reset();
    this.speaker2PositionProperty.reset();
  }
}

soundWaves.register( 'TwoSourceModel', TwoSourceModel );