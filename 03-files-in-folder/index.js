const { readdir, stat } = require('fs');
const path = require('path');

readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  };

  for (const file of files) {
    if (file.isFile()) {
      stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }
        
        const size = (stats.size / 1024).toFixed(2) + 'kb';
        console.log(path.parse(file.name).name + ' - ' + path.extname(file.name).replace(/[\s.]/g, '') + ' - ' + `${size}`)
      })
    }
  }
});
