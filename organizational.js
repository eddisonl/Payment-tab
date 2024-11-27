"use strict";

const cancelBtn = document.getElementById("cancel");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const staffID = document.getElementById("staffID");
const hireDate = document.getElementById("date");
const sectionOption = document.getElementById("section");
const departmentOption = document.getElementById("department");
const divisionOption = document.getElementById("division");
const employeeTypeOption = document.getElementById("employeeType");
const positionOption = document.getElementById("position");
const unitOption = document.getElementById("unit");
const locationOption = document.getElementById("location");
const taxOption = document.getElementById("taxOption");
const employmentOptions = document.getElementById("employmentOptions");
const overtimeExempt = document.getElementById("overtimeExempt");
const salaryGrade = document.getElementById("salaryGrade");
const notchOptions = document.getElementById("notch");
const currency = document.getElementById("currency");
const salaryType = document.getElementById("salaryType");
const rate = document.getElementById("rate");

document.addEventListener("DOMContentLoaded", () => {
  populateForm();

  // Add event listener for the Save button
  saveBtn.addEventListener("click", saveData);

  // Add event listener for the Reset button
  resetBtn.addEventListener("click", resetData);
});

function saveData() {
  console.log(staffID.value);
  console.log(taxOption.value);
  console.log(departmentOption.value);
  console.log(hireDate.value);
  console.log(employeeTypeOption.value);
  if (
    !staffID?.value ||
    !taxOption?.value ||
    !departmentOption?.value ||
    !hireDate?.value ||
    !employeeTypeOption?.value
  ) {
    alert("please fill all required forms");
    return;
  }

  const formData = {
    staffID: staffID.value,
    hireDate: hireDate.value,
    sectionOption: sectionOption.value,
    departmentOption: departmentOption.value,
    divisionOption: divisionOption.value,
    employeeTypeOption: employeeTypeOption.value,
    positionOption: positionOption.value,
    unitOption: unitOption.value,
    locationOption: locationOption.value,
    taxOption: taxOption.value,
    employmentOptions: employmentOptions.value,
    overtimeExempt: overtimeExempt.value,
    salaryGrade: salaryGrade.value,
    notchOptions: notchOptions.value,
    currency: currency.value,
    salaryType: salaryType.value,
    rate: rate.value
  };

  localStorage.setItem("employeeData", JSON.stringify(formData));
  alert("Data saved successfully!");
}

function populateForm() {
  const savedData = localStorage.getItem("employeeData");

  if (savedData) {
    const formData = JSON.parse(savedData);

    staffID.value = formData.staffID;
    hireDate.value = formData.hireDate;
    sectionOption.value = formData.sectionOption;
    departmentOption.value = formData.departmentOption;
    divisionOption.value = formData.divisionOption;
    employeeTypeOption.value = formData.employeeTypeOption;
    positionOption.value = formData.positionOption;
    unitOption.value = formData.unitOption;
    locationOption.value = formData.locationOption;
    taxOption.value = formData.taxOption;
    employmentOptions.value = formData.employmentOptions;
    overtimeExempt.checked = formData.overtimeExempt;
    salaryGrade.value = formData.salaryGrade;
    notchOptions.value = formData.notchOptions;
    currency.value = formData.currency;
    salaryType.value = formData.salaryType;
    rate.value = formData.rate;
  }
}

function resetData() {
  const savedData = localStorage.getItem("employeeData");

  if (!savedData && isFormEmpty()) {
    alert("No Data to reset. The form and storage are already empty.");
    return;
  }
  if (savedData) {
    confirm("Are you sure you want to reset?");
    localStorage.removeItem("employeeData");
    staffID.value = "";
    hireDate.value = "";
    sectionOption.value = "";
    departmentOption.value = "";
    divisionOption.value = "";
    employeeTypeOption.value = "";
    positionOption.value = "";
    unitOption.value = "";
    locationOption.value = "";
    taxOption.value = "";
    employmentOptions.value = "";
    salaryGrade.value = "";
    notchOptions.value = "";
    currency.value = "";
    salaryType.value = "";
    rate.value = "";
    overtimeExempt.checked = false;

    alert("Data reset successfully!");
  }
}

function isFormEmpty() {
  return (
    staffID.value === "" &&
    hireDate.value === "" &&
    sectionOption.value === "" &&
    departmentOption.value === "" &&
    divisionOption.value === "" &&
    employeeTypeOption.value === "" &&
    positionOption.value === "" &&
    unitOption.value === "" &&
    locationOption.value === "" &&
    taxOption.value === "" &&
    employmentOptions.value === "" &&
    salaryGrade.value === "" &&
    notchOptions.value === "" &&
    currency.value === "" &&
    salaryType.value === "" &&
    rate.value === "" &&
    !overtimeExempt.checked
  );
}
