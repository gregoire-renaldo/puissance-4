const tour = document.querySelector("#tour");
const alert = document.querySelector(".alert");
var joueurEnCours = 1;
var finJeu = false;

jeu.initialisation();
jeu.afficherPuissance4();

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
function jouer(colonne) {
  if (!finJeu) {
    var ligneVide = jeu.retournerLigneCaseVideColonne(colonne);
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

function gererFinJeu() {
  finJeu = true
  alert.innerHTML = "Fin du jeu"
  alert.classList.remove("d-none")
}
