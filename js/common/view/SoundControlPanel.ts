// Copyright 2022-2023, University of Colorado Boulder
/**
 * Shows the main controls, including frequency/wavelength and amplitude.
 * Also displays a clear wave button when in the measure model.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import { AlignGroup, VBox } from '../../../../scenery/js/imports.js';
import SoundWavesConstants from '../SoundWavesConstants.js';
import soundWaves from '../../soundWaves.js';
import SoundWavesModel from '../../common/model/SoundWavesModel.js';
import SoundWavesStrings from '../../SoundWavesStrings.js';
import PropertyControlSlider from './PropertyControlSlider.js';
import SoundPanel, { SoundPanelOptions } from './SoundPanel.js';

type SelfOptions = EmptySelfOptions;
type SoundControlPanelOptions = SelfOptions & SoundPanelOptions;

export default class SoundControlPanel extends SoundPanel {

  public constructor( model: SoundWavesModel & { stopwatch?: Stopwatch }, alignGroup: AlignGroup, providedOptions?: SoundControlPanelOptions ) {

    const options = optionize<SoundControlPanelOptions, SelfOptions, SoundPanelOptions>()( {
      maxWidth: SoundWavesConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, providedOptions );

    const frequencyControl = new PropertyControlSlider( SoundWavesStrings.frequencyStringProperty,
      model.frequencyProperty, { hasValueLabel: true } );
    const amplitudeControl = new PropertyControlSlider( SoundWavesStrings.amplitudeStringProperty, model.amplitudeProperty );

    const centerX = frequencyControl.centerX;
    frequencyControl.centerX = centerX;
    amplitudeControl.centerX = centerX;

    // Vertical layout
    amplitudeControl.top = frequencyControl.bottom + SoundWavesConstants.CONTROL_PANEL_SPACING;

    const container = new VBox( {
      spacing: 6,
      children: [
        frequencyControl,
        amplitudeControl
      ]
    } );

    const content = alignGroup.createBox( container );

    super( content, options );
  }
}

soundWaves.register( 'SoundControlPanel', SoundControlPanel );