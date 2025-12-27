import { intervalVector } from "../core/operations/intervalVector.js";
import { normalOrder } from "../core/operations/normalOrder.js";
import { primeForm } from "../core/operations/primeForm.js";
import { PitchClassSet } from "../core/PichClassSet.js";
export function analizePitchClassSet(input) {
    const pcs = new PitchClassSet(input);
    return {
        pcs: pcs.pcs,
        normalOrder: normalOrder(pcs),
        primeForm: primeForm(pcs),
        intervalVector: intervalVector(pcs)
    };
}
