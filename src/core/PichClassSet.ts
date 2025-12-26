import { mod } from "../utils/mod.js";

export class PitchClassSet {
    readonly pcs: number[];

    constructor(pcs: number[]) {
        this.pcs = PitchClassSet.normalize(pcs)
    }

    private static normalize(input: number[]): number[] {
        return [...new Set(input.map(pc => mod(pc, 12)))]
        .sort((a, b) => a - b);
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

}