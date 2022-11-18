// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * Slider that controls a given property, can display the current value and a title.
 *
 * @author Piet Goris (University of Leuven)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import SoundSlider from '../../common/view/SoundSlider.js';
import sound from '../../sound.js';
import SoundConstants from '../SoundConstants.js';

class ProtertyControlSlider extends Node {
  constructor( titleString: string, property: Property<number>, options?: IntentionalAny ) {
    options = merge( {
      valueToText: null
    }, options );

    const title = new Text( titleString );
    const valueDisplay = new Text( '' );
    valueDisplay.top = title.bottom + 5;

    const sliderContainer = new SoundSlider( property );
    sliderContainer.centerX = title.centerX;
    sliderContainer.top = ( options.valueToText ? valueDisplay.bottom : title.bottom ) + SoundConstants.getSliderTitleSpacing( title );
    valueDisplay.right = sliderContainer.right;

    if ( options.valueToText ) {
      property.link( value => {
        valueDisplay.setText( options.valueToText( value ) );
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

sound.register( 'ProtertyControlSlider', ProtertyControlSlider );
export default ProtertyControlSlider;