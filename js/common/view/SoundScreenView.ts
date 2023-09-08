// Copyright 2022-2023, University of Colorado Boulder
/**
 * Base view for the screens.
 *
 * @author Piet Goris (University of Leuven)
 * @author Sam Reid (PhET Interactive Simulations)
 */
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import GaugeNode from '../../../../scenery-phet/js/GaugeNode.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import { AlignGroup, Rectangle, Text, Color, VBox } from '../../../../scenery/js/imports.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import WaveGenerator from '../../../../tambo/js/sound-generators/WaveGenerator.js';
import SoundWavesConstants from '../SoundWavesConstants.js';
import AudioControlPanel from '../../common/view/AudioControlPanel.js';
import LatticeCanvasNode from '../../common/view/LatticeCanvasNode.js';
import SoundControlPanel from '../../common/view/SoundControlPanel.js';
import SpeakerNode from '../../common/view/SpeakerNode.js';
import soundWaves from '../../soundWaves.js';
import SoundWavesStrings from '../../SoundWavesStrings.js';
import SoundWavesModel from '../model/SoundWavesModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Property from '../../../../axon/js/Property.js';

// constants
const WAVE_MARGIN = 8; // Additional margin shown around the wave lattice
const GAUGE_SPACING_X = 8;
const GAUGE_SPACING_Y = 16;

export default class SoundScreenView extends ScreenView {

  // container VBox for the control panels
  protected readonly controlPanelContainer: VBox;

  // aligns the control panels
  public readonly contolPanelAlignGroup: AlignGroup;

  // control panel responsible for the audio controls
  public readonly audioControlPanel: AudioControlPanel | null = null;
  protected readonly canvasNode: LatticeCanvasNode;

  // control panel resposible for setting the frequency and amplitude
  public readonly controlPanel: SoundControlPanel;

  private readonly waveAreaNode: Rectangle;
  private readonly speakerNode1: SpeakerNode;

  public constructor( model: SoundWavesModel & {
    audioControlSettingProperty?: Property<'SPEAKER' | 'LISTENER'>;
    listenerPositionProperty?: Property<Vector2>;
    pressureProperty?: NumberProperty;
  } ) {

    super( {
      tandem: Tandem.OPT_OUT
    } );

    this.waveAreaNode = new Rectangle( 0, 0, 500, 500, {
      fill: '#4c4c4c',
      top: SoundWavesConstants.CONTROL_PANEL_MARGIN + WAVE_MARGIN + 15,
      centerX: this.layoutBounds.centerX
    } );

    this.addChild( this.waveAreaNode );

    this.canvasNode = new LatticeCanvasNode( model.lattice, {
      baseColor: Color.white,
      hasReflection: model.hasReflection,
      sourcePosition: new Vector2( SoundWavesConstants.SOURCE_POSITION_X, Math.floor( model.modelToLatticeTransform.modelToViewY( model.speaker1Position.y ) ) ),
      hasSecondSource: model.hasSecondSource
    } );

    const latticeScale = this.waveAreaNode.width / this.canvasNode.width;
    this.canvasNode.mutate( {
      scale: latticeScale,
      center: this.waveAreaNode.center,
      visible: true
    } );

    this.addChild( this.canvasNode );

    this.controlPanelContainer = new VBox( { spacing: SoundWavesConstants.CONTROL_PANEL_SPACING } );
    this.addChild( this.controlPanelContainer );

    this.contolPanelAlignGroup = new AlignGroup( {
      matchVertical: false
    } );

    this.controlPanel = new SoundControlPanel( model, this.contolPanelAlignGroup );

    this.controlPanelContainer.addChild( this.controlPanel );

    this.controlPanelContainer.mutate( {
      right: this.layoutBounds.maxX - SoundWavesConstants.SCREEN_VIEW_X_MARGIN,
      top: SoundWavesConstants.CONTROL_PANEL_MARGIN + SoundWavesConstants.CONTROL_PANEL_SPACING + 17
    } );

    if ( model.showAudioControls ) {
      this.audioControlPanel = new AudioControlPanel( model, this.contolPanelAlignGroup );

      this.controlPanelContainer.addChild( this.audioControlPanel );

      // Amplitude of the hearable tone
      const soundAmplitudeProperty = new NumberProperty( 0 );

      // Update the final amplitude of the sine wave tone
      const updateSoundAmplitude = () => {
        const minListenerDistance = model.audioControlSettingProperty && model.audioControlSettingProperty.value === 'LISTENER' ? Math.abs( SoundWavesConstants.LISTENER_BOUNDS_X.min - model.speaker1Position.x ) : 1;
        const listenerDistance = model.audioControlSettingProperty && model.audioControlSettingProperty.value === 'LISTENER' ? Math.abs( model.listenerPositionProperty!.value.x - model.speaker1Position.x ) : 1;
        const distanceDampening = model.audioControlSettingProperty && model.audioControlSettingProperty.value === 'LISTENER' ?
                                  Math.pow( minListenerDistance / listenerDistance, 2 ) : 1;
        const pressureDampening = model.pressureProperty ? model.pressureProperty.value : 1;
        soundAmplitudeProperty.set( distanceDampening * pressureDampening * model.interferenceAmplitudeFactorProperty.value * model.amplitudeProperty.value );
      };

      model.amplitudeProperty.link( updateSoundAmplitude );
      model.interferenceAmplitudeFactorProperty.link( updateSoundAmplitude );

      if ( model.pressureProperty ) {
        model.pressureProperty.link( updateSoundAmplitude );
      }

      if ( model.audioControlSettingProperty ) {
        model.audioControlSettingProperty.link( updateSoundAmplitude );
        model.listenerPositionProperty!.link( updateSoundAmplitude );
      }

      const sineWavePlayer = new WaveGenerator(
        model.frequencyProperty,
        soundAmplitudeProperty, {
          enableControlProperties: [
            model.isAudioEnabledProperty,
            model.isRunningProperty
          ]
        } );

      // Suppress the tone when another screen is selected
      soundManager.addSoundGenerator( sineWavePlayer, {
        associatedViewNode: this
      } );
    }

    // Passes the bounds of the canvas to the model for use in its modelViewTranforms
    model.setViewBounds( this.waveAreaNode.bounds );

    if ( model.pressureProperty ) {
      const speakerCenter = model.modelViewTransform!.modelToViewPosition( model.speaker1Position );
      const boxSizeX = 150;
      const boxSizeY = 200;

      // Pressure box.
      const box = new Rectangle( speakerCenter.x - boxSizeX / 2, speakerCenter.y - boxSizeY / 2, boxSizeX, boxSizeY, {
        stroke: '#f3d99b',
        lineWidth: 3
      } );

      // Darken the pressure box in low pressures.
      model.pressureProperty.link( prop => {
        box.setFill( new Color( 0, 0, 0, 1 - prop ) );
      } );

      this.addChild( box );

      // Pressure gauge.
      const gauge = new GaugeNode( model.pressureProperty, SoundWavesStrings.atmStringProperty, model.pressureProperty.range,
        {
          labelTextOptions: {
            fontSize: 28
          }
        } );
      gauge.centerX = speakerCenter.x;
      gauge.scale( 0.4 );
      gauge.bottom = speakerCenter.y - boxSizeY / 2;

      const labelFontSize = 12;
      const oneText = new Text( SoundWavesStrings.oneStringProperty, { fontSize: labelFontSize, maxWidth: 40 } );
      const zeroText = new Text( SoundWavesStrings.zeroStringProperty, { fontSize: labelFontSize, maxWidth: 40 } );

      oneText.centerY = gauge.centerY + GAUGE_SPACING_Y;
      zeroText.centerY = gauge.centerY + GAUGE_SPACING_Y;
      oneText.right = gauge.right - GAUGE_SPACING_X;
      zeroText.left = gauge.left + GAUGE_SPACING_X;

      this.addChild( gauge );

      this.addChild( oneText );
      this.addChild( zeroText );

    }

    // First speaker
    this.speakerNode1 = new SpeakerNode( model.oscillatorProperty );
    const viewPosition = model.modelViewTransform!.modelToViewPosition( model.speaker1Position );
    viewPosition.setX( viewPosition.x + SoundWavesConstants.SPEAKER_OFFSET );
    this.speakerNode1.setRightCenter( viewPosition );
    this.addChild( this.speakerNode1 );

    // Pause/play/step buttons.
    const timeControlNode = new TimeControlNode( model.isRunningProperty, {
      bottom: this.layoutBounds.bottom - SoundWavesConstants.CONTROL_PANEL_MARGIN - 10,
      centerX: this.waveAreaNode.centerX,

      playPauseStepButtonOptions: {
        stepForwardButtonOptions: {

          // If we need to move forward further than one frame, call advanceTime several times rather than increasing the
          // dt, so the model will behave the same,
          // see https://github.com/phetsims/wave-interference/issues/254
          // and https://github.com/phetsims/wave-interference/issues/226
          listener: () => model.advanceTime( 1 / SoundWavesConstants.EVENT_RATE, true )
        }
      }
    } );

    this.addChild( timeControlNode );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
      },
      right: this.layoutBounds.maxX - SoundWavesConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.bottom - SoundWavesConstants.CONTROL_PANEL_MARGIN - 10
    } );

    this.addChild( resetAllButton );
  }
}

soundWaves.register( 'SoundScreenView', SoundScreenView );