
Build a mobile-first static web app deployable on GitHub Pages. This app is a deeply personal emotional support space designed for one specific person (a resident doctor with a stressful schedule).

The app MUST be fully JSON-driven for content. The developer should never need to modify the code to update messages, letters, or timeline—only JSON files.

⸻

🔐 ENTRY EXPERIENCE
	•	Full-screen entry page
	•	Message:
“This space is made for one person ❤️
If this is not you, you’ll know.”
	•	One input field (no username)
	•	Placeholder: “Enter your code”
	•	Code must match value from /config/app.json
	•	If correct:
→ Smooth transition into app
	•	If incorrect:
→ Show:
“This wasn’t made for you 🌙”

⸻

⚙️ CONFIG SYSTEM (STRICT REQUIREMENT)

Use multiple JSON files instead of one large file.

📁 /config/app.json
Controls:
{
“access”: {
“code”: “DDMM”
},
“features”: {
“tinyMoments”: true,
“onCallCompanion”: true,
“letters”: true,
“timeline”: true,
“miniGame”: true,
“voiceNote”: true
},
“relationship”: {
“startDate”: “YYYY-MM-DD”
}
}

⸻

📁 /config/messages.json

{
“tinyMoments”: [
“I’m proud of you ❤️”,
“Drink water please 😤”,
“You’re doing better than you think”
],
“badDay”: [
“It’s okay to feel tired. I’m here.”,
“You don’t have to be strong all the time.”
],
“moods”: {
“exhausted”: [
“You made it through today. That’s enough.”
],
“stressed”: [
“Breathe. One step at a time.”
],
“okay”: [
“I’m glad today wasn’t too hard ❤️”
]
}
}

⸻

📁 /config/letters.json

[
{
“text”: “If you’re reading this at 3 AM… I wish I was there.”,
“unlock”: “lateNight”
},
{
“text”: “Random reminder: you mean a lot to me.”,
“unlock”: “random”
},
{
“text”: “No matter how your day went, I’m still here.”,
“unlock”: “always”
}
]

⸻

📁 /config/timeline.json

[
{
“title”: “First time we talked”,
“date”: “YYYY-MM-DD”,
“description”: “…”
},
{
“title”: “A moment I’ll never forget”,
“date”: “YYYY-MM-DD”,
“description”: “…”
},
{
“title”: “Things I’m waiting to do with you”,
“future”: true,
“description”: “…”
}
]

⸻

📁 /config/game.json

{
“winMessages”: [
“You caught my heart ❤️”,
“Okay you win, I miss you more 😤”
]
}

⸻

🌸 UI / DESIGN
	•	Soft pastel colors (lavender, blush pink, light blue)
	•	Calm, minimal, emotionally warm
	•	Smooth animations (fade, float, subtle transitions)
	•	Rounded UI, lots of spacing
	•	Mobile-first design

⸻

✨ FEATURES

Render each feature ONLY if enabled in app.json.

⸻

	1.	💬 Tiny Moments

	•	Button: “I need a smile”
	•	Pull random message from messages.json
	•	Optional floating animation

⸻

	2.	🩺 On-Call Companion

	•	Mood selector:
	•	exhausted
	•	stressed
	•	okay
	•	Pull messages from messages.json → moods
	•	Include breathing animation (expand/contract circle)

⸻

	3.	📬 Letters

	•	Load from letters.json
	•	Logic:
	•	“always” → always visible
	•	“lateNight” → after 11 PM
	•	“random” → randomly appear

⸻

	4.	🗺️ Timeline

	•	Vertical scroll layout
	•	Pull from timeline.json

⸻

	5.	🎮 Mini Game

	•	Simple interaction (falling hearts or tap game)
	•	On win → show random message from game.json

⸻

	6.	🎵 Voice Note

	•	Play audio from /assets
	•	Show message:
“Play this when you feel alone.”

⸻

💖 RELATIONSHIP COUNTER
	•	Calculate days from app.json → startDate
	•	Show:
“We’ve made it through X days together ❤️”

⸻

📁 FILE STRUCTURE
	•	index.html
	•	style.css
	•	script.js
	•	/config/
	•	app.json
	•	messages.json
	•	letters.json
	•	timeline.json
	•	game.json
	•	/assets/

⸻

⚡ TECH REQUIREMENTS
	•	Vanilla JS (preferred) or lightweight framework
	•	Fetch JSON dynamically
	•	No backend
	•	GitHub Pages compatible

⸻

💡 FINAL EMOTIONAL REQUIREMENT

This should NOT feel like an app.

It should feel like:
	•	someone quietly being there for her
	•	something she opens during hard moments
	•	something that makes her feel seen and cared for

Avoid anything flashy or generic.

⸻

RETURN:
	•	Full working code
	•	Sample JSON files
	•	Clear instructions to deploy on GitHub Pages
:::

⸻

🔥 Why this version is perfect
	•	You can change everything from JSON
	•	Add new letters anytime → no redeploy logic changes
	•	Turn features on/off instantly
	•	Keep evolving it as your relationship grows

⸻
