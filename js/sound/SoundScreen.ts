// Copyright 2022, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Piet Goris
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import SoundColors from '../common/SoundColors.js';
import sound from '../sound.js';
import SoundModel from './model/SoundModel.js';
import SoundScreenView from './view/SoundScreenView.js';
import SoundStrings from '../SoundStrings.js';

type SelfOptions = {
  //TODO add options that are specific to SoundScreen here
};

type SoundScreenOptions = SelfOptions & ScreenOptions;

class SoundScreen extends Screen<SoundModel, SoundScreenView> {

  public constructor( providedOptions: SoundScreenOptions ) {

    const options = optionize<SoundScreenOptions, SelfOptions, ScreenOptions>()( {
      name: SoundStrings.screen.nameStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: SoundColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new SoundModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new SoundScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

sound.register( 'SoundScreen', SoundScreen );
export default SoundScreen;