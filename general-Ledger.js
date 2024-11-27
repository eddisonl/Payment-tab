"use strict";

const cancelBtn = document.getElementById("cancel");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const salarySearch = document.getElementById("salarySearch");
const incomeTaxSearch = document.getElementById("incomeTaxSearch");
const netSalaryPayableSearch = document.getElementById(
  "netSalaryPayableSearch"
);
const operatingOvertimeSearch = document.getElementById(
  "operatingOvertimeSearch"
);
const shiftAllowanceSearch = document.getElementById("shiftAllowanceSearch");
const taxReliefSearch = document.getElementById("taxReliefSearch");
const employeeContributionSearch = document.getElementById(
  "employeeContributionSearch"
);
const employeeContributionSearch2 = document.getElementById(
  "employeeContributionSearch2"
);
const employerContributionSearch = document.getElementById(
  "employerContributionSearch"
);
const employerContributionSearch2 = document.getElementById(
  "employerContributionSearch2"
);
const employerTotalSearch = document.getElementById("employerTotalSearch");
const employerTotalSearch2 = document.getElementById("employerTotalSearch2");

document.addEventListener("DOMContentLoaded", () => {
  populateForm();

  // Add event listener for the Save button
  saveBtn.addEventListener("click", saveData);

  // Add event listener for the Reset button
  resetBtn.addEventListener("click", resetData);
});

function saveData() {
  const formData = {
    salary: salarySearch.value,
    incomeTax: incomeTaxSearch.value,
    netSalaryPayable: netSalaryPayableSearch.value,
    operatingOvertime: operatingOvertimeSearch.value,
    shiftAllowance: shiftAllowanceSearch.value,
    taxRelief: taxReliefSearch.value,
    employeeContribution: employeeContributionSearch.value,
    employeeContribution2: employeeContributionSearch2.value,
    employerContribution: employerContributionSearch.value,
    employerContribution2: employerContributionSearch2.value,
    employerTotal: employerTotalSearch.value,
    employerTotal2: employerTotalSearch2.value
  };

  localStorage.setItem("employeeData", JSON.stringify(formData));
  alert("Data saved successfully!");
}

function populateForm() {
  const savedData = localStorage.getItem("employeeData");
  if (savedData) {
    const formData = JSON.parse(savedData);

    salarySearch.value = formData.salary;
    incomeTaxSearch.value = formData.incomeTax;
    netSalaryPayableSearch.value = formData.netSalaryPayable;
    operatingOvertimeSearch.value = formData.operatingOvertime;
    shiftAllowanceSearch.value = formData.shiftAllowance;
    taxReliefSearch.value = formData.taxRelief;
    employeeContributionSearch.value = formData.employeeContribution;
    employeeContributionSearch2.value = formData.employeeContribution2;
    employerContributionSearch.value = formData.employerContribution;
    employerContributionSearch2.value = formData.employeeContribution2;
    employerTotalSearch.value = formData.employerTotal;
    employerTotalSearch2.value = formData.employerTotal2;
  }
}

function resetData() {
  const savedData = localStorage.getItem("employeeData");

  if (!savedData && isFormEmpty()) {
    alert("Nothing to reset. The form and storage are already empty.");
    return;
  }
  if (savedData) {
    confirm("Are you sure you want to reset?");
    localStorage.removeItem("employeeData");

    salarySearch.value = "";
    incomeTaxSearch.value = "";
    netSalaryPayableSearch.value = "";
    operatingOvertimeSearch.value = "";
    shiftAllowanceSearch.value = "";
    taxReliefSearch.value = "";
    employeeContributionSearch.value = "";
    employerContributionSearch.value = "";
    employerTotalSearch.value = "";
    employeeContributionSearch2.value = "";
    employerContributionSearch2.value = "";
    employerTotalSearch2.value = "";
    alert("Data reset successfully!");
  }
}

function isFormEmpty() {
  return (
    salarySearch.value === "" &&
    incomeTaxSearch.value === "" &&
    netSalaryPayableSearch.value === "" &&
    operatingOvertimeSearch.value === "" &&
    shiftAllowanceSearch.value === "" &&
    taxReliefSearch.value === "" &&
    employeeContributionSearch.value === "" &&
    employerContributionSearch.value === "" &&
    employerTotalSearch.value === "" &&
    employeeContributionSearch2.value === "" &&
    employerContributionSearch2.value === "" &&
    employerTotalSearch2.value === ""
  );
}
