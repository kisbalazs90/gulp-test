const axios = require('axios');
const fs = require('fs');
const unzip = require('unzip');
const extensionUrl = 'https://github.com/kisbalazs90/gulp-test/archive/master.zip';

async function startInstall(cb) {

  const gulpFileStream = await downloadTask();
  const savedFile = await saveFile(gulpFileStream);
  unzipFile(savedFile);

  cb();
}

async function downloadTask() {
  const gulpFilePath = extensionUrl;

  return await axios({
    method: 'get',
    url: gulpFilePath,
    responseType: 'stream'
  }).then(response => response.data);
}

async function saveFile(gulpFileStream) {
  return await new Promise(resolve => {
    const gulpWriteStream = fs.createWriteStream('./master.zip');
    gulpWriteStream.on('close', () => { resolve(gulpWriteStream.path); });
    gulpFileStream.pipe(gulpWriteStream);
  });
}

function unzipFile(zipFile) {
  return fs.createReadStream(zipFile).pipe(unzip.Extract({ path: './tmp' }));
}



exports.installExtension = startInstall
