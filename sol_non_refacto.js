// https://ecole.h2prog.com/courses/597531/lectures/10717293

// var
// La portée de la variable est celle du contexte dans lequel elle est déclarée :
// - Si elle est déclarée dans une fonction, la portée est celle de la fonction, qu’importe le bloc dans lequel elle se trouve.
// - Si elle est déclarée hors d’une fonction, la portée sera celle du contexte global.

// let
// sa portée : elle est limité à celle du bloc courant.
// Pour rappel, un bloc en Javascript, c’est ce qu’on retrouve entre accolades : une comparaison en if, une boucle while etc…

const readline = require("readline-sync");

let puissance4 = [];
const nbColonne = 7;
const nbLigne = 6;
const carJ1 = choixCaractere(1);
const carJ2 = choixCaractere(2);
intro();

puissance4 = initialiserTableauVide(nbLigne, nbColonne, 0);
afficherPuissance4(puissance4, carJ1, carJ2);

/*
Tant que pasTerminé
joueur1 joue
joueur2 joue
Fin tant que
 */

function intro() {
  let txt =
    "*********************************************************************\n";
  txt +=
    "********************* Bienvenue sur Puissance 4 ********************* \n";
  txt +=
    "*********************************************************************";
  console.log(txt);
}

function choixCaractere(joueur) {
  let txt = "Veuillez choisir le caractère pour joueur" + joueur + " :";
  return saisieString(txt);
}

function saisieString(txt) {
  return readline.question(txt);
}

while (true) {
  if (jouerCase(1)) {
    console.log("Joueur 1  a gagné");
    break;
  }
  if (jouerCase(2)) {
    console.log("Joueur 2  a gagné");
    break;
  }
}

/**
 * Fonction permettant à un joueur de jouer une case
 * retourne true si le joueur a gagné
 * @param {Number} joueur
 * @returns
 */
function jouerCase(joueur) {
  var ligneVide = -1;
  var colonne = -1;
  while (ligneVide === -1 || colonne <= 0 || colonne > 7) {
    console.log("chosir une colonne qui a un emplacement vide");
    var colonne = saisirColonne();
    var ligneVide = retournerLigneCaseVideColonne(colonne);
    // si ligne pleine, on retorune -1 pour stopper la boucle
  }
  puissance4[ligneVide][colonne - 1] = joueur;
  afficherPuissance4(puissance4, carJ1, carJ2);
  return verificationFinduJeu(joueur);
}

/**
 * Fonction permettant de saisir une colonne
 * @returns
 */
function saisirColonne() {
  // readline retourne une string, donc parseInt pour integer
  return parseInt(saisieString("Quelle colonne ?"));
}

/**
 * fonction permettant de retourner la premiere ligne d'une colonne
 * @param {Number} colonne retourne - 1 si colonne est pleine
 * @returns
 */
function retournerLigneCaseVideColonne(colonne) {
  for (let i = nbLigne - 1; i >= 0; i--) {
    // i = ligne
    if (verifCaseVide(i, colonne)) return i;
  }
  return -1;
}

/**
 * fonction pour verifier si cellule vide
 * @param {Number} ligne
 * @param {Number} colonne
 * @returns
 */
function verifCaseVide(ligne, colonne) {
  // boolean renvoyé
  return puissance4[ligne][colonne - 1] === 0;
}

function verificationFinduJeu(joueur) {
  console.log("dans verif fin du jeu");
  if (
    verifLigneFinJeu(joueur) ||
    verifColonneFinJeu(joueur) ||
    verifDiagonaleFinJeu(joueur)
  ) {
    return true;
  }
  return false;
}

/**
 * fonction permettent de verifier si un joueur a gagné sur une ligne
 * @param {Integer} joueur
 * @returns
 */
// ontest le caractere du joueur pour ne pas tester lignes vides et car
function verifLigneFinJeu(joueur) {
  for (let i = nbLigne - 1; i >= 0; i--) {
    for (j = 0; j < nbColonne - 3; j++) {
      if (
        puissance4[i][j] === joueur &&
        puissance4[i][j + 1] === joueur &&
        puissance4[i][j + 2] === joueur &&
        puissance4[i][j + 3] === joueur
      )
        return true;
    }
  }
  return false;
}

function verifColonneFinJeu(joueur) {
  for (let i = 0; i < nbColonne; i++) {
    for (let j = nbLigne - 4; j >= 0; j--) {
      if (
        puissance4[j][i] === joueur &&
        puissance4[j + 1][i] === joueur &&
        puissance4[j + 2][i] === joueur &&
        puissance4[j + 3][i] === joueur
      )
        return true;
    }
  }
}

/**
 * fonction pour voir si joueur a gagné en diago
 * @param {Number} joueur
 * @returns
 */
function verifDiagonaleFinJeu(joueur) {
  for (let i = nbLigne - 1; i >= 3; i--) {
    for (j = 0; j < nbColonne; j++) {
      if (
        puissance4[i][j] === joueur &&
        puissance4[i - 1][j + 1] === joueur &&
        puissance4[i - 2][j + 2] === joueur &&
        puissance4[i - 3][j + 3] === joueur
      )
        return true;
      if (
        puissance4[i][j] === joueur &&
        puissance4[i - 1][j - 1] === joueur &&
        puissance4[i - 2][j - 2] === joueur &&
        puissance4[i - 3][j - 3] === joueur
      )
        return true;
    }
  }
  return false;
}

/**
 * Init tableau de tableau en fonction d'un nombre de lligne et de col
 * @param {Number} nbLigne
 * @param {Number} nbColonne
 * @param {*} car
 */
function initialiserTableauVide(nbLigne, nbColonne, car = "") {
  let tab = [];
  for (let i = 0; i < nbLigne; i++) {
    let ligne = [];
    for (let j = 0; j < nbColonne; j++) {
      ligne.push(car);
    }
    tab.push(ligne);
  }
  return tab;
}

/**
 * Afficher un tableau de puissance4
 * @param {Array <String> } tab  tableau de car
 * @param {String} carJ1 le car de J1
 * @param {String} carJ2 le car de  J2
 */
function afficherPuissance4(tab, carJ1, carJ2) {
  for (let i = 0; i < tab.length; i++) {
    let ligne = "";
    for (let j = 0; j < tab[i].length; j++) {
      ligne += "| ";
      if (tab[i][j] === 0) {
        ligne += "_";
      } else if (tab[i][j] === 1) {
        ligne += carJ1;
      } else if (tab[i][j] === 2) {
        ligne += carJ2;
      }
      ligne += " |";
    }
    console.log(ligne);
  }
}
