// Copyright 2022-2023, University of Colorado Boulder
/**
 * View for the single source view.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Vector2 from '../../../dot/js/Vector2.js';
import { Image } from '../../../scenery/js/imports.js';
import girl_png from '../../images/girl_png.js';
import SoundWavesConstants from '../common/SoundWavesConstants.js';
import MovableNode from '../common/view/MovableNode.js';
import soundWaves from '../soundWaves.js';
import IntroModel from './IntroModel.js';
import SoundScreenView from '../common/view/SoundScreenView.js';

export default class IntroView extends SoundScreenView {
  public constructor( model: IntroModel ) {
    super( model );

    // Listener
    const bounds = new Bounds2( SoundWavesConstants.LISTENER_BOUNDS_X.min, model.listenerPositionProperty.value.y, SoundWavesConstants.LISTENER_BOUNDS_X.max, 1 );
    const child = new Image( girl_png, {
      center: new Vector2( 0, 0 )
    } );
    this.addChild( new MovableNode( model.listenerPositionProperty, bounds, model.modelViewTransform!, child ) );
  }
}

soundWaves.register( 'IntroView', IntroView );