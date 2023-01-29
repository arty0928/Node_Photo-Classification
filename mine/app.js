//1. 폴더에서 파일 가져오기
const fs = require('fs');
const path = require('path');
const currenPath = path.join(__dirname,'');
console.log(currenPath);

const destFolder = process.argv[2];
console.log(destFolder);

const workingDir = path.join(currenPath,'photo',destFolder);

if(!destFolder || !fs.existsSync(workingDir)){
    console.log('command folder path error');
    return;
} 

const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

//2. video, cpatured, duplicated 폴더 만들기
if(!fs.existsSync(videoDir)){
    console.log(`makeDir video`);
    fs.mkdirSync(videoDir);
}
if(!fs.existsSync(duplicatedDir)){
    console.log(`makeDir duplicated`)
    fs.mkdirSync(duplicatedDir);
}
if(!fs.existsSync(capturedDir)){
    console.log(`makeDir captured`)
    fs.mkdirSync(capturedDir);
}

//3. 확장자 분류
fs.promises.readdir(workingDir)
.then((values) => {
    values.forEach(function(value){
        const fileType = path.extname(value);

        if(fileType == '.mp4' || fileType == '.mov'){
            console.log(`video fileType : ${value}`);
            mv2File(videoDir,value);

        }else if(fileType == '.png' || fileType == '.aae' ){
            console.log(`capture fileType : ${value}`);
            mv2File(capturedDir,value);

        }else if(isDuplicated(value)){
            console.log(`duplicated fileType : duplicated`);
            mv2File(duplicatedDir,value);
        }
    })
})
.catch(console.error);

function mv2File(targetDir,value){
    const oldPath = path.join(workingDir, value);
    const newPath = path.join(targetDir,value);
    fs.promises
    .rename(oldPath, newPath)
    .catch(console.error);
    console.log(`${value} move to ${targetDir}`);
}

function isDuplicated(value){
    if(!value.startsWith('IMG') || value.startsWith('IMG_E')){
        return false;
    }
    const findFile = `IMG_E`+value.split('_')[1];
    console.log(`findFile = ${findFile}`);
    if(fs.existsSync(path.join(workingDir,findFile))){
        return true;
    }
}