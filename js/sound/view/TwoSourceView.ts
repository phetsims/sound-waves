// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * View for the two source screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Image } from '../../../../scenery/js/imports.js';
import listenerImage from '../../../images/girl_png.js';
import SoundConstants from '../../common/SoundConstants.js';
import MovableNode from '../../common/view/MovableNode.js';
import SpeakerNode from '../../common/view/SpeakerNode.js';
import sound from '../../sound.js';
import TwoSourceModel from '../model/TwoSourceModel.js';
import SoundScreenView from './SoundScreenView.js';

class TwoSourceView extends SoundScreenView {
  constructor( model ) {
    assert && assert( model instanceof TwoSourceModel, 'invalid model' );
    super( model );

    // Second speaker
    const bounds = new Bounds2( model.speaker1Position.x, 0, 1, model.getWaveAreaBounds().height );
    const speaker = new SpeakerNode( model.oscillatorProperty );
    this.speakerNode2 = new MovableNode( model.speaker2PositionProperty, bounds, model.modelViewTransform, speaker );
    speaker.setRightCenter( new Vector2( SoundConstants.SPEAKER_OFFSET, 0 ) );
    this.addChild( this.speakerNode2 );

    // Listener
    const child = new Image( listenerImage );
    const listenerBounds = new Bounds2( SoundConstants.LISTENER_BOUNDS_X.min, child.height, SoundConstants.LISTENER_BOUNDS_X.max, model.getWaveAreaBounds().height - child.bottom );
    this.listener = new MovableNode( model.listenerPositionProperty, listenerBounds, model.modelViewTransform, child );
    child.setCenter( new Vector2( 0, 0 ) );
    this.addChild( this.listener );

    model.speaker2PositionProperty.link( value => {
      this.canvasNode.source2PositionY = model.modelToLatticeTransform.modelToViewY( value.y );
    } );
  }
}

sound.register( 'TwoSourceView', TwoSourceView );
export default TwoSourceView;