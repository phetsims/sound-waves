// Copyright 2022, University of Colorado Boulder

/**
 * Shows the controls of the audio, wheter the audio is enabled and if the source is sampled at the source or at the listener.
 */

import merge from '../../../../phet-core/js/merge.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import WaveInterferenceConstants from '../../../../wave-interference/js/common/WaveInterferenceConstants.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundModel from '../../sound/model/SoundModel.js';
import SoundStrings from '../../SoundStrings.js';
import SoundPanel from './SoundPanel.js';

const titleString = SoundStrings.audioControlPanel.title;
const audioEnabledString = SoundStrings.audioControlPanel.audioEnabled;
const speakerAudioString = SoundStrings.audioControlPanel.speaker;
const listenerAudioString = SoundStrings.audioControlPanel.listener;

class AudioControlPanel extends SoundPanel {

  /**
   * @param {SoundModel} model
   * @param {AlignGroup} alignGroup
   * @param {Object} [options]
   */
  constructor( model, alignGroup, options ) {
    options = merge( {
      maxWidth: SoundConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, options );

    const boxText = new Text( titleString );
    const graphCheckbox = new Checkbox(
      model.isAudioEnabledProperty,
      new Text( audioEnabledString, WaveInterferenceConstants.CONTROL_PANEL_TEXT_MAX_WIDTH_OPTIONS ),
      {
        boxWidth: 15
      } );

    graphCheckbox.top = boxText.bottom + SoundConstants.CONTROL_PANEL_SPACING;

    let radioButtons;
    if ( model.audioControlSettingProperty ) {
      radioButtons = new VerticalAquaRadioButtonGroup( model.audioControlSettingProperty, [ {
        createNode: tandem => new Text( speakerAudioString, WaveInterferenceConstants.CONTROL_PANEL_TEXT_MAX_WIDTH_OPTIONS ),
        value: SoundModel.AudioControlOptions.SPEAKER
      }, {
        createNode: tandem => new Text( listenerAudioString, WaveInterferenceConstants.CONTROL_PANEL_TEXT_MAX_WIDTH_OPTIONS ),
        value: SoundModel.AudioControlOptions.LISTENER
      } ], {
        spacing: options.yMargin
      } );

      radioButtons.top = graphCheckbox.bottom + SoundConstants.CONTROL_PANEL_SPACING;
    }


    const container = new Node();

    container.children = [
      boxText,
      graphCheckbox,
      ...( model.audioControlSettingProperty ? [ radioButtons ] : [] )
    ];

    const content = alignGroup.createBox( container );
    content.setXAlign( 'left' );

    super( content, options );
  }
}

sound.register( 'AudioControlPanel', AudioControlPanel );
export default AudioControlPanel;