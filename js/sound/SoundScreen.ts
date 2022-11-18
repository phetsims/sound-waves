// Copyright 2022, University of Colorado Boulder
/**
 * @author Piet Goris
 * Screen for the sound application
 */

import Dimension2 from '../../../dot/js/Dimension2.js';
import StringProperty from '../../../axon/js/StringProperty.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import SoundColors from '../common/SoundColors.js';
import sound from '../sound.js';
import { Node } from '../../../scenery/js/imports.js';
import SoundModel from './model/SoundModel.js';
import SoundScreenView from './view/SoundScreenView.js';
import Tandem from '../../../tandem/js/Tandem.js';

class SoundScreen extends Screen {
  public constructor( title: string, createModel: () => SoundModel, createView: () => SoundScreenView, iconImage: Node ) {

    const options = {
      backgroundColorProperty: SoundColors.SCREEN_VIEW_BACKGROUND,
      name: new StringProperty( title ),
      homeScreenIcon: new ScreenIcon( iconImage, {
        size: new Dimension2( Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height ),
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      showPlaySoundControl: true,
      audioEnabled: true,
      tandem: Tandem.OPT_OUT
    };

    super(
      createModel,
      createView,
      options
    );
  }
}

sound.register( 'SoundScreen', SoundScreen );
export default SoundScreen;