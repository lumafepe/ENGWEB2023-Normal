import sys
import json
list_of_args = sys.argv
#get file
file=list_of_args[1]

#get column as id
if len(list_of_args)!=2:
    idColumn=list_of_args[2]
else:
    idColumn=None

def getIdColumn(dic,idColumn):
    l=idColumn.split('.')
    t=dic
    for i in l:
        t=t[i]
    return t

with open(file) as json_file:
    data = json.load(json_file)
    data2=[]
    for p,i in enumerate(data):
        d={}
        i['_id'] = getIdColumn(i,idColumn) if idColumn else str(p)
        del i[idColumn]
        for k,v in i.items():
            d[k.replace(" ","_")]=v
        data2.append(d)
        
with open("output.json", "w") as file:
    json.dump(data2, file)