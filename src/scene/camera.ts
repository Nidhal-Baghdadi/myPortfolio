import { MathUtils, type Vector3Tuple } from "three"

export const CAMERA_FOV = 28

export function orbitPosition(distance: number, elevation: number, azimuth: number): Vector3Tuple {


    const elevationRad = MathUtils.degToRad(elevation)
    const azimuthRad = MathUtils.degToRad(azimuth)
    const horizontal = distance * Math.cos(elevationRad)

    const result: Vector3Tuple = [horizontal * Math.sin(azimuthRad), distance * Math.sin(elevationRad), horizontal * Math.cos(azimuthRad)]

    return result

}