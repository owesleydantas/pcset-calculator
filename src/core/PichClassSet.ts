import { mod } from "../utils/mod.js";

export class PitchClassSet {
    readonly pcs: number[];
    readonly raw: number[];

    constructor(pcs: number[]) {
        this.raw = [...pcs]
        this.pcs = [...new Set(pcs.map(pc => mod(pc, 12)))].sort((a, b) => a - b);
    }

    tranpose(n: number): PitchClassSet {
        return new PitchClassSet(this.pcs.map(pc => mod(pc + n, 12)));
    }

    invert(axis: number = 0): PitchClassSet {
        return new PitchClassSet(this.pcs.map(pc => mod(axis - pc, 12)));
    }

    toString(): string {
        return `( ${this.pcs.join(", ")} )`;
    }

    toRaw(): string {
        return `[${this.raw.join(", ")}]`
    }
}