# 🧸 Build Your Character
## AI-Powered Character Customization & Storytelling


**Build Your Character** is a creative and interactive web app that empowers users to design original characters using a modular SVG builder—and then generate custom-written stories, bios, or self-introductions using AI based on the character’s traits. Whether you're creating a hero for a game, a persona for social media, or just for fun, our app helps bring your character to life through words.



## ✨ What You Can Do

- 🎨 Customize Your Character:
  - Use our layered SVG-based builder to create your OC’s appearance—including skin tone, hair, eyes, outfit, and more.

- ✍️ Generate a Story with AI
  - Once your character is ready, use our AI writer to create a fantasy story, write a backstory, or generate a self-introduction.
  - Tailor your text to Platforms: choose where you want to share your OC (Instagram, YouTube, TikTok, LinkedIn, etc.), and we’ll adjust the tone and format accordingly!


<img width="1186" alt="Screenshot 2025-04-24 at 12 12 24 AM" src="https://github.com/user-attachments/assets/e3cf7af1-fc3f-48d4-9aa5-856daaf67772" />
<img width="1182" alt="Screenshot 2025-04-24 at 12 12 53 AM" src="https://github.com/user-attachments/assets/89341504-6179-4961-862f-df35571bc0ae" />
<img width="1172" alt="Screenshot 2025-04-24 at 12 13 12 AM" src="https://github.com/user-attachments/assets/2396a629-1959-4398-ba64-86ec47746a4a" />
<img width="1190" alt="Screenshot 2025-04-24 at 12 13 27 AM" src="https://github.com/user-attachments/assets/5522b178-3ea5-4164-9648-c69681d06dbd" />


## 🛠 Tech Stack

- **Frontend**: React + Tailwind CSS  
- **Backend**: FastAPI (Python)  
- **AI Integration**: OpenAI Image API (`images.edit`)  
- **Image Capturing**: `html2canvas`  



## 📦 Project Structure

- **/src**: React app for building and refining your character
- **/backend**: FastAPI server to handle AI image editing
- **.env**: Your OpenAI API key and environment config



## 🚀 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/JianingC0913/CIS512project.git
cd CIS512project
```


### 2. Frontend Setup
Install Dependencies and Start the React App
```
npm install
npm start
```


### 3. Backend Setup 
Get your OpenAPI key, place it in .env file like below. Make sure your .env file exists **at the root level of this project (it should be at the same level as /src, not inside /src)**:
```
OPENAI_API_KEY="sk-..."
```

Install Dependencies and start the Backend Server
```
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.backend.main:app --reload
```


## 👩🏻‍💻👩🏻‍💻👩🏻‍💻 Credits
Built by Jianing Cai, Lesley Zhao, Kate Cai for CIS 512 Human-Computer Interaction
University of Pennsylvania, 2025 Spring

