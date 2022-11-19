// Copyright 2022, University of Colorado Boulder

/**
 * Shows the controls for the pressure box.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { AlignGroup, Node, Text } from '../../../../scenery/js/imports.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import SoundStrings from '../../SoundStrings.js';
import PropertyControlSlider from './PropertyControlSlider.js';
import SoundPanel, { SoundPanelOptions } from './SoundPanel.js';
import PressureModel from '../../sound/model/PressureModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

const titleString = SoundStrings.airDensityControlPanel.title;
const resetString = SoundStrings.airDensityControlPanel.reset;

type SelfOptions = EmptySelfOptions;
export type AirDensityControlPanelOptions = SoundPanelOptions & SelfOptions;

class AirDensityControlPanel extends SoundPanel {

  public constructor( model: PressureModel, alignGroup: AlignGroup, providedOptions?: AirDensityControlPanelOptions ) {
    const options = optionize<AirDensityControlPanelOptions, SelfOptions, SoundPanelOptions>()( {
      maxWidth: SoundConstants.PANEL_MAX_WIDTH,
      yMargin: 4
    }, providedOptions );

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