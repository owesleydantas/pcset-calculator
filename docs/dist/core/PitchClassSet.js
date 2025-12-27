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
    /** Classes de altura normalizadas (mod 12) e ordenadas */
    constructor(pcs) {
        this.pcs = PitchClassSet.normalize(pcs);
    }
    static normalize(input) {
        return [...new Set(input.map(pc => mod(pc, 12)))]
            .sort((a, b) => a - b);
    }
    /** Transpõe o conjunto por n semintons */
    tranpose(n) {
        return new PitchClassSet(this.pcs.map(pc => mod(pc + n, 12)));
    }
    /** Inverte o conjunto em torno de um eixo (padrão = 0) */
    invert(axis = 0) {
        return new PitchClassSet(this.pcs.map(pc => mod(axis - pc, 12)));
    }
    toString() {
        return `( ${this.pcs.join(", ")} )`;
    }
}
