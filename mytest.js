const readline = require("readline");
let game = 'still running'

class Grille {
  constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
    this.ocuppiedSquares = [ ]
  }
  coupsAvailables() {
  }
}

const maGrille = new Grille(6,8)

const h = 4
const l = 4
let coupsJ1 = [
  [3, 4],
  [1, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [1, 4],
  [2, 1],
  [5, 8],
  [3, 1],
  [1, 3],
];

//let coupsJ2  = [[1,1], [2,1],[5,8], [3, 1], [4,1], [3,1] ]

const checkVertVictory = (coups) => {
  copieCoups = [...coups]
  copieCoups.sort((a, b) => {
    return a[0] - b[0];
  });
  console.log("copieCoups", copieCoups);
  const coupsAchecker = [];

  for (let j = 0; j<= coups.length; j++) {
    // boucle a faire sur chaque element
    for (let i = 0; i <= 3; i++) {
      coupsAchecker.push(copieCoups[i]);
    }
    console.log("coups a checker length",coupsAchecker, coupsAchecker.length);
    if (!coupsAchecker.includes(undefined)) {
      if (
        coupsAchecker[0][0] === coupsAchecker[1][0] &&
        coupsAchecker[1][0] === coupsAchecker[2][0] &&
        coupsAchecker[2][0] == coupsAchecker[3][0] &&
        coupsAchecker[3][1] - coupsAchecker[0][1] === 3
      ) {
        console.log("c'est aligné verticalment ! ");
        break
      } else {
        console.log("pas de victoire verticalement");
        coupsAchecker.splice(0,4)
        copieCoups.splice(0,1)
      }
    }
    //console.log('coups a checker après boucle 1 ', coupsAchecker)
    console.log("copieCcoups a checker après boucle 1 ", copieCoups);
  }

};


checkVertVictory(coupsJ1);


let nonOccupiedSquares = [];

for (let x = 1; x <= l; x++) {
  for (let y = 1; y <= h; y++) {
    let nonOccupiedSquare = []
    nonOccupiedSquare.push(x, y)
    nonOccupiedSquares.push(nonOccupiedSquare)
  }
}
// console.log("nonOccupiedSquares", nonOccupiedSquares);
// [
//   [1, 1],[1, 2],[1, 3],[1, 4],
//   [2, 1],[2, 2],[2, 3],[2, 4],
//   [3, 1],[3, 2],[3, 3],[3, 4],
//   [4, 1],[4, 2],[4, 3],[4, 4],
// ];
let coupsDispos = []

for (let i = 0; i <=3; i++) {
  coupsDispos.push(nonOccupiedSquares[i]);
}
// console.log('coups dispos',coupsDispos)
// console.log("choose a square, then add the square to list of chosen square of player,\n then win/lose or draw or keep playing,\n then if keep play, slice  ");



// function checker victoire vertivale
// boucle infini jusqu'à win/lose, égalité

// pour chaque tour checker coups dispos
// choisir un coup, le stocker dans array des coups choisis
// Checker win lose draw, game continue
//   if game continue, retirer le coup des coups dispos
    // reprendre les 4 premiers coups nonOccupied
// choisir un coup, le stocker dans array des coups choisis ...
// Checker win lose draw, game continue ... etc


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// let ans = ''
// rl.question(`What is your choice? ${coupsDispos[0]}` , function (answer) {

//   console.log(`Oh, so your name is ${answer}`);
//   console.log("Closing the interface");
//   ans = answer;
//   rl.close();
//   console.log("ans after prompt", ans, ans, ans);
// });

// console.log("ans after prompt", ans, ans, ans);
