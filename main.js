const { crawlPage2 } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
	if (process.argv.length < 3) {
		console.log("no website");
	}

	if (process.argv.length > 3) {
		console.log("too many arguments provided");
	}
	try {
		const baseURL = process.argv[2];
		//const baseURL = 'https://wagslane.dev'
		console.log(`The Crawler is starting at ${baseURL}`);
		//baseURL = 'https://wagslane.dev'
		const pages = await crawlPage2(baseURL, baseURL, {});
		//console.log(pages)
		printReport(pages);
	} catch (err) {
		console.log(err.message);
	}
}

main();
