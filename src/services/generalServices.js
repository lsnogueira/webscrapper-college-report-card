module.exports = { getDate, createNavigation, objTransform };
const puppeteer = require(`puppeteer`);

function getDate() {
	const today = new Date();

	let dd = today.getDate();
	let mm = today.getMonth() + 1; // janeiro = 0
	const yyyy = today.getFullYear();

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

function objTransform(param, param2) {
	const obj = [];
	param.map(res, index => {
		obj.push({
			subjects: res,
			faults: param2[index],
		});
	});
	return obj;
}
