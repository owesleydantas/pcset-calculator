import { mod } from "../utils/mod.js";
export class PitchClassSet {
    constructor(pcs) {
        this.pcs = PitchClassSet.normalize(pcs);
    }
    static normalize(input) {
        return [...new Set(input.map(pc => mod(pc, 12)))]
            .sort((a, b) => a - b);
    }
    tranpose(n) {
        return new PitchClassSet(this.pcs.map(pc => mod(pc + n, 12)));
    }
    invert(axis = 0) {
        return new PitchClassSet(this.pcs.map(pc => mod(axis - pc, 12)));
    }
    toString() {
        return `( ${this.pcs.join(", ")} )`;
    }
}
