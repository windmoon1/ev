#coding:utf-8

import json
import os
import sys

from wsfun import getFTList
from wsfun import getFTfromQW
from wsfun import getJLMatchObject
from wsfun import getSSMatchObject
from excelop import createx

def getlinesGBK(filepath):
    with open(filepath, 'r', encoding='gbk') as f:
        content = f.read().split('\n')
    lines = list(filter(lambda x: str(x).strip() != '', content))
    return lines

def getlines(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read().split('\n')
    lines = list(filter(lambda x: str(x).strip() != '', content))
    return lines


def getfactjson(jsonpath):
    sslist = []
    with open(jsonpath,'r',encoding='utf-8') as f:
        try:
            jsonStr = json.load(f)
            for i in jsonStr.get('factList'):
                sslist.append(i.get('content'))
        except:
            print('Read xml ERROR!')
    return sslist


def readkeysjson(jsonpath):
    keyslist = []
    with open(jsonpath, 'r', encoding='utf-8') as f:
        try:
            jsonStr = json.load(f)
            print(jsonStr)
            for i in jsonStr:
                keyslist.append(i.get('name'))
        except:
            print('Read xml ERROR!')
    return keyslist

def writejson(dict,jsonpath):
    json.dump(dict,jsonpath,ensure_ascii=False)



def validatedata(wsdictpath):
    dir = os.listdir(wsdictpath)
    for ws in dir:
        wspath = wsdictpath+'/'+ws
        content = ''
        with open(wspath,'r',encoding='utf-8') as f:
            content = f.read()
        sum = content.count('!@#')
        s1 = content.count('!@#1')
        s2 = content.count('!@#0')
        s3 = content.count('!@#2')
        if sum/3==s1+s2:
            pass
        else:
            print(ws)
            print(sum)
            print(s1)
            print(s2)
            print(s3)

# #计算文书集中的法条分布
def countftfb(dictpath):
    dict = {}
    ftlist = []
    dir  = os.listdir(dictpath)
    print('dict size',len(dir))
    for ws in dir:
        wspath = dictpath + '/' + ws
        # ftmcls , ftnrcls = getFTList(wspath)
        ftmcls = getFTfromQW(wspath)

        for ftmc in ftmcls:
            # nums = str(ftmc).count('第')

            print('ftmc',ftmc)
            if ftmc.find('《') > 0 :
                startindex = str(ftmc).index('《')
            else:
                startindex = 0
            if ftmc.find('条') > 0:
               sub = str(ftmc)[startindex:str(ftmc).index('条')]
            elif ftmc.find('款') > 0:
               sub = str(ftmc)[startindex:str(ftmc).index('款')]
            else:
                sub = str(ftmc)[startindex:]
            print('sub',sub)
            if sub in ftlist:
                dict[sub] += 1
            else:
                dict[sub] = 1
            ftlist.append(sub)
        # ftlist.extend(ftmcls)
    # sum = len(ftlist)
    sum = len(dir)
    ftls = list(set(ftlist))
    count = []
    for x in ftls:
        count.append([dict[x]/sum*100])
    rows = ftls
    cols = ['百分比']
    data = count
    createx('故意杀人罪法条统计_文书',rows,cols,data,'../data')



def renamedictfiles(dictpath):
    dir = os.listdir(dictpath)
    for i in range(len(dir)):
        ws = dir[i]
        wspath = dictpath + '/' + ws
        if i < 10:
            newname = dictpath+'/00'+ str(i) + '_'+ws
        elif i <100:
            newname = dictpath + '/0' + str(i)+'_'+ws
        elif i < 1000:
            newname = dictpath + '/' + str(i) +'_'+ws
        os.rename(wspath,newname)


def findft(dictpath):
    dir = os.listdir(dictpath)
    for i in range(len(dir)):
        ws = dir[i]
        wspath = dictpath + '/' + ws
        ftmcls,ftnrls = getFTList(wspath)
        for ft in ftmcls:
            if ft.find('《中华人民共和国刑事诉讼法》的解释第五百零五条') > 1:
                 print(ws)

def txttestset(dictpath,output):
    dir = os.listdir(dictpath)
    content = ''
    for i in range(len(dir)):
        ws = dir[i]
        wspath = dictpath + '/' + ws
        ftls = getFTfromQW(wspath)
        ssls = getSSMatchObject(wspath)
        jlls = getJLMatchObject(wspath)
        content += ws +'end!fact:'
        content += '!@#'.join(ssls)
        content += 'end!ft:'
        content += '!@#'.join(ftls)
        content += 'end!jl:'
        content += '!@#'.join(jlls)
        content += '\n'
    with open(output, 'w', encoding='utf-8') as f:
        f.write(content)

def getexcelwslist(exceldictpath):
    dir = os.listdir(exceldictpath)
    namels = []
    for e in dir:
        namels.append(e.split('_')[1])

    return namels


#从法条关键词txt中获取对应法条的所有关键词
def getftkeys(ft):
    content = open('../LDAmodel/result/topic_allft.txt','r',encoding='utf-8').read().split('\n')
    for line in content:
        sp = line.split(':')
        ftname = sp[0]
        if ftname == ft:
            if sp[1] == '':
                keys = []
            else:
                keys = list(filter(lambda  x:x.strip()!='' ,sp[1].split(',') ))
    return keys

# txttestset('../data/testws5b','../data/交通肇事测试集.txt')

# findft('/users/wenny/nju/task/法条文书分析/2014filled/2014')
# renamedictfiles('../data/1w篇_事实到法条')
# renamedictfiles('../data/1w篇_法条到结论')

def gettyc(word,tycsp):

    for sp in tycsp:
        if sp.count(' '+word+' ') > 0:
            return list(sp.split(' ')[1:])
    return [word]


# countftfb('/users/wenny/nju/task/法条文书分析/故意杀人罪/2014')

# countftfb('../data/testws5b')

# validatedata('../data/testdata_jl')

# readkeysjson('../data/交通肇事罪.json')