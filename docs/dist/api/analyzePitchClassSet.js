import { intervalVector } from "../core/operations/intervalVector";
import { normalOrder } from "../core/operations/normalOrder";
import { primeForm } from "../core/operations/primeForm";
import { PitchClassSet } from "../core/PichClassSet";
export function analizePitchClassSet(input) {
    const pcs = new PitchClassSet(input);
    return {
        pcs: pcs.pcs,
        normalOrder: normalOrder(pcs),
        primeForm: primeForm(pcs),
        intervalVector: intervalVector(pcs)
    };
}
