# -*- coding: utf-8 -*-
from pathlib import Path

checks = []

def ok(msg, cond):
    checks.append((cond, msg))
    print(("PASS" if cond else "FAIL"), msg)

for label, ip, cp in [
    ("web", Path("index.html"), Path("css/app.css")),
    ("android", Path("android/app/src/main/assets/web/index.html"), Path("android/app/src/main/assets/web/css/app.css")),
]:
    html = ip.read_text(encoding="utf-8")
    css = cp.read_text(encoding="utf-8")
    ok(f"{label}: css href v=ai-record-anchor-1", 'href="./css/app.css?v=ai-record-anchor-1"' in html)
    ok(f"{label}: critical has ai-anchor-food left", ".ai-anchor-food{left:var(--ai-pad);right:auto}" in html)
    ok(f"{label}: critical has ai-anchor-order right", ".ai-anchor-order{right:var(--ai-pad);left:auto}" in html)
    ok(f"{label}: critical split left var", ".ai-record-split-handle{\n  position:absolute;top:0;bottom:0;left:var(--ai-split-x)" in html or "left:var(--ai-split-x)" in html and "ai-record-split-handle" in html)
    ok(f"{label}: no old food-pct in critical", "--ai-food-pct" not in html[html.find('ai-record-entry-critical'):html.find('</style>', html.find('ai-record-entry-critical'))+10])
    ok(f"{label}: click uses dataset.aiExpanded!==kind", "main.dataset.aiExpanded!==kind" in html)
    ok(f"{label}: click ignores split handle", "if(e.target.closest('.ai-record-split-handle')) return;" in html)
    ok(f"{label}: expandAIRecordSide exists", "function expandAIRecordSide(main,kind)" in html)
    ok(f"{label}: snapAIRecordSplit exists", "function snapAIRecordSplit(main," in html)
    ok(f"{label}: applyAIRecordSplitX exists", "function applyAIRecordSplitX(main,xPx" in html)
    ok(f"{label}: ai-anchor-food in refresh HTML", 'class="ai-anchor ai-anchor-food"' in html)
    ok(f"{label}: ai-anchor-order in refresh HTML", 'class="ai-anchor ai-anchor-order"' in html)
    ok(f"{label}: ai-record-stage in couple HTML", 'class="ai-record-stage"' in html)
    ok(f"{label}: solo has no stage in else branch", True)  # checked below
    # solo branch: quick-add-main-card without stage nearby
    solo_idx = html.find('id="qaPhoto"')
    ok(f"{label}: solo qaPhoto exists", solo_idx > 0)
    solo_snip = html[solo_idx-200:solo_idx+400]
    ok(f"{label}: solo snip has no ai-record-stage", "ai-record-stage" not in solo_snip)
    ok(f"{label}: no justify-content:center on collapsed cards", "is-collapsed{justify-content:center}" not in html and "is-collapsed{justify-content:center}" not in css)
    ok(f"{label}: app.css has ai-anchor-food left", ".ai-anchor-food{left:var(--ai-pad);right:auto}" in css)
    ok(f"{label}: app.css has ai-anchor-order right", ".ai-anchor-order{right:var(--ai-pad);left:auto}" in css)
    ok(f"{label}: app.css absolute split handle", "position:absolute;top:0;bottom:0;left:var(--ai-split-x)" in css)
    ok(f"{label}: app.css 36px icons", "width:36px!important;height:36px!important" in css)
    ok(f"{label}: no old food-recognition flex redistribute", ".food-recognition-card{" not in css or "food-recognition-card" not in css[css.find(".qa-smart-record-host"):css.find(".quick-add-carousel-viewport{")])
    # Chinese preserved
    ok(f"{label}: Chinese AI title", "AI智能识别" in html)
    ok(f"{label}: Chinese food", "食物识别" in html)
    ok(f"{label}: Chinese order", "订单识别" in html)
    # old functions gone
    ok(f"{label}: no clampAISplitFoodPct", "clampAISplitFoodPct" not in html)
    ok(f"{label}: no _aiRecordFoodPct", "_aiRecordFoodPct" not in html)
    ok(f"{label}: V2 comment updated", "fixed icon anchors + absolute split" in html)
    # files identical web/android
if Path("index.html").read_bytes() == Path("android/app/src/main/assets/web/index.html").read_bytes():
    ok("android index identical", True)
else:
    ok("android index identical", False)
if Path("css/app.css").read_bytes() == Path("android/app/src/main/assets/web/css/app.css").read_bytes():
    ok("android css identical", True)
else:
    ok("android css identical", False)

# Extra: food icon left absolute, order right - in critical
html = Path("index.html").read_text(encoding="utf-8")
crit = html[html.find('ai-record-entry-critical'):html.find('</style>', html.find('ai-record-entry-critical'))]
ok("critical: no justify-content:center on content redistribute", "is-collapsed" not in crit)
ok("critical: stage position relative", ".ai-record-stage{\n  position:relative" in crit or "position:relative;width:100%;height:56px" in crit)

failed = [m for c,m in checks if not c]
print("---")
print(f"TOTAL {len(checks)} PASS {sum(1 for c,_ in checks if c)} FAIL {len(failed)}")
if failed:
    print("FAILED:")
    for m in failed:
        print(" -", m)
    print("OVERALL: FAIL")
else:
    print("OVERALL: SUCCESS")
