// const readline = require("readline-sync");

let toolbox = {
  // saisieString: function (txt) {
  //   return readline.question(txt);
  // },

  /**
   * Init tableau de tableau en fonction d'un nombre de lligne et de col
   * @param {Number} nbLigne
   * @param {Number} nbColonne
   * @param {*} car
   */
  initialiserTableauVide: function (nbLigne, nbColonne, car = "") {
    let tab = [];
    for (let i = 0; i < nbLigne; i++) {
      let ligne = [];
      for (let j = 0; j < nbColonne; j++) {
        ligne.push(car);
      }
      tab.push(ligne);
    }
    return tab;
  },
};

// module.exports = toolbox;
