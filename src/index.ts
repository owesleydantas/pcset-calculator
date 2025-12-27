import { analizePitchClassSet } from "./api/analyzePitchClassSet.js";

(window as any).pcset = {
    analyze: analizePitchClassSet
}

const input = document.getElementById("pcs-input") as HTMLInputElement;
const button = document.getElementById("analyze-btn") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLElement;

button.addEventListener("click", () => {
    const raw = input.value;

    if (!raw.trim()) {
        output.textContent = "Insira um conjuntode classes de altura.";
        return;
    }

    const values = raw
        .split(",")
        .map(v => Number(v.trim()))
        .filter(v => !Number.isNaN(v));

    if (values.length === 0) {
        output.textContent = "Entrada inválida.";
        return;
    }

    try {
        const result = (window as any).pcset.analyze(values);

        output.textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        output.textContent = "Erro ao analisar o conjunto.";
        console.error(error);
    }
});
