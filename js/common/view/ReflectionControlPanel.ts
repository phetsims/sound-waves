// Copyright 2022-2023, University of Colorado Boulder
/**
 * Shows the controls for the reflection wall, its position and rotation.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { AlignGroup, ManualConstraint, Node } from '../../../../scenery/js/imports.js';
import SoundWavesConstants from '../SoundWavesConstants.js';
import soundWaves from '../../soundWaves.js';
import ReflectionModel from '../../reflection/ReflectionModel.js';
import SoundWavesStrings from '../../SoundWavesStrings.js';
import PropertyControlSlider from './PropertyControlSlider.js';
import SoundPanel, { SoundPanelOptions } from './SoundPanel.js';

type SelfOptions = EmptySelfOptions;
type ReflectionControlPanelOptions = SelfOptions & SoundPanelOptions;

export default class ReflectionControlPanel extends SoundPanel {

  public constructor( model: ReflectionModel, alignGroup: AlignGroup, providedOptions?: ReflectionControlPanelOptions ) {

    const options = optionize<ReflectionControlPanelOptions, SelfOptions, SoundPanelOptions>()( {
      maxWidth: SoundWavesConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, providedOptions );

    const wallPositionXControl = new PropertyControlSlider( SoundWavesStrings.reflectionControlPanel.positionSliderStringProperty, model.wallPositionXProperty );
    const wallAngleControl = new PropertyControlSlider( SoundWavesStrings.reflectionControlPanel.rotationSliderStringProperty, model.wallAngleProperty );

    // Vertical layout
    wallAngleControl.top = wallPositionXControl.bottom + options.yMargin;

    const container = new Node();

    container.children = [
      wallPositionXControl,
      wallAngleControl
    ];

    const content = alignGroup.createBox( container );

    super( content, options );

    ManualConstraint.create( this, [ wallPositionXControl, wallAngleControl ], ( wallPositionXControlProxy, wallAngleControlProxy ) => {
      wallAngleControlProxy.centerX = wallPositionXControlProxy.centerX;
    } );
  }
}

soundWaves.register( 'ReflectionControlPanel', ReflectionControlPanel );