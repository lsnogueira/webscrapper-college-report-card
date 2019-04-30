
module.exports = { getByParentJSON, getByParentPDF, grades };
const { getDate, createNavigation } = require('./generalServices');
// showBrowser as createNavigation() parameter
const showBrowser = {
	headless: false,
	args: [`--full-screen`],
};

class getByParent {
	constructor() {
		createNavigation();
	}
}

async function getByParentJSON(data) {
	await createNavigation();
	await page.goto(data.urlLogin, { waitUntil: `networkidle2` });
	// networkidle0 para não esperar carregar
	// networkidle2 para esperar a page carregar

	await page.focus(`input[type=text]#usuario`);
	await page.keyboard.type(data.user);

	await page.focus(`input[type=password]#senha`);
	await page.keyboard.type(data.password);

	await page.click(`.a-login-btn`);
	await page.waitForNavigation({ waitUntil: `networkidle2` });

	await page.goto(`https://www2.fiap.com.br/Aluno/Boletim`, { waitUntil: `networkidle0` });
	await page.waitForSelector('.i-boletim-table-row');

	await page.waitForSelector('.i-boletim-wrapper > #boletim > .i-boletim-table > tbody > .i-boletim-table-row');

	const content = await page.evaluate(() => {
		const subjectsContent = document.querySelectorAll('tr.i-boletim-table-row td.td-disciplina');
		const subjects = [].map.call(subjectsContent, a => a.innerText);

		const faultsContent = document.querySelectorAll('tr.i-boletim-table-row td:nth-child(5)');
		const faults = [].map.call(faultsContent, a => a.innerText);

		return {
			disciplinas: subjects,
			faltas: faults,
		};
	});

	console.log(content);
	await browser.close();
}

async function getByParentPDF(data) {
	await createNavigation();

	if (data.urlLogin) {
		await page.goto(data.urlLogin, { waitUntil: `networkidle2` });

		await page.focus(`input[type=text]#usuario`);
		await page.keyboard.type(data.user);

		await page.focus(`input[type=password]#senha`);
		await page.keyboard.type(data.password);

		await page.click(`.a-login-btn`);
		await page.waitForNavigation({ waitUntil: `networkidle2` });
	}

	await page.goto(data.url, { waitUntil: `networkidle2` });

	await page.waitForSelector(data.parentName);

	await page.pdf({
		path: `boletim${getDate()}.pdf`,
		format: `A4`,
	});

	await browser.close();
}

async function grades(user, password) {
	await createNavigation();

	await page.goto(`https://www2.fiap.com.br/`, { waitUntil: `networkidle2` });

	await page.focus(`input[type=text]#usuario`);
	await page.keyboard.type(user);

	await page.focus(`input[type=password]#senha`);
	await page.keyboard.type(password);

	await page.click(`.a-login-btn`);
	await page.waitForNavigation({ waitUntil: `networkidle2` });

	await page.goto(`https://www2.fiap.com.br/Aluno/Boletim`, {
		waitUntil: `networkidle0`,
	});

	await page.waitForSelector('#boletim > .i-boletim-table > tbody > .i-boletim-table-row:nth-child(3) > .td-more');
	await page.click('#boletim > .i-boletim-table > tbody > .i-boletim-table-row:nth-child(3) > .td-more');

	await page.waitForSelector(
		'.i-boletim-modal > .i-boletim-table > tbody > .i-boletim-table-row > .td-small:nth-child(4)'
	);
	await page.click('.i-boletim-modal > .i-boletim-table > tbody > .i-boletim-table-row > .td-small:nth-child(4)');

	grade = await page.evaluate(() => {
		return document.querySelector('#boletim > .i-boletim-table > tbody > .i-boletim-table-row').innerText;
	});

	console.log(grade);
	await browser.close();
}
