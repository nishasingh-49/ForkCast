# ForkCast

**Mood-based cravings? Weather-driven vibes? Welcome to ForkCast — the only forecast that tells you what your *soul* wants to eat.**<br>
(mainly for the indecisive people like me lmao)


## What is ForkCast?

ForkCast is a playful, mood-aware, weather-synced web app that predicts what kind of food you're likely to crave — and drops a matching Spotify playlist to vibe along. Just input your city, choose your mood, and voilà: mood + weather = craving decoded.

---

##  Features

- **Real-time Weather Integration**  
  Fetches current weather data based on your city using a custom Express API.

- **Mood Selector**  
  Choose your mood from a list — Happy, Sad, Angry, Tired, Excited, or Meh.

- **Auto-curated Spotify Playlists**  
  Get a personalized playlist matching your mood. Because food tastes better with music.

- **Glassmorphism UI**  
  A sleek glassy interface with subtle animations and soft glows for that dopamine drip.

- **ForkTips Widget**  
  Random quirky food tips rotate at the bottom, like a fortune cookie but sassier.

---


## Tech Stack

| Layer          | Tools / Services                                                         |
| -------------- | ------------------------------------------------------------------------ |
| **Frontend**   | React.js, CSS (Glassmorphism), Animations                                |
| **Backend**    | Node.js, Express.js                                                      |
| **APIs**       | OpenWeatherMap API (live weather), Spotify (mood-based static playlists) |
| **Deployment** | **Frontend:** Vercel          <br>**Backend:** Render                    |



---

## How to Run Locally
(ALSO, DONT FORGET TO ADD YOUR OWN APIs!!)

```bash
# Clone the repo
git clone https://github.com/nishasingh-49/ForkCast.git

# Navigate to frontend
cd forkcast-frontend
npm install
npm start

# In a separate terminal, navigate to backend
cd forkcast-backend
npm install
npm start
