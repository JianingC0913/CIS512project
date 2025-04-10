from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image, ImageDraw
import os
import io
import json

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.post("/refine")
async def refine_with_ai(file: UploadFile, instruction: str = Form(...), box: str = Form(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGBA")
    image.save("input.png")

    # Parse selection box JSON from frontend
    selection_box = json.loads(box)

    # Create full-size black mask
    mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rectangle(
        [
            selection_box["x"] * 2,
            selection_box["y"] * 2,
            (selection_box["x"] + selection_box["width"]) * 2,
            (selection_box["y"] + selection_box["height"]) * 2,
        ],
        fill=255
    )
    mask.save("mask.png")

    # Call OpenAI image edit API with mask
    response = client.images.edit(
        image=open("input.png", "rb"),
        mask=open("mask.png", "rb"),
        prompt=instruction,
        n=1,
        size="512x512",
        response_format="url",
    )

    return {"url": response.data[0].url}
