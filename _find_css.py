with open("css/app.css","r",encoding="utf-8") as f:
    content=f.read()
# find AI section
markers=["AI智能识别",".qa-smart-record-host",".ai-record-main",".quick-add-carousel-viewport{","food-recognition-card","ai-record-cards"]
for m in markers:
    idx=content.find(m)
    print(repr(m), idx, "line", content[:idx].count("\n")+1 if idx>=0 else None)
