let IA = {
  choixColonne() {
    let tabColonne = this.getTableauCellulePossibles();

    return tabColonne[0];
  },

  getTableauCellulePossibles: function () {
    let tabColonne = [];
    for (let i = 1; i < jeu.nbColonne; i++) {
      let possibilite = this.getPoidsCellule(
        jeu.retournerLigneCaseVideColonne(i),
        i
      );
      tabColonne.push(possibilite);
    }
    return tabColonne;
  },

  getPoidsCellule : function(ligne, colonne) {
    //  check colonne pleine quand poids à renvoyer sera de 0
    if (ligne === -1) return 0;

    // check si on peut gagner retourne 100
    if(this.verifGagner(ligne, colonne)) return 100;

    // verifier si on peut perdre return 99

    // autres cas
    // eviter cou^perdant
    // defendre 2 jetons adverses à  côté
    // attaquer
    // additionner les poids

    return 1
  },
  verifGagner : function (ligne, colonne) {

  }
};
