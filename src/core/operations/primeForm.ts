import { mod } from "../../utils/mod.js";
import { PitchClassSet } from "../PitchClassSet.js";
import { normalOrder } from "./normalOrder.js";

export function primeForm(set: PitchClassSet): number[] {
    const normal = normalOrder(set);
    const inverted = normalOrder(set.invert());

    const normal0 = normal.map(pc => mod(pc - normal[0], 12));
    const inverted0 = inverted.map(pc => mod(pc - inverted[0], 12));

    for (let i = 0; i < normal0.length; i++) {
        if (normal0[i] < inverted0[i]) return normal0;
        if (normal0[i] > inverted0[i]) return inverted0;
    }

    return normal0;
}