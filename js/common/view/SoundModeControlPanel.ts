// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * Controls for the sound mode, whether the speaker emits waves contiously or pulse on button press.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import { AlignGroup, Node, Text } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundModel from '../../sound/model/SoundModel.js';
import SoundStrings from '../../SoundStrings.js';
import SoundPanel from './SoundPanel.js';
import ReflectionModel from '../../sound/model/ReflectionModel.js';

const titleString = SoundStrings.soundModeControlPanel.title;
const continuousOptionString = SoundStrings.soundModeControlPanel.continuous;
const pulseOptionString = SoundStrings.soundModeControlPanel.pulse;
const firePulseString = SoundStrings.soundModeControlPanel.firePulse;

class SoundModeControlPanel extends SoundPanel {

  constructor( model: ReflectionModel, alignGroup: AlignGroup, options?: IntentionalAny ) {
    options = merge( {
      maxWidth: SoundConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, options );

    const boxText = new Text( titleString );

    const radioButtons = new VerticalAquaRadioButtonGroup( model.soundModeProperty, [ {
      createNode: tandem => new Text( continuousOptionString, SoundConstants.CONTROL_PANEL_TEXT_MAX_WIDTH_OPTIONS ),
      value: SoundModel.SoundModeOptions.CONTINUOUS
    }, {
      createNode: tandem => new Text( pulseOptionString, SoundConstants.CONTROL_PANEL_TEXT_MAX_WIDTH_OPTIONS ),
      value: SoundModel.SoundModeOptions.PULSE
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
      firePulseButton.setEnabled( model.soundModeProperty.value !== SoundModel.SoundModeOptions.CONTINUOUS && !model.isPulseFiringProperty.value );
    };

    model.soundModeProperty.link( updateEnabled );
    model.isPulseFiringProperty.link( updateEnabled );

    const content = alignGroup.createBox( container );
    content.setXAlign( 'center' );

    super( content, options );
  }
}

sound.register( 'SoundModeControlPanel', SoundModeControlPanel );
export default SoundModeControlPanel;