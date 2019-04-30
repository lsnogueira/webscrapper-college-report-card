module.exports = { getDate, createNavigation };
const puppeteer = require(`puppeteer`);

function getDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // janeiro = 0

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '_' + mm + '_' + yyyy;
}

async function createNavigation(obj) {
	param = obj ? obj : {};
	browser = await puppeteer.launch(param);
	page = await browser.newPage();
}
