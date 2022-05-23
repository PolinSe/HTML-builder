const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

function copyDir (scr, dest) {
  fs.readdir(scr, {withFileTypes: true}, (err, files) => {
    if (err) {
      console.log(err);
    };
    for (const file of files) {
      if (file.isDirectory()) {
        fs.mkdir(path.join(dest, file.name), {recursive: true}, (err) => {
          if (err) {
            console.log(err);
          };
        });
        copyDir(path.join(scr, file.name), path.join(dest, file.name));
      };

      const input = fs.createReadStream(path.join(scr, file.name), 'utf-8');
      const output = fs.createWriteStream(path.join(dest, file.name));
      
      input.pipe(output);
    };
  });
};

fs.rm(destPath, {recursive: true, force: true}, () => {
  fs.mkdir(destPath, {recursive: true}, (err) => {
    if (err) {
      console.log(err);
    };
  });
  copyDir(srcPath, destPath);
});
