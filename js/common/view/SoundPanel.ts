// Copyright 2022-2024, University of Colorado Boulder

/**
 * Panel subclass that applies styling specific to this simulation. Copied from Wave Interference
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import soundWaves from '../../soundWaves.js';

type SelfOptions = EmptySelfOptions;
export type SoundPanelOptions = PanelOptions & SelfOptions;

export default class SoundPanel extends Panel {

  public constructor( content: Node, providedOptions?: PanelOptions ) {
    const options = optionize<SoundPanelOptions, SelfOptions, PanelOptions>()( {
      yMargin: 7,
      xMargin: 20,
      stroke: 'gray',
      fill: 'rgb(230,231,232)',
      cornerRadius: 6
    }, providedOptions );
    super( content, options );
  }
}

soundWaves.register( 'SoundPanel', SoundPanel );