from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from segment_anything import sam_model_registry, SamAutomaticMaskGenerator
import torch
import numpy as np
import cv2
from PIL import Image
import io
import base64
import sys
import os
# checkpoint_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "segment-anything", "sam_vit_b.pth"))


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

checkpoint_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "segment-anything", "sam_vit_b_01ec64.pth"))

#checkpoint_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "segment-anything", "sam_vit_b.pth"))
sam = sam_model_registry["vit_b"](checkpoint=checkpoint_path)
sam.to("cuda" if torch.cuda.is_available() else "cpu")
mask_generator = SamAutomaticMaskGenerator(sam)

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"🚀 Running SAM on: {device}")
sam.to(device)

@app.post("/segment")
async def segment_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = np.array(Image.open(io.BytesIO(contents)).convert("RGB"))
    print("📦 Received image shape:", image.shape)
    # masks = mask_generator.generate(image)
    # print(f"🎯 Generated {len(masks)} masks")
    try:
        print("🧪 Calling SAM.generate()...")
        masks = mask_generator.generate(image)
        print(f"🎯 Generated {len(masks)} masks")
    except Exception as e:
        print(f"❌ Error during segmentation: {e}")
        return {"error": str(e)}

    # Return masks as RLE (or binary PNGs) — for now, just return bbox & area
    simplified_masks = [
        {
            "id": i,
            "bbox": m["bbox"],
            "area": m["area"]
        }
        for i, m in enumerate(masks)
    ]

    return {"masks": simplified_masks}