// Copyright 2022, University of Colorado Boulder
/* eslint-disable */

/**
 * Shows the controls for the pressure box.
 */

import merge from '../../../../phet-core/js/merge.js';
import { AlignGroup, Node, Text } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundStrings from '../../SoundStrings.js';
import PropertyControlSlider from './PropertyControlSlider.js';
import SoundPanel from './SoundPanel.js';
import SoundModel from '../../sound/model/SoundModel.js';
import PressureModel from '../../sound/model/PressureModel.js';

const titleString = SoundStrings.airDensityControlPanel.title;
const resetString = SoundStrings.airDensityControlPanel.reset;

class AirDensityControlPanel extends SoundPanel {

  constructor( model: PressureModel, alignGroup: AlignGroup, options: IntentionalAny ) {
    options = merge( {
      maxWidth: SoundConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, options );

    const container = new Node();

    const resetButton = new RectangularPushButton( {
      content: new Text( resetString ),
      listener: () => {
        model.pressureProperty.set( 1 );
      }
    } );

    const airPressureContol = new PropertyControlSlider( titleString, model.pressureProperty );
    container.children = [
      airPressureContol,
      resetButton
    ];

    resetButton.top = airPressureContol.bottom + options.yMargin;

    const content = alignGroup.createBox( container );
    content.setXAlign( 'center' );

    super( content, options );
  }
}

sound.register( 'AirDensityControlPanel', AirDensityControlPanel );
export default AirDensityControlPanel;