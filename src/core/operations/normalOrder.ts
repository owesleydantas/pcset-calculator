import { PitchClassSet } from "../PichClassSet.js"
import { mod } from "../../utils/mod.js";

export function normalOrder(set: PitchClassSet): number[] {
  const pcs = set.pcs;
  const rotations = pcs.map((_, i) =>
    pcs.map((_, j) => pcs[(i + j) % pcs.length])
  );

  rotations.sort((a, b) => {
    const interA = mod((a[a.length - 1] - a[0] + 12), 12);
    const interB = mod((b[b.length - 1] - b[0] + 12), 12);
    return interA - interB || mod((a[0] - b[0]), 12);
  });

  return rotations[0];
}
