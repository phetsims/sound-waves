// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * Shows the main controls, including frequency/wavelength and amplitude.
 * Also displays a clear wave button when in the measure model.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import { Node, Text, HSeparator } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundStrings from '../../SoundStrings.js';
import PropertyControlSlider from './PropertyControlSlider.js';
import SoundPanel from './SoundPanel.js';

const amplitudeString = SoundStrings.amplitude;
const frequencyString = SoundStrings.frequency;
const clearString = SoundStrings.measure.clearWaves;
const hzString = SoundStrings.hz;

class SoundControlPanel extends SoundPanel {

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

    const frequencyControl = new PropertyControlSlider( frequencyString, model.frequencyProperty, {
      valueToText: value => ( Utils.roundSymmetric( value * 1000 ) ).toString() + hzString
    } );
    const amplitudeControl = new PropertyControlSlider( amplitudeString, model.amplitudeProperty );

    const centerX = frequencyControl.centerX;
    frequencyControl.centerX = centerX;
    amplitudeControl.centerX = centerX;

    // Vertical layout
    amplitudeControl.top = frequencyControl.bottom + SoundConstants.CONTROL_PANEL_SPACING;

    const container = new Node();
    const clearButton = new RectangularPushButton( {
      listener: () => {
        model.clearWaves();
      },
      content: new Text( clearString )
    } );

    clearButton.top = amplitudeControl.bottom + SoundConstants.CONTROL_PANEL_SPACING;
    const separator = new HSeparator( { minWidth: frequencyControl.width } );
    separator.top = amplitudeControl.bottom + SoundConstants.CONTROL_PANEL_SPACING;
    separator.centerX = centerX;

    clearButton.top = separator.bottom + SoundConstants.CONTROL_PANEL_SPACING;
    clearButton.centerX = centerX;

    container.children = [
      frequencyControl,
      amplitudeControl,
      ...( model.stopwatch ? [ separator, clearButton ] : [] )
    ];

    const content = alignGroup.createBox( container );

    super( content, options );
  }
}

sound.register( 'SoundControlPanel', SoundControlPanel );
export default SoundControlPanel;