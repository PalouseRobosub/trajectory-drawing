import {CartesianCoords} from "@/app/types";

export const cartToArray = (coords: CartesianCoords): [number, number, number] => {
  return [coords.x, coords.y, coords.z]
}