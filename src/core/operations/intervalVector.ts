import { mod } from "../../utils/mod";
import { PitchClassSet } from "../PichClassSet";

export function intervalVector(pcs: PitchClassSet): number[] {
    const vector = [0,0,0,0,0,0];
    const arr = pcs.pcs;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1 ; j < arr.length; j++) {
            const d = mod(arr[j] - arr[i] + 12, 12);
            const ic = Math.min(d, 12 - d);

            if (ic >= 1 && ic <= 6) {
                vector[ic - 1]++;
            }
        }
    }

    return vector;
}