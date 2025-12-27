import { analizePitchClassSet } from "./api/analyzePitchClassSet.js";

const input = document.getElementById("pcs-input") as HTMLInputElement;
const button = document.getElementById("analyze-btn") as HTMLButtonElement;

const outPCS = document.getElementById("out-pcs")!;
const outNormal = document.getElementById("out-normal")!;
const outPrime = document.getElementById("out-prime")!;
const outICV = document.getElementById("out-icv")!;

button.addEventListener("click", () => {
    const raw = input.value;

    if (!raw.trim()) {
        alert("Insira um conjunto de classes de altura.");
        return;
    }

    const values = raw
        .split(",")
        .map(v => Number(v.trim()))
        .filter(v => !Number.isNaN(v));

    if (values.length === 0) {
        alert("Entrada inválida.");
        return;
    }

    try {
        const result = analizePitchClassSet(values);

        outPCS.textContent = `{ ${result.pcs.join(", ")} }`;
        outNormal.textContent = `[${result.normalOrder.join(", ")}]`;
        outPrime.textContent = `(${result.primeForm.join(", ")})`;
        outICV.textContent = `<${result.intervalVector.join(", ")}>`;

    } catch (error) {
        alert("Erro ao analisar o conjunto.");
        console.error(error);
    }
});
