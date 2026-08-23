with open("index.html","r",encoding="utf-8") as f:
    content=f.read()
idx=content.find("// --- AI Smart Record V2")
print("V2", idx, content[:idx].count("\n")+1 if idx>=0 else None)
idx3=content.find("function refreshAISmartRecordEntry")
print("refresh fn", idx3, content[:idx3].count("\n")+1 if idx3>=0 else None)
idx2=content.find("function renderPhotoModal")
print("renderPhotoModal", idx2, content[:idx2].count("\n")+1 if idx2>=0 else None)
# find click near qaSmartRecordHost
needle="getElementById('qaSmartRecordHost')"
pos=0
while True:
    i=content.find(needle, pos)
    if i<0: break
    print("host ref", i, "line", content[:i].count("\n")+1)
    print(repr(content[i:i+200]))
    pos=i+1
