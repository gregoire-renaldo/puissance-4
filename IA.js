let IA = {
  choixColonne() {
    let tabColonne = this.getTableauCellulePossibles();
    let meilleureColonne = 0;
    let tabMeilleureColonne = [0];
    for (let i = 1; i < tabColonne.length; i++) {
      if (tabColonne[i] > tabColonne[meilleureColonne]) {
        meilleureColonne = i;
        tabMeilleureColonne = new Array();
        tabMeilleureColonne.push(i);
      } else if (tabColonne[i] === tabColonne[meilleureColonne]) {
        tabMeilleureColonne.push(i);
      }
    }
    console.log(tabColonne);
    console.log(tabMeilleureColonne);
    return tabMeilleureColonne[
      Math.floor(Math.random() * tabMeilleureColonne.length)
    ];
  },

  getTableauCellulePossibles: function () {
    let tabColonne = [];
    for (let i = 0; i < jeu.nbColonne; i++) {
      tabColonne.push(
        this.getPoidsCellule(jeu.retournerLigneCaseVideColonne(i), i)
      );
    }
    return tabColonne;
  },

  getPoidsCellule: function (ligne, colonne) {
    //  check colonne pleine quand poids à renvoyer sera de 0
    if (ligne === -1) return 0;

    // check si on peut gagner retourne 100
    if (this.verifGagner(ligne, colonne, 2)) return 100;
    if (this.verifGagner(ligne, colonne, 1)) return 99;

    if (this.coupPerdant(ligne,colonne,2)) return 0;

    let poids = 0
    if(this.positionDefensive(ligne,colonne,1)) poids += 20;

    // attaque
    if(this.positionDefensive(ligne,colonne,2)) poids += 20;
    poids += this.getPoidsBase(ligne,colonne)
    return poids;

    // verifier si on peut perdre return 99

    // autres cas
    // eviter cou^perdant

    // defendre 2 jetons adverses à  côté
    // attaquer
    // additionner les poids

    return 1;
  },

  getPoidsBase: function (ligne, colonne) {
    let poidsLigne = 0;
    let poidscolonne = 0;
    switch (ligne) {
      case 0:
        poidsLigne = 1;
        break;
      case 1:
        poidsLigne = 2;
        break;
      case 2:
        poidsLigne = 3;
        break;
      case 3:
        poidsLigne = 4;
        break;
      case 4:
        poidsLigne = 3;
        break;
      case 5:
        poidsLigne = 2;
        break;
    }
    switch (colonne) {
      case 0:
        poidscolonne = 1;
        break;
      case 1:
        poidscolonne = 2;
        break;
      case 2:
        poidscolonne = 3;
        break;
      case 3:
        poidscolonne = 4;
        break;
      case 4:
        poidscolonne = 3;
        break;
      case 5:
        poidscolonne = 2;
        break;
      case 6:
        poidscolonne = 1;
        break;
    }
    return poidscolonne * poidsLigne;
  },

  positionDefensive : function(ligne,colonne,joueur){
        let cpt = 1;
        if(jeu.puissance4[ligne][colonne+1] === joueur) {
            cpt++;
            if(jeu.puissance4[ligne][colonne+2] === joueur && jeu.puissance4[ligne][colonne+3] === 0) cpt++;
        }
        if(jeu.puissance4[ligne][colonne-1] === joueur) {
            cpt++;
            if(jeu.puissance4[ligne][colonne-2] === joueur && jeu.puissance4[ligne][colonne-3] === 0) cpt++;
        }

        if(cpt > 2) return true;
    },
  verifGagner: function (ligne, colonne, joueur) {
    if (this.verifGagnerLigne(ligne, colonne, joueur)) return true;
    if (this.verifGagnerColonne(ligne, colonne, joueur)) return true;
    if (this.verifGagnerDiagonale(ligne, colonne, joueur)) return true;
  },
  verifGagnerLigne: function (ligne, colonne, joueur) {
    let cpt = 1;
    if (jeu.puissance4[ligne][colonne + 1] === joueur) {
      cpt++;
      if (jeu.puissance4[ligne][colonne + 2] === joueur) {
        cpt++;
        if (jeu.puissance4[ligne][colonne + 3] === joueur) {
          cpt++;
        }
      }
    }
    if (jeu.puissance4[ligne][colonne - 1] === joueur) {
      cpt++;
      if (jeu.puissance4[ligne][colonne - 2] === joueur) {
        cpt++;
        if (jeu.puissance4[ligne][colonne - 3] === joueur) {
          cpt++;
        }
      }
    }
    if (cpt > 3) return true;
  },

  verifGagnerColonne: function (ligne, colonne, joueur) {
    let cpt = 1;
    if (ligne < 3) {
      if (jeu.puissance4[ligne + 1][colonne] === joueur) {
        cpt++;
        if (jeu.puissance4[ligne + 2][colonne] === joueur) {
          cpt++;
          if (jeu.puissance4[ligne + 3][colonne] === joueur) {
            cpt++;
          }
        }
      }
    }
    if (cpt > 3) return true;
  },
  verifGagnerDiagonale: function (ligne, colonne, joueur) {
    var cpt = 1;
    if (
      ligne - 1 >= 0 &&
      colonne + 1 <= jeu.nbColonne &&
      jeu.puissance4[ligne - 1][colonne + 1] === joueur
    ) {
      cpt++;
      if (
        ligne - 2 >= 0 &&
        colonne + 2 <= jeu.nbColonne &&
        jeu.puissance4[ligne - 2][colonne + 2] === joueur
      ) {
        cpt++;
        if (
          ligne - 3 >= 0 &&
          colonne + 3 <= jeu.nbColonne &&
          jeu.puissance4[ligne - 3][colonne + 3] === joueur
        ) {
          cpt++;
        }
      }
    }
    if (
      ligne + 1 < jeu.nbLigne &&
      colonne - 1 >= 0 &&
      jeu.puissance4[ligne + 1][colonne - 1] === joueur
    ) {
      cpt++;
      if (
        ligne + 2 < jeu.nbLigne &&
        colonne - 2 >= 0 &&
        jeu.puissance4[ligne + 2][colonne - 2] === joueur
      ) {
        cpt++;
        if (
          ligne + 3 < jeu.nbLigne &&
          colonne - 3 >= 0 &&
          jeu.puissance4[ligne + 3][colonne - 3] === joueur
        ) {
          cpt++;
        }
      }
    }
    if (cpt > 3) return true;
    cpt = 1;
    if (
      ligne - 1 >= 0 &&
      colonne - 1 >= 0 &&
      jeu.puissance4[ligne - 1][colonne - 1] === joueur
    ) {
      cpt++;
      if (
        ligne - 2 >= 0 &&
        colonne - 2 >= 0 &&
        jeu.puissance4[ligne - 2][colonne - 2] === joueur
      ) {
        cpt++;
        if (
          ligne - 3 >= 0 &&
          colonne - 3 >= 0 &&
          jeu.puissance4[ligne - 3][colonne - 3] === joueur
        ) {
          cpt++;
        }
      }
    }
    if (
      ligne + 1 < jeu.nbLigne &&
      colonne + 1 <= jeu.nbColonne &&
      jeu.puissance4[ligne + 1][colonne + 1] === joueur
    ) {
      cpt++;
      if (
        ligne + 2 < jeu.nbLigne &&
        colonne + 2 <= jeu.nbColonne &&
        jeu.puissance4[ligne + 2][colonne + 2] === joueur
      ) {
        cpt++;
        if (
          ligne + 3 < jeu.nbLigne &&
          colonne + 3 <= jeu.nbColonne &&
          jeu.puissance4[ligne + 3][colonne + 3] === joueur
        ) {
          cpt++;
        }
      }
    }
    if (cpt > 3) return true;
  },
  coupPerdant: function (ligne,colonne,joueur) {
    // checke ligne-1
    if (ligne-1 >0) {
      if(this.verifGagner(ligne-1, colonne,1)) return true;
    }
  }
};
