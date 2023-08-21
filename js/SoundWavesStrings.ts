// Copyright 2022-2023, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import soundWaves from './soundWaves.js';

type StringsType = {
  'sound-waves': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'screen': {
    'singleSourceStringProperty': LocalizedStringProperty;
    'measureStringProperty': LocalizedStringProperty;
    'twoSourceStringProperty': LocalizedStringProperty;
    'reflectionStringProperty': LocalizedStringProperty;
    'airPressureStringProperty': LocalizedStringProperty;
  };
  'measure': {
    'clearWavesStringProperty': LocalizedStringProperty;
  };
  'atmStringProperty': LocalizedStringProperty;
  'hzPatternStringProperty': LocalizedStringProperty;
  'audioControlPanel': {
    'titleStringProperty': LocalizedStringProperty;
    'audioEnabledStringProperty': LocalizedStringProperty;
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
    'resetStringProperty': LocalizedStringProperty;
  };
  'amplitudeStringProperty': LocalizedStringProperty;
  'frequencyStringProperty': LocalizedStringProperty;
  'metersStringProperty': LocalizedStringProperty;
};

const SoundWavesStrings = getStringModule( 'SOUND_WAVES' ) as StringsType;

soundWaves.register( 'SoundWavesStrings', SoundWavesStrings );

export default SoundWavesStrings;
