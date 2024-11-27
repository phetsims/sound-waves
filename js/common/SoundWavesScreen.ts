// Copyright 2022-2023, University of Colorado Boulder
/**
 * Screen for the sound application
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PhetioProperty from '../../../axon/js/PhetioProperty.js';
import Dimension2 from '../../../dot/js/Dimension2.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Node } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import soundWaves from '../soundWaves.js';
import SoundWavesModel from './model/SoundWavesModel.js';
import SoundWavesColors from './SoundWavesColors.js';
import SoundScreenView from './view/SoundScreenView.js';

export default class SoundWavesScreen<T extends SoundWavesModel> extends Screen<T, SoundScreenView> {
  public constructor( title: PhetioProperty<string>, createModel: () => T, createView: ( model: T ) => SoundScreenView, iconImage: Node ) {

    const options: ScreenOptions = {
      backgroundColorProperty: SoundWavesColors.SCREEN_VIEW_BACKGROUND,
      name: title,
      homeScreenIcon: new ScreenIcon( iconImage, {
        size: new Dimension2( Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height ),
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      // showPlaySoundControl: true,
      // audioEnabled: true,
      tandem: Tandem.OPT_OUT
    };

    super(
      createModel,
      createView,
      options
    );
  }
}

soundWaves.register( 'SoundWavesScreen', SoundWavesScreen );