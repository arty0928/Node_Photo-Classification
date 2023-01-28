//1. 폴더에서 파일 가져오기
const fs = require('fs');
const path = require('path');
const currenPath = path.join(__dirname,'');

function mv2Folder(fileType,value){
    fs.rename(path.join(currenPath,value), path.join(currenPath, fileType,value));
}

//2. video, cpatured, duplicated 폴더 만들기
if(!fs.existsSync('video')){
    console.log(`makeDir video`);
    fs.promises.mkdir('video');
}
if(!fs.existsSync('duplicated')){
    console.log(`makeDir duplicated`)
    fs.promises.mkdir('duplicated');
}
if(!fs.existsSync('captured')){
    console.log(`makeDir captured`)
    fs.promises.mkdir('captured');
}
    
//3. 확장자 분류
fs.promises.readdir('../Pictures/test')
.then((values) => {
    values.forEach(function(value){
        console.log(`value = ${value}`);
        const fileType = path.extname(value);
        console.log(`fileType = ${fileType}`);

        if(fileType == '.mp4' || fileType == '.mov'){
            console.log(`fileType : video`);
            mv2Folder('video',value);

        }else if(fileType == '.png' || fileType == '.aae' ){
            console.log(`fileType : captured`)
            mv2Folder('captured',value);

        }else if(value.includes('_E')){
            console.log(`fileType : duplicated`)
            const origin = value.split('_E');
            value = origin[0] +'_'+ origin[1];
            mv2Folder('duplicated',value);
        }else{
            console.log('no');
        }
    })
})
.catch(console.error);

