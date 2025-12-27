import { analizePitchClassSet } from "./api/analyzePitchClassSet.js";
const input = document.getElementById("pcs-input");
const button = document.getElementById("analyze-btn");
const outPCS = document.getElementById("out-pcs");
const outNormal = document.getElementById("out-normal");
const outPrime = document.getElementById("out-prime");
const outICV = document.getElementById("out-icv");
const keyboard = document.getElementById("pc-keyboard");
const clearBtn = document.getElementById("clear-btn");
const displayPlaceHolder = document.getElementById("display-placeholder");
let selectedPCs = [];
for (let pc = 0; pc < 12; pc++) {
    const btn = document.createElement("button");
    btn.textContent = pc.toString();
    btn.dataset.pc = pc.toString();
    btn.classList.add("pc-key");
    btn.addEventListener("click", () => {
        if (selectedPCs.includes(pc)) {
            selectedPCs = selectedPCs.filter(x => x !== pc);
            btn.classList.remove("active");
        }
        else {
            selectedPCs.push(pc);
            btn.classList.add("active");
        }
        syncInput();
    });
    keyboard.appendChild(btn);
}
function syncInput() {
    input.value = selectedPCs.join(", ");
}
clearBtn.addEventListener("click", () => {
    selectedPCs = [];
    input.value = "";
    outPCS.textContent = `{ 0 }`;
    outNormal.textContent = `[ 0 ]`;
    outPrime.textContent = `( 0 )`;
    outICV.textContent = `< 0 >`;
    document
        .querySelectorAll(".pc-key.active")
        .forEach(btn => btn.classList.remove("active"));
});
button.addEventListener("click", () => {
    const raw = input.value;
    if (!raw.trim()) {
        alert("Insira um conjunto de classes de altura.");
        return;
    }
    const values = selectedPCs.length > 0
        ? selectedPCs
        : raw
            .split(",")
            .map(v => Number(v.trim()))
            .filter(v => !Number.isNaN(v));
    if (values.length === 0) {
        alert("Entrada inválida.");
        return;
    }
    try {
        const result = analizePitchClassSet(values);
        outPCS.textContent = `{${result.pcs.join(", ")}}`;
        outNormal.textContent = `[${result.normalOrder.join(", ")}]`;
        outPrime.textContent = `(${result.primeForm.join("")})`;
        outICV.textContent = `<${result.intervalVector.join(", ")}>`;
    }
    catch (error) {
        alert("Erro ao analisar o conjunto.");
        console.error(error);
    }
});
