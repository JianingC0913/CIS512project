# import os
# import sys
# from pathlib import Path

# # Set PYTHONPATH programmatically for Hydra
# sys.path.append(str(Path(__file__).resolve().parents[2] / "samv2"))
# os.environ["PYTHONPATH"] = os.environ.get("PYTHONPATH", "") + ":" + str(Path(__file__).resolve().parents[2] / "samv2")


# import sys
# from pathlib import Path

# # Add root path so samv2 is resolvable
# sys.path.append(str(Path(__file__).resolve().parents[2]))

# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from PIL import Image
# import io
# import numpy as np

# # Correct relative import from samv2 local
# from samv2.sam2.automatic_mask_generator import SAM2AutomaticMaskGenerator
# from samv2.sam2.build_sam import load_model


# import os
# import requests

# # Make sure the artifacts directory exists
# os.makedirs("artifacts", exist_ok=True)

# # Download SAMv2 Tiny checkpoint
# url = "https://dl.fbaipublicfiles.com/segment_anything_2/072824/sam2_hiera_tiny.pt"
# dest = "artifacts/sam2_hiera_tiny.pt"

# if not os.path.exists(dest):
#     print("⬇️ Downloading SAMv2 Tiny checkpoint...")
#     response = requests.get(url, stream=True)
#     with open(dest, "wb") as f:
#         for chunk in response.iter_content(chunk_size=8192):
#             f.write(chunk)
#     print("✅ Download complete: artifacts/sam2_hiera_tiny.pt")
# else:
#     print("✅ Checkpoint already exists.")


# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load SAMv2 model
# model = load_model(
#     variant="tiny",
#     ckpt_path="./artifacts/sam2_hiera_tiny.pt",
#     device="cpu"
# )
# mask_generator = SAM2AutomaticMaskGenerator(model)

# from samv2.sam2.utils.amg import rle_to_mask

# @app.post("/segment")
# async def segment_image(file: UploadFile = File(...)):
#     contents = await file.read()
#     image = np.array(Image.open(io.BytesIO(contents)).convert("RGB"))

#     masks = mask_generator.generate(image)

#     simplified_masks = []
#     for i, m in enumerate(masks):
#         binary_mask = rle_to_mask(m["segmentation"]).astype(np.uint8)
#         simplified_masks.append({
#             "id": i,
#             "bbox": m["bbox"],
#             "area": m["area"],
#             "mask": binary_mask.tolist()  # Send full mask as nested list
#         })

#     return {"masks": simplified_masks}

