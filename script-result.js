document.addEventListener("DOMContentLoaded", function () {
    
    ///////////////////////////////////////////////////////////////
    //////// Récupération des données +  Fonctions de calcul //////

    // Récupération des scores et initialisation des varaibles, catégories et phrases de description
    const X = JSON.parse(localStorage.getItem("scores")); // récupération des scores
    const ConsoEnergy = X[0];  // copie de X[0] qui ne sera pas modifiée
    X[0] = 100.3637 * (1 - Math.exp(-0.2 * X[0]));  // transformation de la consommation énergétique en score sur 100
    const totalScore = X.reduce((a, b) => a + b, 0).toFixed(0); // calcul du score total
    const facteurs_emission = {"france": 0.055, "europe": 0.250, "monde": 0.522};  // facteur d'émission pour convertir l'énergie en kgCO2
    
    const categories = ["Consommation Energétique", "Dépendance", "Morale", "Pertinence de l'utilisation"];  
    const phrases = [
        "Tu ne connais pas encore l'IA ?",
        "Tu es fraîchement défloré de l'IA",
        "Tu trouves l'IA vachement pratique quand même",
        "T'es un étudiant scientifique lambda",
        "Tu ne penses plus par toi-même",
        "Tu es en couple avec chat GPT",
        "Tu es un bandeur d'IA"
    ]; 

    // Fonction calcul des Emissions de CO2 et des exemples
    function energy_to_CO2(energy_semaine, facteurs_emission, place) {  // retourne les émissions en kgCO2 sur 1 mois
        return energy_semaine * 4 * facteurs_emission[place];
    }
    function energy_to_phoneCharge(energy_semaine){
        return 10;
    }
    function CO2_to_kmVoiture(kgCO2){  //kgCO2/mois
        return 10;
    }
    function CO2_to_treePlanted(kgCO2){  //kgCO2/mois
        return 10;
    }


    ///////////////////////////////////////////////////////////////
    /////////////////// Affichage container 1 /////////////////////

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


    ///////////////////////////////////////////////////////////////
    /////////////////// Affichage container 2 /////////////////////
    // Fonction génération d'un graphe en radar
    function createRadarChart(scores) {
        const ctx = document.getElementById('radarChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ["Consommation Energétique", "Dépendance", "Morale", "Pertinence de l'utilisation"],
                datasets: [{
                    label: 'Scores',
                    data: scores,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(214, 218, 220)',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(54, 162, 235, 0.5)' // Couleur des lignes du diagramme
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.5)' // Couleur des lignes de la grille
                        },
                        pointLabels: {
                            color: 'rgba(54, 162, 235, 1)' // Couleur des labels des points
                        },
                        ticks: {
                            display: true,
                            stepSize: 25, // Affiche seulement 25, 50, 75 et 100
                            color: 'rgba(54, 162, 235, 1)',
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                responsive: true,
                maintainAspectRatio: false // Permet d'augmenter la taille du graphe
            }
        });

    }
    // Création du graphe radar
    createRadarChart(X);


    ///////////////////////////////////////////////////////////////
    /////////////////// Affichage container 3 /////////////////////
    
    // Liste déroulante pour choisir le lieu de vie
    const lieuVieSpan = document.getElementById('lieuVie');   // Sélectionner l'élément span par son ID
    const select = document.createElement('select'); // Créer un élément select
    select.id = 'lieuSelect';

    const lieux = Object.keys(facteurs_emission);  // liste des lieux pour lesquels on peut calculer les émissions
    lieux.forEach(optionText => {
        const lieux = document.createElement('option');
        lieux.value = optionText;
        lieux.textContent = optionText;
        select.appendChild(lieux);
    });
    lieuVieSpan.innerHTML = '';  // Remplacer le contenu du span par le select
    lieuVieSpan.appendChild(select);

    select.addEventListener('change', function() {  // Ajouter un gestionnaire d'événements pour détecter les changements de sélection
        const selectedValue = select.value;
        console.log('Lieu sélectionné :', selectedValue); // on peut utiliser selectedValue pour faire ce qu'on veut de la valeur selectionnée
    });

    // Fonction pour mettre à jour les valeurs des exemples
    function updateValues(selectedValue) {
        // Sélectionne les éléments par leur ID
        const conso = document.getElementById('consoE');
        const emissions = document.getElementById('emissionsCO2');
        const nbrPhoneCharge = document.getElementById('nbrPhoneCharge');
        const kmVoiture = document.getElementById('kmVoiture');
        const nbrArbre = document.getElementById('nbrArbre');

        // Met à jour le contenu des éléments
        conso.textContent = ConsoEnergy*4; // consommation énergétique sur 1 mois
        emissions.textContent = energy_to_CO2(ConsoEnergy, facteurs_emission, selectedValue);
        nbrPhoneCharge.textContent = energy_to_phoneCharge(ConsoEnergy);
        kmVoiture.textContent = CO2_to_kmVoiture(energy_to_CO2(emissions));
        nbrArbre.textContent = CO2_to_treePlanted(energy_to_CO2(emissions));
    }

    // Appelle la fonction pour mettre à jour les valeurs lorsque le document est chargé
    window.onload = updateValues(selectedValue);
});
