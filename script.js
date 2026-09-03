const gameContainer = document.querySelector(".game-container");
const winPopup = document.getElementById("winPopup");
const restartBtn = document.getElementById("restartBtn");

// 20-30 emojis pool
const allEmojis = [
  "🍎","🐶","⭐","❤️","🍕","🎵","⚽","🌙","😼",
  "🍔","🍉","🍩","🐱","🐵","🌟","🔥","🍓","💳",
  "🍌","🍪","🎈","💎","🌹","🍇","🍭","🐸","🧰",
  "🐯","🎃","🍒","🦄","🍀","🌈","😀","💸","💰",
  "😃","😄","😁","😆","🥹","😅","🥰","😍","😌",
  "😉","🤯","😴","🤠","☠️","💀","👻","🤡","😻",
  "😽","🙀","🫶","🤝🏻","👀","🫰🏻","🤌🏻","👑","❤️‍🔥",
  "💕","💞","💓","💗","💖","💘","💝","💟","🏎️",
  "🚀","🚘","🚁","🛸","🏘️","⛴️","🛳️","💻","📱",
  "📌","🕉️","♾️","🤩","🥳","🫠","🏸","🤪","🩺",
  "🚿","🧽","🙇‍♂️","💁🏼‍♀️","💁🏼‍♂️","🙆🏻‍♀️","🧏🏻","🙇🏻‍♀️","💊",
  "💇🏻‍♀️","💆🏻‍♀️","🧛🏻‍♀️","🧚🏻‍♀️","💏🏻","🙅🏻‍♂️","🦀","🪼","🦚",
  "🦄","🐤","🐪","🦒","🦬","🐄","🐖","🐓","🐕‍🦺",
  "🦢","🦩","🦨","🌝","💥","☃️","⛅","🙇‍♂️","💉",
  "❣️","⚙️","💎","🗜️","🚜"
];

// Pick 10 random emojis
let selectedEmojis = [];
while (selectedEmojis.length < 10) {
  const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
  if (!selectedEmojis.includes(randomEmoji)) {
    selectedEmojis.push(randomEmoji);
  }
}

// Create pairs and shuffle
let gameEmojis = [...selectedEmojis, ...selectedEmojis];
gameEmojis = gameEmojis.sort(() => Math.random() - 0.5);

// Create cards
for (let i = 0; i < gameEmojis.length; i++) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="front">${gameEmojis[i]}</div>
    <div class="back">?</div>
  `;
  gameContainer.appendChild(card);
}

// Game logic (same as before)
let firstCard = null;
let secondCard = null;
let lockBoard = false;

gameContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".card");
  if (!clicked || lockBoard || clicked.classList.contains("flip")) return;

  clicked.classList.add("flip");

  if (!firstCard) {
    firstCard = clicked;
  } else {
    secondCard = clicked;
    checkMatch();
  }
});

function checkMatch() {
  if (firstCard.querySelector(".front").textContent === secondCard.querySelector(".front").textContent) {
    firstCard = null;
    secondCard = null;
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 800);
  }
}

function checkWin() {
  const flippedCards = document.querySelectorAll(".flip");
  if (flippedCards.length === gameEmojis.length) {
    setTimeout(() => {
      winPopup.classList.remove("hidden");
    }, 500);
  }
}

// Restart game
restartBtn.addEventListener("click", () => {
  window.location.reload();
});
