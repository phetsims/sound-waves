// Copyright 2020, University of Colorado Boulder

/**
 * Colors used throughout this simulation.
 *
 * @author Piet Goris
 */

import Property from '../../../axon/js/Property.js';
import sound from '../sound.js';

const SoundColors = {

  SCREEN_VIEW_BACKGROUND: new Property( 'white' )
};

sound.register( 'SoundColors', SoundColors );
export default SoundColors;