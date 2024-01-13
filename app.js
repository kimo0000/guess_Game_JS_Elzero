const listeEl = document.querySelector(".list_try"),
  hintBtn = document.querySelector(".hint"),
  checkBtn = document.querySelector(".check_guess"),
  messageDisplay = document.querySelector(".message");

const numbersOftry = 6;
const numbersOfLetters = 6;
let currentTry = 1;
let numbersOfHint = 2;

let correctWord = arrayOfWord[Math.floor(Math.random() * arrayOfWord.length)];
console.log(correctWord);

window.addEventListener("DOMContentLoaded", createLItag);

function createLItag() {
  for (let i = 1; i <= numbersOftry; i++) {
    const tryLI = document.createElement("li");
    tryLI.classList.add("try", `try-${i}`);

    tryLI.innerHTML = `<span>try ${i}</<span>`;

    if (i != 1) tryLI.classList.add("disable_input");

    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.id = `guess-${i}_letter-${j}`;
      input.type = "text";
      input.setAttribute("maxlength", 1);

      tryLI.appendChild(input);
    }

    listeEl.appendChild(tryLI);
  }

  listeEl.children[0].children[1].focus();

  const inputsEl = listeEl.querySelectorAll(".disable_input input");
  inputsEl.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll(`input`);
  // console.log(inputs)
  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keyup", (e) => {
      const currentIndex = Array.from(inputs).indexOf(e.target);
      if (e.key === "ArrowRight") {
        // console.log(index);
        const nextInput = currentIndex + 1;
        if (nextInput) inputs[nextInput].focus();
      }
      if (e.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput > 0) inputs[prevInput].focus();
      }
    });
  });
}

const checkGuess = () => {
  let succesGuess = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}_letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actuelLetter = correctWord[i - 1];
    // console.log(actuelLetter +" "+ letter);
    if (letter === actuelLetter) {
      inputField.classList.add("yes_in_place");
    } else if (correctWord.includes(letter)) {
      inputField.classList.add("yes_not_in_place");
      succesGuess = false;
    } else {
      inputField.classList.add("wrong_leter");
      succesGuess = false;
    }
  }

  const tryDiv = document.querySelectorAll(".try");
  const tryInputs = document.querySelectorAll(".try input");

  if (succesGuess) {
    tryDiv.forEach((tryDiv) => tryDiv.classList.add("disable_input"));
    tryInputs.forEach((input) => (input.disabled = true));
    checkBtn.disabled = true;
    checkBtn.classList.add("disable_btn");
    hintBtn.disabled = true;
    hintBtn.classList.add("disable_btn");
    messageDisplay.innerHTML = `Congra! You Win The Right Word Is <span>${correctWord}</span>`;
    if (numbersOfHint === 2) {
      // console.log("Hint Message");
      messageDisplay.innerHTML = `Congrat, You Win You Have Didn't Use Hint And The Correct word Is <span>${correctWord}</span>`;
    }
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disable_input");
    document
      .querySelectorAll(`.try-${currentTry} input`)
      .forEach((input) => (input.disabled = true));

    currentTry++;

    let nextElTry = document.querySelector(`.try-${currentTry}`);
    // console.log(nextElTry);
    if (nextElTry) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disable_input");
      document
        .querySelectorAll(`.try-${currentTry} input`)
        .forEach((input) => (input.disabled = false));
      nextElTry.children[1].focus();
    } else {
      checkBtn.disabled = true;
      checkBtn.classList.add("disable_btn");
      hintBtn.disabled = true;
      hintBtn.classList.add("disable_btn");
      messageDisplay.innerHTML = `you Lose! The Right Word Searching Is <span>${correctWord}</span>`;
    }
  }
};

const handleHint = () => {
  if (numbersOfHint > 0) {
    numbersOfHint--;
    hintBtn.innerText = `Hint: ${numbersOfHint}`;
  }

  if (numbersOfHint === 0) {
    hintBtn.disabled = true;
    hintBtn.classList.add("disable_btn");
  }

  const enableInput = document.querySelectorAll(`input:not([disabled])`);
  const emptyEnableInput = [...enableInput].filter(
    (input) => input.value === ""
  );
  if (emptyEnableInput.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnableInput.length);
    const randomIinput = emptyEnableInput[randomIndex];
    const indexToFill = Array.from(enableInput).indexOf(randomIinput);
    randomIinput.value = correctWord[indexToFill].toUpperCase();
  }
};

const handleKeyUp = (e) => {
  if (e.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = [...inputs].indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      if (prevInput) prevInput.focus();
    }
  }
};

checkBtn.addEventListener("click", checkGuess);
hintBtn.innerText = `Hint: ${numbersOfHint}`;
hintBtn.addEventListener("click", handleHint);
document.addEventListener("keyup", handleKeyUp);
