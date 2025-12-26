import { normalOrder } from "./core/operations/normalOrder.js";
import { primeForm } from "./core/operations/primeForm.js";
import { PitchClassSet } from "./core/PichClassSet.js";

const set = new PitchClassSet([8,0,5,3]);

console.log("PCS:", set.toString());
console.log("T3:", set.tranpose(3).pcs);
console.log("I0:", set.invert().pcs)
console.log("Normal Order:", normalOrder(set));
console.log("Prime Form:", primeForm(set));