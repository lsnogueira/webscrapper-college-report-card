const puppeteer = require(`puppeteer`);

module.exports = {
  getByParentJSON: async function(data) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (data.urlLogin) {
      await page.goto(data.urlLogin, { waitUntil: `networkidle2` });
      // networkidle0 para não esperar carregar
      // networkidle2 para esperar a page carregar

      await page.focus(`input[type=text]#usuario`);
      await page.keyboard.type(data.user);

      await page.focus(`input[type=password]#senha`);
      await page.keyboard.type(data.password);

      await page.click(`.a-login-btn`);
      await page.waitForNavigation({ waitUntil: `networkidle2` });
    }

    await page.goto(data.url, { waitUntil: `networkidle0` });

    await page.waitForSelector(`.i-boletim-table-row`);

    // const content = await page.evaluate(() => {
    //   return document.querySelector(`.i-content`).innerHTML;
    // });
    await page.waitForSelector(`.td-disciplina`);
    await page.waitForSelector(`.js-nacs-open`);
    await page.waitForSelector(`.js-faltas-open`);

    const content = await page.evaluate(() => {
      
        const grabFromRow = (row, classname) => {
        return row.querySelector(`${classname}`).innerText.trim();
      };

      const rowSelector = `tr.i-boletim-table-row`;

      const data = [];

      const reportRows = document.querySelectorAll(rowSelector);

      for (const tr of reportRows) {
        data.push({
          disciplina: grabFromRow(tr, `td-disciplina`),
          nac: grabFromRow(tr, `td-more.js-nacs-open`),
          fa: grabFromRow(tr, `td-more.js-faltas-open`)
        });
      }

      return data;
    });

    console.log(content);
    // browser.close();
  },

  getByParentPDF: async function(data) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (data.urlLogin) {
      await page.goto(data.urlLogin, { waitUntil: `networkidle2` });
      // networkidle0 para não esperar carregar
      // networkidle2 para esperar a page carregar

      await page.focus(`input[type=text]#usuario`);
      await page.keyboard.type(data.user);

      await page.focus(`input[type=password]#senha`);
      await page.keyboard.type(data.password);

      await page.click(`.a-login-btn`);
      await page.waitForNavigation({ waitUntil: `networkidle2` });
    }

    await page.goto(data.url, { waitUntil: `networkidle0` });

    await page.waitForSelector(data.parentName);

    await page.pdf({
      path: `boletim${getDate()}.pdf`,
      format: `A4`
    });

    browser.close();
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

    // await browser.close();
  }
};

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  return dd + '_' + mm + '_' + yyyy;
}

function grabFromRoww2(row, classname) {
  return row.querySelector(`td.${classname}`).innerText.trim();
}

function getAllRows(selector) {
  return document.querySelectorAll(`tr.${selector}`);
}
