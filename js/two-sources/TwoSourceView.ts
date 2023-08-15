// Copyright 2022, University of Colorado Boulder
/**
 * View for the two source screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../dot/js/Bounds2.js';
import Vector2 from '../../../dot/js/Vector2.js';
import { Image, Line, Node } from '../../../scenery/js/imports.js';
import girl_png from '../../images/girl_png.js';
import SoundConstants from '../common/SoundConstants.js';
import MovableNode from '../common/view/MovableNode.js';
import SpeakerNode from '../common/view/SpeakerNode.js';
import sound from '../sound.js';
import TwoSourceModel from '../two-sources/TwoSourceModel.js';
import SoundScreenView from '../common/view/SoundScreenView.js';

export default class TwoSourceView extends SoundScreenView {
  private readonly listener: MovableNode;
  private readonly speakerNode2: MovableNode;

  public constructor( model: TwoSourceModel ) {
    super( model );

    // Second speaker
    const bounds = new Bounds2( model.speaker1Position.x, 0, 1, model.getWaveAreaBounds().height );
    const speaker = new SpeakerNode( model.oscillatorProperty );
    this.speakerNode2 = new MovableNode( model.speaker2PositionProperty, bounds, model.modelViewTransform!, speaker );
    speaker.setRightCenter( new Vector2( SoundConstants.SPEAKER_OFFSET, 0 ) );
    this.addChild( this.speakerNode2 );

    const person = new Image( girl_png, { center: new Vector2( 0, 0 ) } );
    const earLocation = new Vector2( -25, -15 );
    const EAR_MARKING_LINE_LENGTH = 5;
    const earMarking1 = new Line( -EAR_MARKING_LINE_LENGTH, -EAR_MARKING_LINE_LENGTH, EAR_MARKING_LINE_LENGTH, EAR_MARKING_LINE_LENGTH, {
      stroke: 'red', lineWidth: 3
    } );
    const earMarking2 = new Line( EAR_MARKING_LINE_LENGTH, -EAR_MARKING_LINE_LENGTH, -EAR_MARKING_LINE_LENGTH, EAR_MARKING_LINE_LENGTH, {
      stroke: 'red', lineWidth: 3
    } );
    const earMarkingNode = new Node( { center: earLocation, children: [ earMarking1, earMarking2 ] } );
    const personContainer = new Node( { children: [ person, earMarkingNode ], center: new Vector2( -earLocation.x, -earLocation.y ) } );

    const listenerX = personContainer.x + 0.5 * model.getWaveAreaBounds().width + earLocation.x;
    const listenerBounds = new Bounds2( listenerX, 0.5 * person.height, listenerX, model.getWaveAreaBounds().height - 0.5 * person.height );
    this.listener = new MovableNode( model.listenerPositionProperty, listenerBounds, model.modelViewTransform!, personContainer );
    this.addChild( this.listener );

    model.speaker2PositionProperty.link( value => {
      this.canvasNode.source2PositionY = model.modelToLatticeTransform.modelToViewY( value.y );
    } );
  }
}

sound.register( 'TwoSourceView', TwoSourceView );