export interface PoolDimensions {
  x: number;
  y: number;
  z: number;
}

export interface State {
  poolDimensions: PoolDimensions
  waypoints: [number, number, number][];
}