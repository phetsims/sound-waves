// Copyright 2022-2023, University of Colorado Boulder
/**
 * A node which can be dragged within the given bounds.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import soundWaves from '../../soundWaves.js';
import { Node, DragListener } from '../../../../scenery/js/imports.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import TProperty from '../../../../axon/js/TProperty.js';

export default class MovableNode extends Node {
  private readonly movableDragHandler: DragListener;

  public constructor( positionProperty: TProperty<Vector2>, dragBounds: Bounds2, modelViewTransform: ModelViewTransform2, child: Node ) {
    super();

    // interactivity
    this.cursor = 'pointer';

    // sync with model
    positionProperty.link( position => {
      const viewPosition = modelViewTransform.modelToViewPosition( position );
      this.x = viewPosition.x;
      this.y = viewPosition.y;
    } );

    //TODO https://github.com/phetsims/sound-waves/issues/41 Upgraded from another listener type
    this.movableDragHandler = new DragListener( {
      positionProperty: positionProperty,
      dragBoundsProperty: new Property( dragBounds ), //TODO https://github.com/phetsims/sound-waves/issues/41
      transform: modelViewTransform,
      useParentOffset: true
    } );

    this.children = [ child ];
    this.addInputListener( this.movableDragHandler );
  }

}

soundWaves.register( 'MovableNode', MovableNode );