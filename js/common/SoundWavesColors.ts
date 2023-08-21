// Copyright 2022-2023, University of Colorado Boulder
/**
 * Colors used throughout this simulation.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import soundWaves from '../soundWaves.js';

const SoundWavesColors = {
  SCREEN_VIEW_BACKGROUND: new Property( 'white' )
};

soundWaves.register( 'SoundWavesColors', SoundWavesColors );
export default SoundWavesColors;