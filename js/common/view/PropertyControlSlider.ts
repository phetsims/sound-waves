// Copyright 2022-2023, University of Colorado Boulder
/**
 * Slider that controls a given property, can display the current value and a title.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { NodeOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import SoundSlider from '../../common/view/SoundSlider.js';
import soundWaves from '../../soundWaves.js';
import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import SoundWavesStrings from '../../SoundWavesStrings.js';
import Utils from '../../../../dot/js/Utils.js';
import SoundWavesConstants from '../SoundWavesConstants.js';

type SelfOptions = {
  hasValueLabel?: boolean;
};

type PropertyControlSliderOptions = SelfOptions & NodeOptions;

export default class PropertyControlSlider extends VBox {
  public constructor( titleString: TReadOnlyProperty<string>, property: NumberProperty, providedOptions?: PropertyControlSliderOptions ) {
    const options = optionize<PropertyControlSliderOptions, SelfOptions, NodeOptions>()( {
      hasValueLabel: false
    }, providedOptions );

    const title = new Text( titleString, { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE, layoutOptions: { topMargin: 5, bottomMargin: 10 } } );
    const valueDisplay = new Text( new PatternStringProperty( SoundWavesStrings.hzPatternStringProperty, {
      value: property
    }, {
      maps: {
        value: value => Utils.roundSymmetric( value * 1000 )
      }
    } ), { fontSize: SoundWavesConstants.SOUND_WAVES_FONT_SIZE, layoutOptions: { bottomMargin: 5 } } );

    const soundSlider = new SoundSlider( property );

    super( {
      children: [ title,
        ...( options.hasValueLabel ? [ valueDisplay ] : [] ),
        soundSlider ]
    } );
  }
}

soundWaves.register( 'PropertyControlSlider', PropertyControlSlider );