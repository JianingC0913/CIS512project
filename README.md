# 🧸 Build Your Original Character
## AI-Powered Character Customization Web App


**Build Your OC** is a fun and interactive web app that lets users design original characters (OCs) by customizing layered SVG features and generating self-intro with AI based on the generated character - our app takes care of the rest ✨.



## 🧪 Using the App
Customize your character on the left panel.

Then use our AI storyteller to generate your customized self-intro based on your created character!

Enter more details for AI to generate self-intro!

Click ✨ Refine.

<img width="710" alt="Screenshot 2025-04-07 at 3 07 23 PM" src="https://github.com/user-attachments/assets/0698de7b-9e6a-4755-82c5-69394e1eb63d" />


<img width="710" alt="Screenshot 2025-04-07 at 3 07 23 PM" src="https://github.com/user-attachments/assets/ddea20d2-6b6b-462d-9c8a-c5a413172dde" />


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

🧩 Frontend Setup (/src)
📦 Install Dependencies and Start the React App
npm install
npm start


🧠 Backend Setup (/backend)
📦 Install Dependencies
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt

📦 Make sure your .env file exists in /backend and contains:
OPENAI_API_KEY=sk-...


▶️ Start the FastAPI Server
uvicorn src.backend.main:app --reload
``` 




## 🧑‍🎨 Credits
Built by Jianing Cai, Lesley Zhao, Kate Cai for CIS 512 Human-Computer Interaction
University of Pennsylvania, 2025 Spring

