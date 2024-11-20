// Redirect to game.html when Start Game button is clicked
const startGameBtn = document.getElementById("start-game-btn");
if (startGameBtn) {
  startGameBtn.addEventListener("click", () => {
    window.location.href = "game.html";
  });
}

// Shuffle function to randomize card pools
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

// Filter to get a specific part type (head, torso, legs) from a deck
function getCardOfType(deck, type) {
    const card = deck.find(card => card.name.includes(type));
    return card;
  }
  
  // Assign specific totem cards (head, torso, legs) to a player
  function assignTotemSet(deck) {
    const head = getCardOfType(deck, "Head");
    const torso = getCardOfType(deck, "Torso");
    const legs = getCardOfType(deck, "Legs");
  
    // Remove assigned cards from the deck to prevent duplication
    const remaining = deck.filter(card => card !== head && card !== torso && card !== legs);
  
    return {
      assigned: [head, torso, legs],
      remaining: remaining,
    };
  }
  
  // Shuffle decks
  const shuffledActionCards = shuffle([...actionCards]);
  let shuffledTotemCards = shuffle([...totemCards]);
  
  // Assign totem sets (1 head, 1 torso, 1 legs) and remaining totem cards
  const player1TotemSet = assignTotemSet(shuffledTotemCards);
  const player2TotemSet = assignTotemSet(player1TotemSet.remaining);
  
  // Assign cards to players
  const player1Cards = [
    ...player1TotemSet.assigned, // Cards 1–3: 1 head, 1 torso, 1 legs
    ...shuffledActionCards.slice(0, 2), // Cards 4–5: 2 random action cards
    player1TotemSet.remaining[0], // Card 6: 1 random totem card
  ];
  
  const player2Cards = [
    ...player2TotemSet.assigned, // Cards 1–3: 1 head, 1 torso, 1 legs
    ...shuffledActionCards.slice(2, 4), // Cards 4–5: 2 random action cards
    player2TotemSet.remaining[0], // Card 6: 1 random totem card
  ];
  
  // Render cards for players
  function renderCard(containerId, card, isFaceDown = false, cardType = null) {
    const container = document.getElementById(containerId);
  
    if (!container) {
      console.error(`Container with ID "${containerId}" not found.`);
      return;
    }
  
    const cardImg = document.createElement("img");
    cardImg.classList.add("card-image");
  
    if (isFaceDown) {
      // Use different back images for action and totem cards
      cardImg.src = cardType === "action" 
        ? "images/action_cards/action_back.png" 
        : "images/totem_cards/totem_back.png";
      cardImg.alt = "Face-down Card";
    } else {
      // Use the correct folder for face-up cards
      cardImg.src = `images/${
        card.file.includes("action") ? "action_cards/front_action/" : "totem_cards/front_totem/"
      }${card.file}`;
      cardImg.alt = `${card.name}`;
    }
  
    console.log("Generated Image Path:", cardImg.src); // Debugging path
    cardImg.onerror = () => console.error(`Image not found: ${cardImg.src}`); // Error handler
    container.innerHTML = "";
    container.appendChild(cardImg);
  }
  
  // Render Player 1's cards (face-up)
  player1Cards.forEach((card, index) => renderCard(`player1-card${index + 1}`, card));
  
  // Render Player 2's cards
  player2Cards.forEach((card, index) => {
    if (index >= 3) {
      // Cards 4, 5, and 6 are face-down
      renderCard(
        `player2-card${index + 1}`, 
        card, 
        true, 
        index < 5 ? "action" : "totem" // Cards 4 & 5 are action backs, Card 6 is totem back
      );
    } else {
      // Cards 1, 2, 3 are face-up
      renderCard(`player2-card${index + 1}`, card);
    }
  });
  
  // Draw card buttons
  document.getElementById("draw-action-btn").addEventListener("click", () => {
    if (shuffledActionCards.length > 0) {
      const newCard = shuffledActionCards.pop();
      alert(`You drew an Action Card!`);
    } else {
      alert("No more Action Cards!");
    }
  });
  
  document.getElementById("draw-totem-btn").addEventListener("click", () => {
    if (shuffledTotemCards.length > 0) {
      const newCard = shuffledTotemCards.pop();
      alert(`You drew a Totem Card!`);
    } else {
      alert("No more Totem Cards!");
    }
  });