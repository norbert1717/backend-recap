/* 
backend - npm init -y akkor kell, amikor még nincsen package.json file 
npm i 
gitignore file létrehozása


dokumentációt érdemes megnyitni expresshez
elején mindenképp kell a path a path.join metódushoz
__dirname - az a hely, ahol az index.js meg van hivatkozva
dir-rel meg tudom nézni, hogy éppen aktuálisan melyik mappában vagyok és abból a mappából mit látok
cd..-vel 1-el vissza tudok lépni a könyvtárban
kellenek middlewear-ek (app.use)
mappában lévő névnek és a hivatkozott névnek meg kell egyeznie az index.html-ben
get endpointtal adatot fogadunk
get és post requestnél lehet ugyaanz az endpoint, hiszen más a feladata
fs-re szükség van módosításhoz
express.json menti ki az adatot, nélküle undefined lesz a válasz
*/


const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const fs = require('fs');

app.use(express.json()); // json kommunikációhoz elengedhetetlen ez a sor


app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});


app.use('/public', express.static(path.join(`${__dirname}/../frontend/static`)));


app.get('/script.js', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/static/script.js`))
});

app.get('/api/users', (req, res) => {
    res.sendFile(path.join(`${__dirname}/data.json`));
});

app.post('/api/users', (req, res) => {
    console.log(req.body);

    fs.readFile(`${__dirname}/data.json`, (err, rawData) => {
        const currentData = JSON.parse(rawData);
        const newData = {
            id: currentData[currentData.length - 1].id + 1,
            name: req.body.name,
            age: req.body.age
        };

        currentData.push(newData);

        fs.writeFile(`${__dirname}/data.json`, JSON.stringify(currentData, null, 2), () => {
            res.json(`new data has been added with id ${newData.id}`);
        });
    });

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});