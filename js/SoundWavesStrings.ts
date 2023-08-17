// Copyright 2023, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import soundWaves from './soundWaves.js';

type StringsType = {
  'soundWaves': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'singleSource': {
    'titleStringProperty': LocalizedStringProperty;
    'help': {
      'listenerStringProperty': LocalizedStringProperty;
    }
  };
  'measure': {
    'titleStringProperty': LocalizedStringProperty;
    'clearWavesStringProperty': LocalizedStringProperty;
    'help': {
      'stickStringProperty': LocalizedStringProperty;
      'blueLinesStringProperty': LocalizedStringProperty;
    }
  };
  'twoSource': {
    'titleStringProperty': LocalizedStringProperty;
    'help': {
      'upperSpeakerStringProperty': LocalizedStringProperty;
      'listenerStringProperty': LocalizedStringProperty;
    }
  };
  'reflection': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'atmStringProperty': LocalizedStringProperty;
  'hzStringProperty': LocalizedStringProperty;
  'airPressure': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'audioControlPanel': {
    'titleStringProperty': LocalizedStringProperty;
    'audioEnabledStringProperty': LocalizedStringProperty;
    'speakerStringProperty': LocalizedStringProperty;
    'listenerStringProperty': LocalizedStringProperty;
  };
  'soundModeControlPanel': {
    'titleStringProperty': LocalizedStringProperty;
    'continuousStringProperty': LocalizedStringProperty;
    'pulseStringProperty': LocalizedStringProperty;
    'firePulseStringProperty': LocalizedStringProperty;
  };
  'reflectionControlPanel': {
    'positionSliderStringProperty': LocalizedStringProperty;
    'rotationSliderStringProperty': LocalizedStringProperty;
  };
  'airDensityControlPanel': {
    'titleStringProperty': LocalizedStringProperty;
    'removeAirStringProperty': LocalizedStringProperty;
    'addAirStringProperty': LocalizedStringProperty;
    'resetStringProperty': LocalizedStringProperty;
  };
  'amplitudeStringProperty': LocalizedStringProperty;
  'frequencyStringProperty': LocalizedStringProperty;
  'metersStringProperty': LocalizedStringProperty;
};

const SoundWavesStrings = getStringModule( 'SOUND_WAVES' ) as StringsType;

soundWaves.register( 'SoundWavesStrings', SoundWavesStrings );

export default SoundWavesStrings;
