const tour = document.querySelector("#tour");
const alert = document.querySelector(".alert");
const messageJ1 = document.querySelector("#j1");
const messageJ2 = document.querySelector("#j2");
let joueurEnCours = 1;
let finJeu = false;

let pointJ1 = 0;
let pointJ2 = 0;

let isIAON = false;

initialisationTableau();
// placeForTest(0);
// placeForTest(6);
// placeForTest(2);
// placeForTest(4);
// placeForTest(3);
// placeForTest(3);
// placeForTest(4);
// placeForTest(3);
// placeForTest(4);
// placeForTest(4);
// placeForTest(5);
// placeForTest(2);
function startIA() {
  isIAON = !isIAON;
}

function jouer(colonne) {
  jouerCase(colonne);
  if (isIAON) {
    colonneIA = IA.choixColonne();
    jouerCase(colonneIA);
  }
}

function placeForTest(colonne) {
  jouer(colonne);
}

// function intro() {
//   let txt =
//     "*********************************************************************\n";
//   txt +=
//     "********************* Bienvenue sur Puissance 4 ********************* \n";
//   txt +=
//     "*********************************************************************";
//   console.log(txt);
// }

// function choixCaractere(joueur) {
//   let txt = 'Veuillez choisir le caractère pour joueur' + joueur + ' :'
//   return toolbox.saisieString(txt);
// }

/**
 * Fonction permettant à un joueur de jouer une case
 * retourne true si le joueur a gagné
 * @param {Number} joueur
 * @returns
 */
function jouerCase(colonne) {
  if (!finJeu) {
    let ligneVide = jeu.retournerLigneCaseVideColonne(colonne);
    jeu.jouerCase(joueurEnCours, ligneVide, colonne);
    jeu.afficherPuissance4();
    if (jeu.verificationFinduJeu(joueurEnCours)) {
      gererFinJeu();
    }

    if (joueurEnCours === 1) {
      joueurEnCours = 2;
      tour.innerHTML = "Tour du joueur 2";
    } else {
      joueurEnCours = 1;
      tour.innerHTML = "Tour du joueur 1";
    }
  }
}

function initialisationTableau() {
  finJeu = false;
  joueurEnCours = 1;
  alert.classList.add("d-none");
  let contentJ1 =
    "<img src='./images/J1.png' class='bg-danger rounded-circle' /><br>";
  contentJ1 += pointJ1;
  messageJ1.innerHTML = contentJ1;
  let contentJ2 =
    "<img src='./images/J2.png' class='bg-info rounded-circle' /><br>";
  contentJ2 += pointJ2;
  messageJ2.innerHTML = contentJ2;

  jeu.initialisation();
  jeu.afficherPuissance4();
}

function gererFinJeu() {
  finJeu = true;

  let contentAlert = "Fin du jeu, le gagnant est " + joueurEnCours + "<br />";
  contentAlert +=
    '<button type="button" class="btn btn-primary" onClick = initialisationTableau() >Recommencer</button>';
  alert.innerHTML = contentAlert;
  alert.classList.remove("d-none");
  if (joueurEnCours === 1) {
    pointJ1++;
  } else {
    pointJ2++;
  }
}
