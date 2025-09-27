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

export interface Trajectory {
  name: string
  frame_id: string
  vehicle_type: string
  waypoints: Waypoint[]
  parameters: {
    max_linear_velocity: number
    max_angular_velocity: number
    position_tolerance: number
    orientation_tolerance: number
  }
  safety: {
    max_depth: number
    emergency_surface: boolean
    collision_avoidance: boolean
  }
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
  pathFiles: string[];
  displayPaths: boolean[];
}

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}