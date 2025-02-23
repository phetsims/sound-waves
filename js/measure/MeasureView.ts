// Copyright 2022-2025, University of Colorado Boulder
/**
 * View for the measure screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Vector2 from '../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../phetcommon/js/view/ModelViewTransform2.js';
import RulerNode from '../../../scenery-phet/js/RulerNode.js';
import StopwatchNode from '../../../scenery-phet/js/StopwatchNode.js';
import Text from '../../../scenery/js/nodes/Text.js';
import RectangularPushButton from '../../../sun/js/buttons/RectangularPushButton.js';
import SoundWavesConstants from '../common/SoundWavesConstants.js';
import MovableNode from '../common/view/MovableNode.js';
import SoundScreenView from '../common/view/SoundScreenView.js';
import MeasureModel from '../measure/MeasureModel.js';
import soundWaves from '../soundWaves.js';
import SoundWavesStrings from '../SoundWavesStrings.js';

export default class MeasureView extends SoundScreenView {
  public constructor( model: MeasureModel ) {
    super( model );

    const clearButton = new RectangularPushButton( {
      listener: () => {
        model.clearWaves();
      },
      content: new Text( SoundWavesStrings.measure.clearWavesStringProperty, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE, maxWidth: 180 } ),
      centerX: this.controlPanel.centerX,
      top: this.controlPanel.bottom + SoundWavesConstants.CONTROL_PANEL_SPACING
    } );

    // recenter the clear button if its label string changes
    SoundWavesStrings.measure.clearWavesStringProperty.link( () => {
      clearButton.centerX = this.controlPanel.centerX;
    } );

    this.controlPanelContainer.addChild( clearButton );

    const rulerLength = model.modelViewTransform!.modelToViewDeltaX( 500 );
    const rulerHeight = 50;
    const majorTickMarkWidth = rulerLength / ( 10 );
    // Compute tick labels, 1 major tick for every 0.5 unit of length, labels on the ticks that correspond to integer values.
    const majorTickLabels = [];
    const numberOfTicks = 11;
    for ( let i = 0; i < numberOfTicks; i++ ) {
      majorTickLabels[ i ] = ( i % 2 === 0 ) ? ( i / 2 ).toString() : '';
    }

    // Ruler
    const rulerInsetsWidth = 60;
    const rulerNode = new RulerNode( rulerLength, 50, majorTickMarkWidth, majorTickLabels, SoundWavesStrings.metersStringProperty, {
      minorTicksPerMajorTick: 4,
      insetsWidth: rulerInsetsWidth,
      unitsMajorTickIndex: 10,
      unitsSpacing: 8
    } );
    const rulerDragBounds = new Bounds2( 0, 0, this.visibleBoundsProperty.value.maxX - rulerLength - 2 * rulerInsetsWidth, this.visibleBoundsProperty.value.maxY - rulerHeight );
    const movableRuler = new MovableNode( model.rulerPositionProperty, rulerDragBounds, ModelViewTransform2.createOffsetScaleMapping( new Vector2( 0, 0 ), 1 ), rulerNode );
    this.addChild( movableRuler );

    // Stopwatch
    const createFormatter = ( units: string ) => StopwatchNode.createRichTextNumberFormatter( {
      showAsMinutesAndSeconds: false,
      units: units
    } );

    const stopwatchNode = new StopwatchNode( model.stopwatch, {
      dragBoundsProperty: this.visibleBoundsProperty,
      numberDisplayOptions: {
        numberFormatter: createFormatter( 'ms' )
      }
    } );

    this.addChild( stopwatchNode );
  }
}

soundWaves.register( 'MeasureView', MeasureView );