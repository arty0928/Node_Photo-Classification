//1. 폴더에서 파일 가져오기
const fs = require('fs');

//2. video, cpatured, duplicated 폴더 만들기
fs.mkdir('video')
.catch(console.error);

fs.mkdir('captured')
.catch(console.error);

fs.mkdir('duplicated')
.catch(console.error);

//3. video 폴더에는 mp4,mov 
//4. captured에는 png, aae 
//5. duplicated에는 
//   수정하는 것이 있으면 원본만 넣기

