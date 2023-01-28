//1. 폴더에서 파일 가져오기
const fs = require('fs').promises;
const fsg =  require('fs');
const path = require('path');
const currenPath = path.join(__dirname,'');

function mv2Folder(fileType,value){
    // console.log(`currenPath: ${currenPath}`);
    // console.log(`value: ${value}`);
    fs.rename(path.join(currenPath,value), path.join(currenPath, fileType,value));
    //console.log(value);
}

//2. video, cpatured, duplicated 폴더 만들기
if(!fsg.existsSync('video')){
    fs.mkdir('video');
}
if(!fsg.existsSync('duplicated')){
    fs.mkdir('duplicated');
}
if(!fsg.existsSync('captured')){
    fs.mkdir('captured');
}
    
//3. 확장자 분류
fs.readdir('./')
.then((values) => {
    values.forEach(function(value){
        const fileType = path.extname(value);

        if(fileType == '.mp4' || fileType == '.mov'){
            mv2Folder('video',value);

        }else if(fileType == '.png' || fileType == '.aae' ){
            mv2Folder('captured',value);

        }else if(value.includes('_E')){
            const origin = value.split('_E');
            value = origin[0] +'_'+ origin[1];
            mv2Folder('duplicated',value);
        }else{
            console.log('no');
        }
    })
})
.catch(console.error);

