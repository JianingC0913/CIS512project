import os
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image, ImageDraw
import io
import json

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust as needed for your deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate the OpenAI client using the new interface.
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.post("/refine-image-chat")
async def refine_image_chat(file: UploadFile, instruction: str = Form(...)):
    """
    This endpoint receives an image and an instruction.
    It saves the image, simulates generating a caption from it, builds a prompt,
    then calls the OpenAI chat API to generate a self-introduction story for the character.
    """
    # Read and process the uploaded image.
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGBA")
    image.save("input_chat.png")

    # Here you would normally generate a caption from the image.
    # For our example, we simulate the caption:
    image_caption = (
        "A vibrant character with unique features, exuding confidence and creativity."
    )

    # Build a prompt that uses the generated caption and the user's instruction.
    prompt = (
        f"Using the character image description:\n'{image_caption}'\n"
        f"and the instruction: '{instruction}',\n"
        "generate a creative self-introduction story for the character."
    )

    try:
        # Call the ChatCompletion API using the new client interface.
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a creative assistant that generates self-introduction stories based on a character image."
                },
                {"role": "user", "content": prompt},
            ],
        )
        # Extract the generated text.
        story = completion.choices[0].message.content.strip()
    except Exception as e:
        story = f"Error occurred: {e}"

    return {"text": story}
