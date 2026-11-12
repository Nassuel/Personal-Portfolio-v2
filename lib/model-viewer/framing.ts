export interface Point3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;
}

export interface OrbitView {
    verticalFovDegrees: number;
    /** Viewport width divided by height. */
    aspect: number;
    /** Camera height above the orbit plane, in radians. */
    elevation: number;
    /** 1 lets the box touch the frame edges; larger leaves a border. */
    margin: number;
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

/** The eight corners of an axis-aligned box. */
export function boxCorners(min: Point3, max: Point3): Point3[] {
    const corners: Point3[] = [];
    for (const x of [min.x, max.x]) {
        for (const y of [min.y, max.y]) {
            for (const z of [min.z, max.z]) corners.push({ x, y, z });
        }
    }
    return corners;
}

/**
 * Closest orbit distance at which every point stays in frame from every azimuth.
 *
 * Spec:
 * - Points are relative to the orbit target, which the camera looks at.
 * - The camera circles the target at `view.elevation`; for each of
 *   `azimuthSteps` evenly spaced azimuths, every point must project inside the
 *   frame shrunk by `view.margin`, horizontally and vertically.
 * - The result is the smallest distance meeting that, so at the worst azimuth
 *   some point sits exactly on the shrunk frame edge.
 */
export function fitOrbitDistance(
    points: readonly Point3[],
    view: OrbitView,
    azimuthSteps = 72
): number {
    const tanVertical = Math.tan(toRadians(view.verticalFovDegrees) / 2);
    const tanHorizontal = tanVertical * view.aspect;
    const sinE = Math.sin(view.elevation);
    const cosE = Math.cos(view.elevation);
    let distance = 0;

    for (let step = 0; step < azimuthSteps; step++) {
        const azimuth = (2 * Math.PI * step) / azimuthSteps;
        const sinA = Math.sin(azimuth);
        const cosA = Math.cos(azimuth);
        for (const { x, y, z } of points) {
            const right = x * cosA - z * sinA;
            const up = -x * sinA * sinE + y * cosE - z * cosA * sinE;
            const towardCamera = x * sinA * cosE + y * sinE + z * cosA * cosE;
            const needed =
                towardCamera +
                view.margin *
                    Math.max(
                        Math.abs(right) / tanHorizontal,
                        Math.abs(up) / tanVertical
                    );
            distance = Math.max(distance, needed);
        }
    }
    return distance;
}
