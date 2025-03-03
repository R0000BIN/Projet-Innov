// Définition des boutons :
let gButton = document.getElementById('gbutton');
let rButton = document.getElementById('rbutton');
let buttons = document.getElementById('buttons');
let divButtons = document.getElementById('DivButtons');


// Définition texte a changer :
let question = document.getElementById('question');
let theme = document.getElementById('theme');

// Thème : Empreinte Carbone
const empreinte_carbone = [
    {name : "Avez-vous déjà utilisé Chat GPT ?", type: "yn", score: 1},
    {name : "Utilisez-vous Chat GPT de manière mensuelle ?", type: "yn", score: 1},
    {name : "Utilisez-vous Chat GPT de manière hebdomadaire ?", type: "yn", score: 1},
    {name : "Combien de requêtes faites-vous par semaine (en moyenne) ?", type: "mul100", score: 1},
    {name : "Avez-vous déjà généré des textes longs (lettre de motivation, mémoire…) ?", type: "yn", score: 1},
    {name : "Combien de fois ?", type: "mul500", score: 1},
    {name : "Avez-vous déjà généré des images/vidéos ?", type: "yn", score: 1},
    {name : "Combien de fois ?", type: "mul500", score: 1},
    {name : "Avez-vous déjà demandé d’effectuer des calculs mathématiques (résoudre des équations, des intégrales ou des problèmes de logique) ?", type: "yn", score: 1},
    {name : "Combien de fois ?", type: "mul500", score: 1},
    {name : "Avez-vous déjà payé pour un abonnement à une IA ?", type: "yn", score: 1},
    {name : "Avez-vous déjà utilisé la version performante de Chat GPT (raisonnement poussé) ?", type: "yn", score: 1},
    {name : "Combien de fois ?", type: "mul500", score: 1},
    {name : "Combien d’IA différentes utilisez-vous ?", type: "mul10", score: 1},
    {name : "Combien de lignes font vos prompts (en moyenne) ?", type:"mul10", score: 1}
];

// Thème : Dépendance à l’IA
const dependance_ia = [
    { name: "Avez-vous déjà utilisé Chat GPT pour faire une tâche que vous pouvez faire sans IA ?", type: "yn", score: 1 },
    { name: "Utilisez-vous Chat GPT pour écrire vos mails à votre place ?", type: "yn", score: 1 },
    { name: "Chat GPT a-t-il déjà fait votre liste de courses ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà flirté avec une IA ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà ressenti des sentiments vis-à-vis de Chat GPT ?", type: "yn", score: 1 },
    { name: "Aujourd’hui, avez-vous plus parlé à une IA qu’à un humain ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà abandonné un projet parce que l’IA ne vous donnait pas les réponses parfaites ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà rêvé que l’IA puisse gérer votre vie ?", type: "yn", score: 1 }
];

// Thème : Éthique et conséquences
const ethique_consequences = [
    { name: "Connaissez-vous l’impact environnemental de l’utilisation de Chat GPT ?", type: "yn", score: 1 },
    { name: "Avez-vous diminué votre utilisation à cause de ça ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà utilisé une IA pour draguer quelqu’un en lui faisant croire que c'était vous qui écriviez ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà demandé à une IA de générer du contenu illégal (recette pour faire des space cookies, images pornographiques) ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà utilisé une IA pour tricher à un examen ou un test ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà utilisé l'IA pour générer des commentaires positifs sur vos propres posts ?", type: "yn", score: 1 }
];

// Thème : Pertinence
const pertinence = [
    { name: "Avez-vous déjà demandé à une IA de faire vos devoirs à votre place ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà posé des questions 'borderline' à Chat GPT ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà généré une image avec une IA juste pour voir des boobs ?", type: "yn", score: 1 },
    { name: "Avez-vous déjà utilisé une IA générative juste pour prouver qu’elle était nulle ?", type: "yn", score: 1 },
    //{ name: "Quelle est la date de naissance de Napoléon Bonaparte ?", type: "date", score: 1 },
    { name: "Avez-vous utilisé l’IA pour répondre à cette question ?", type: "yn", score: 1 }
];

// Tableau contenant toutes les catégories de questions
const categories = [
    { name: "Empreinte Carbone", questions: empreinte_carbone },
    { name: "Dépendance à l'IA", questions: dependance_ia },
    { name: "Éthique et conséquences", questions: ethique_consequences },
    { name: "Pertinence", questions: pertinence }
];


// Variables
var compteur=1;
let score=[0,0,0,0];
let currentCategoryIndex = 0;


// Mise à jour des boutons dynamiquement
function updateButtons(type) {
    divButtons.innerHTML = ""; // Nettoyer les anciens boutons
    divButtons.style.display = "flex";
    divButtons.style.flexDirection = "column";
    divButtons.style.alignItems = "center"; // Centrer les boutons

    if (type === "yn") {
        createButton("OUI", "green", 1);
        createButton("NON", "red", -1);
    }

    if (type === "mul100") {
        createButton("1", "blue", 1);
        createButton("5", "blue", 2);
        createButton("10", "blue", 3);
        createButton("50", "blue", 4);
        createButton("100", "blue", 5);
        createButton("+100", "blue", 6);
    }

    if (type === "mul500") {
        createButton("1", "blue", 1);
        createButton("10", "blue", 2);
        createButton("50", "blue", 3);
        createButton("100", "blue", 4);
        createButton("500", "blue", 5);
        createButton("+500", "blue", 6);
    }

    if (type === "mul10") {
        createButton("1", "blue", 1);
        createButton("2", "blue", 2);
        createButton("5", "blue", 3);
        createButton("10", "blue", 4);
        createButton("+10", "blue", 5);
    }

    if (type === "napoleon") {
        createButton("1789", "blue", 0);
        createButton("1779", "blue", 0);
        createButton("1769", "blue", 1);
    }
}

// Création des boutons avec style
function createButton(text, color, value) {
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

    button.addEventListener("click", () => handleAnswer(value));
    divButtons.appendChild(button);
}


function scoreFinal(score) {
    question.textContent = "Vous êtes arrivés à la fin des questions";
    theme.textContent = "Score Final : ";

    let final = document.createElement("p");
    for (let i = 0; i < categories.length; i++) {
        final.textContent += ""+categories[i].name+" : "+score[i]+" | ";
    }

    buttons.appendChild(final);

}


// Gestion des réponses
function handleAnswer(value) {
    const currentCategory = categories[currentCategoryIndex];
    score[currentCategoryIndex] += value;

    // Vérifier si on doit sauter la prochaine question
    if (value === -1 && (currentCategory.questions[compteur].type === "mul10" || currentCategory.questions[compteur].type ==="mul100" || currentCategory.questions[compteur].type ==="mul500")) {
        compteur ++;
    }

    if (compteur < currentCategory.questions.length) {
        question.textContent = currentCategory.questions[compteur].name;
        theme.textContent = currentCategory.name;
        updateButtons(currentCategory.questions[compteur].type);
        compteur++;
    } else {
        currentCategoryIndex++;
        compteur = 0;

        if (currentCategoryIndex < categories.length) {
            question.textContent = categories[currentCategoryIndex].questions[compteur].name;
            theme.textContent = categories[currentCategoryIndex].name;
            updateButtons(categories[currentCategoryIndex].questions[compteur].type);
            compteur++;
        } else {
            scoreFinal(score);
            divButtons.innerHTML = ""; // Supprimer les boutons à la fin
        }
    }
}

// Initialisation
question.textContent = categories[0].questions[0].name;
theme.textContent = categories[0].name;
updateButtons(categories[0].questions[0].type);




