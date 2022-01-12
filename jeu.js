// const toolbox = require('./toolbox')

let jeu = {
  puissance4: [],
  nbColonne: 7,
  nbLigne: 6,
  carJ1: "x",
  carJ2: "o",

  initialisation: function () {
    this.puissance4 = toolbox.initialiserTableauVide(
      this.nbLigne,
      this.nbColonne,
      0
    );
  },

  /**
   * Afficher un tableau de puissance4
   */
  afficherPuissance4: function () {
    const jeu = document.querySelector("#jeu");
    console.log(jeu);
    //refresh la grille
    jeu.innerHTML = "";
    var content = "<table>";
    for (var i = 0; i < this.nbLigne; i++) {
      content += "<tr>";
      for (var j = 0; j < this.nbColonne; j++) {
        content +=
          "<td class='border text-center' style='width:100px; height:100px'>";
        if (this.puissance4[i][j] === 0) {
          content += "";
        } else if (this.puissance4[i][j] === 1) {
          content += "<img src='./images/J1.png' class='bg-danger rounded-circle' />";
        } else if (this.puissance4[i][j] === 2) {
          content += "<img src='./images/J2.png' class='bg-primary rounded-circle' />";
        }
        content += "</td>";
      }
      content += "</tr>";
    }
    content += "<tr>";
    content +=
      '<td><button type="button" class="btn btn-secondary p-2" onClick=jouer(1)>Colonne 1</button></td>';
    content +=
      '<td><button type="button" class="btn btn-secondary p-2" onClick="jouer(2)">Colonne 2</button></td>';
    content +=
      '<td><button type="button" class="btn btn-secondary p-2" onClick="jouer(3)">Colonne 3</button></td>';
    content +=
      '<td><button type="button" class="btn btn-secondary p-2" onClick="jouer(4)">Colonne 4</button> </td>';
    content +=
      '<td><button type="button" class="btn btn-secondary p-2" onClick="jouer(5)">Colonne 5</button> </td>';
    content +=
      '<td><button type="button" class="btn btn-secondary p-2" onClick="jouer(6)">Colonne 6</button> </td>';
    content +=
      '<td><button type="button" class="btn btn-secondary p-2" onClick="jouer(7)">Colonne 7</button> </td>';
    content += "</tr>";
    content += "</table>";
    jeu.innerHTML = content;
    // for (let i = 0; i < this.puissance4.length; i++) {
    //   let ligne = "";
    //   for (let j = 0; j < this.puissance4[i].length; j++) {
    //     ligne += "| ";
    //     if (this.puissance4[i][j] === 0) {
    //       ligne += "_";
    //     } else if (this.puissance4[i][j] === 1) {
    //       ligne += this.carJ1;
    //     } else if (this.puissance4[i][j] === 2) {
    //       ligne += this.carJ2;
    //     }
    //     ligne += " |";
    //   }
    //   console.log(ligne);
    // }
  },

  jouerCase: function (joueur, ligneVide, colonne) {
    this.puissance4[ligneVide][colonne - 1] = joueur;
  },

  /**
   * fonction permettant de retourner la premiere ligne d'une colonne
   * @param {Number} colonne retourne - 1 si colonne est pleine
   * @returns
   */
  retournerLigneCaseVideColonne: function (colonne) {
    for (let i = this.nbLigne - 1; i >= 0; i--) {
      // i = ligne
      if (this.verifCaseVide(i, colonne)) return i;
    }
    return -1;
  },

  /**
   * fonction pour verifier si cellule vide
   * @param {Number} ligne
   * @param {Number} colonne
   * @returns
   */
  verifCaseVide: function (ligne, colonne) {
    // boolean renvoyé
    return this.puissance4[ligne][colonne - 1] === 0;
  },

  /**
   * Fonction permettant de saisir une colonne
   * @returns
   */
  saisirColonne: function () {
    // readline retourne une string, donc parseInt pour integer
    return parseInt(toolbox.saisieString("Quelle colonne ?"));
  },

  verificationFinduJeu: function (joueur) {
    if (
      this.verifLigneFinJeu(joueur) ||
      this.verifColonneFinJeu(joueur) ||
      this.verifDiagonaleFinJeu(joueur)
    ) {
      return true;
    }
    return false;
  },

  /**
   * fonction permettent de verifier si un joueur a gagné sur une ligne
   * @param {Integer} joueur
   * @returns
   */
  // ontest le caractere du joueur pour ne pas tester lignes vides et car
  verifLigneFinJeu: function (joueur) {
    for (let i = this.nbLigne - 1; i >= 0; i--) {
      for (j = 0; j < this.nbColonne - 3; j++) {
        if (
          this.puissance4[i][j] === joueur &&
          this.puissance4[i][j + 1] === joueur &&
          this.puissance4[i][j + 2] === joueur &&
          this.puissance4[i][j + 3] === joueur
        )
          return true;
      }
    }
    return false;
  },

  verifColonneFinJeu: function (joueur) {
    for (let i = 0; i < this.nbColonne; i++) {
      for (let j = this.nbLigne - 4; j >= 0; j--) {
        if (
          this.puissance4[j][i] === joueur &&
          this.puissance4[j + 1][i] === joueur &&
          this.puissance4[j + 2][i] === joueur &&
          this.puissance4[j + 3][i] === joueur
        )
          return true;
      }
    }
  },

  /**
   * fonction pour voir si joueur a gagné en diago
   * @param {Number} joueur
   * @returns
   */
  verifDiagonaleFinJeu: function (joueur) {
    for (let i = this.nbLigne - 1; i >= 3; i--) {
      for (j = 0; j < this.nbColonne; j++) {
        if (
          this.puissance4[i][j] === joueur &&
          this.puissance4[i - 1][j + 1] === joueur &&
          this.puissance4[i - 2][j + 2] === joueur &&
          this.puissance4[i - 3][j + 3] === joueur
        )
          return true;
        if (
          this.puissance4[i][j] === joueur &&
          this.puissance4[i - 1][j - 1] === joueur &&
          this.puissance4[i - 2][j - 2] === joueur &&
          this.puissance4[i - 3][j - 3] === joueur
        )
          return true;
      }
    }
    return false;
  },
};

// module.exports = jeu
