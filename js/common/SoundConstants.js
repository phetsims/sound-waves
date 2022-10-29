// Copyright 2022, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Piet Goris
 */

import Range from '../../../dot/js/Range.js';
import Dimension2 from '../../../dot/js/Dimension2.js';
import sound from '../sound.js';

const LATTICE_DIMENSION = 151;
const LATTICE_PADDING = 20;
const AMPLITUDE_CALIBRATION_SCALE = ( LATTICE_DIMENSION - LATTICE_PADDING * 2 ) / ( 101 - 20 * 2 );
const EVENT_RATE = 20 * AMPLITUDE_CALIBRATION_SCALE;
const WAVE_AREA_WIDTH = 1000;

const SoundConstants = {
  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,
  CONTROL_PANEL_MARGIN: 8,
  CONTROL_PANEL_SPACING: 6,
  LATTICE_DIMENSION: LATTICE_DIMENSION,
  LATTICE_PADDING: LATTICE_PADDING,
  SOURCE_POSITION_X: LATTICE_PADDING + 20,
  WAVE_AREA_WIDTH: WAVE_AREA_WIDTH,
  LISTENER_BOUNDS_X: new Range( WAVE_AREA_WIDTH / 3, 4 / 5 * WAVE_AREA_WIDTH ),
  SPEAKER_OFFSET: 55,
  AMPLITUDE_RANGE: new Range( 0, 10 ),
  MAX_SOUND_DISTANCE: 85,
  EVENT_RATE: EVENT_RATE,
  AMPLITUDE_CALIBRATION_SCALE: AMPLITUDE_CALIBRATION_SCALE,
  CONE_ANGLE: Math.PI / 3,

  // Checkboxes and radio buttons in the control panel need extended maxWidth, see https://github.com/phetsims/wave-interference/issues/440
  CONTROL_PANEL_TEXT_MAX_WIDTH_OPTIONS: { maxWidth: 140 },

  MAJOR_TICK_LENGTH: 12,
  THUMB_SIZE: new Dimension2( 13, 22 ),
  CELL_WIDTH: 5
};

sound.register( 'SoundConstants', SoundConstants );
export default SoundConstants;