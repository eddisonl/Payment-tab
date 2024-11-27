"use strict";

const cancelBtn = document.getElementById("cancel");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const payrollHours = document.getElementById("payrollHours");
const salaryPercentage = document.getElementById("salaryPercentage");
const payslip = document.getElementById("payslip");

document.addEventListener("DOMContentLoaded", () => {
  populateForm();

  // Add event listener for the Save button
  saveBtn.addEventListener("click", saveData);

  // Add event listener for the Reset button
  resetBtn.addEventListener("click", resetData);
});

function saveData() {
  if (!payrollHours?.value || !salaryPercentage?.value || !payslip?.value) {
    alert("Input fields are empty, please fill them out");
    return;
  }
  const formData = {
    payrollHours: payrollHours.value,
    salaryPercentage: salaryPercentage.value,
    payslip: payslip.value
  };

  localStorage.setItem("employeeData", JSON.stringify(formData));
  alert("Data saved successfully!");
}

function populateForm() {
  const savedData = localStorage.getItem("employeeData");
  if (savedData) {
    const formData = JSON.parse(savedData);
    payrollHours.value = formData.payrollHours;
    salaryPercentage.value = formData.salaryPercentage;
    payslip.value = formData.payslip;
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

    payrollHours.value = "";
    salaryPercentage.value = "";
    payslip.value = "";
    alert("Data reset successfully!");
  }
}

function isFormEmpty() {
  return (
    payrollHours.value === "" &&
    salaryPercentage.value === "" &&
    payslip.value === ""
  );
}
