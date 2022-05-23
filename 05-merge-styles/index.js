const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');

const writeStream = fs.createWriteStream(destPath);

fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  };

  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const readStream = fs.createReadStream(path.join(srcPath, file.name));
      readStream.pipe(writeStream);
    };
  };
});
