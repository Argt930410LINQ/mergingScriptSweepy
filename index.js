import { URL } from "url"; // in Browser, the URL in native accessible on window
import { csvToJson, generateExcel, mergeTwoJson } from "./functions.js";

const __filename = new URL("", import.meta.url).pathname;
const __dirname = new URL(".", import.meta.url).pathname;

(async () => {
  const issues = await csvToJson(`${__dirname}files/report-issues.csv`);
  const solved = await csvToJson(`${__dirname}files/report-solved.csv`);
  const result = mergeTwoJson(issues, solved);
  generateExcel(result, `${__dirname}files`);
})();
