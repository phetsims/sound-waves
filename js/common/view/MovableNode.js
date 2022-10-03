// Copyright 2018-2020, University of Colorado Boulder

/**
 * A node which can be dragged within the given bounds.
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
      modelViewTransform: modelViewTransform,
      useParentOffset: true
    } );

    this.children = [ child ];
    this.addInputListener( this.movableDragHandler );
  }

}

sound.register( 'MoveableNode', MoveableNode );
export default MoveableNode;