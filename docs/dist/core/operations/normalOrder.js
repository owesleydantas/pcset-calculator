// Implementação determinística para uso em análise musical computacional
import { mod } from "../../utils/mod.js";
/**
 * Calcula a Forma Normal (Normal Order) de um conjunto.
 *
 * A Forma Noram é definida como a rotação do conjunto ordenado
 * que apresenta o menor ambitus (intervalo entre o primeiro e o
 * último elemento), considerando todas as rotações possíveis
 * em espaço cíclico (mod 12).
 *
 * @param set pcs PitchClassSet já normalizado (mod 12)
 * @returns Array de classesde altura representando a Forma Normal
 */
export function normalOrder(set) {
    const pcs = set.pcs;
    const rotations = pcs.map((_, i) => pcs.map((_, j) => pcs[(i + j) % pcs.length]));
    rotations.sort((a, b) => {
        const interA = mod((a[a.length - 1] - a[0] + 12), 12);
        const interB = mod((b[b.length - 1] - b[0] + 12), 12);
        return interA - interB || mod((a[0] - b[0]), 12);
    });
    return rotations[0];
}
