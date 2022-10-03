// Copyright 2022, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Piet Goris
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import sound from '../sound.js';

const SCHEMA_MAP = {
  //TODO add schemas for query parameters
};

const SoundQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

// The schema map is a read-only part of the public API, in case schema details (e.g. validValues) are needed elsewhere.
SoundQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

sound.register( 'SoundQueryParameters', SoundQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.sound.SoundQueryParameters' );

export default SoundQueryParameters;