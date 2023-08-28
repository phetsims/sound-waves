// Copyright 2022-2023, University of Colorado Boulder
/**
 * View for the reflection screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Shape } from '../../../kite/js/imports.js';
import { Node, Rectangle } from '../../../scenery/js/imports.js';
import SoundWavesConstants from '../common/SoundWavesConstants.js';
import ReflectionControlPanel from '../common/view/ReflectionControlPanel.js';
import SoundModeControlPanel from '../common/view/SoundModeControlPanel.js';
import soundWaves from '../soundWaves.js';
import SoundScreenView from '../common/view/SoundScreenView.js';
import ReflectionModel from '../reflection/ReflectionModel.js';

export default class ReflectionView extends SoundScreenView {

  // control panel for the angle and position of the reflection wall
  private readonly reflectionControlPanel: ReflectionControlPanel;

  // control panel for controlling wether the speaker emits waves continuously or pulses
  private readonly soundModeControlPanel: SoundModeControlPanel;

  // rectangle representing the reflection wall
  private readonly reflector: Rectangle;

  // container for the reflector, needed for rotation
  private readonly reflectorContainer: Node;

  public constructor( model: ReflectionModel ) {
    super( model );

    this.reflectionControlPanel = new ReflectionControlPanel( model, this.contolPanelAlignGroup );

    this.soundModeControlPanel = new SoundModeControlPanel( model, this.contolPanelAlignGroup );

    this.reflector = new Rectangle( 0, 0, SoundWavesConstants.WAVE_AREA_WIDTH * 2, 4, {
      fill: '#f3d99b',
      stroke: 'black',
      lineWidth: 1
    } );

    this.reflector.setY( model.modelViewTransform!.modelToViewY( SoundWavesConstants.WAVE_AREA_WIDTH ) );

    model.wallAngleProperty.link( prop => {
      this.reflector.setRotation( -prop );
      this.canvasNode.setWallAngle( prop );
    } );

    this.reflectorContainer = new Node();
    this.reflectorContainer.addChild( this.reflector );
    this.reflectorContainer.setClipArea( Shape.rect( model.modelViewTransform!.modelToViewX( 0 ), model.modelViewTransform!.modelToViewY( 0 ), model.modelViewTransform!.modelToViewDeltaX( SoundWavesConstants.WAVE_AREA_WIDTH ), model.modelViewTransform!.modelToViewDeltaY( SoundWavesConstants.WAVE_AREA_WIDTH ) ) );

    model.wallPositionXProperty.link( prop => {
      this.reflector.setX( model.modelViewTransform!.modelToViewX( prop ) );
      this.canvasNode.setWallPositionX( model.modelToLatticeTransform.modelToViewX( prop ) );
    } );

    this.addChild( this.reflectorContainer );

    this.reflectionControlPanel.mutate( {
      right: this.layoutBounds.maxX - SoundWavesConstants.SCREEN_VIEW_X_MARGIN,
      top: this.controlPanel.bottom + SoundWavesConstants.CONTROL_PANEL_SPACING
    } );

    this.controlPanelContainer.addChild( this.reflectionControlPanel );

    this.soundModeControlPanel.mutate( {
      right: this.layoutBounds.maxX - SoundWavesConstants.SCREEN_VIEW_X_MARGIN,
      top: this.reflectionControlPanel.bottom + SoundWavesConstants.CONTROL_PANEL_SPACING
    } );

    this.controlPanelContainer.addChild( this.soundModeControlPanel );
  }
}

soundWaves.register( 'ReflectionView', ReflectionView );