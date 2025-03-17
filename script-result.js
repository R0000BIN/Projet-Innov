document.addEventListener("DOMContentLoaded", function () {
    
    ///////////////////////////////////////////////////////////////
    //////// Récupération des données +  Fonctions de calcul //////

    // Récupération des scores et initialisation des varaibles, catégories et phrases de description
    const X = JSON.parse(localStorage.getItem("scores")); // récupération des scores
    const ConsoEnergy = X[0];  // copie de X[0] qui ne sera pas modifiée
    X[0] = 100.3637 * (1 - Math.exp(-0.2 * X[0]));  // transformation de la consommation énergétique en score sur 100
    const totalScore = X.reduce((a, b) => a + b, 0).toFixed(0); // calcul du score total
    
    const categories = ["Conso Energétique", "Dépendance", "Immoralité", "Non Pertinence"];  
    const phrases = [
        "«Tu ne connais pas encore l'IA ?»",
        "«Tu es fraîchement défloré de l'IA»",
        "«Tu trouves l'IA vachement pratique quand même»",
        "«T'es un étudiant scientifique lambda»",
        "«Tu ne penses plus par toi-même»",
        "«Tu es en couple avec chat GPT»",
        "«Tu es un bandeur d'IA»"
    ];

    // Fonction calcul des Emissions de CO2 et des exemples
    function energy_to_CO2(energy_semaine) {  // retourne les émissions en kgCO2 sur 1 mois
        return energy_semaine * 4 * 0.386;
    }
    function energy_to_phoneCharge(energy_semaine){  // retourne le nombre de charge de téléphone sur 1 mois
        return energy_semaine * 4 / 0.015;
    }
    function energy_to_euros(energy_semaine){  // retourne le coût en euros sur 1 mois
        return energy_semaine * 4 * 0.09299;
    }
    function CO2_to_kmVoiture(kgCO2){  //kgCO2/mois
        return kgCO2 / (137/1000);
    }
    function CO2_to_treePlanted(kgCO2){  //kgCO2/mois
        return kgCO2 * 12 / 25;
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
        box.style.display = "flex";
        box.style.alignItems = "center";
        box.style.justifyContent = "center";
        box.style.fontSize = "18px";

        if (score < 25) {
            box.style.backgroundColor = "rgb(117, 201, 117)";
        } else if (score < 50) {
            box.style.backgroundColor = "rgb(116, 189, 248)";
        } else if (score < 80) {
            box.style.backgroundColor = "rgb(235, 175, 91)";
        } else {
            box.style.backgroundColor = "rgb(216, 102, 98)";
        }
        
        box.innerText = `${categories[index]}: ${score.toFixed(0)}%`;
        boxesContainer.appendChild(box);
    });


    ///////////////////////////////////////////////////////////////
    /////////////////// Affichage container 2 /////////////////////
    // Fonction génération d'un graphe en radar
    // Check if the screen width is less than 600px
    


    function createRadarChart(scores) {

        const isSmallScreen = window.innerWidth < 600;

    // Define labels, splitting them if necessary
        const labels = isSmallScreen
        ? ["", ["Conso","Énergétique"], "", ["Dépendance","à l'IA"], "", ["Immoralité","de l'utilisation"], "", ["Non-Pertinence","de l'utilisation"]]
        : ["", "Consommation Energétique", "", "Dépendance à l'IA", "", "Immoralité de l'utilisation", "", "Non-Pertinence de l'utilisation"];

        const ctx = document.getElementById('radarChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    data: [
                        intermediateScore(scores[0], scores[3]), 
                        scores[0], 
                        intermediateScore(scores[0], scores[1]), 
                        scores[1], 
                        intermediateScore(scores[1], scores[2]), 
                        scores[2], 
                        intermediateScore(scores[2], scores[3]), 
                        scores[3]
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(214, 218, 220)',
                    borderWidth: 2,
                    pointBackgroundColor: function(context) {
                        const label = context.chart.data.labels[context.dataIndex];
                        return label === "" ? 'rgba(0, 0, 0, 0)' : 'rgba(54, 162, 235, 1)';
                    },
                    pointBorderColor: function(context) {
                        const label = context.chart.data.labels[context.dataIndex];
                        return label === "" ? 'rgba(0, 0, 0, 0)' : 'rgba(54, 162, 235, 1)';
                    },
                    pointRadius: function(context) {
                        const label = context.chart.data.labels[context.dataIndex];
                        return label === "" ? 0 : 3;
                    }
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.2)' // Couleur des lignes du diagramme
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)' // Couleur des lignes de la grille
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 1)', // Couleur des labels des points
                            font: {
                                weight: 'bold', // Mettre le texte en gras
                                size: isSmallScreen ? 10 : 14 // Taille du texte des labels
                            }
                        },
                        ticks: {
                            display: true,
                            stepSize: 25, // Affiche seulement 25, 50, 75 et 100
                            color: 'rgba(255, 255, 255, 1)',
                            beginAtZero:true,
                            callback: function(value) { 
                                return value.toFixed(0); // Ensure whole numbers
                            }
                        },
                        min: 0,
                        max: 100,
                        afterDataLimits: (scale) => { scale.max = 100; } // <-- Forces max to 100
                    }
                },
                plugins: {
                    legend: {
                        display: false // Ne pas afficher la légende
                    }
                },
                responsive: true,
                maintainAspectRatio: false // Permet d'augmenter la taille du graphe
            }
        });
    }

    // Fonction calcul score intermédiaire
    function intermediateScore(x, y) {
        // return (x * y * Math.sin(135*Math.PI/180 - Math.asin(y/Math.sqrt(x*x + y*y)))) / Math.sqrt(x*x + y*y);
        return (x * Math.sin(x/Math.sqrt(x*x + y*y))) / Math.sin(135*Math.PI/180 - Math.acos(x/Math.sqrt(x*x + y*y)));
    }
    // Création du graphe radar
    createRadarChart(X);


    ///////////////////////////////////////////////////////////////
    /////////////////// Affichage container 3 /////////////////////

    // Mise à jour des valeurs des exemples
    const conso = document.getElementById('consoE');
    const emissions = document.getElementById('emissionsCO2');
    const prixEuros = document.getElementById('prixEuro');
    const nbrPhoneCharge = document.getElementById('nbrPhoneCharge');
    const kmVoiture = document.getElementById('kmVoiture');
    const nbrArbre = document.getElementById('nbrArbre');

    conso.textContent = (ConsoEnergy*4).toFixed(2); // consommation énergétique sur 1 mois
    emissions.textContent = energy_to_CO2(ConsoEnergy).toFixed(2);
    prixEuros.textContent = energy_to_euros(ConsoEnergy).toFixed(2);
    nbrPhoneCharge.textContent = energy_to_phoneCharge(ConsoEnergy).toFixed(0);
    kmVoiture.textContent = CO2_to_kmVoiture(emissions.textContent).toFixed(0);
    nbrArbre.textContent = CO2_to_treePlanted(emissions.textContent).toFixed(0);
});
