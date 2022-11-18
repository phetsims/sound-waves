// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * View for the measure screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import RulerNode from '../../../../scenery-phet/js/RulerNode.js';
import StopwatchNode from '../../../../scenery-phet/js/StopwatchNode.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import commonGrabSound from '../../../../tambo/sounds/grab_mp3.js';
import commonReleaseSound from '../../../../tambo/sounds/release_mp3.js';
import MovableNode from '../../common/view/MovableNode.js';
import sound from '../../sound.js';
import MeasureModel from '../model/MeasureModel.js';
import SoundScreenView from './SoundScreenView.js';

class MeasureView extends SoundScreenView {
  constructor( model: MeasureModel ) {
    assert && assert( model instanceof MeasureModel, 'invalid model' );
    super( model );

    const rulerLength = model.modelViewTransform.modelToViewDeltaX( 500 );
    const majorTickMarkWidth = rulerLength / ( 10 );
    // Compute tick labels, 1 major tick for every 0.5 unit of length, labels on the ticks that correspond to integer values.
    const majorTickLabels = [];
    const numberOfTicks = 11;
    for ( let i = 0; i < numberOfTicks; i++ ) {
      majorTickLabels[ i ] = ( i % 2 === 0 ) ? ( i / 2 ).toString() : '';
    }

    const soundClipOptions = { initialOutputLevel: 0.4 };
    const grabSound = new SoundClip( commonGrabSound, soundClipOptions );
    soundManager.addSoundGenerator( grabSound, { categoryName: 'user-interface' } );

    const releaseSound = new SoundClip( commonReleaseSound, soundClipOptions );
    soundManager.addSoundGenerator( releaseSound, { categoryName: 'user-interface' } );

    // Ruler
    const rulerNode = new RulerNode( rulerLength, 50, majorTickMarkWidth, majorTickLabels, 'meter', {
      minorTicksPerMajorTick: 4,
      insetsWidth: 60,
      unitsMajorTickIndex: 10,
      unitsSpacing: 8
    } );
    const movableRuler = new MovableNode( model.rulerPositionProperty, this.visibleBoundsProperty.value, ModelViewTransform2.createOffsetScaleMapping( new Vector2( 0, 0 ), 1 ), rulerNode );
    this.addChild( movableRuler );

    // Stopwatch
    const createFormatter = units => StopwatchNode.createRichTextNumberFormatter( {
      showAsDecimal: true,
      units: units
    } );

    const stopwatchNode = new StopwatchNode( model.stopwatch, {
      visibleBoundsProperty: this.visibleBoundsProperty,
      numberDisplayOptions: {
        numberFormatter: createFormatter( 'ms' )
      },
      dragListenerOptions: {
        start: () => {
          grabSound.play();
        },
        end: () => {
          releaseSound.play();
        }
      }
    } );

    this.addChild( stopwatchNode );
  }
}

sound.register( 'MeasureView', MeasureView );
export default MeasureView;