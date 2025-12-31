import { analizePitchClassSet } from "./api/analyzePitchClassSet.js";
import { mod } from "./utils/mod.js";

const input = document.getElementById("pcs-input") as HTMLInputElement;
const transposeSelect = document.getElementById("transpose-select") as HTMLSelectElement;
let transposition = 0;

const outPCS = document.getElementById("out-pcs")!;
const outNormal = document.getElementById("out-normal")!;
const outPrime = document.getElementById("out-prime")!;
const outICV = document.getElementById("out-icv")!;

const keyboard = document.getElementById("pc-keyboard")!;
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;

const transoseIndicator = document.getElementById("transpose-indicator")!;

let selectedPCs: number[] = [];

for (let pc = 0; pc < 12; pc++) {
    const btn = document.createElement("button");
    btn.textContent = pc.toString();
    btn.dataset.pc = pc.toString();
    btn.classList.add("pc-key");

    btn.addEventListener("click", () => {
        if (selectedPCs.includes(pc))  {
            selectedPCs = selectedPCs.filter(x => x !== pc);
            btn.classList.remove("active");
        } else {
            selectedPCs.push(pc);
            btn.classList.add("active")
        }

        syncInput();
        analyzeAndRender();
    });

    keyboard.appendChild(btn);
}

function syncInput() {
    input.value = selectedPCs.join(", ")
}

function getTransposedSet(): number[] {
    return selectedPCs.map(pc => mod(pc + transposition, 12))
}

function analyzeAndRender() {
    if (selectedPCs.length === 0) {
        outPCS.textContent = `[ 0 ]`;
        outNormal.textContent = `[ 0 ]`;
        outPrime.textContent = `( 0 )`;
        outICV.textContent = `< 0 >`;

        transoseIndicator.classList.add("hidden");
        return;
    }

    try {
        const transposed = getTransposedSet();
        
        const result = analizePitchClassSet(transposed);

        outPCS.textContent = `[${selectedPCs.join(", ")}]`;
        outNormal.textContent = `[${result.normalOrder.join(", ")}]`;
        outPrime.textContent = `(${result.primeForm.join("")})`;
        outICV.textContent = `<${result.intervalVector.join(", ")}>`;

        if (transposition ===  0) {
            transoseIndicator.classList.add("hidden");
        } else {
            transoseIndicator.textContent = `T${transposition}`;
            transoseIndicator.classList.remove("hidden");
        }

    } catch (error) {
        alert("Erro ao analisar o conjunto.");
        console.error(error);
    }
}

clearBtn.addEventListener("click", () => {
    selectedPCs = [];
    input.value = "";
    transposition = 0;
    transposeSelect.value = "0";

    outPCS.textContent = `{ 0 }`;
    outNormal.textContent = `[ 0 ]`;
    outPrime.textContent = `( 0 )`;
    outICV.textContent = `< 0 >`;

    document
        .querySelectorAll(".pc-key.active")
        .forEach(btn => btn.classList.remove("active"));

    analyzeAndRender();
})

transposeSelect.addEventListener("change", () => {
    transposition = Number(transposeSelect.value);
    analyzeAndRender();
})
