const RANDOM_QUOTE_API = 'http://api.quotable.io/random';
const display = document.querySelector('.display');
const input = document.querySelector('.input');
const timer = document.querySelector('.timer');

//const [display, input, timer] = 
//    document.querySelectorAll('.display, .input, .timer');

input.addEventListener('input', () => {
  const quote = display.querySelectorAll('span');
  const input_text = input.value.split('');
  let char = '';
  let correct = true;

  quote.forEach((word, index) => {
    char = input_text[index];
    if (char == null){
      word.classList.remove('correct');
      word.classList.remove('incorrect');
      correct = false;
    } else if (char === word.innerText) {
      word.classList.add('correct');
      word.classList.remove('incorrect');
    } else {
      word.classList.remove('correct');
      word.classList.add('incorrect');
      correct = false;
    }
  });

  if (correct) {
    render_new_quote();
  }
});

function get_random_quote() {
  return fetch(RANDOM_QUOTE_API)
    .then(response => response.json())
    .then(data => data.content);
}

async function render_new_quote() {
  const quote = await get_random_quote();
  display.innerHTML = '';

  quote.split('').forEach(char => {
    const char_span = document.createElement('span');
    char_span.innerText = char;
    display.appendChild(char_span);
  });

  input.value = null;
  start_timer();
}

let start_time = null;

function start_timer() {
  timer.innerText = 0; 
  start_time = new Date();
  setInterval(() => {
    timer.innerText = get_timer_time();
  }, 1000);
}

function get_timer_time() {
  return Math.floor((new Date() - start_time) / 1000);
}

render_new_quote();
