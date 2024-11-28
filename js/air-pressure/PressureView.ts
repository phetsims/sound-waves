// Copyright 2022-2024, University of Colorado Boulder
/**
 * View for the pressure screen.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { Image } from '../../../scenery/js/imports.js';
import girl_png from '../../images/girl_png.js';
import SoundWavesConstants from '../common/SoundWavesConstants.js';
import AirDensityControlPanel from '../common/view/AirDensityControlPanel.js';
import SoundScreenView from '../common/view/SoundScreenView.js';
import soundWaves from '../soundWaves.js';
import PressureModel from './PressureModel.js';

export default class PressureView extends SoundScreenView {
  private readonly listener: Image;
  private readonly pressureControlPanel: AirDensityControlPanel;

  public constructor( model: PressureModel ) {
    super( model );

    const center = model.modelViewTransform!.modelToViewPosition( model.listenerPositionProperty.value );
    this.listener = new Image( girl_png, {
      center: center
    } );
    this.addChild( this.listener );

    // control panel for the air density in the box
    this.pressureControlPanel = new AirDensityControlPanel( model, this.contolPanelAlignGroup );

    this.pressureControlPanel.mutate( {
      right: this.layoutBounds.maxX - SoundWavesConstants.SCREEN_VIEW_X_MARGIN,
      top: this.audioControlPanel!.bottom + SoundWavesConstants.CONTROL_PANEL_SPACING
    } );

    this.controlPanelContainer.addChild( this.pressureControlPanel );
  }
}

soundWaves.register( 'PressureView', PressureView );