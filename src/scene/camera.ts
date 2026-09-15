import { MathUtils, type Vector3Tuple } from "three"

export const CAMERA_ELEVATION = 40
export const CAMERA_AZIMUTH = 30
export const CAMERA_FOV = 28
export const CAMERA_MARGIN = 1.05

export function orbitPosition(distance: number, elevation: number, azimuth: number): Vector3Tuple {


    const elevationRad = MathUtils.degToRad(elevation)
    const azimuthRad = MathUtils.degToRad(azimuth)
    const horizontal = distance * Math.cos(elevationRad)

    const result: Vector3Tuple = [horizontal * Math.sin(azimuthRad), distance * Math.sin(elevationRad), horizontal * Math.cos(azimuthRad)]

    return result

}

export function fitDistance(radius: number, verticalFov: number, aspect: number): number {
    const verticalFovRad = MathUtils.degToRad(verticalFov)
    const horizontalFovRad = 2 * Math.atan(Math.tan(verticalFovRad / 2) * aspect)
    const angle = Math.min(verticalFovRad, horizontalFovRad)

    const distance = radius / Math.sin(angle / 2)



    return distance;
}