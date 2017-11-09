const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp =''
let score = 0

// setting random time
function randomTime(min,max){
  return Math.round(Math.random()*(max-min)+min);
}

// choose random hole
function randomHole(holes){
  const idx = Math.floor(Math.random()*holes.length)
  const hole = holes[idx]
  // checking is with same number like last one, then render another number
  if(hole === lastHole){
    console.log('its the same hole')
    return randomHole(holes)
  }
  lastHole = hole
  return hole

}


// animal head popping out use CSS
function peep(){
  //level setting
  const time = randomTime(200, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() =>{
    hole.classList.remove('up');
    if(!timeUp) peep()
  },time)
}

// game start by click the button
function startGame(){
  scoreBoard.textContent = 0
  timeUp = false
  score = 0
  peep()
  setTimeout(() => timeUp = true, 10000)
}

// adding point if click the classList
// also remove the CSS tag for when you click it
function bonk(e){
  // make sure is actual click on the cat
  if(!e.isTrusted) return;
  score++;
  this.classList.remove('up')
  scoreBoard.textContent = score
  console.log(e)
}

moles.forEach(mole => mole.addEventListener('click',bonk))
