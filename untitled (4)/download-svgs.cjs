const fs = require('fs');
const download = require('https').get;
const urls = [
  { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Emblem_of_Ethiopia.svg/500px-Emblem_of_Ethiopia.svg.png", dest: "public/partners/pmo.png" }
];
urls.forEach(({url, dest}) => {
  download(url, (res) => {
    res.pipe(fs.createWriteStream(dest));
  });
});
