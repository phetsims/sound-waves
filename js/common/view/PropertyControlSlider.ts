// Copyright 2022, University of Colorado Boulder
/**
 * Slider that controls a given property, can display the current value and a title.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import SoundSlider from '../../common/view/SoundSlider.js';
import sound from '../../sound.js';
import SoundConstants from '../SoundConstants.js';

type SelfOptions = { valueToText?: ( null | ( ( value: number ) => string ) ) };
type PropertyControlSliderOptions = SelfOptions & NodeOptions;

export default class PropertyControlSlider extends Node {
  public constructor( titleString: string, property: NumberProperty, providedOptions?: PropertyControlSliderOptions ) {
    const options = optionize<PropertyControlSliderOptions, SelfOptions, NodeOptions>()( {
      valueToText: null
    }, providedOptions );

    const title = new Text( titleString );
    const valueDisplay = new Text( '' );
    valueDisplay.top = title.bottom + 5;

    const sliderContainer = new SoundSlider( property );
    sliderContainer.centerX = title.centerX;
    sliderContainer.top = ( options.valueToText ? valueDisplay.bottom : title.bottom ) + SoundConstants.getSliderTitleSpacing( title );
    valueDisplay.right = sliderContainer.right;

    if ( options.valueToText ) {
      property.link( value => {
        valueDisplay.setText( options.valueToText!( value ) );
        valueDisplay.right = sliderContainer.right;
      } );
    }

    super( {
      children: [ title,
        ...( options.valueToText ? [ valueDisplay ] : [] ),
        sliderContainer ]
    } );
  }
}

sound.register( 'PropertyControlSlider', PropertyControlSlider );