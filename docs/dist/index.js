import { analizePitchClassSet } from "./api/analyzePitchClassSet.js";
window.pcset = {
    analyze: analizePitchClassSet
};
const input = document.getElementById("pcs-input");
const button = document.getElementById("analyze-btn");
const output = document.getElementById("output");
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
        const result = window.pcset.analyze(values);
        output.textContent = JSON.stringify(result, null, 2);
    }
    catch (error) {
        output.textContent = "Erro ao analisar o conjunto.";
        console.error(error);
    }
});
