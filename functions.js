import csv from "csvtojson";
import fs from "fs";
import moment from "moment";
import XLSX from "xlsx";

export const csvToJson = async (path) => {
  const result = await csv().fromFile(path);
  return result;
};

export const mergeTwoJson = (issues, solved) => {
  const db = new Map();
  issues.forEach((el) => {
    if (!db.has(el["company_name"])) db.set(el["company_name"], {});
  });
  solved.forEach((el) => {
    if (!db.has(el["company_name"])) db.set(el["company_name"], {});
  });
  // last_month.Login Issue
  for (const key of db.keys()) {
    const company = issues.filter((x) => x["company_name"] === key);
    const companySolved = solved.filter((x) => x["company_name"] === key);
    //For login issues
    const loginIssues = company.filter(
      (x) => x["issue_type"] === "Login Issue"
    )[0];
    const loginIssueLastMonth =
      loginIssues !== undefined
        ? parseInt(loginIssues["last_month"] || "0")
        : 0;
    const loginIssuesLastWeek =
      loginIssues !== undefined ? parseInt(loginIssues["last_week"] || "0") : 0;
    const loginIssuesLastDay =
      loginIssues !== undefined ? parseInt(loginIssues["last_day"] || "0") : 0;

    //For Sub account status

    const subAccountIssues = company.filter(
      (x) => x["issue_type"] === "ACCOUNT__VERIZON__BILLING_ACCOUNTS_GENERAL"
    )[0];
    const subAccountIssueLastMonth =
      subAccountIssues !== undefined
        ? parseInt(subAccountIssues["last_month"] || "0")
        : 0;
    const subAccountIssuesLastWeek =
      subAccountIssues !== undefined
        ? parseInt(subAccountIssues["last_week"] || "0")
        : 0;
    const subAccountIssuesLastDay =
      subAccountIssues !== undefined
        ? parseInt(subAccountIssues["last_day"] || "0")
        : 0;

    const subAccountSolved = companySolved.filter(
      (x) => x["issue_type"] === "ACCOUNT__VERIZON__BILLING_ACCOUNTS_GENERAL"
    )[0];

    const subAccountResolvedLastMonth =
      subAccountSolved !== undefined
        ? parseInt(subAccountSolved["last_month"] || "0")
        : 0;
    const subAccountResolvedLastWeek =
      subAccountSolved !== undefined
        ? parseInt(subAccountSolved["last_week"] || "0")
        : 0;
    const subAccountResolvedLastDay =
      subAccountSolved !== undefined
        ? parseInt(subAccountSolved["last_day"] || "0")
        : 0;

    //For autopay

    const autopayIssues = company.filter(
      (x) => x["issue_type"] === "ACCOUNT__VERIZON__SUB_ACCOUNT_PAYMENT_SETUP"
    )[0];

    const autopayIssueLastMonth =
      autopayIssues !== undefined
        ? parseInt(autopayIssues["last_month"] || "0")
        : 0;
    const autopayIssuesLastWeek =
      autopayIssues !== undefined
        ? parseInt(autopayIssues["last_week"] || "0")
        : 0;
    const autopayIssuesLastDay =
      autopayIssues !== undefined
        ? parseInt(autopayIssues["last_day"] || "0")
        : 0;

    const autopaySolved = companySolved.filter(
      (x) => x["issue_type"] === "ACCOUNT__VERIZON__SUB_ACCOUNT_PAYMENT_SETUP"
    )[0];

    const autopayResolvedLastMonth =
      autopaySolved !== undefined
        ? parseInt(autopaySolved["last_month"] || "0")
        : 0;
    const autopayResolvedLastWeek =
      autopaySolved !== undefined
        ? parseInt(autopaySolved["last_week"] || "0")
        : 0;
    const autopayResolvedLastDay =
      autopaySolved !== undefined
        ? parseInt(autopaySolved["last_day"] || "0")
        : 0;

    //For invoice summary

    const invoiceIssues = company.filter(
      (x) => x["issue_type"] === "ACCOUNT__VERIZON__INVOICE_SUMMARY"
    )[0];

    const invoiceIssueLastMonth =
      invoiceIssues !== undefined
        ? parseInt(invoiceIssues["last_month"] || "0")
        : 0;
    const invoiceIssuesLastWeek =
      invoiceIssues !== undefined
        ? parseInt(invoiceIssues["last_week"] || "0")
        : 0;
    const invoiceIssuesLastDay =
      invoiceIssues !== undefined
        ? parseInt(invoiceIssues["last_day"] || "0")
        : 0;

    const invoiceSolved = companySolved.filter(
      (x) => x["issue_type"] === "ACCOUNT__VERIZON__INVOICE_SUMMARY"
    )[0];

    const invoiceResolvedLastMonth =
      invoiceSolved !== undefined
        ? parseInt(invoiceSolved["last_month"] || "0")
        : 0;
    const invoiceResolvedLastWeek =
      invoiceSolved !== undefined
        ? parseInt(invoiceSolved["last_week"] || "0")
        : 0;
    const invoiceResolvedLastDay =
      invoiceSolved !== undefined
        ? parseInt(invoiceSolved["last_day"] || "0")
        : 0;

    db[key] = {
      ...db[key],
      "Any issues last week":
        loginIssuesLastWeek +
        subAccountIssuesLastWeek +
        autopayIssuesLastWeek +
        invoiceIssuesLastDay,
      "last_month.Login Issue": loginIssueLastMonth,
      "last_week.Login Issue": loginIssuesLastWeek,
      "last_day.Login Issue": loginIssuesLastDay,
      "last_month.Subaccount Status Updates: Open": subAccountIssueLastMonth,
      "last_month.Subaccount Status Updates: Resolved":
        subAccountResolvedLastMonth,
      "last_week.Subaccount Status Updates: Open": subAccountIssuesLastWeek,
      "last_week.Subaccount Status Updates: Resolved":
        subAccountResolvedLastWeek,
      "last_day.Subaccount Status Updates: Open": subAccountIssuesLastDay,
      "last_day.Subaccount Status Updates: Resolved": subAccountResolvedLastDay,
      "last_month.Subaccount Autopay Updates: Open": autopayIssueLastMonth,
      "last_month.Subaccount Autopay Updates: Resolved":
        autopayResolvedLastMonth,
      "last_week.Subaccount Autopay Updates: Open": autopayIssuesLastWeek,
      "last_week.Subaccount Autopay Updates: Resolved": autopayResolvedLastWeek,
      "last_day.Subaccount Autopay Updates: Open": autopayIssuesLastDay,
      "last_day.Subaccount Autopay Updates: Resolved": autopayResolvedLastDay,
      "last_month.Carrier Invoice Errors: Open": invoiceIssueLastMonth,
      "last_month.Carrier Invoice Errors: Resolved": invoiceResolvedLastMonth,
      "last_week.Carrier Invoice Errors: Open": invoiceIssuesLastWeek,
      "last_week.Carrier Invoice Errors: Resolved": invoiceResolvedLastWeek,
      "last_day.Carrier Invoice Errors: Open": invoiceIssuesLastDay,
      "last_day.Carrier Invoice Errors: Resolved": invoiceResolvedLastDay,
    };
  }
  return Array.from(db.keys()).map((key) => {
    return {
      Account: key,
      ...db[key],
    };
  });
};

export const generateExcel = (data, path) => {
  fs.writeFileSync(`${path}/result.json`, JSON.stringify(data));
  const dataWS = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, dataWS, "Errors");
  XLSX.writeFile(
    wb,
    `${path}/Sweepy Account Error Report-${moment(new Date()).format(
      "YYYY-MM-DD"
    )}.xlsx`
  );
};
