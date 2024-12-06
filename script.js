const startGameBtn = document.getElementById("start-game-btn");
if (startGameBtn) {
  startGameBtn.addEventListener("click", () => {
    window.location.href = "game.html";
  });
}

// shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// assign specific totem cards to player
function assignTotemSet(deck) {
  const head = deck.find(card => card.name.includes("Head"));
  const torso = deck.find(card => card.name.includes("Torso"));
  const legs = deck.find(card => card.name.includes("Legs"));
  const remaining = deck.filter(card => card !== head && card !== torso && card !== legs);
  return { assigned: [head, torso, legs], remaining };
}

// card data
const actionCards = [
  { name: "Crab", points: 3, type: "Aquatic Surface", file: "action_crab.png" },
  { name: "Fish", points: 3, type: "Aquatic Surface", file: "action_fish.png" },
  { name: "Shrimp", points: 3, type: "Aquatic Surface", file: "action_shrimp.png" },
  { name: "Jellyfish", points: 3, type: "Aquatic Surface", file: "action_jellyfish.png" },
  { name: "Deer", points: 5, type: "Hooved", file: "action_deer.png" },
  { name: "Hippo", points: 5, type: "Hooved", file: "action_hippo.png" },
  { name: "Cow", points: 5, type: "Hooved", file: "action_cow.png" },
  { name: "Bees", points: 2, type: "Insect", file: "action_bee.png" },
  { name: "Beetles", points: 2, type: "Insect", file: "action_beetle.png" },
  { name: "Chicken", points: 4, type: "Avian", file: "action_chicken.png" },
  { name: "Pigeon", points: 4, type: "Avian", file: "action_pigeon.png" },
  { name: "Penguin", points: 4, type: "Avian", file: "action_penguin.png" },
  { name: "Sparrow", points: 4, type: "Avian", file: "action_sparrow.png" },
  { name: "Octopus", points: 6, type: "Aquatic Carnivore", file: "action_octopus.png" },
  { name: "Orca", points: 6, type: "Aquatic Carnivore", file: "action_orca.png" },
  { name: "Shark", points: 6, type: "Aquatic Carnivore", file: "action_shark.png" },
  { name: "Angler Fish", points: 6, type: "Deep Sea", file: "action_angler.png" },
  { name: "Giant Squid", points: 6, type: "Deep Sea", file: "action_squid.png" },
  { name: "Tiger", points: 6, type: "Land Carnivore", file: "action_tiger.png" },
  { name: "Bear", points: 6, type: "Land Carnivore", file: "action_bear.png" },
  { name: "Lion", points: 6, type: "Land Carnivore", file: "action_lion.png" },
];

const totemCards = [
  { name: "Aquatic Surface Head", points: 3, type: "Aquatic Surface", file: "totem_AS_head.png" },
  { name: "Aquatic Surface Torso", points: 3, type: "Aquatic Surface", file: "totem_AS_torso.png" },
  { name: "Aquatic Surface Legs", points: 3, type: "Aquatic Surface", file: "totem_AS_legs.png" },
  { name: "Hooved Head", points: 5, type: "Hooved", file: "totem_H_head.png" },
  { name: "Hooved Torso", points: 5, type: "Hooved", file: "totem_H_torso.png" },
  { name: "Hooved Legs", points: 5, type: "Hooved", file: "totem_H_legs.png" },
  { name: "Insect Head", points: 2, type: "Insect", file: "totem_I_head.png" },
  { name: "Insect Torso", points: 2, type: "Insect", file: "totem_I_torso.png" },
  { name: "Insect Legs", points: 2, type: "Insect", file: "totem_I_legs.png" },
  { name: "Avian Head", points: 4, type: "Avian", file: "totem_A_head.png" },
  { name: "Avian Torso", points: 4, type: "Avian", file: "totem_A_torso.png" },
  { name: "Avian Legs", points: 4, type: "Avian", file: "totem_A_legs.png" },
  { name: "Aquatic Carnivore Head", points: 6, type: "Aquatic Carnivore", file: "totem_AC_head.png" },
  { name: "Aquatic Carnivore Torso", points: 6, type: "Aquatic Carnivore", file: "totem_AC_torso.png" },
  { name: "Aquatic Carnivore Legs", points: 6, type: "Aquatic Carnivore", file: "totem_AC_legs.png" },
  { name: "Deep Sea Head", points: 6, type: "Deep Sea", file: "totem_AD_head.png" },
  { name: "Deep Sea Torso", points: 6, type: "Deep Sea", file: "totem_AD_torso.png" },
  { name: "Deep Sea Legs", points: 6, type: "Deep Sea", file: "totem_AD_legs.png" },
  { name: "Land Carnivore Head", points: 6, type: "Land Carnivore", file: "totem_LC_head.png" },
  { name: "Land Carnivore Torso", points: 6, type: "Land Carnivore", file: "totem_LC_torso.png" },
  { name: "Land Carnivore Legs", points: 6, type: "Land Carnivore", file: "totem_LC_legs.png" },
];

// shuffle decks
let shuffledActionCards = shuffle([...actionCards]);
let shuffledTotemCards = shuffle([...totemCards]);

// assign initial cards
const player1TotemSet = assignTotemSet(shuffledTotemCards);
const player2TotemSet = assignTotemSet(player1TotemSet.remaining);

let player1TopRow = player1TotemSet.assigned;
let player1BottomRow = [shuffledActionCards.pop(), ...player1TotemSet.remaining.slice(0, 2)];
let player2TopRow = player2TotemSet.assigned;
let player2BottomRow = [shuffledActionCards.pop(), ...player2TotemSet.remaining.slice(0, 2)];

// game state
let currentPlayer = 1;
let player1FoodPoints = 100;
let player2FoodPoints = 100;
let player1RoundsWon = 0;
let player2RoundsWon = 0;
let roundNumber = 1;
let interval;

// render a card in a container
function renderCard(containerId, card) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cardImg = document.createElement("img");
  cardImg.classList.add("card-image");
  cardImg.src = `images/${
    card.file.includes("action") ? "action_cards/front_action/" : "totem_cards/front_totem/"
  }${card.file}`;
  cardImg.alt = card.name;

  container.innerHTML = "";
  container.appendChild(cardImg);
}

// render initial cards
function renderInitialCards() {
  player1TopRow.forEach((card, index) => renderCard(`player1-card${index + 1}`, card));
  player1BottomRow.forEach((card, index) => renderCard(`player1-card${index + 4}`, card));
  player2TopRow.forEach((card, index) => renderCard(`player2-card${index + 1}`, card));
  player2BottomRow.forEach((card, index) => renderCard(`player2-card${index + 4}`, card));
  addSwapListeners(); // re-assign event listeners after rendering
}

// update food points
function updateFoodPoints() {
  document.getElementById("player1-points").textContent = player1FoodPoints;
  document.getElementById("player2-points").textContent = player2FoodPoints;

  // end the round if a player reaches 0 food points
  if (player1FoodPoints <= 0 || player2FoodPoints <= 0) {
    endRound();
  }
}

// highlight the current player
function highlightCurrentPlayer() {
  const player1Cards = document.querySelectorAll("#player1-hand .card-container, #player1-bottom .card-container");
  const player2Cards = document.querySelectorAll("#player2-hand .card-container, #player2-bottom .card-container");

  player1Cards.forEach(card => card.style.borderColor = currentPlayer === 1 ? "green" : "white");
  player2Cards.forEach(card => card.style.borderColor = currentPlayer === 2 ? "green" : "white");
}

// swap card between bottom row and top row
function swapCard(player, bottomIndex) {
  const topRow = player === 1 ? player1TopRow : player2TopRow;
  const bottomRow = player === 1 ? player1BottomRow : player2BottomRow;
  const selectedCard = bottomRow[bottomIndex];

  if (!selectedCard) return;

  // determine card type (Head, Torso, Legs)
  const type = selectedCard.name.split(" ")[1];
  const topIndex = type === "Head" ? 0 : type === "Torso" ? 1 : 2;

  if (topIndex === undefined) {
    alert("This card cannot be swapped with the top row.");
    return;
  }

  [topRow[topIndex], bottomRow[bottomIndex]] = [bottomRow[bottomIndex], topRow[topIndex]];

  // render updated cards
  renderCard(`player${player}-card${topIndex + 1}`, topRow[topIndex]);
  renderCard(`player${player}-card${bottomIndex + 4}`, bottomRow[bottomIndex]);

  updateFoodPoints();
  switchTurn();
}

// swap functionality to bottom cards
function addSwapListeners() {
  for (let i = 1; i <= 2; i++) {
    for (let j = 4; j <= 6; j++) {
      const cardElement = document.getElementById(`player${i}-card${j}`);
      if (cardElement) {
        cardElement.onclick = () => {
          if (currentPlayer === i) {
            swapCard(i, j - 4);
          } else {
            alert("It's not your turn!");
          }
        };
      }
    }
  }
}

// draw a card and replace any card in the bottom row
function drawCard(player, cardType) {
  const deck = cardType === "action" ? shuffledActionCards : shuffledTotemCards;
  if (!deck.length) {
    alert(`No more ${cardType === "action" ? "Action" : "Totem"} Cards!`);
    return;
  }

  const newCard = deck.pop();
  const bottomRow = player === 1 ? player1BottomRow : player2BottomRow;

  // replace the first card in the bottom row
  const replaceIndex = Math.floor(Math.random() * bottomRow.length);
  bottomRow[replaceIndex] = newCard;
  renderCard(`player${player}-card${replaceIndex + 4}`, newCard);
  switchTurn();
}

// event listeners for drawing cards
document.getElementById("draw-action-btn").addEventListener("click", () => {
  drawCard(currentPlayer, "action");
});

document.getElementById("draw-totem-btn").addEventListener("click", () => {
  drawCard(currentPlayer, "totem");
});

// attack functionality
function attack() {
  const attacker = currentPlayer;
  const defender = attacker === 1 ? 2 : 1;
  const attackerTopRow = attacker === 1 ? player1TopRow : player2TopRow;
  const attackPoints = attackerTopRow.reduce((sum, card) => sum + card.points, 0);

  if (defender === 1) {
    player1FoodPoints = Math.max(0, player1FoodPoints - attackPoints);
  } else {
    player2FoodPoints = Math.max(0, player2FoodPoints - attackPoints);
  }

  updateFoodPoints();
  switchTurn();
}

// event listener for attack button
document.getElementById("attack-button").addEventListener("click", attack);

// switch turn
function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  highlightCurrentPlayer();
}

// round timer
function startRoundTimer() {
  let timer = 45;
  const timerElement = document.getElementById("timer");
  timerElement.textContent = timer;

  clearInterval(interval);
  interval = setInterval(() => {
    timer--;
    timerElement.textContent = timer;

    if (timer <= 0) {
      clearInterval(interval);
      endRound();
    }
  }, 1000);
}

// end the round
function endRound() {
  clearInterval(interval);
  const winner = player1FoodPoints > player2FoodPoints ? 1 : player2FoodPoints > player1FoodPoints ? 2 : null;

  if (winner === 1) player1RoundsWon++;
  if (winner === 2) player2RoundsWon++;

  alert(`Round ${roundNumber} is over! ${winner ? `Player ${winner} wins the round!` : "It's a tie!"}`);

  if (player1RoundsWon === 2 || player2RoundsWon === 2) {
    alert(`Player ${player1RoundsWon === 2 ? 1 : 2} wins the game!`);
    resetGame();
  } else {
    roundNumber++;
    document.getElementById("round-number").textContent = roundNumber;
    resetRound();
  }
}

// reset the round
function resetRound() {
  player1FoodPoints = 100;
  player2FoodPoints = 100;
  updateFoodPoints();
  renderInitialCards();
  highlightCurrentPlayer();
  startRoundTimer();
}

// reset the game
function resetGame() {
  player1FoodPoints = 100;
  player2FoodPoints = 100;
  player1RoundsWon = 0;
  player2RoundsWon = 0;
  roundNumber = 1;
  document.getElementById("round-number").textContent = roundNumber;
  updateFoodPoints();
  renderInitialCards();
  highlightCurrentPlayer();
  startRoundTimer();
}

// initialize game
updateFoodPoints();
renderInitialCards();
highlightCurrentPlayer();
startRoundTimer();

// music
document.getElementById("play-music").addEventListener("click", () => {
  backgroundMusic.play()
    .then(() => console.log("Manual music playback started."))
    .catch(error => console.error("Manual playback failed:", error));
});

// action card capabilities 
function swapCard(player, bottomIndex) {
  const topRow = player === 1 ? player1TopRow : player2TopRow;
  const bottomRow = player === 1 ? player1BottomRow : player2BottomRow;
  const actionDisplay = document.getElementById(`player${player}-action-display`);
  const selectedCard = bottomRow[bottomIndex];

  if (!selectedCard) return;

  // handle Action Cards
  if (selectedCard.file.includes("action")) {
    actionDisplay.dataset.card = JSON.stringify(selectedCard);
    actionDisplay.innerHTML = `<img src="images/action_cards/front_action/${selectedCard.file}" alt="${selectedCard.name}" class="card-image">`;

    // replace the action card in the bottom row
    bottomRow[bottomIndex] = shuffledActionCards.pop();
    renderCard(`player${player}-card${bottomIndex + 4}`, bottomRow[bottomIndex]);

    console.log(`Player ${player} applied action card: ${selectedCard.name}`);
    switchTurn(); // action card counts as a turn
    return;
  }

  // handle totem cards
  if (selectedCard.file.includes("totem")) {
    const type = selectedCard.name.split(" ")[1]; // extract "Head", "Torso", "Legs"
    const topIndex = type === "Head" ? 0 : type === "Torso" ? 1 : type === "Legs" ? 2 : null;

    if (topIndex !== null) {
      // swap the totem card with its corresponding slot on the top row
      [topRow[topIndex], bottomRow[bottomIndex]] = [bottomRow[bottomIndex], topRow[topIndex]];

      // render the updated cards
      renderCard(`player${player}-card${topIndex + 1}`, topRow[topIndex]);
      renderCard(`player${player}-card${bottomIndex + 4}`, bottomRow[bottomIndex]);

      // update the player's animal group if the head is swapped
      if (type === "Head") {
        const playerHead = topRow[0]; // the first card in the top row
        console.log(`Player ${player} new animal group: ${playerHead.type}`);
      }

      // recalculate top row points
      updateFoodPoints();

      console.log(`Player ${player} swapped a ${type} totem card.`);
      switchTurn(); // totem card swap counts as a turn
    } else {
      alert("Invalid totem card type for swapping.");
    }
  } else {
    alert("You can only swap totem or action cards!");
  }
}



let swapUsed = false; // tracks if a swap has been used this turn

function swapCard(player, bottomIndex) {
  const topRow = player === 1 ? player1TopRow : player2TopRow;
  const bottomRow = player === 1 ? player1BottomRow : player2BottomRow;
  const actionDisplay = document.getElementById(`player${player}-action-display`);
  const selectedCard = bottomRow[bottomIndex];

  console.log(`Player ${player} selected card in bottom row slot ${bottomIndex + 1}`, selectedCard);

  if (!selectedCard) {
    console.log("No card found in the selected slot.");
    return;
  }

  // handle Action Cards
  if (selectedCard.file.includes("action")) {
    console.log(`Player ${player} selected an action card: ${selectedCard.name}`);
    actionDisplay.dataset.card = JSON.stringify(selectedCard);
    actionDisplay.innerHTML = `<img src="images/action_cards/front_action/${selectedCard.file}" alt="${selectedCard.name}" class="card-image">`;

    // replace the action card in the bottom row
    bottomRow[bottomIndex] = shuffledActionCards.pop();
    renderCard(`player${player}-card${bottomIndex + 4}`, bottomRow[bottomIndex]);

    console.log(`Player ${player} applied action card: ${selectedCard.name}`);
    switchTurn(); // action card counts as a turn
    return;
  }

  // handle Totem Cards
  if (selectedCard.file.includes("totem")) {
    console.log(`Player ${player} selected a totem card: ${selectedCard.name}`);
    
    // extract the body part from the card name
    const bodyParts = ["Head", "Torso", "Legs"];
    const type = bodyParts.find(part => selectedCard.name.includes(part)); // look for "Head", "Torso", or "Legs"
    const topIndex = type === "Head" ? 0 : type === "Torso" ? 1 : type === "Legs" ? 2 : null;

    console.log(`Detected totem type: ${type}, corresponding top row index: ${topIndex}`);

    if (topIndex !== null) {
      // discard the current top-row card and replace it with the bottom-row card
      topRow[topIndex] = bottomRow[bottomIndex];
      console.log(`Player ${player} swapped ${type} totem card to top row.`);

      // generate a new random totem card for the bottom row
      bottomRow[bottomIndex] = shuffledTotemCards.pop();

      // render the updated cards
      renderCard(`player${player}-card${topIndex + 1}`, topRow[topIndex]);
      renderCard(`player${player}-card${bottomIndex + 4}`, bottomRow[bottomIndex]);

      // if the head is swapped, update the player's animal group
      if (type === "Head") {
        const playerHead = topRow[0]; // first card in the top row
        console.log(`Player ${player} new animal group: ${playerHead.type}`);
      }

      // recalculate top row points
      updateFoodPoints();

      // mark swap as used for this turn
      swapUsed = true;

      // rnd the turn
      switchTurn();
    } else {
      console.error("Invalid totem card type for swapping.");
      alert("Invalid totem card type for swapping.");
    }
    return;
  }

  console.error("Unknown card type detected.");
  alert("You can only swap totem or action cards!");
}



function addActionAndSwapListeners() {
  for (let i = 1; i <= 2; i++) {
    for (let j = 4; j <= 6; j++) {
      const cardElement = document.getElementById(`player${i}-card${j}`);
      if (cardElement) {
        cardElement.onclick = () => {
          if (currentPlayer === i) {
            console.log(`Player ${i} clicked on slot ${j}`);
            swapCard(i, j - 4); // map slot 4 to index 0, 5 to index 1, and 6 to index 2
          } else {
            alert("It's not your turn!");
          }
        };
      }
    }
  }
}

// reset swap flag at the start of each turn
function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  swapUsed = false; // reset swap flag for the next turn
  console.log(`Switched to Player ${currentPlayer}'s turn.`);
  highlightCurrentPlayer();
}


  // add listeners for selecting action cards
  for (let i = 1; i <= 2; i++) {
    for (let j = 4; j <= 6; j++) {
      const cardElement = document.getElementById(`player${i}-card${j}`);
      if (cardElement) {
        cardElement.onclick = () => {
          if (currentPlayer === i) {
            const bottomRow = currentPlayer === 1 ? player1BottomRow : player2BottomRow;
            const selectedCard = bottomRow[j - 4];

            if (selectedCard && selectedCard.file.includes("action")) {
              const actionDisplay = document.getElementById(`player${currentPlayer}-action-display`);
              actionDisplay.dataset.card = JSON.stringify(selectedCard);
              actionDisplay.innerHTML = `<img src="images/action_cards/front_action/${selectedCard.file}" alt="${selectedCard.name}" class="card-image">`;

              // automatically remove the card from the bottom row
              bottomRow[j - 4] = shuffledActionCards.pop();
              renderCard(`player${currentPlayer}-card${j}`, bottomRow[j - 4]);
            }
          }
        };
      }
    }
  }


// determine if the current player can attack the other player based on the food group rules
function canAttack(attackerTopRow, defenderTopRow, actionCard) {
  const attackerHead = attackerTopRow[0].type;
  const defenderHead = defenderTopRow[0].type;

  const foodChain = {
    "Land Carnivore": ["Land Carnivore", "Hooved", "Avian", "Insect"],
    "Hooved": ["Hooved"],
    "Avian": ["Avian", "Insect"],
    "Insect": ["Insect"],
    "Aquatic Surface": ["Aquatic Surface"],
    "Aquatic Carnivore": ["Aquatic Carnivore", "Aquatic Surface"],
    "Deep Sea": ["Deep Sea", "Aquatic Carnivore", "Aquatic Surface"],
  };

  // check food chain compatibility
  const canAttackNaturally = foodChain[attackerHead]?.includes(defenderHead);

  // action card override
  if (actionCard && foodChain[actionCard.type]?.includes(defenderHead)) {
    return true;
  }

  return canAttackNaturally;
}

// execute attack with action card or food group compatibility
function attack() {
  const attackerTopRow = currentPlayer === 1 ? player1TopRow : player2TopRow;
  const defenderTopRow = currentPlayer === 1 ? player2TopRow : player1TopRow;
  const actionDisplay = document.getElementById(`player${currentPlayer}-action-display`);
  const actionCard = actionDisplay.dataset.card ? JSON.parse(actionDisplay.dataset.card) : null;

  if (canAttack(attackerTopRow, defenderTopRow, actionCard)) {
    const attackPoints = attackerTopRow.reduce((sum, card) => sum + card.points, 0);
    const defendingPlayer = currentPlayer === 1 ? 2 : 1;

    if (defendingPlayer === 1) {
      player1FoodPoints = Math.max(0, player1FoodPoints - attackPoints);
    } else {
      player2FoodPoints = Math.max(0, player2FoodPoints - attackPoints);
    }

    updateFoodPoints();
    showAttackEffect();

    // if action card used, discard it
    if (actionCard) {
      actionDisplay.innerHTML = "";
      actionDisplay.dataset.card = "";
    }

    switchTurn();
  } else {
    alert("You cannot attack this player!");
  }
}

//  attack effect
function showAttackEffect() {
  const flashDiv = document.createElement("div");
  flashDiv.style.position = "fixed";
  flashDiv.style.top = "0";
  flashDiv.style.left = "0";
  flashDiv.style.width = "100%";
  flashDiv.style.height = "100%";
  flashDiv.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  flashDiv.style.zIndex = "1000";
  flashDiv.style.pointerEvents = "none";
  document.body.appendChild(flashDiv);

  setTimeout(() => document.body.removeChild(flashDiv), 200);
}

// event listener for attack button
document.getElementById("attack-button").addEventListener("click", attack);

// initialize game
updateFoodPoints();
renderInitialCards();
highlightCurrentPlayer();
addActionAndSwapListeners();
startRoundTimer();