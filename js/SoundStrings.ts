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
  'screen': {
    'name': string;
    'nameStringProperty': LinkableProperty<string>;
  }
};

const SoundStrings = getStringModule( 'SOUND' ) as StringsType;

sound.register( 'SoundStrings', SoundStrings );

export default SoundStrings;
