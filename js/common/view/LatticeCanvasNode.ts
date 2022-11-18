// Copyright 2022, University of Colorado Boulder
/* eslint-disable */
// @ts-nocheck
/**
 * Renders the main area of the lattice (doesn't include the damping regions) using 2d canvas.
 * Allows for wall reflection and an extra source. Also can dampen the waves to be within a certain area.
 *
 * @author Piet Goris (University of Leuven)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import { CanvasNode, Color } from '../../../../scenery/js/imports.js';
import ImageDataRenderer from '../../../../scenery-phet/js/ImageDataRenderer.js';
import SoundConstants from '../../common/SoundConstants.js';
import sound from '../../sound.js';
import Lattice from '../../../../scenery-phet/js/Lattice.js';

// constants
const CUTOFF = 0.4;

class LatticeCanvasNode extends CanvasNode {

  /**
   * @param {Lattice} lattice
   * @param {Object} [options]
   */
  constructor( lattice:Lattice, options?:IntentionalAny ) {

    options = merge( {

      // only use the visible part for the bounds (not the damping regions)
      canvasBounds: SoundConstants.getCanvasBounds( lattice ),
      layerSplit: true, // ensure we're on our own layer
      baseColor: Color.blue,
      hasReflection: false,
      sourcePosition: new Vector2( 0, 0 ),
      hasSecondSource: false,
      source2PositionY: 0,
      wallAngle: Math.PI / 4

    }, options );

    super( options );

    // @private
    this.hasSecondSource = options.hasSecondSource;
    // @public
    this.source2PositionY = options.source2PositionY;
    // @private
    this.sourcePosition = options.sourcePosition;
    // @private
    this.hasReflection = options.hasReflection;

    // @private
    this.lattice = lattice;

    // @private
    this.wallPositionX = this.lattice.width / 2;

    // @private
    this.wallAngle = options.wallAngle;

    // @private
    this.baseColor = options.baseColor;

    // @public {Color|null} - settable, if defined shows unvisited lattice cells as specified color, used for light
    this.vacuumColor = null;

    // @private - For performance, render into a sub-canvas which will be drawn into the rendering context at the right
    // scale.
    this.imageDataRenderer = new ImageDataRenderer( lattice.visibleBounds.width, lattice.visibleBounds.height );

    // Invalidate paint when model indicates changes
    lattice.changedEmitter.addListener( this.invalidatePaint.bind( this ) );
  }

  /**
   * Convert the given point in the local coordinate frame to the corresponding i,j (integral) lattice coordinates.
   * @param {Vector2} point - point in the local coordinate frame
   * @returns {Vector2}
   * @public
   */
  static localPointToLatticePoint( point ) {
    return new Vector2(
      Utils.roundSymmetric( point.x / SoundConstants.CELL_WIDTH ),
      Utils.roundSymmetric( point.y / SoundConstants.CELL_WIDTH )
    );
  }

  /**
   * Sets the x coordinate of the reflection wall
   * @param {Number} x
   * @public
   */

  setWallPositionX( x ) {
    this.wallPositionX = x;
  }

  /**
   * Sets the angle of the reflection wall
   * @param {Number} angle
   * @public
   */

  setWallAngle( angle ) {
    this.wallAngle = angle;
  }

  /**
   * Sets the color of the peaks of the wave.
   * @param {Color} color
   * @public
   */
  setBaseColor( color ) {
    this.baseColor = color;
    this.invalidatePaint();
  }

  /**
   * Gets dampened lattice value
   * @public
   */
  getDampenedValue( x, y ) {
    const distance = this.sourcePosition.distanceXY( x, y );
    const distanceDampen = distance >= 0 && distance <= SoundConstants.MAX_SOUND_DISTANCE ? ( SoundConstants.MAX_SOUND_DISTANCE - distance ) / SoundConstants.MAX_SOUND_DISTANCE : 0;

    return this.lattice.getInterpolatedValue( x, y ) * distanceDampen;
  }

  /**
   * Draws into the canvas.
   * @param {CanvasRenderingContext2D} context
   * @public
   * @override
   */
  paintCanvas( context ) {
    let m = 0;
    const data = this.imageDataRenderer.data;
    const dampX = this.lattice.dampX;
    const dampY = this.lattice.dampY;
    const width = this.lattice.width;
    const height = this.lattice.height;
    let intensity;

    for ( let i = dampX; i < width - dampX; i++ ) {
      for ( let k = dampY; k < height - dampY; k++ ) {

        // Note this is transposed because of the ordering of putImageData

        let addition = 0;
        let zeroOut = 1;

        if ( this.hasReflection ) {
          if ( k >= this.sourcePosition.x && k < Utils.roundSymmetric( this.wallPositionX ) - ( i - height + dampY ) / Math.tan( this.wallAngle ) ) {
            const originalPos = new Vector2( k, i );
            const wallVector = Vector2.createPolar( 1, -this.wallAngle );
            const wallOrigin = new Vector2( this.wallPositionX, height - dampY );
            const mirroredPosition = wallVector.withMagnitude( originalPos.copy().minus( wallOrigin ).dot( wallVector ) ).plus( wallOrigin );
            const perp = mirroredPosition.minus( originalPos ).times( 2 );
            const final = originalPos.plus( perp );
            const finalX = Utils.roundSymmetric( final.x );
            const finalY = Utils.roundSymmetric( final.y );

            addition = this.getDampenedValue( finalX, finalY );
          }
          else {
            zeroOut = 0;
          }
        }

        if ( this.hasSecondSource ) {
          addition = this.getDampenedValue( k, Utils.roundSymmetric( i + this.sourcePosition.y - this.source2PositionY ) );
        }

        const waveValue = ( this.getDampenedValue( k, i ) + addition ) * zeroOut;

        if ( waveValue > 0 ) {
          intensity = Utils.linear( 0, 2, CUTOFF, 1, waveValue );
          intensity = Utils.clamp( intensity, CUTOFF, 1 );
        }
        else {
          const MIN_SHADE = 0.03; // Stop before 0 because 0 is too jarring
          intensity = Utils.linear( -1.5, 0, MIN_SHADE, CUTOFF, waveValue );
          intensity = Utils.clamp( intensity, MIN_SHADE, CUTOFF );
        }

        // Note this interpolation doesn't include the gamma factor that Color.blend does
        let r = this.baseColor.red * intensity;
        let g = this.baseColor.green * intensity;
        let b = this.baseColor.blue * intensity;

        // Note this is transposed because of the ordering of putImageData
        if ( this.vacuumColor && !this.lattice.hasCellBeenVisited( k, i ) ) {
          r = this.vacuumColor.r;
          g = this.vacuumColor.g;
          b = this.vacuumColor.b;
        }

        // ImageData.data is Uint8ClampedArray.  Performance is critical and all numbers are non-negative.
        const offset = 4 * m;
        data[ offset ] = Math.round( r );
        data[ offset + 1 ] = Math.round( g );
        data[ offset + 2 ] = Math.round( b );
        data[ offset + 3 ] = 255; // Fully opaque
        m++;
      }
    }
    this.imageDataRenderer.putImageData();

    // draw the sub-canvas to the rendering context at the appropriate scale
    context.save();
    context.transform( SoundConstants.CELL_WIDTH, 0, 0, SoundConstants.CELL_WIDTH, 0, 0 );
    context.drawImage( this.imageDataRenderer.canvas, 0, 0 );
    context.restore();
  }
}

sound.register( 'LatticeCanvasNode', LatticeCanvasNode );
export default LatticeCanvasNode;