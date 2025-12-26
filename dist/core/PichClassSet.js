import { mod } from "../utils/mod.js";
export class PitchClassSet {
    constructor(pcs) {
        this.raw = [...pcs];
        this.pcs = [...new Set(pcs.map(pc => mod(pc, 12)))].sort((a, b) => a - b);
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
    toRaw() {
        return `[${this.raw.join(", ")}]`;
    }
}
