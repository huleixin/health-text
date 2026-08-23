with open("index.html","r",encoding="utf-8") as f:
    lines=f.readlines()
# click/keydown region around 14213
for i in range(14210, 14260):
    print(f"{i+1}|{lines[i]}", end="")
print("---V2 START---")
for i in range(14297, 14485):
    print(f"{i+1}|{lines[i]}", end="")
