// Copyright 2022-2025, University of Colorado Boulder

/**
 * Shows the controls for the pressure box.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import PressureModel from '../../air-pressure/PressureModel.js';
import soundWaves from '../../soundWaves.js';
import SoundWavesStrings from '../../SoundWavesStrings.js';
import SoundWavesConstants from '../SoundWavesConstants.js';
import PropertyControlSlider from './PropertyControlSlider.js';
import SoundPanel, { SoundPanelOptions } from './SoundPanel.js';

type SelfOptions = EmptySelfOptions;
export type AirDensityControlPanelOptions = SoundPanelOptions & SelfOptions;

export default class AirDensityControlPanel extends SoundPanel {

  public constructor( model: PressureModel, alignGroup: AlignGroup, providedOptions?: AirDensityControlPanelOptions ) {
    const options = optionize<AirDensityControlPanelOptions, SelfOptions, SoundPanelOptions>()( {
      maxWidth: SoundWavesConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, providedOptions );

    const resetButton = new RectangularPushButton( {
      content: new Text( SoundWavesStrings.airDensityControlPanel.resetStringProperty, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE } ),
      listener: () => {
        model.pressureProperty.set( 1 );
      }
    } );

    const airPressureControl = new PropertyControlSlider( SoundWavesStrings.airDensityControlPanel.titleStringProperty, model.pressureProperty );

    const container = new VBox( {
      spacing: 6,
      children: [
        airPressureControl,
        resetButton
      ]
    } );

    const content = alignGroup.createBox( container );

    super( content, options );
  }
}

soundWaves.register( 'AirDensityControlPanel', AirDensityControlPanel );