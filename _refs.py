with open("index.html","r",encoding="utf-8") as f:
    content=f.read()
for name in ["clampAISplitFoodPct","setAIRecordCSSVars","computeAIRecordTextOpacity","applyAIRecordSplitRatio","syncAIRecordExpandClasses","expandAIRecordSide","_aiRecordFoodPct","food-recognition-card","ai-record-cards","snapAIRecordSplit","applyAIRecordSplitX"]:
    print(name, content.count(name))
