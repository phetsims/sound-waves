// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * View for the single source view.
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
import sound from '../../sound.js';
import SingleSourceModel from '../model/SingleSourceModel.js';
import SoundScreenView from './SoundScreenView.js';

class SingleSourceView extends SoundScreenView {
  constructor( model ) {
    assert && assert( model instanceof SingleSourceModel, 'invalid model' );
    super( model );

    // Listener
    const bounds = new Bounds2( SoundConstants.LISTENER_BOUNDS_X.min, model.listenerPositionProperty.value.y, SoundConstants.LISTENER_BOUNDS_X.max, 1 );
    const child = new Image( listenerImage );
    const listener = new MovableNode( model.listenerPositionProperty, bounds, model.modelViewTransform, child );
    child.setCenter( new Vector2( 0, 0 ) );
    this.addChild( listener );
  }
}

sound.register( 'SingleSourceView', SingleSourceView );
export default SingleSourceView;