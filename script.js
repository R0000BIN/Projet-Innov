// Définition des boutons :
let gButton = document.getElementById('gbutton');
let rButton = document.getElementById('rbutton');
let buttons = document.getElementById('buttons');
let divButtons = document.getElementById('DivButtons');


// Définition texte a changer :
let question = document.getElementById('question');
//question.style.fontFamily = "'Comic Sans MS', cursive, sans-serif"; // Modifier la police des questions
let theme = document.getElementById('theme');

// Thème : Empreinte Carbone
const conso_energetique = [
    {name : "Utilisez-vous une IA générative : au moins une fois par mois ?", type: "yn", score: 0.0001},
    {name : "Utilisez-vous une IA générative : au moins une fois par semaine ?", type: "yn", score: 0.0001},
    {name : "Combien de requêtes faites-vous par semaine (en moyenne) ?", type: "mulSemaine", score: 0.01},
    {name : "Avez-vous déjà généré des textes longs (lettre de motivation, mémoire…) ?", type: "yn", score: 0.0001},
    {name : "Combien de fois ?", type: "mulLong", score: 0.0004},
    {name : "Avez-vous déjà généré des vidéos ?", type: "yn", score: 0.0001},
    {name : "Combien de fois ?", type: "mulImage", score: 0.02},
    {name : "Avez-vous déjà demandé d’effectuer des calculs mathématiques (résoudre des équations, des intégrales ou des problèmes de logique) ?", type: "yn", score: 0.0001},
    {name : "Combien de fois ?", type: "mulMaths", score: 0.002},
    {name : "Avez-vous déjà utilisé la version performante de Chat GPT (version Premium) ET/OU généré des images ?", type: "yn", score: 0.0001},
    {name : "Combien de fois ?", type: "mulPousse", score: 0.008},
    {name : "Combien d’IA différentes utilisez-vous ?", type: "mul10", score: 0.01},
    {name : "Combien de lignes font vos prompts (en moyenne) ?", type:"mul10", score: 0.01}
];

// Thème : Dépendance à l’IA
const dependance_ia = [
    {name : "Avez-vous déjà utilisé Chat GPT ?", type: "yn", score: 0},
    { name: "Avez-vous déjà utilisé Chat GPT pour faire une tâche que vous pouvez faire sans IA ?", type: "yn", score: 4},
    { name: "Utilisez-vous Chat GPT pour écrire vos mails à votre place ?", type: "yn", score: 8},
    { name: "Chat GPT a-t-il déjà fait votre liste de courses ?", type: "yn", score: 4},
    { name: "Avez-vous déjà abandonné un projet parce que l’IA ne vous donnait pas les réponses parfaites ?", type: "yn", score: 12},
    { name: "Avez-vous déjà rêvé que l’IA puisse gérer votre vie ?", type: "yn", score: 14},
    { name: "Avez-vous entendu parlé des IA dites sociales (IA snapchat, CrushOn AI…)?", type: "yn", score: 12},
    { name: "Aujourd’hui, avez-vous plus parlé à une IA qu’à un humain ?", type: "yn", score: 12},
    { name: "Avez-vous déjà flirté avec une IA ?", type: "yn", score: 12},
    { name: "Avez-vous déjà utilisé une IA pour draguer quelqu’un en lui faisant croire que c'était vous qui écriviez ?", type: "yn", score: 8},
    { name: "Avez-vous déjà ressenti des sentiments vis-à-vis de Chat GPT ?", type: "yn", score: 14}
];

// Thème : Éthique et conséquences
const ethique_consequences = [
    { name: "Connaissez-vous l’impact environnemental de l’utilisation de Chat GPT ?", type: "ny", score: 4},
    { name: "Combien pensez-vous qu’une requête standard à ChatGPT émet ?", type: "emission", score: 3},
    { name: "Avez-vous diminué votre utilisation à cause de ça ?", type: "ny", score: 8},
    { name: "Avez-vous déjà utilisé une IA pour tricher à un examen ou un test ?", type: "yn", score: 16},
    { name: "Avez-vous déjà utilisé l'IA pour générer des commentaires positifs sur vos propres posts ?", type: "yn", score: 4},
    { name: "Combien de fois ?", type: "mulTriche", score: 2},
    { name: "Avez-vous déjà demandé à une IA de générer du contenu illégal (recette pour faire des space cookies, comment faire une bombe...) ?", type: "yn", score: 20}
];

// Thème : Pertinence
const pertinence = [
    {name : "Avez-vous déjà payé pour un abonnement à une IA ?", type: "yn", score: 4}, 
    { name: "Avez-vous déjà demandé à une IA de faire vos devoirs à votre place ?", type: "yn", score: 12},
    { name: "Avez-vous déjà utilisé une IA générative juste pour prouver qu’elle était nulle ?", type: "yn", score: 8},
    { name: "Avez-vous déjà posé des questions 'borderline' à Chat GPT ?", type: "yn", score: 16},
    { name: "Avez-vous déjà généré une image avec une IA juste pour voir des boobs ?", type: "yn", score: 20},
    { name: "Quelle est la date de naissance de Napoléon Bonaparte ?", type: "napoleon", score: 4},
    { name: "Avez-vous utilisé l’IA pour répondre à cette question ?", type: "yn", score: 20},
    { name: "Avez-vous effectué un des actes de ce test exprès pour améliorer votre score ?", type: "yn", score: 16}
];

// Tableau contenant toutes les catégories de questions
const categories = [
    { name: "Thème : Dépendance à l'IA", questions: dependance_ia },
    { name: "Thème : Consommation Energétique", questions: conso_energetique },
    { name: "Thème : Éthique et conséquences", questions: ethique_consequences },
    { name: "Thème : Pertinence", questions: pertinence }
];


// Variables
var compteur=0;
let score=[0.0,0.0,0.0,0.0];
let currentCategoryIndex = 0;


// Mise à jour des boutons dynamiquement
function updateButtons(type,Qscore) {
    divButtons.innerHTML = ""; // Nettoyer les anciens boutons
    divButtons.style.display = "flex";
    divButtons.style.flexDirection = "column";
    divButtons.style.alignItems = "center"; // Centrer les boutons

    if (type === "yn") {
        createButton("OUI", "rgb(93, 193, 93)", "rgb(75, 156, 75)", Qscore);
        createButton("NON", "rgb(217, 83, 79)", "rgb(176, 68, 64)", 0);
    }    

    if (type === "ny") {
        createButton("OUI", "rgb(93, 193, 93)", "rgb(75, 156, 75)", 0);
        createButton("NON", "rgb(217, 83, 79)", "rgb(176, 68, 64)", Qscore);
    }

    if (type === "mulSemaine") {
        createButton("1 à 5", "rgb(78,170,247)", "rgb(37, 150, 190)", 2.5*Qscore);
        createButton("5 à 10", "rgb(78,170,247)", "rgb(37, 150, 190)", 7.5*Qscore);
        createButton("10 à 50", "rgb(78,170,247)", "rgb(37, 150, 190)", 25*Qscore);
        createButton("50 à 100", "rgb(78,170,247)", "rgb(37, 150, 190)", 75*Qscore);
        createButton("+100", "rgb(78,170,247)", "rgb(37, 150, 190)", 1.5);
    }

    if (type === "mulImage") {
        createButton("1 à 10", "rgb(78,170,247)", "rgb(37, 150, 190)", 5*Qscore);
        createButton("10 à 50", "rgb(78,170,247)", "rgb(37, 150, 190)", 25*Qscore);
        createButton("50 à 100", "rgb(78,170,247)", "rgb(37, 150, 190)", 75*Qscore);
        createButton("100 à 500", "rgb(78,170,247)", "rgb(37, 150, 190)", 250*Qscore);
        createButton("+500", "rgb(78,170,247)", "rgb(37, 150, 190)", 15);
    }

    if (type === "mulLong") {
        createButton("1 à 10", "rgb(78,170,247)", "rgb(37, 150, 190)", 5*Qscore);
        createButton("10 à 50", "rgb(78,170,247)", "rgb(37, 150, 190)", 25*Qscore);
        createButton("50 à 100", "rgb(78,170,247)", "rgb(37, 150, 190)", 75*Qscore);
        createButton("100 à 500", "rgb(78,170,247)", "rgb(37, 150, 190)", 250*Qscore);
        createButton("+500", "rgb(78,170,247)", "rgb(37, 150, 190)", 0.3);
    }

    if (type === "mulMaths") {
        createButton("1 à 10", "rgb(78,170,247)", "rgb(37, 150, 190)", 5*Qscore);
        createButton("10 à 50", "rgb(78,170,247)", "rgb(37, 150, 190)", 25*Qscore);
        createButton("50 à 100", "rgb(78,170,247)", "rgb(37, 150, 190)", 75*Qscore);
        createButton("100 à 500", "rgb(78,170,247)", "rgb(37, 150, 190)", 250*Qscore);
        createButton("+500", "rgb(78,170,247)", "rgb(37, 150, 190)", 1.5);
    }

    if (type === "mulPousse") {
        createButton("1 à 10", "rgb(78,170,247)", "rgb(37, 150, 190)", 5*Qscore);
        createButton("10 à 50", "rgb(78,170,247)", "rgb(37, 150, 190)", 25*Qscore);
        createButton("50 à 100", "rgb(78,170,247)", "rgb(37, 150, 190)", 75*Qscore);
        createButton("100 à 500", "rgb(78,170,247)", "rgb(37, 150, 190)", 250*Qscore);
        createButton("+500", "rgb(78,170,247)", "rgb(37, 150, 190)", 5.8);
    }

    if (type === "mul10") {
        createButton("1", "rgb(78,170,247)", "rgb(37, 150, 190)", 1*Qscore);
        createButton("2", "rgb(78,170,247)", "rgb(37, 150, 190)", 2*Qscore);
        createButton("5", "rgb(78,170,247)", "rgb(37, 150, 190)", 5*Qscore);
        createButton("10", "rgb(78,170,247)", "rgb(37, 150, 190)", 10*Qscore);
        createButton("+10", "rgb(78,170,247)", "rgb(37, 150, 190)", 1.5);
    }

    if (type === "mulTriche") {
        createButton("1", "rgb(78,170,247)", "rgb(37, 150, 190)", 1*Qscore);
        createButton("2", "rgb(78,170,247)", "rgb(37, 150, 190)", 2*Qscore);
        createButton("5", "rgb(78,170,247)", "rgb(37, 150, 190)", 5*Qscore);
        createButton("10", "rgb(78,170,247)", "rgb(37, 150, 190)", 10*Qscore);
        createButton("+10", "rgb(78,170,247)", "rgb(37, 150, 190)", 40);
    }

    if (type === "napoleon") {
        createButton("1789", "rgb(78,170,247)", "rgb(37, 150, 190)", 0);
        createButton("1779", "rgb(78,170,247)", "rgb(37, 150, 190)", 0);
        createButton("1769", "rgb(78,170,247)", "rgb(37, 150, 190)", Qscore);
    }

    if (type === "emission") {
        createButton("2g (4 emails)", "rgb(78,170,247)", "rgb(37, 150, 190)", 7);
        createButton("7g (Production d'une fraise sous serre", "rgb(78,170,247)", "rgb(37, 150, 190)", 4);
        createButton("15g (6km en TGV)", "rgb(78,170,247)", "rgb(37, 150, 190)", 1);
        createButton("30g (1 épisode de GameOfThrones en streaming)", "rgb(78,170,247)", "rgb(37, 150, 190)", 3);
        createButton("50g (30 min d'utilisation d'un grille pain)", "rgb(78,170,247)", "rgb(37, 150, 190)", 2);

    }
}

// Création des boutons avec style
function createButton(text, color, modified_color, value) {
    let button = document.createElement("button");
    button.textContent = text;
    button.style.backgroundColor = color;
    button.style.color = "white";
    button.style.padding = "15px";
    button.style.margin = "5px 0";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.display = "block"; // Empiler verticalement
    button.style.fontFamily = "'Arial', sans-serif"; // Choix de la police
    button.style.fontWeight = "bold"; // Mettre en gras

    // Modification de la couleur des boutons avec passage de souris
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = modified_color;
    });
    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = color;
    });
    button.addEventListener("click", () => handleAnswer(value));
    divButtons.appendChild(button);
}

// Création du bouton pour rediriger vers la page result.html
function createRedirectButton() {
    let redirectButton = document.createElement("button");
    redirectButton.textContent = "Voir les résultats";
    redirectButton.style.backgroundColor = "rgb(78,170,247)";
    redirectButton.style.color = "white";
    redirectButton.style.padding = "15px";
    redirectButton.style.margin = "20px 0";
    redirectButton.style.border = "none";
    redirectButton.style.borderRadius = "5px";
    redirectButton.style.cursor = "pointer";
    redirectButton.style.fontFamily = "'Arial', sans-serif";
    redirectButton.style.fontWeight = "bold";

    // Modification de la couleur des boutons avec passage de souris
    redirectButton.addEventListener("mouseover", () => {
        redirectButton.style.backgroundColor = "rgb(37, 150, 190)";
    });
    redirectButton.addEventListener("mouseout", () => {
        redirectButton.style.backgroundColor = color;
    });

    // Redirection vers la page result.html
    redirectButton.addEventListener("click", () => {
        window.location.href = "result.html";
    });
    buttons.appendChild(redirectButton);
}


function scoreFinal(score) {
    localStorage.setItem("scores", JSON.stringify(score)); // Sauvegarde score dans localStorage
    question.textContent = "Vous êtes arrivés à la fin des questions";
    theme.textContent = "Score Final : ";
    let final = document.createElement("p");
    
    theme.remove();

    buttons.appendChild(final);

    divButtons.innerHTML = ""; // Supprimer les boutons à la fin

    createRedirectButton();   // Appel de la fonction pour créer le bouton de redirection à la fin du test

}

// Gestion des réponses
function handleAnswer(value) {
    const currentCategory = categories[currentCategoryIndex];
    score[currentCategoryIndex] += value;

    compteur++;

    // Vérifier si on doit sauter la prochaine question
    if (value === 0 && compteur < currentCategory.questions.length) {
        if (currentCategory.questions[compteur].type.startsWith("mul")) {
            compteur++;
        }
    }

    if (value>0 && compteur < currentCategory.questions.length) {
        if (currentCategory.questions[compteur].name==="Avez-vous diminué votre utilisation à cause de ça ?") {
            compteur++;
        }
    }

    if (compteur < currentCategory.questions.length) {
        question.textContent = currentCategory.questions[compteur].name;
        theme.textContent = currentCategory.name;
        updateButtons(currentCategory.questions[compteur].type,currentCategory.questions[compteur].score);
    } else {
        currentCategoryIndex++;
        compteur = 0;

        if (currentCategoryIndex < categories.length) {
            const nextCategory = categories[currentCategoryIndex];
            question.textContent = nextCategory.questions[compteur].name;
            theme.textContent = nextCategory.name;
            updateButtons(nextCategory.questions[compteur].type,nextCategory.questions[compteur].score);
        } else {
            scoreFinal(score);
            
        }
    }
}

// Initialisation
question.textContent = categories[0].questions[0].name;
theme.textContent = categories[0].name;
updateButtons(categories[0].questions[0].type,categories[0].questions[0].score);
