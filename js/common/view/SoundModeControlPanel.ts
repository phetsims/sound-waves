// Copyright 2022, University of Colorado Boulder
/**
 * Controls for the sound mode, whether the speaker emits waves contiously or pulse on button press.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { AlignGroup, Node, Text } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundStrings from '../../SoundStrings.js';
import SoundPanel, { SoundPanelOptions } from './SoundPanel.js';
import ReflectionModel from '../../sound/model/ReflectionModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import SoundControlPanel from './SoundControlPanel.js';

const titleString = SoundStrings.soundModeControlPanel.title;
const continuousOptionString = SoundStrings.soundModeControlPanel.continuous;
const pulseOptionString = SoundStrings.soundModeControlPanel.pulse;
const firePulseString = SoundStrings.soundModeControlPanel.firePulse;

type SelfOptions = {
  yMargin?: number;
};
type SoundModeControlPanelOptions = SelfOptions & SoundPanelOptions;

export default class SoundModeControlPanel extends SoundPanel {

  public constructor( model: ReflectionModel, alignGroup: AlignGroup, providedOptions?: SoundModeControlPanelOptions ) {
    const options = optionize<SoundModeControlPanelOptions, SelfOptions, SoundControlPanel>()( {
      maxWidth: SoundConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, providedOptions );

    const boxText = new Text( titleString );

    const radioButtons = new VerticalAquaRadioButtonGroup<'CONTINUOUS' | 'PULSE'>( model.soundModeProperty, [ {
      createNode: tandem => new Text( continuousOptionString, SoundConstants.CONTROL_PANEL_TEXT_MAX_WIDTH_OPTIONS ),
      value: 'CONTINUOUS'
    }, {
      createNode: tandem => new Text( pulseOptionString, SoundConstants.CONTROL_PANEL_TEXT_MAX_WIDTH_OPTIONS ),
      value: 'PULSE'
    } ], {
      spacing: options.yMargin
    } );

    const container = new Node();
    radioButtons.top = boxText.bottom + SoundConstants.CONTROL_PANEL_SPACING;

    const firePulseButton = new RectangularPushButton( {
      content: new Text( firePulseString ),
      listener: () => model.startPulse()
    } );

    firePulseButton.top = radioButtons.bottom + SoundConstants.CONTROL_PANEL_SPACING;

    container.children = [
      boxText,
      radioButtons,
      firePulseButton
    ];

    firePulseButton.centerX = container.centerX;

    const updateEnabled = () => {
      firePulseButton.setEnabled( model.soundModeProperty.value !== 'CONTINUOUS' && !model.isPulseFiringProperty.value );
    };

    model.soundModeProperty.link( updateEnabled );
    model.isPulseFiringProperty.link( updateEnabled );

    const content = alignGroup.createBox( container );
    content.setXAlign( 'center' );

    super( content, options );
  }
}

sound.register( 'SoundModeControlPanel', SoundModeControlPanel );