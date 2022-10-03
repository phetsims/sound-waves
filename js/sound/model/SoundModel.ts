// Copyright 2022, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Piet Goris
 */

import sound from '../../sound.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = {
  //TODO add options that are specific to SoundModel here
};

type SoundModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

class SoundModel {

  public constructor( providedOptions: SoundModelOptions ) {
    //TODO
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //TODO
  }
}

sound.register( 'SoundModel', SoundModel );
export default SoundModel;