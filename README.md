# 🧸 Build Your Original Character
# AI-Powered Character Customization Web App

**Build Your OC** is a fun and interactive web app that lets users design original characters (OCs) by customizing layered SVG features and refining specific parts of their character using AI-powered image editing. Simply drag a box over a region and describe how you want to change it — our app takes care of the rest ✨.



## 🧪 Using the App
Customize your character on the left panel.

Draw a rectangle over the area you want to refine.

Enter an instruction (e.g., "Add a rose to this hand").

Click ✨ Refine.
<img width="710" alt="Screenshot 2025-04-07 at 3 07 23 PM" src="https://github.com/user-attachments/assets/2469b965-f287-477e-80bb-8104ff3504ce" />


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
git clone https://github.com/your-username/build-your-oc.git
cd build-your-oc
🧩 Frontend Setup (/frontend)

📦 Install Dependencies and Start the React App
cd src
npm install
npm start
Open your browser to http://localhost:3000

🧠 Backend Setup (/backend)
📦 Install Dependencies
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
Make sure your .env file exists in /backend and contains:
OPENAI_API_KEY=sk-...


▶️ Start the FastAPI Server
uvicorn main:app --reload
``` 




## 🧑‍🎨 Credits
Built by Jianing Cai, Lesley Zhao, Kate Cai for CIS 512 Human-Computer Interaction
University of Pennsylvania, 2025 Spring

