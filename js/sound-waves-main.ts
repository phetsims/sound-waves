// Copyright 2022-2023, University of Colorado Boulder
/**
 * Main entry point for the sim.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import { Image } from '../../scenery/js/imports.js';
import measureIcon_png from '../images/measureIcon_png.js';
import pressureIcon_png from '../images/pressureIcon_png.js';
import reflectionIcon_png from '../images/reflectionIcon_png.js';
import singleSourceIcon_png from '../images/singleSourceIcon_png.js';
import twoSourceIcon_png from '../images/twoSourceIcon_png.js';
import PressureModel from './air-pressure/PressureModel.js';
import PressureView from './air-pressure/PressureView.js';
import SoundWavesScreen from './common/SoundWavesScreen.js';
import IntroModel from './intro/IntroModel.js';
import IntroView from './intro/IntroView.js';
import MeasureModel from './measure/MeasureModel.js';
import MeasureView from './measure/MeasureView.js';
import ReflectionModel from './reflection/ReflectionModel.js';
import ReflectionView from './reflection/ReflectionView.js';
import SoundWavesStrings from './SoundWavesStrings.js';
import TwoSourceModel from './two-sources/TwoSourceModel.js';
import TwoSourceView from './two-sources/TwoSourceView.js';

// launch the sim - beware that scenery Image nodes created outside of simLauncher.launch() will have zero bounds
// until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
simLauncher.launch( () => {
  const sim = new Sim( SoundWavesStrings[ 'sound-waves' ].titleStringProperty, [
    new SoundWavesScreen( SoundWavesStrings.screen.singleSourceStringProperty, () => new IntroModel(), model => new IntroView( model ), new Image( singleSourceIcon_png ) ),
    new SoundWavesScreen( SoundWavesStrings.screen.measureStringProperty, () => new MeasureModel(), model => new MeasureView( model ), new Image( measureIcon_png ) ),
    new SoundWavesScreen( SoundWavesStrings.screen.twoSourceStringProperty, () => new TwoSourceModel(), model => new TwoSourceView( model ), new Image( twoSourceIcon_png ) ),
    new SoundWavesScreen( SoundWavesStrings.screen.reflectionStringProperty, () => new ReflectionModel(), model => new ReflectionView( model ), new Image( reflectionIcon_png ) ),
    new SoundWavesScreen( SoundWavesStrings.screen.airPressureStringProperty, () => new PressureModel(), model => new PressureView( model ), new Image( pressureIcon_png ) )
  ], {

    credits: {
      leadDesign: 'Kathy Perkins, Carl Wieman',
      softwareDevelopment: 'Piet Goris (KU Leuven), Matthew Blackman, Sam Reid',
      team: 'Matthew Blackman, Ariel Paul, Amy Rouinfar',
      qualityAssurance: 'Jaron Droder, Nancy Salpepi, Katie Woessner',
      graphicArts: 'Mariah Hermsmeyer',
      thanks: 'Jan Willems, University of Leuven, for supporting the conversion of this simulation from Java to HTML5.'
    }
  } );

  sim.start();
} );