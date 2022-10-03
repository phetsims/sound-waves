// Copyright 2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import LinkableProperty from '../../axon/js/LinkableProperty.js';
import sound from './sound.js';

type StringsType = {
  'sound': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
  };
  'singleSource': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
    'help': {
      'listener': string;
      'listenerStringProperty': LinkableProperty<string>;
    }
  };
  'measure': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
    'clearWaves': string;
    'clearWavesStringProperty': LinkableProperty<string>;
    'help': {
      'stick': string;
      'stickStringProperty': LinkableProperty<string>;
      'blueLines': string;
      'blueLinesStringProperty': LinkableProperty<string>;
    }
  };
  'twoSource': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
    'help': {
      'upperSpeaker': string;
      'upperSpeakerStringProperty': LinkableProperty<string>;
      'listener': string;
      'listenerStringProperty': LinkableProperty<string>;
    }
  };
  'reflection': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
  };
  'atm': string;
  'atmStringProperty': LinkableProperty<string>;
  'hz': string;
  'hzStringProperty': LinkableProperty<string>;
  'airPressure': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
  };
  'audioControlPanel': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
    'audioEnabled': string;
    'audioEnabledStringProperty': LinkableProperty<string>;
    'speaker': string;
    'speakerStringProperty': LinkableProperty<string>;
    'listener': string;
    'listenerStringProperty': LinkableProperty<string>;
  };
  'soundModeControlPanel': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
    'continuous': string;
    'continuousStringProperty': LinkableProperty<string>;
    'pulse': string;
    'pulseStringProperty': LinkableProperty<string>;
    'firePulse': string;
    'firePulseStringProperty': LinkableProperty<string>;
  };
  'reflectionControlPanel': {
    'positionSlider': string;
    'positionSliderStringProperty': LinkableProperty<string>;
    'rotationSlider': string;
    'rotationSliderStringProperty': LinkableProperty<string>;
  };
  'airDensityControlPanel': {
    'title': string;
    'titleStringProperty': LinkableProperty<string>;
    'removeAir': string;
    'removeAirStringProperty': LinkableProperty<string>;
    'addAir': string;
    'addAirStringProperty': LinkableProperty<string>;
    'reset': string;
    'resetStringProperty': LinkableProperty<string>;
  };
  'amplitude': string;
  'amplitudeStringProperty': LinkableProperty<string>;
  'frequency': string;
  'frequencyStringProperty': LinkableProperty<string>;
};

const SoundStrings = getStringModule( 'SOUND' ) as StringsType;

sound.register( 'SoundStrings', SoundStrings );

export default SoundStrings;
