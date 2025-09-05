export interface PoolDimensions {
  x: number;
  y: number;
  z: number;
}

export interface Waypoint {
  name: string;
  position: [number, number, number];
  orientation: [number, number, number, number];
  velocity: number;
  holdTime: number;
}

export interface State {
  poolDimensions: PoolDimensions
  waypoints: Waypoint[];
}