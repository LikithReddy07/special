let config = {};
let messages = {};
let letters = [];
let timeline = [];
let gameData = {};

// 1. Load All JSON Files
async function loadData() {
  try {
    const [appRes, msgRes, letterRes, timelineRes, gameRes] = await Promise.all([
      fetch('config/app.json'),
      fetch('config/messages.json'),
      fetch('config/letters.json'),
      fetch('config/timeline.json'),
      fetch('config/game.json')
    ]);

    config = await appRes.json();
    messages = await msgRes.json();
    letters = await letterRes.json();
    timeline = await timelineRes.json();
    gameData = await gameRes.json();

    initLockScreen();
  } catch (err) {
    console.error("Error loading config files:", err);
  }
}

// 2. Lock Screen Logic
function initLockScreen() {
  const input = document.getElementById('access-code');
  const error = document.getElementById('error-message');

  input.addEventListener('input', (e) => {
    if (e.target.value === config.access.code) {
      unlockApp();
    } else if (e.target.value.length >= config.access.code.length) {
      error.classList.remove('hidden');
      setTimeout(() => {
        e.target.value = '';
        error.classList.add('hidden');
      }, 1000);
    }
  });
}

function unlockApp() {
  const lock = document.getElementById('lock-screen');
  const app = document.getElementById('main-app');

  lock.style.opacity = '0';
  setTimeout(() => {
    lock.classList.add('hidden');
    app.classList.remove('hidden');
    app.style.opacity = '1';
    renderApp();
  }, 500);
}

// 3. Render Application Features
function renderApp() {
  renderRelationshipCounter();
  const container = document.getElementById('app-content');
  container.innerHTML = '';

  const features = config.features;

  if (features.tinyMoments) container.appendChild(createTinyMoments());
  if (features.onCallCompanion) container.appendChild(createOnCallCompanion());
  if (features.letters) container.appendChild(createLetters());
  if (features.timeline) container.appendChild(createTimeline());
  if (features.miniGame) container.appendChild(createMiniGame());
  if (features.voiceNote) container.appendChild(createVoiceNote());
}

function renderRelationshipCounter() {
  const start = new Date(config.relationship.startDate);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById('relationship-counter').innerText = 
    `It's been ${diffDays} days ❤️`;
}

// --- Component Factories ---

function createTinyMoments() {
  const section = document.createElement('section');
  section.className = 'feature-card';
  section.innerHTML = `
    <h2>💬 Tiny Moments</h2>
    <button id="smile-btn">I need a smile</button>
    <div id="moment-display" class="tiny-moments-message hidden"></div>
  `;

  const btn = section.querySelector('#smile-btn');
  const display = section.querySelector('#moment-display');

  btn.onclick = () => {
    const randomMsg = messages.tinyMoments[Math.floor(Math.random() * messages.tinyMoments.length)];
    display.innerText = randomMsg;
    display.classList.remove('hidden');
  };

  return section;
}

function createOnCallCompanion() {
  const section = document.createElement('section');
  section.className = 'feature-card';
  section.innerHTML = `
    <h2>🩺 On-Call Companion</h2>
    <div class="mood-selector">
      <button class="mood-btn" data-mood="exhausted">Exhausted</button>
      <button class="mood-btn" data-mood="stressed">Stressed</button>
      <button class="mood-btn" data-mood="okay">Okay</button>
    </div>
    <div id="mood-response" class="tiny-moments-message hidden"></div>
    <div class="breathing-circle">Breathe</div>
  `;

  section.querySelectorAll('.mood-btn').forEach(btn => {
    btn.onclick = () => {
      const mood = btn.dataset.mood;
      const moodMsgs = messages.moods[mood];
      const msg = moodMsgs[Math.floor(Math.random() * moodMsgs.length)];
      const display = section.querySelector('#mood-response');
      display.innerText = msg;
      display.classList.remove('hidden');
    };
  });

  return section;
}

function createLetters() {
  const section = document.createElement('section');
  section.className = 'feature-card';
  section.innerHTML = `<h2>📬 Letters</h2><div class="letters-container"></div>`;
  const container = section.querySelector('.letters-container');

  const now = new Date();
  const isLateNight = now.getHours() >= 23 || now.getHours() < 5;

  letters.forEach(letter => {
    let show = false;
    if (letter.unlock === 'always') show = true;
    if (letter.unlock === 'lateNight' && isLateNight) show = true;
    if (letter.unlock === 'random' && Math.random() > 0.5) show = true;

    if (show) {
      const div = document.createElement('div');
      div.className = 'letter';
      div.innerText = letter.text;
      container.appendChild(div);
    }
  });

  return section;
}

function createTimeline() {
  const section = document.createElement('section');
  section.className = 'feature-card';
  section.innerHTML = `<h2>🗺️ Timeline</h2><div class="timeline-container"></div>`;
  const container = section.querySelector('.timeline-container');

  timeline.forEach(item => {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p class="timeline-date">${item.date || 'The Future'}</p>
      <p>${item.description}</p>
    `;
    container.appendChild(div);
  });

  return section;
}

function createMiniGame() {
  const section = document.createElement('section');
  section.className = 'feature-card';
  section.innerHTML = `
    <h2>🎮 Mini Game</h2>
    <p>Catch a heart!</p>
    <div class="game-area" id="game-area"></div>
    <div id="game-win-msg" class="tiny-moments-message hidden"></div>
  `;

  const area = section.querySelector('#game-area');
  const winMsg = section.querySelector('#game-win-msg');

  function spawnHeart() {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 90 + '%';
    heart.style.top = Math.random() * 80 + '%';
    
    heart.onclick = () => {
      winMsg.innerText = gameData.winMessages[Math.floor(Math.random() * gameData.winMessages.length)];
      winMsg.classList.remove('hidden');
      heart.remove();
      setTimeout(spawnHeart, 2000);
    };

    area.appendChild(heart);
  }

  spawnHeart();
  return section;
}

function createVoiceNote() {
  const section = document.createElement('section');
  section.className = 'feature-card';
  section.innerHTML = `
    <h2>🎵 Voice Note</h2>
    <p>Play this when you feel alone.</p>
    <audio controls style="width: 100%; margin-top: 15px;">
      <source src="assets/voice-note.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  `;
  return section;
}

// Start the app
loadData();
