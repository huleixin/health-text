# -*- coding: utf-8 -*-
from pathlib import Path

APP_CSS = r"""/* AI智能识别入口 — fixed icon anchors + absolute split (couple) / single card (solo) */
.qa-smart-record-host{margin-bottom:0;width:100%;min-width:0;box-sizing:border-box}
.ai-record-main{
  width:100%;min-width:0;box-sizing:border-box;margin-bottom:12px;padding:10px 12px 12px;
  border-radius:16px;border:1px solid rgba(212,175,55,0.24);
  background:linear-gradient(135deg,rgba(212,175,55,0.14),rgba(244,209,96,0.05));
  box-shadow:0 4px 16px rgba(0,0,0,0.12);overflow:hidden;
}
.ai-record-main-header{display:flex;align-items:center;margin-bottom:6px}
.ai-record-main-header-title{
  font-size:12px;font-weight:650;letter-spacing:.04em;color:var(--txt2,#c8c2b4);opacity:.78;white-space:nowrap;
}
.ai-record-stage{
  position:relative;width:100%;height:56px;min-height:56px;box-sizing:border-box;
  --ai-pad:8px;--ai-icon:36px;--ai-gap:10px;--ai-split-x:72%;
  --ai-food-text:1;--ai-order-text:0;
  touch-action:pan-y;
}
.ai-record-stage.is-dragging{touch-action:none;user-select:none;-webkit-user-select:none}
.ai-anchor{
  position:absolute;top:50%;transform:translateY(-50%);z-index:5;
  width:var(--ai-icon);height:var(--ai-icon);padding:0;margin:0;border:0;background:transparent;
  cursor:pointer;-webkit-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;
  display:flex;align-items:center;justify-content:center;
}
.ai-anchor-food{left:var(--ai-pad);right:auto}
.ai-anchor-order{right:var(--ai-pad);left:auto}
.ai-record-main.is-split .ai-card-icon{
  width:36px!important;height:36px!important;border-radius:11px!important;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  background:linear-gradient(135deg,var(--gold,#d4af37),var(--gold-l,#f4d160));color:#fff;
  box-shadow:0 2px 8px rgba(212,175,55,.2);
}
.ai-record-main.is-split .ai-card-icon .ui-icon{width:18px!important;height:18px!important}
.ai-text{
  position:absolute;top:50%;transform:translateY(-50%);z-index:3;
  overflow:hidden;white-space:nowrap;pointer-events:auto;cursor:pointer;
  transition:opacity .18s ease;
}
.ai-record-stage.is-dragging .ai-text{transition:none!important}
.ai-record-stage.is-easing .ai-record-split-handle{transition:left .18s ease}
.ai-record-stage.is-dragging .ai-record-split-handle{transition:none!important}
.ai-text-food{
  left:calc(var(--ai-pad) + var(--ai-icon) + var(--ai-gap));
  right:calc(100% - var(--ai-split-x) + 14px);
  opacity:var(--ai-food-text,1);
  text-align:left;
}
.ai-text-order{
  left:calc(var(--ai-split-x) + 14px);
  right:calc(var(--ai-pad) + var(--ai-icon) + var(--ai-gap));
  opacity:var(--ai-order-text,0);
  text-align:left;
}
.ai-card-title{display:block;font-size:15px;font-weight:800;line-height:1.2;color:var(--gold-l,#f4d160)}
.ai-card-sub{display:block;margin-top:2px;font-size:12px;line-height:1.3;color:var(--txt2,#c8c2b4)}
.ai-record-split-handle{
  position:absolute;top:0;bottom:0;left:var(--ai-split-x);width:22px;margin:0;padding:0;border:0;
  transform:translateX(-50%);background:transparent;cursor:col-resize;touch-action:none;z-index:6;
  display:flex;align-items:center;justify-content:center;-webkit-user-select:none;user-select:none;
}
.ai-record-split-line{
  width:1px;height:70%;pointer-events:none;
  background:linear-gradient(180deg,transparent,rgba(212,175,55,.42),transparent);
}
.ai-record-split-grip{
  position:absolute;width:3px;height:16px;border-radius:2px;pointer-events:none;
  background:rgba(212,175,55,.4);opacity:.65;
}
.ai-record-split-handle.is-dragging .ai-record-split-grip{opacity:1;background:rgba(212,175,55,.8)}
.ai-hit{
  position:absolute;top:0;bottom:0;z-index:2;background:transparent;cursor:pointer;
}
.ai-hit-food{left:0;width:var(--ai-split-x)}
.ai-hit-order{left:var(--ai-split-x);right:0}
[data-theme="light"] .ai-record-main{
  background:linear-gradient(135deg,rgba(212,175,55,0.10),rgba(255,255,255,0.55));
  border-color:rgba(166,111,0,0.18);
}
@media(max-width:430px){
  .ai-record-main{padding:8px 10px 10px}
  .ai-record-stage{height:52px;min-height:52px;--ai-icon:34px;--ai-pad:6px;--ai-gap:8px}
  .ai-record-main.is-split .ai-card-icon{width:34px!important;height:34px!important}
  .ai-record-main.is-split .ai-card-icon .ui-icon{width:17px!important;height:17px!important}
  .ai-card-title{font-size:14px}
  .ai-card-sub{font-size:11px}
}
"""

# Verify Chinese survived
assert "AI智能识别" in APP_CSS, repr(APP_CSS[:80])
Path("_ai_app.css.txt").write_text(APP_CSS, encoding="utf-8")
print("app css ok", len(APP_CSS))
