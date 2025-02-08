// Copyright 2022-2025, University of Colorado Boulder
/**
 * Controls for the sound mode, whether the speaker emits waves contiously or pulse on button press.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import ReflectionModel from '../../reflection/ReflectionModel.js';
import soundWaves from '../../soundWaves.js';
import SoundWavesStrings from '../../SoundWavesStrings.js';
import SoundWavesConstants from '../SoundWavesConstants.js';
import SoundPanel, { SoundPanelOptions } from './SoundPanel.js';

type SelfOptions = {
  yMargin?: number;
};
type SoundModeControlPanelOptions = SelfOptions & SoundPanelOptions;

export default class SoundModeControlPanel extends SoundPanel {

  public constructor( model: ReflectionModel, alignGroup: AlignGroup, providedOptions?: SoundModeControlPanelOptions ) {

    const options = optionize<SoundModeControlPanelOptions, SelfOptions, SoundPanelOptions>()( {
      maxWidth: SoundWavesConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, providedOptions );

    const boxText = new Text( SoundWavesStrings.soundModeControlPanel.titleStringProperty, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE } );

    const radioButtons = new VerticalAquaRadioButtonGroup<'CONTINUOUS' | 'PULSE'>( model.soundModeProperty, [ {
      createNode: () => new Text( SoundWavesStrings.soundModeControlPanel.continuousStringProperty, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE } ),
      value: 'CONTINUOUS'
    }, {
      createNode: () => new Text( SoundWavesStrings.soundModeControlPanel.pulseStringProperty, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE } ),
      value: 'PULSE'
    } ], {
      spacing: options.yMargin
    } );

    const firePulseButton = new RectangularPushButton( {
      content: new Text( SoundWavesStrings.soundModeControlPanel.firePulseStringProperty, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE } ),
      listener: () => model.startPulse()
    } );

    const container = new VBox( {
      children: [
        boxText,
        radioButtons,
        firePulseButton
      ], spacing: SoundWavesConstants.CONTROL_PANEL_SPACING
    } );

    const updateEnabled = () => {
      firePulseButton.setEnabled( model.soundModeProperty.value !== 'CONTINUOUS' && !model.isPulseFiringProperty.value );
    };

    model.soundModeProperty.link( updateEnabled );
    model.isPulseFiringProperty.link( updateEnabled );

    const content = alignGroup.createBox( container );
    // content.setXAlign( 'center' );

    super( content, options );
  }
}

soundWaves.register( 'SoundModeControlPanel', SoundModeControlPanel );