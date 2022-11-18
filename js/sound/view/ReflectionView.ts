// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * View for the reflection screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Shape } from '../../../../kite/js/imports.js';
import { Node, Rectangle } from '../../../../scenery/js/imports.js';
import SoundConstants from '../../common/SoundConstants.js';
import ReflectionControlPanel from '../../common/view/ReflectionControlPanel.js';
import SoundModeControlPanel from '../../common/view/SoundModeControlPanel.js';
import sound from '../../sound.js';
import SoundScreenView from './SoundScreenView.js';

class ReflectionView extends SoundScreenView {
  constructor( model ) {
    super( model );

    // @private - control panel for the angle and position of the reflection wall
    this.reflectionControlPanel = new ReflectionControlPanel( model, this.contolPanelAlignGroup );

    // @private - control panel for controlling wether the speaker emits waves continuously or pulses
    this.soundModeControlPanel = new SoundModeControlPanel( model, this.contolPanelAlignGroup );

    // @private - rectangle representing the reflection wall
    this.reflector = new Rectangle( 0, 0, SoundConstants.WAVE_AREA_WIDTH * 2, 4, {
      fill: '#f3d99b',
      stroke: 'black',
      lineWidth: 1
    } );

    this.reflector.setY( model.modelViewTransform.modelToViewY( SoundConstants.WAVE_AREA_WIDTH ) );

    model.wallAngleProperty.link( prop => {
      this.reflector.setRotation( -prop );
      this.canvasNode.setWallAngle( prop );
    } );

    // @private - container for the reflector, needed for rotation
    this.reflectorContainer = new Node();
    this.reflectorContainer.addChild( this.reflector );
    this.reflectorContainer.setClipArea( Shape.rect( model.modelViewTransform.modelToViewX( 0 ), model.modelViewTransform.modelToViewY( 0 ), model.modelViewTransform.modelToViewDeltaX( SoundConstants.WAVE_AREA_WIDTH ), model.modelViewTransform.modelToViewDeltaY( SoundConstants.WAVE_AREA_WIDTH ) ) );

    model.wallPositionXProperty.link( prop => {
      this.reflector.setX( model.modelViewTransform.modelToViewX( prop ) );
      this.canvasNode.setWallPositionX( model.modelToLatticeTransform.modelToViewX( prop ) );
    } );

    this.addChild( this.reflectorContainer );

    this.reflectionControlPanel.mutate( {
      right: this.layoutBounds.right - SoundConstants.CONTROL_PANEL_MARGIN,
      top: this.controlPanel.bottom + SoundConstants.CONTROL_PANEL_SPACING
    } );

    this.addChild( this.reflectionControlPanel );

    this.soundModeControlPanel.mutate( {
      right: this.layoutBounds.right - SoundConstants.CONTROL_PANEL_MARGIN,
      top: this.reflectionControlPanel.bottom + SoundConstants.CONTROL_PANEL_SPACING
    } );

    this.addChild( this.soundModeControlPanel );
  }
}

sound.register( 'ReflectionView', ReflectionView );
export default ReflectionView;