# 🧸 Build Your Original Character
## AI-Powered Character Customization Web App


**Build Your OC** is a fun and interactive web app that lets users design original characters (OCs) by customizing layered SVG features and generating self-intro with AI based on the generated character - our app takes care of the rest ✨.



## 🧪 Using the App
Customize your character on the left panel.

Then use our AI storyteller to generate your customized self-intro based on your created character!

Enter more details for AI to generate self-intro!

Click ✨ Refine.


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

