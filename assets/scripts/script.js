const generateBtn = document.getElementById("generer");
const result = document.getElementById("resultat");
const selectSuspect = document.getElementById("choix-suspect");
const selectArme = document.getElementById("choix-arme");
const selectLieu = document.getElementById("choix-lieu");
const guessBtn = document.getElementById("deviner");
const restartBtn = document.getElementById("restart");
const askBtn = document.getElementById("btn-interroger");
const askAnswer = document.getElementById("reponse-interrogatoire");
let solution = {};

const suspects = [
  {
    name: "Professeur Violet",
    img: "./assets/img/violet.webp",
  },
  {
    name: "Colonel Moutarde",
    img: "./assets/img/moutarde.webp",
  },
  {
    name: "Madame Leblanc",
    img: "./assets/img/leblanc.webp",
  },
  {
    name: "Révérend Olive",
    img: "./assets/img/olive.webp",
  },
  {
    name: "Mademoiselle Rose",
    img: "./assets/img/rose.webp",
  },
  {
    name: "Sergent Legris",
    img: "./assets/img/legris.webp",
  },
];

const armes = [
  {
    name: "Chandelier",
    img: "./assets/img/chandelier.png",
  },
  {
    name: "Poignard",
    img: "./assets/img/poignard.png",
  },
  {
    name: "Clé anglaise",
    img: "./assets/img/clé.png",
  },
  {
    name: "Corde",
    img: "./assets/img/corde.png",
  },
  {
    name: "Pistolet",
    img: "./assets/img/pistolet.png",
  },
  {
    name: "Batte de baseball",
    img: "./assets/img/baseball.png",
  },
];

const lieux = [
  {
    name: "Bibliothèque",
    img: "./assets/img/bibliothèque.jpg",
  },
  {
    name: "Cuisine",
    img: "./assets/img/cuisine.jpg",
  },
  {
    name: "Salle de bal",
    img: "./assets/img/bal.jpg",
  },
  {
    name: "Jardin",
    img: "./assets/img/jardin.jpg",
  },
  {
    name: "Bureau",
    img: "./assets/img/bureau.jpg",
  },
  {
    name: "Hall d'entrée",
    img: "./assets/img/hall.jpg",
  },
];

const newGame = () => {
  solution = {
    suspect: pickRandomly(suspects),
    arme: pickRandomly(armes),
    lieu: pickRandomly(lieux),
  };

  selectSuspect.selectedIndex = 0;
  selectArme.selectedIndex = 0;
  selectLieu.selectedIndex = 0;

  feedback.innerHTML = `<p>🔄 Nouvelle enquête lancée ! Faites votre première hypothèse.</p>`;

  li = document.querySelectorAll("li");
  li.forEach((li) => li.classList.remove("elimine"));
};

const pickRandomly = (arr) => {
  const index = Math.floor(Math.random() * arr.length);

  return arr[index];
};

const fillSelect = (selectId, options) => {
  const select = document.getElementById(selectId);

  options.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.name;
    option.textContent = opt.name;
    select.appendChild(option);
  });
};

const fillDeduction = (id, options) => {
  const container = document.getElementById(id);

  container.append(
    ...options.map((opt) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${opt.img}" />
        <br>
        <h4>${opt.name}</h4>
      `;
      li.addEventListener("click", () => li.classList.toggle("elimine"));
      return li;
    })
  );
};

const interrogate = () => {
  const suspect = document.getElementById("select-interrogatoire").value;
  const chanceOfTruth = 70;
  const isTrustful = Math.random() * 100 < chanceOfTruth;

  if (isTrustful) {
    const isGuilty = suspect === solution.suspect.name;
    askAnswer.innerHTML = isGuilty
      ? `<p>🕵️ Le suspect avoue : "Oui, c'est moi !"</p>`
      : `<p>🤔 Le suspect dit : "Non, je suis innocent."</p>`;
  } else {
    askAnswer.innerHTML = `<p>🤥 Le suspect ment : "Je ne sais rien."</p>`;
  }
};

fillDeduction("deduction-suspects", suspects);
fillDeduction("deduction-armes", armes);
fillDeduction("deduction-lieux", lieux);

fillSelect("choix-suspect", suspects);
fillSelect("choix-arme", armes);
fillSelect("choix-lieu", lieux);
fillSelect("select-interrogatoire", suspects);

guessBtn.addEventListener("click", () => {
  const suspect = selectSuspect.value;
  const arme = selectArme.value;
  const lieu = selectLieu.value;

  let bon = 0;

  if (suspect === solution.suspect.name) bon++;
  if (arme === solution.arme.name) bon++;
  if (lieu === solution.lieu.name) bon++;

  if (bon === 3) {
    feedback.innerHTML = `<p>🕵️ Bravo ! Vous avez trouvé la combinaison exacte !</p>`;
  } else {
    feedback.innerHTML = `<p>🤔 Il y a <strong>${bon}</strong> élément(s) correct(s). Essayez encore.</p>`;
  }
});

askBtn.addEventListener("click", interrogate);

restartBtn.addEventListener("click", newGame);

newGame();
