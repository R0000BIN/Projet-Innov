document.addEventListener("DOMContentLoaded", function () {
    const X = JSON.parse(localStorage.getItem("scores"));
    const categories = ["Consommation Energétique", "Dépendance", "Morale", "Pertinence de l'utilisation"];        

    document.getElementById("totalScore").innerText = X.reduce((a, b) => a + b, 0);
            
    const boxesContainer = document.getElementById("boxes");
    X.forEach((score, index) => {
        let box = document.createElement("div");
        box.className = "box";
        if (score < 30) {
            box.style.backgroundColor = "rgb(117, 201, 117)";
        } else if (score < 55) {
            box.style.backgroundColor = "rgb(116, 189, 248)";
        } else if (score < 80) {
            box.style.backgroundColor = "rgb(235, 175, 91)";
        } else {
            box.style.backgroundColor = "rgb(216, 102, 98)";
        }
        box.innerText = `${categories[index]}: ${score}%`;
        boxesContainer.appendChild(box);
    });
});
