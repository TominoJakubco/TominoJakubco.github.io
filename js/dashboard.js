const MAX_EC = 60;
const PASS_GRADE = 5.5;

document.addEventListener("DOMContentLoaded", () => {
    const rows = [...document.querySelectorAll("table tr")]
        .filter(row => row.querySelector("td"));

    const bar = document.getElementById("progress-bar");
    const label = document.getElementById("progress-label");

    const courses = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const ec = parseInt(cells[cells.length - 3].textContent.trim(), 10);
        const gradeCell = cells[cells.length - 1];

        const input = document.createElement("input");
        input.type = "number";
        input.min = 0;
        input.max = 10;
        input.step = 0.1;
        input.className = "grade-input";
        input.placeholder = "_";

        gradeCell.textContent = "";
        gradeCell.append(input, " /10");

        input.addEventListener("input", update);

        courses.push({ input, ec });
    });

    function update() {
        let earned = 0;

        courses.forEach(({ input, ec }) => {
            const grade = parseFloat(input.value);
            const passed = !isNaN(grade) && grade >= PASS_GRADE;

            if (passed) earned += ec;

            input.classList.toggle("passed", passed);
            input.classList.toggle("failed", input.value !== "" && !passed);
        });

        bar.style.width = (earned / MAX_EC) * 100 + "%";
        label.textContent = earned + " / " + MAX_EC + " EC";
    }

    update();
});