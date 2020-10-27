//todo: restatr button, flip, match text,  low score rememeber, card front, click handler, place gifs whoamatch function

// On Load Setup
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.getElementsByClassName("card");
  let cardNum = cards.length;
  let card1 = null;
  let card2 = null;
  let turns = 0;
  let flipped = 0;
  let lowscore = localStorage.getItem("whoalowscore");

  //set low score
  if (lowscore) {
    document.getElementById("low-score").innerText = lowscore;
  }

  //listen to the cards
  for (let card of cards) {
    card.addEventListener("click", cardClick);
  }
  
  // start button
  
  const whoaBtn = document.querySelector("#whoa");
  whoaBtn.addEventListener("click", startWhoa);

  function cardClick(e) {
    if (!e.target.classList.contains("front")) return;

    let clickedCard = e.target.parentElement;

    if (!card1 || !card2) {
      if (!clickedCard.classList.contains("flipped")) {
        setTurns(turns + 1);
      }
      clickedCard.classList.add("flipped");
      card1 = card1 || clickedCard;
      card2 = clickedCard === card1 ? null : clickedCard;
    }

    if (card1 && card2) {
      let gif1 = card1.children[1].children[0].src;
      let gif2 = card2.children[1].children[0].src;

      if (gif1 === gif2) {
        flipped += 2;
        card1.removeEventListener("click", cardClick)
        card2.removeEventListener("click", cardClick)
        card1 = null;
        card2 = null;
      } else {
        setTimeout(function() {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
        }, 1500)
      }
    }

    if (flipped === cardNum) finishGame();

  }

  function startWhoa() {
    setTurns(0)
    let positions = [];
    for (let i = 1; i <= cardNum / 2; i++) {
      positions.push(i.toString());
    }
    let pairs = shuffleArray(positions.concat(positions))

    for (let i = 0; i < cards.length; i++) {
      let path = "img/giphy" + pairs[i] + ".gif";
      cards[i].children[1].children[0].src = path; 
    }
  }

  function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setTurns(newTurns) {
  turns = newTurns;
  document.getElementById("turn-counter").innerText = turns;
}

function finishGame() {
  let end = document.getElementById("whoaEnd")
  let endMessage = end.children[1];
  endMessage.innerText = `Whoa! You did it in  ${turns} turns!`;
  let lowscore = Number(localStorage.getItem("whoalowscore")) || 0;
  if (turns < lowscore) {
    endMessage.innerText += " BRAND NEW LOW SCORE!! CONGRATS!!";
    localStorage.setItem("whoalowscore", turns);
  }
  document.getElementById("whoaEnd").classList.add("game-over");
}

startWhoa();
})

