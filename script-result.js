document.addEventListener("DOMContentLoaded", function () {
    
    // Récupération des scores et initialisation des varaibles, catégories et phrases de description
    const X = JSON.parse(localStorage.getItem("scores"));
    const ConsoEnergy = X[0];  // copie de X[0] qui ne sera pas modifiée
    X[0] = 100.3637 * (1 - Math.exp(-0.2 * X[0]));  // transformation de la consommation énergétique en score sur 100
    const totalScore = X.reduce((a, b) => a + b, 0).toFixed(0); // calcul du score total
    const facteurs_emission = {"france": 0.055, "europe": 0.250, "monde": 0.522};  // facteur d'émission pour convertir l'énergie en kgCO2

    const categories = ["Consommation Energétique", "Dépendance", "Morale", "Pertinence de l'utilisation"];  
    const phrases = [
        "Tu connais l'IA ? (Boomer)",
        "Tu es fraîchement défloré de l'IA",
        "Tu trouves l'IA vachement pratique quand même",
        "T'es un étudiant scientifique lambda",
        "Tu ne penses plus par toi-même",
        "Tu es en couple avec chat GPT",
        "Tu es un bandeur d'IA"
    ]; 
   
    // Fonction calcul des Emissions de CO2 et des exemples
    function energy_to_CO2(energy_semaine, facteurs_emission, place) {  // retourne les émissions en kgCO2 sur 6 mois
        return energy_semaine * 26 * facteurs_emission[place];
    }
    function energy_to_phoneCharge(energy_semaine){
        return 10;
    }
    function CO2_to_kmVoiture(kgCO2){
        return 10;
    }
    function CO2_to_treePlanted(kgCO2){
        return 10;
    }

    // Affichage de la phrase de description
    const descriptElement = document.getElementById("descript");
    let phraseIndex;
    if (totalScore < 100) {
        phraseIndex = 0;
    } else if (totalScore < 150) {
        phraseIndex = 1;
    } else if (totalScore < 200) {
        phraseIndex = 2;
    } else if (totalScore < 250) {
        phraseIndex = 3;
    } else if (totalScore < 300) {
        phraseIndex = 4;
    } else if (totalScore < 350) {
        phraseIndex = 5;
    } else {
        phraseIndex = 6;
    }
    descriptElement.innerText = phrases[phraseIndex];


    // Affichage du score total
    const totalScoreElement = document.getElementById("totalScore");
    totalScoreElement.innerText = totalScore;

    if (totalScore < 100) {
        totalScoreElement.style.backgroundColor = "rgb(117, 201, 117)";
    } else if (totalScore < 200) {
        totalScoreElement.style.backgroundColor = "rgb(116, 189, 248)";
    } else if(totalScore < 300) {
        totalScoreElement.style.backgroundColor = "rgb(235, 175, 91)";
    } else {
        totalScoreElement.style.backgroundColor = "rgb(216, 102, 98)";
    }
     
    // Affichage des scores des différentes catégories
    const boxesContainer = document.getElementById("boxes");
    X.forEach((score, index) => {
        
        let box = document.createElement("div");
        box.className = "box";

        if (score < 25) {
            box.style.backgroundColor = "rgb(117, 201, 117)";
        } else if (score < 50) {
            box.style.backgroundColor = "rgb(116, 189, 248)";
        } else if (score < 80) {
            box.style.backgroundColor = "rgb(235, 175, 91)";
        } else {
            box.style.backgroundColor = "rgb(216, 102, 98)";
        }
        
        box.innerText = `${categories[index]} : ${score.toFixed(0)}%`;
        boxesContainer.appendChild(box);
    });
});
