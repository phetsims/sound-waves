// Copyright 2022-2023, University of Colorado Boulder
/**
 * Shows the main controls, including frequency/wavelength and amplitude.
 * Also displays a clear wave button when in the measure model.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Stopwatch from '../../../../scenery-phet/js/Stopwatch.js';
import { AlignGroup, VBox } from '../../../../scenery/js/imports.js';
import SoundConstants from '../../common/SoundConstants.js';
import soundWaves from '../../soundWaves.js';
import SoundModel from '../../common/model/SoundModel.js';
import SoundStrings from '../../SoundStrings.js';
import PropertyControlSlider from './PropertyControlSlider.js';
import SoundPanel, { SoundPanelOptions } from './SoundPanel.js';

type SelfOptions = EmptySelfOptions;
type SoundControlPanelOptions = SelfOptions & SoundPanelOptions;

export default class SoundControlPanel extends SoundPanel {

  public constructor( model: SoundModel & { stopwatch?: Stopwatch }, alignGroup: AlignGroup, providedOptions?: SoundControlPanelOptions ) {

    const options = optionize<SoundControlPanelOptions, SelfOptions, SoundPanelOptions>()( {
      maxWidth: SoundConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, providedOptions );

    const frequencyControl = new PropertyControlSlider( SoundStrings.frequencyStringProperty, model.frequencyProperty, {

      // TODO: Convert units to PatternStringProperty to trigger when SoundStrings.hzStringProperty changes
      valueToText: value => ( Utils.roundSymmetric( value * 1000 ) ).toString() + SoundStrings.hzStringProperty.value
    } );
    const amplitudeControl = new PropertyControlSlider( SoundStrings.amplitudeStringProperty, model.amplitudeProperty );

    const centerX = frequencyControl.centerX;
    frequencyControl.centerX = centerX;
    amplitudeControl.centerX = centerX;

    // Vertical layout
    amplitudeControl.top = frequencyControl.bottom + SoundConstants.CONTROL_PANEL_SPACING;

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