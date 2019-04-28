const puppeteer = require(`puppeteer`);

module.exports = {
  getByParent: async function(url, user, password, parentName) {
    return await null;
  },
  notes: async function(user, password) {
    const browser = await puppeteer.launch({
      headless: false,
      config: [`--full screen`]
    });

    const page = await browser.newPage();

    await page.goto(`https://www2.fiap.com.br/`, { waitUntil: `networkidle2` }); //networkidle2 para esperar a page carregar
    //networkidle0 para nao esperar carregar

    await page.focus(`input[type=text]#usuario`);
    await page.keyboard.type(user);

    await page.focus(`input[type=password]#senha`);
    await page.keyboard.type(password);

    await page.click(`.a-login-btn`);
    await page.waitForNavigation({ waitUntil: `networkidle2` });

    await page.goto(`https://www2.fiap.com.br/Aluno/Boletim`, {
      waitUntil: `networkidle0`
    });

    await page.waitForSelector(
      '#boletim > .i-boletim-table > tbody > .i-boletim-table-row:nth-child(3) > .td-more'
    );
    await page.click(
      '#boletim > .i-boletim-table > tbody > .i-boletim-table-row:nth-child(3) > .td-more'
    );

    await page.waitForSelector(
      '.i-boletim-modal > .i-boletim-table > tbody > .i-boletim-table-row > .td-small:nth-child(4)'
    );
    await page.click(
      '.i-boletim-modal > .i-boletim-table > tbody > .i-boletim-table-row > .td-small:nth-child(4)'
    );

    nota = await page.evaluate(() => {
      return document.querySelector(
        '.i-boletim-modal > .i-boletim-table > tbody > .i-boletim-table-row > .td-small:nth-child(4)'
      ).innerText;
    });

    console.log(nota);

    await browser.close();
  }
};
