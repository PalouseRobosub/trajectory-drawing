export interface PoolDimensions {
  x: number;
  y: number;
  z: number;
}

export interface CartesianCoords {
  x: number;
  y: number;
  z: number;
}

export interface Waypoint {
  seq: number;
  name: string;
  position: CartesianCoords;
  orientation: {
    x: number;
    y: number;
    z: number;
    w: number;
  };
  velocity: number;
  hold_time: number;
  bezier: boolean;
  controlPoint: CartesianCoords;
}

export interface State {
  poolDimensions: PoolDimensions
  waypointOptions: {
    dotWaypoints: boolean;
    waypointLabels: "none"|"seq"|"name"
  }
  elapsed: number;
  totalElapsed: number;
  totalTime: number;
  orbitEnabled: boolean;
}

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}