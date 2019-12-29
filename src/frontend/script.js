const RANDOM_QUOTE_API = 'http://api.quotable.io/random';
const quote_display_elem = document.getElementById('quoteDisplay');
const quote_input_elem = document.getElementById('quoteInput');
const timer_elem = document.getElementById('timer');

quote_input_elem.addEventListener('input', () => {
  const quote = quote_display_elem.querySelectorAll('span');
  const input = quote_input_elem.value.split('');
  let char = '';
  let correct = true;

  quote.forEach((word, index) => {
    char = input[index];
    if (char == null){
      word.classList.remove('correct');
      word.classList.remove('incorrect');
      correct = false;
    } else if (char === word.innerText) {
      word.classList.add('correct');
      word.classList.remove('incorrect');
      correct = true;
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
  quote_display_elem.innerHTML = '';

  quote.split('').forEach(char => {
    const char_span = document.createElement('span');
    char_span.innerText = char;
    quote_display_elem.appendChild(char_span);
  });

  quote_input_elem.value = null;
  start_timer();
}

let start_time = null;

function start_timer() {
  timer_elem.innerText = 0; 
  start_time = new Date();
  setInterval(() => {
    timer_elem.innerText = get_timer_time();
  }, 1000);
}

function get_timer_time() {
  return Math.floor((new Date() - start_time) / 1000);
}

render_new_quote();
