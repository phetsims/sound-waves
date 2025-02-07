// Copyright 2022-2024, University of Colorado Boulder
/**
 * Shows the controls of the audio, wheter the audio is enabled and if the source is sampled at the source or at the listener.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import SoundWavesModel from '../../common/model/SoundWavesModel.js';
import soundWaves from '../../soundWaves.js';
import SoundWavesStrings from '../../SoundWavesStrings.js';
import SoundWavesConstants from '../SoundWavesConstants.js';
import SoundPanel, { SoundPanelOptions } from './SoundPanel.js';

type SelfOptions = EmptySelfOptions;
type AudioControlPanelOptions = SelfOptions & SoundPanelOptions;

export default class AudioControlPanel extends SoundPanel {

  public constructor( model: SoundWavesModel & { audioControlSettingProperty?: Property<'SPEAKER' | 'LISTENER'> }, alignGroup: AlignGroup, providedOptions?: AudioControlPanelOptions ) {
    const options = optionize<AudioControlPanelOptions, SelfOptions, SoundPanelOptions>()( {
      maxWidth: SoundWavesConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, providedOptions );

    const boxText = new Text( SoundWavesStrings.audioControlPanel.titleStringProperty, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE } );
    const graphCheckbox = new Checkbox(
      model.isAudioEnabledProperty,
      new Text( SoundWavesStrings.audioControlPanel.audioEnabledStringProperty, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE } ),
      {
        boxWidth: 15
      } );

    graphCheckbox.top = boxText.bottom + SoundWavesConstants.CONTROL_PANEL_SPACING;


    const children: Node[] = [ boxText, graphCheckbox ];

    const container = new Node( {
      children: children
    } );

    const content = alignGroup.createBox( container );
    content.setXAlign( 'left' );

    super( content, options );
  }
}

soundWaves.register( 'AudioControlPanel', AudioControlPanel );