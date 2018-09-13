start /Min cmd.exe /k "call startMongo"
timeout 5
start /Min cmd.exe /k "call startNode"
timeout 5
ng serve