import { mod } from "../utils/mod.js";

/**
 * Representa um conjunto de classes de altura (Pitch Class Set).
 * 
 * - A entrada porde conter valores repetidos
 * - Valores fora de 0-11 são normalizados mod 12
 * - O conjunto é ordenado em ordem crescente simples
 *  (isso NÃO é Normal Order)
 */

export class PitchClassSet {
    /** Entrada original, preservada */
    readonly pcs: number[];

    /** Classes de altura normalizadas (mod 12) e ordenadas */
    constructor(pcs: number[]) {
        this.pcs = PitchClassSet.normalize(pcs)
    }

    private static normalize(input: number[]): number[] {
        return [...new Set(input.map(pc => mod(pc, 12)))]
        .sort((a, b) => a - b);
    }

    /** Transpõe o conjunto por n semintons */
    tranpose(n: number): PitchClassSet {
        return new PitchClassSet(this.pcs.map(pc => mod(pc + n, 12)));
    }

    /** Inverte o conjunto em torno de um eixo (padrão = 0) */
    invert(axis: number = 0): PitchClassSet {
        return new PitchClassSet(this.pcs.map(pc => mod(axis - pc, 12)));
    }

    toString(): string {
        return `( ${this.pcs.join(", ")} )`;
    }

}