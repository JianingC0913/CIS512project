export const renderCharacterToCanvas = async (features, overlays, bodySrc) => {
  const width = 400;
  const height = 468;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#D9A2F4"; //  lilac bg
  ctx.fillRect(0, 0, width, height);

  const featureStyles = {
    hair: [{ top: 40, left: 128, width: 160, height: 132 }, { top: 165, left: 93, width: 270, height: 170 }, { top: 170, left: 85, width: 270, height: 170 }],
    eyes: [{ top: 45, left: 135, width: 120, height: 97 }, { top: 197, left: 160, width: 140, height: 90 }, { top: 193, left: 159, width: 140, height: 95 }],
    mouth: [{ top: 243, left: 200, width: 70, height: 50 }, { top: 240, left: 200, width: 65, height: 45 }, { top: 240, left: 195, width: 65, height: 45 }],
    clothes: [{ top: 275, left: 117, width: 230, height: 220 }, { top: 269, left: 107, width: 240, height: 230 }],
  };
  

  const loadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.src = src;
    });

  // Draw in correct z-index order
  const draw = async () => {
    const bodyImg = await loadImage(bodySrc);
    ctx.drawImage(bodyImg, 0, 0, width, height); // body fills canvas

    for (const [feature, index] of Object.entries(features)) {
      const src = overlays[feature]?.[index];
      const style = featureStyles[feature]?.[index];

      if (src && style) {
        const img = await loadImage(src);
        ctx.drawImage(img, style.left, style.top, style.width, style.height);
      }
    }
  };

  await draw();
  return canvas;
};
