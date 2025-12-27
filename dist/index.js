import { analizePitchClassSet } from "./api/analyzePitchClassSet.js";
const input = document.getElementById("pcs-input");
const button = document.getElementById("analyze-btn");
const output = document.getElementById("output");
button.addEventListener("click", () => {
    const raw = input.value;
    if (!raw.trim()) {
        output.textContent = "Please enter a pitch class set.";
        return;
    }
    const values = raw
        .split(",")
        .map(v => Number(v.trim()))
        .filter(v => !Number.isNaN(v));
    if (values.length === 0) {
        output.textContent = "Invalid input.";
        return;
    }
    try {
        const result = analizePitchClassSet(values);
        output.textContent = JSON.stringify(result, null, 2);
    }
    catch (error) {
        output.textContent = "Error analyzing pitch class set.";
    }
});
