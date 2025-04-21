import os
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import openai
from openai import OpenAI
from dotenv import load_dotenv
from PIL import Image, ImageDraw
import io
import json
from pydantic import BaseModel
from typing import Literal
from io import BytesIO
import base64
import tempfile

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


@app.post("/refine-ai2")
async def refine_with_ai2(
    file: UploadFile,
    name: str = Form(...),
    type: Literal["fantasy_story", "backstory", "self_intro", "superpowers"] = Form(...)
):
    content = await file.read()
    image = Image.open(BytesIO(content)).convert("RGBA")  # optional, can be used later

    prompt_map = {
        "fantasy_story": f"Write a fantasy story about a character named {name} who lives in a magical world.",
        "backstory": f"Create a detailed character backstory for someone named {name}.",
        "self_intro": f"Write a self-introduction from the perspective of a character named {name}.",
        "superpowers": f"Describe the superpowers and abilities of a character named {name}."
    }

    prompt = prompt_map[type]

    # Call OpenAI GPT API
    response = client.chat.completions.create(
        model="gpt-4",  # or "gpt-3.5-turbo" if preferred
        messages=[
            {"role": "system", "content": "You are a creative storytelling assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500
    )

    story = response.choices[0].message.content.strip()
    return {"text": story}



# Prompts based on style choice
style_prompts = {
    "conan": "Apply Detective Conan anime art style to this character. Keep the outfit the same.",
    "onepiece": "Apply One Piece anime pirate style to this character, keep the clothes unchanged.",
    "ghibli": "Apply Studio Ghibli soft painterly style, but keep the character outfit exactly the same.",
    "spongebob": "Apply Spongebob cartoon style in the Sponge Bob Square Pants to the character, keeping the original outfit.",
    "patrick": "Make the character look like Patrick Star style in the cartoon Sponge Bob Square Pants, but keep their clothing the same.",
    "chinese": "Transform the character into traditional Chinese brush painting style, keep clothes unchanged.",
    "starbucks": "Render the character in a Starbucks-themed style, keeping the outfit as it is."
}



# @app.post("/style-transform")
# async def style_transform(file: UploadFile, style: str = Form(...)):
#     if style not in style_prompts:
#         return {"error": "Invalid style."}

#     # Read and process image
#     contents = await file.read()
#     image = Image.open(io.BytesIO(contents)).convert("RGBA")
#     image = image.resize((512, 512))

#     # Flatten transparency to white
#     white_bg = Image.new("RGBA", image.size, (255, 255, 255, 255))
#     image_with_white_bg = Image.alpha_composite(white_bg, image)

#     # Save input image
#     input_path = "input_image.png"
#     image_with_white_bg.save(input_path, format="PNG")

#     # Save proper PNG mask to disk
#     mask_image = Image.new("L", image.size, 255)
#     mask_path = "mask_image.png"
#     mask_image.save(mask_path, format="PNG")

#     try:

#         response = client.images.generate(
#             prompt=f"{style_prompts[style]} Full-body character on a white background, digital art.",
#             model="dall-e-2",
#             n=1,
#             size="512x512",
#             response_format="b64_json"
#         )

#         b64_image = response.data[0].b64_json
#         return {"image": b64_image}

#     except Exception as e:
#         return {"error": f"OpenAI error: {e}"}

@app.post("/style-transform")
async def style_transform(file: UploadFile, style: str = Form(...)):
    if style not in style_prompts:
        return {"error": "Invalid style selected."}

    # Load image and ensure square + PNG
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGBA")
    image = image.resize((512, 512))

    # Flatten transparency to white
    white_bg = Image.new("RGBA", image.size, (255, 255, 255, 255))
    composite = Image.alpha_composite(white_bg, image)

    # Save image to bytes
    img_buffer = BytesIO()
    composite.save(img_buffer, format="PNG")
    img_buffer.seek(0)

    # Create a full white mask
    mask = Image.new("L", image.size, 255)
    mask_buffer = BytesIO()
    mask.save(mask_buffer, format="PNG")
    mask_buffer.seek(0)

    try:
        # DALL·E image edit API call
        response = client.images.edit(
            image=img_buffer,
            mask=mask_buffer,
            prompt=f"{style_prompts[style]}",
            model="dall-e-2",  # Use dall-e-3 if your key supports it
            size="512x512",
            response_format="b64_json",
        )
        return {"image": response.data[0].b64_json}

    except Exception as e:
        return {"error": f"DALL·E edit failed: {e}"}
