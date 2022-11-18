// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * A node which can be dragged within the given bounds.
 *
 * @author Piet Goris (University of Leuven)
 */

import Property from '../../../../axon/js/Property.js';
import sound from '../../sound.js';
import { Node, DragListener } from '../../../../scenery/js/imports.js';

class MoveableNode extends Node {
  constructor( positionProperty, dragBounds, modelViewTransform, child ) {
    super();

    // interactivity
    this.cursor = 'pointer';

    // sync with model
    positionProperty.link( position => {
      const viewPosition = modelViewTransform.modelToViewPosition( position );
      this.x = viewPosition.x;
      this.y = viewPosition.y;
    } );

    // @private (phet-io)

    // TODO: Upgraded from another listener type
    this.movableDragHandler = new DragListener( {
      positionProperty: positionProperty,
      dragBoundsProperty: new Property( dragBounds ), // TODO
      transform: modelViewTransform,
      useParentOffset: true
    } );

    this.children = [ child ];
    this.addInputListener( this.movableDragHandler );
  }

}

sound.register( 'MoveableNode', MoveableNode );
export default MoveableNode;