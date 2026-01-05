import { analizePitchClassSet } from "./api/analyzePitchClassSet.js";
import { PitchClassSet } from "./core/PitchClassSet.js";
const transposeSelect = document.getElementById("transpose-select");
const invertSelect = document.getElementById("invert-select");
const outTransposition = document.getElementById("out-transposition");
const outInversion = document.getElementById("out-invertion");
let transposition = 0;
let invertion = 0;
const outPCS = document.getElementById("out-pcs-original");
const outNormal = document.getElementById("out-normal");
const outPrime = document.getElementById("out-prime");
const outICV = document.getElementById("out-icv");
const keyboard = document.getElementById("pc-keyboard");
const clearBtn = document.getElementById("clear-btn");
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
        analyzeAndRender();
    });
    keyboard.appendChild(btn);
}
function getActiveSet() {
    return new PitchClassSet(selectedPCs)
        .transpose(transposition)
        .invert(invertion)
        .pcs;
}
function resetOutput() {
    outPCS.textContent = `[ 0 ]`;
    outTransposition.textContent = `[ 0 ]`;
    outInversion.textContent = `[ 0 ]`;
    outNormal.textContent = `[ 0 ]`;
    outPrime.textContent = `( 0 )`;
    outICV.textContent = `< 0 >`;
}
function getTranspositionSet() {
    const transposed = new PitchClassSet(selectedPCs).transpose(transposition);
    return transposed.toString();
}
function getOutNormalOrder() {
    const normal = analizePitchClassSet(new PitchClassSet(selectedPCs).pcs);
    return `[${normal.normalOrder.join(", ")}]`;
}
function getInversionSet() {
    const inverted = new PitchClassSet(selectedPCs).invert(invertion);
    const invertedNormal = analizePitchClassSet(inverted.pcs);
    return `[${invertedNormal.normalOrder.join(", ")}]`;
}
function analyzeAndRender() {
    if (selectedPCs.length === 0) {
        resetOutput();
        return;
    }
    try {
        const activeSet = getActiveSet();
        const result = analizePitchClassSet(activeSet);
        outPCS.textContent = `[${selectedPCs.join(", ")}]`;
        outTransposition.textContent = getTranspositionSet();
        outInversion.textContent = getInversionSet();
        outNormal.textContent = getOutNormalOrder();
        outPrime.textContent = `(${result.primeForm.join("")})`;
        outICV.textContent = `<${result.intervalVector.join(", ")}>`;
    }
    catch (error) {
        alert("Erro ao analisar o conjunto.");
        console.error(error);
    }
}
clearBtn.addEventListener("click", () => {
    selectedPCs = [];
    transposition = 0;
    transposeSelect.value = "0";
    invertSelect.value = "0";
    outPCS.textContent = `{ 0 }`;
    outNormal.textContent = `[ 0 ]`;
    outPrime.textContent = `( 0 )`;
    outICV.textContent = `< 0 >`;
    document
        .querySelectorAll(".pc-key.active")
        .forEach(btn => btn.classList.remove("active"));
    analyzeAndRender();
});
transposeSelect.addEventListener("change", () => {
    transposition = Number(transposeSelect.value);
    analyzeAndRender();
});
invertSelect.addEventListener("change", () => {
    invertion = Number(invertSelect.value);
    analyzeAndRender();
});
