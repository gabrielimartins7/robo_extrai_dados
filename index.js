const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/jadepicon/');
  //await page.screenshot({ path: 'instagram.png' });

  const imgList = await page.evaluate(() => {
    //Essa função sera executada no browser

    //Pegar as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('article img')

    //Transformar o nodeList em array
    const imgArray = [...nodeList]

    //Transformar os nodes em objetos JS
    const imgList = imgArray.map( img => ({
      src: img.src
    }))    
    //console.log(list)
    
    //Colocar fora da função
    return imgList 
  });

  //Escrever os dados em um arquivo local (json)
  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if(err) throw new Error('Algo deu errado')

    console.log('Deu bom!')
  })

  //await browser.close();
})();