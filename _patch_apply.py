# -*- coding: utf-8 -*-
from pathlib import Path
import re, shutil

ROOT = Path(r"c:\Users\东北大妞\Desktop\health-main-1")
CRITICAL = Path("_ai_critical.txt").read_text(encoding="utf-8").rstrip() + "\n"
APP_CSS = Path("_ai_app.css.txt").read_text(encoding="utf-8")
if not APP_CSS.endswith("\n"):
    APP_CSS += "\n"
CLICK = Path("_ai_click.js.txt").read_text(encoding="utf-8").rstrip()
V2 = Path("_ai_v2.js.txt").read_text(encoding="utf-8").rstrip() + "\n"

def patch_index(path: Path):
    text = path.read_text(encoding="utf-8")

    text2, n = re.subn(
        r'(href="\./css/app\.css\?v=)[^"]+"',
        r'\1ai-record-anchor-1"',
        text,
        count=1,
    )
    if n != 1:
        raise SystemExit(f"FAIL stylesheet href in {path}: n={n}")
    text = text2

    start = text.find('<style id="ai-record-entry-critical">')
    end = text.find("</style>", start)
    if start < 0 or end < 0:
        raise SystemExit(f"FAIL critical style in {path}")
    end = end + len("</style>")
    text = text[:start] + CRITICAL.rstrip() + text[end:]

    c_start = text.find("document.getElementById('qaSmartRecordHost')?.addEventListener('click'")
    if c_start < 0:
        raise SystemExit(f"FAIL click listener in {path}")
    k_start = text.find("document.getElementById('qaSmartRecordHost')?.addEventListener('keydown'", c_start)
    if k_start < 0:
        raise SystemExit(f"FAIL keydown listener in {path}")
    after = text.find("carouselTrack.querySelectorAll('.qa-item')", k_start)
    if after < 0:
        raise SystemExit(f"FAIL after-keydown marker in {path}")
    line_start = text.rfind("\n", 0, after) + 1
    text = text[:c_start] + CLICK + "\n  " + text[line_start:]

    v2 = text.find("// --- AI Smart Record V2")
    if v2 < 0:
        raise SystemExit(f"FAIL V2 marker in {path}")
    rpm = text.find("function renderPhotoModal", v2)
    if rpm < 0:
        raise SystemExit(f"FAIL renderPhotoModal in {path}")
    text = text[:v2] + V2 + text[rpm:]

    path.write_text(text, encoding="utf-8", newline="\n")
    print("OK", path)

def patch_css(path: Path):
    text = path.read_text(encoding="utf-8")
    # Prefer comment containing AI + host
    start = text.find(".qa-smart-record-host{margin-bottom:0")
    if start < 0:
        raise SystemExit(f"FAIL css host in {path}")
    # include preceding comment line if any
    line_start = text.rfind("\n", 0, start)
    prev = text.rfind("\n", 0, line_start - 1) + 1 if line_start > 0 else 0
    chunk = text[prev:line_start]
    if "AI" in chunk or "\u667a\u80fd" in chunk or chunk.strip().startswith("/*"):
        start = prev
    end = text.find(".quick-add-carousel-viewport{", start)
    if end < 0:
        raise SystemExit(f"FAIL carousel in {path}")
    text = text[:start] + APP_CSS + text[end:]
    path.write_text(text, encoding="utf-8", newline="\n")
    print("OK", path)

index = ROOT / "index.html"
css = ROOT / "css" / "app.css"
patch_index(index)
patch_css(css)

and_web = ROOT / "android" / "app" / "src" / "main" / "assets" / "web"
shutil.copy2(index, and_web / "index.html")
shutil.copy2(css, and_web / "css" / "app.css")
print("OK synced android")
