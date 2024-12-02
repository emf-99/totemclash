document.getElementById("play-music").addEventListener("click", () => {
  backgroundMusic.play()
    .then(() => console.log("Manual music playback started."))
    .catch(error => console.error("Manual playback failed:", error));
});

// Redirect to game.html when Start Game button is clicked
const startGameBtn = document.getElementById("start-game-btn");
if (startGameBtn) {
  startGameBtn.addEventListener("click", () => {
    window.location.href = "game.html";
  });
}

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Assign specific totem cards (head, torso, legs) to a player
function assignTotemSet(deck) {
  const head = deck.find(card => card.name.includes("Head"));
  const torso = deck.find(card => card.name.includes("Torso"));
  const legs = deck.find(card => card.name.includes("Legs"));
  const remaining = deck.filter(card => card !== head && card !== torso && card !== legs);
  return { assigned: [head, torso, legs], remaining };
}

// Card data
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

// Shuffle decks
let shuffledActionCards = shuffle([...actionCards]);
let shuffledTotemCards = shuffle([...totemCards]);

// Assign initial cards
const player1TotemSet = assignTotemSet(shuffledTotemCards);
const player2TotemSet = assignTotemSet(player1TotemSet.remaining);

let player1TopRow = player1TotemSet.assigned;
let player1BottomRow = [shuffledActionCards.pop(), ...player1TotemSet.remaining.slice(0, 2)];
let player2TopRow = player2TotemSet.assigned;
let player2BottomRow = [shuffledActionCards.pop(), ...player2TotemSet.remaining.slice(0, 2)];

// Game state
let currentPlayer = 1;
let player1FoodPoints = 100;
let player2FoodPoints = 100;
let player1RoundsWon = 0;
let player2RoundsWon = 0;
let roundNumber = 1;
let interval;

// Render a card in a container
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

// Render initial cards
function renderInitialCards() {
  player1TopRow.forEach((card, index) => renderCard(`player1-card${index + 1}`, card));
  player1BottomRow.forEach((card, index) => renderCard(`player1-card${index + 4}`, card));
  player2TopRow.forEach((card, index) => renderCard(`player2-card${index + 1}`, card));
  player2BottomRow.forEach((card, index) => renderCard(`player2-card${index + 4}`, card));
  addSwapListeners(); // Re-assign event listeners after rendering
}

// Update food points
function updateFoodPoints() {
  document.getElementById("player1-points").textContent = player1FoodPoints;
  document.getElementById("player2-points").textContent = player2FoodPoints;

  // End the round if a player reaches 0 food points
  if (player1FoodPoints <= 0 || player2FoodPoints <= 0) {
    endRound();
  }
}

// Highlight the current player
function highlightCurrentPlayer() {
  const player1Cards = document.querySelectorAll("#player1-hand .card-container, #player1-bottom .card-container");
  const player2Cards = document.querySelectorAll("#player2-hand .card-container, #player2-bottom .card-container");

  player1Cards.forEach(card => card.style.borderColor = currentPlayer === 1 ? "green" : "white");
  player2Cards.forEach(card => card.style.borderColor = currentPlayer === 2 ? "green" : "white");
}

// Swap card between bottom row and top row
function swapCard(player, bottomIndex) {
  const topRow = player === 1 ? player1TopRow : player2TopRow;
  const bottomRow = player === 1 ? player1BottomRow : player2BottomRow;
  const selectedCard = bottomRow[bottomIndex];

  if (!selectedCard) return;

  // Determine card type (Head, Torso, Legs)
  const type = selectedCard.name.split(" ")[1];
  const topIndex = type === "Head" ? 0 : type === "Torso" ? 1 : 2;

  if (topIndex === undefined) {
    alert("This card cannot be swapped with the top row.");
    return;
  }

  [topRow[topIndex], bottomRow[bottomIndex]] = [bottomRow[bottomIndex], topRow[topIndex]];

  // Render updated cards
  renderCard(`player${player}-card${topIndex + 1}`, topRow[topIndex]);
  renderCard(`player${player}-card${bottomIndex + 4}`, bottomRow[bottomIndex]);

  updateFoodPoints();
  switchTurn();
}

// Add swap functionality to bottom cards
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

// Draw a card and replace any card in the bottom row
function drawCard(player, cardType) {
  const deck = cardType === "action" ? shuffledActionCards : shuffledTotemCards;
  if (!deck.length) {
    alert(`No more ${cardType === "action" ? "Action" : "Totem"} Cards!`);
    return;
  }

  const newCard = deck.pop();
  const bottomRow = player === 1 ? player1BottomRow : player2BottomRow;

  // Replace the first card in the bottom row
  const replaceIndex = Math.floor(Math.random() * bottomRow.length);
  bottomRow[replaceIndex] = newCard;
  renderCard(`player${player}-card${replaceIndex + 4}`, newCard);
  switchTurn();
}

// Event listeners for drawing cards
document.getElementById("draw-action-btn").addEventListener("click", () => {
  drawCard(currentPlayer, "action");
});

document.getElementById("draw-totem-btn").addEventListener("click", () => {
  drawCard(currentPlayer, "totem");
});

// Attack functionality
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

// Event listener for attack button
document.getElementById("attack-button").addEventListener("click", attack);

// Switch turn
function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  highlightCurrentPlayer();
}

// Round timer
function startRoundTimer() {
  let timer = 30;
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

// End the round
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

// Reset the round
function resetRound() {
  player1FoodPoints = 100;
  player2FoodPoints = 100;
  updateFoodPoints();
  renderInitialCards();
  highlightCurrentPlayer();
  startRoundTimer();
}

// Reset the game
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

// Initialize game
updateFoodPoints();
renderInitialCards();
highlightCurrentPlayer();
startRoundTimer();
