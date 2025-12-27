import { intervalVector } from "../core/operations/intervalVector.js";
import { normalOrder } from "../core/operations/normalOrder.js";
import { primeForm } from "../core/operations/primeForm.js";
import { PitchClassSet } from "../core/PitchClassSet.js";

export function analizePitchClassSet(input: number[]) {
    const pcs = new PitchClassSet(input);

    return {
        pcs: pcs.pcs,
        normalOrder: normalOrder(pcs),
        primeForm: primeForm(pcs),
        intervalVector: intervalVector(pcs)
    };
}