# Génère les icônes PWA de FINA Beauty (emblème losange doré sur fond sombre)
from PIL import Image, ImageDraw, ImageFont
import math

S = 512
img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

bg = (23, 18, 16, 255)        # #171210
gold = (214, 170, 78, 255)    # #d6aa4e
gold_soft = (202, 161, 90, 170)
cream = (255, 247, 230, 255)

# Fond plein (bon pour icône maskable)
d.rectangle([0, 0, S, S], fill=bg)

cx, cy = S / 2, S / 2

# Losange (carré pivoté) — contour doré
r = S * 0.37
pts = [(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)]
d.line(pts + [pts[0]], fill=gold, width=int(S * 0.022), joint="curve")
r2 = S * 0.305
pts2 = [(cx, cy - r2), (cx + r2, cy), (cx, cy + r2), (cx - r2, cy)]
d.line(pts2 + [pts2[0]], fill=gold_soft, width=int(S * 0.009), joint="curve")

# Fleur (couronne) en haut
fcx, fcy = cx, cy - S * 0.205
pr = S * 0.032
for k in range(6):
    a = math.radians(k * 60)
    px = fcx + math.cos(a) * pr * 1.5
    py = fcy + math.sin(a) * pr * 1.5
    d.ellipse([px - pr, py - pr, px + pr, py + pr], fill=gold)
d.ellipse([fcx - pr * 0.75, fcy - pr * 0.75, fcx + pr * 0.75, fcy + pr * 0.75], fill=cream)

# Monogramme "F"
try:
    font = ImageFont.truetype("C:/Windows/Fonts/timesbd.ttf", int(S * 0.40))
except Exception:
    font = ImageFont.load_default()
d.text((cx, cy + S * 0.055), "F", font=font, fill=gold, anchor="mm")

for size, name in [(512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png")]:
    img.resize((size, size), Image.LANCZOS).save("images/" + name)
    print("écrit images/" + name)
print("OK")
