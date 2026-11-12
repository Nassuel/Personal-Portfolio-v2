import { PerspectiveCamera, Vector3 } from "three";
import { describe, expect, it } from "vitest";
import {
    boxCorners,
    fitOrbitDistance,
    type OrbitView,
    type Point3
} from "@/lib/model-viewer/framing";

/** Independent oracle: place a real three.js camera and project the points. */
function worstScreenExtent(
    points: readonly Point3[],
    view: OrbitView,
    distance: number,
    steps: number
) {
    const camera = new PerspectiveCamera(
        view.verticalFovDegrees,
        view.aspect,
        0.001,
        1000
    );
    let worst = 0;
    for (let step = 0; step < steps; step++) {
        const azimuth = (2 * Math.PI * step) / steps;
        const horizontal = distance * Math.cos(view.elevation);
        camera.position.set(
            horizontal * Math.sin(azimuth),
            distance * Math.sin(view.elevation),
            horizontal * Math.cos(azimuth)
        );
        camera.lookAt(0, 0, 0);
        camera.updateMatrixWorld();
        for (const point of points) {
            const ndc = new Vector3(point.x, point.y, point.z).project(camera);
            worst = Math.max(worst, Math.abs(ndc.x), Math.abs(ndc.y));
        }
    }
    return worst;
}

describe("boxCorners", () => {
    it("returns the eight distinct corners of the box", () => {
        const corners = boxCorners(
            { x: -1, y: 0, z: -2 },
            { x: 1, y: 3, z: 2 }
        );
        expect(corners).toHaveLength(8);
        expect(new Set(corners.map(c => `${c.x},${c.y},${c.z}`)).size).toBe(8);
        for (const corner of corners) {
            expect([-1, 1]).toContain(corner.x);
            expect([0, 3]).toContain(corner.y);
            expect([-2, 2]).toContain(corner.z);
        }
    });
});

describe("fitOrbitDistance", () => {
    const car = boxCorners(
        { x: -0.9, y: -0.45, z: -2.2 },
        { x: 0.9, y: 0.7, z: 2.2 }
    );

    it.each([
        ["a wide frame", 2],
        ["a square frame", 1],
        ["a tall frame", 0.6]
    ])(
        "puts the worst-case point exactly on the shrunk edge of %s",
        (_case, aspect) => {
            const view = {
                verticalFovDegrees: 30,
                aspect,
                elevation: 0.28,
                margin: 1.06
            };
            const distance = fitOrbitDistance(car, view, 72);
            expect(worstScreenExtent(car, view, distance, 72)).toBeCloseTo(
                1 / view.margin,
                6
            );
        }
    );

    it("leaves more room as the margin grows", () => {
        const view = {
            verticalFovDegrees: 30,
            aspect: 2,
            elevation: 0.28,
            margin: 1
        };
        const tight = fitOrbitDistance(car, view);
        const loose = fitOrbitDistance(car, { ...view, margin: 1.5 });
        expect(loose).toBeGreaterThan(tight);
        expect(worstScreenExtent(car, view, tight, 72)).toBeCloseTo(1, 6);
    });

    it("needs no distance for a point at the target", () => {
        const view = {
            verticalFovDegrees: 30,
            aspect: 1,
            elevation: 0,
            margin: 1
        };
        expect(fitOrbitDistance([{ x: 0, y: 0, z: 0 }], view)).toBe(0);
    });
});
