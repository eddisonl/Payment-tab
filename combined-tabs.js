"use strict";

function showTab(tabId) {
  // Hide all sections
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => (tab.style.display = "none"));

  // Show the clicked tab
  document.getElementById(tabId).style.display = "block";

  // Highlight the active tab
  const buttons = document.querySelectorAll(".tabs .btn");
  buttons.forEach((button) => button.classList.remove("active"));
  document
    .querySelector(`.tabs button[onclick="showTab('${tabId}')"]`)
    .classList.add("active");
}

// Set the default tab to show (Personal)
showTab("personal");

// footer buttons
const cancelBtn = document.getElementById("cancel");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
// ends here
// personal details
const titleOptions = document.getElementById("title");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const otherNamesInput = document.getElementById("otherNames");
const genderOptions = document.getElementById("gender");
const dateOfBirth = document.getElementById("dob");
const marriageStatusOpt = document.getElementById("marriageStatus");
const emailAddress = document.getElementById("emailAddress");
const phoneNumberInput = document.getElementById("phone");
const digitalAddress = document.getElementById("digitalAddress");
const homeAddress = document.getElementById("homeAddress");
const countryOption = document.getElementById("country");
const nationalityOption = document.getElementById("nationality");
const nationalIDOption = document.getElementById("nationalID");
const residentInput = document.getElementById("resident");
const myFileInput = document.getElementById("myFile");
const displayedImage = document.getElementById("displayedImage");
const changeImageBtn = document.getElementById("changeImage");
const deleteImageBtn = document.getElementById("deleteImage");
// ends here
// organizational details
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
// ends
// payment-info details
const defaultCheckbox = document.getElementById("default");
const bankOptions = document.getElementById("bankOptions");
const branchOptions = document.getElementById("branchOptions");
const phone = document.getElementById("accountNumber");
const paymentBase = document.getElementById("paymentBase");
const notAvailable = document.getElementById("nA");
const notes = document.getElementById("notes");
const accountNumber = document.getElementById("accountNumber");
// modals
const addOption = document.getElementById("addOption");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const addBtn = document.getElementById("addBtn");
const paymentMethod = document.getElementById("paymentMethod");
// all ends here for payment info and modals

// other info details
const payrollHours = document.getElementById("payrollHours");
const salaryPercentage = document.getElementById("salaryPercentage");
const payslip = document.getElementById("payslip");
// ends here

// general ledgers
const salarySearch = document.getElementById("salaryGL");
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

const requiredFields = document.querySelectorAll(".error-conatiner");

const toastForAll = document.getElementById("toast-2");
function showToast(message, elementId = "toast-2", delay = 0) {
  setTimeout(() => {
    const toastForAll = document.getElementById(elementId);
    toastForAll.textContent = message;
    toastForAll.classList.add("show");

    setTimeout(() => {
      toastForAll.classList.remove("show");
    }, 3000);
  }, delay);
}

const validateFields = (input) => {
  if (input.type === "email" && !validateEmail(emailAddress.value)) {
    input.style.borderColor = "red";
  } else {
    input.style.borderColor = "rgba(0, 0, 0, 0.217)";
  }

  if (input.value) {
    input.style.borderColor = "rgba(0, 0, 0, 0.217)";
  } else {
    input.style.borderColor = "red";
  }
};

requiredFields.forEach((requiredField) => {
  requiredField.addEventListener("input", () => {
    validateFields(requiredField);
  });
});

// ends here
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve and populate the form with saved data if it exists
  populateForm();

  // Add event listener for the Save button
  saveBtn.addEventListener("click", saveData);

  // Add event listener for the Reset button
  resetBtn.addEventListener("click", resetData);
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// save data for all
function saveData() {
  let allFieldsValid = true;
  if (
    // personal details
    !firstNameInput?.value ||
    !lastNameInput?.value ||
    !genderOptions?.value ||
    !dateOfBirth?.value ||
    !marriageStatusOpt?.value ||
    !emailAddress?.value ||
    !phoneNumberInput?.value ||
    !countryOption?.value ||
    !nationalityOption?.value ||
    !validateEmail(emailAddress.value) ||
    // organizational details
    !generateStaffID(staffID.value) ||
    !taxOption?.value ||
    !departmentOption?.value ||
    !hireDate?.value ||
    !employeeTypeOption?.value
  ) {
    requiredFields.forEach((requiredField) => {
      if (!requiredField.value) {
        requiredField.style.borderColor = "red";
        showToast("Cannot be saved, check all required fields", "toast-2", 0);
        allFieldsValid = false;
      }

      if (
        requiredField.type === "email" &&
        !validateEmail(emailAddress.value)
      ) {
        showToast("Invalid Email", "toast", 3000); // Delay the email error toast
      }

      if (requiredField.type === "email" && !requiredField.value) {
        showToast("Please enter an email address", "toast", 3000); // Email is empty
      }
    });

    if (allFieldsValid && validateEmail(emailAddress.value)) {
      showToast("Data saved successfully!", "toast"); // Show success toast
    }

    return;
  }

  const formData = {
    // personal details
    title: titleOptions.value,
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    otherNames: otherNamesInput.value,
    gender: genderOptions.value,
    dateOfBirth: dateOfBirth.value,
    marriageStatus: marriageStatusOpt.value,
    emailAddress: emailAddress.value,
    phoneNumber: phoneNumberInput.value,
    digitalAddress: digitalAddress.value,
    homeAddress: homeAddress.value,
    countryOption: countryOption.value,
    nationalityOption: nationalityOption.value,
    nationalIDOption: nationalIDOption.value,
    resident: residentInput.value,
    myFileInput: myFileInput.value,
    // organizational details
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
    rate: rate.value,
    // other info details
    payrollHours: payrollHours.value,
    salaryPercentage: salaryPercentage.value,
    payslip: payslip.value,
    // general ledgers
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

  toastForAll.style.backgroundColor = "green";
  showToast("Data saved successfully!");

  saveJsonToTxtFile(
    { ...formData, paymentOption: tableElement },
    "formData.txt"
  );
}

function populateForm() {
  const savedData = localStorage.getItem("employeeData");
  if (savedData) {
    const formData = JSON.parse(savedData);
    // personal details
    titleOptions.value = formData.title;
    firstNameInput.value = formData.firstName;
    lastNameInput.value = formData.lastName;
    otherNamesInput.value = formData.otherNames;
    genderOptions.value = formData.gender;
    dateOfBirth.value = formData.dateOfBirth;
    marriageStatusOpt.value = formData.marriageStatus;
    emailAddress.value = formData.emailAddress;
    phoneNumberInput.value = formData.phoneNumber;
    digitalAddress.value = formData.digitalAddress;
    homeAddress.value = formData.homeAddress;
    countryOption.value = formData.countryOption;
    nationalityOption.value = formData.nationalityOption;
    nationalIDOption.value = formData.nationalIDOption;
    myFileInput.value = formData.myFileInput;
    residentInput.checked = formData.resident;
    // organizational details
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
    //other info details
    payrollHours.value = formData.payrollHours;
    salaryPercentage.value = formData.salaryPercentage;
    payslip.value = formData.payslip;
    // general ledger
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
    // personal details
    titleOptions.value = "";
    firstNameInput.value = "";
    lastNameInput.value = "";
    otherNamesInput.value = "";
    genderOptions.value = "";
    dateOfBirth.value = "";
    marriageStatusOpt.value = "";
    emailAddress.value = "";
    phoneNumberInput.value = "";
    digitalAddress.value = "";
    homeAddress.value = "";
    countryOption.value = "";
    nationalityOption.value = "";
    nationalIDOption.value = "";
    myFileInput.value = "";
    residentInput.checked = false;
    // organizational details
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
    // other info details
    payrollHours.value = "";
    salaryPercentage.value = "";
    payslip.value = "";
    // general ledger details
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
    toastForAll.style.backgroundColor = "red";
    showToast("No Data to reset. The form and storage are already empty.");
  }
  if (confirm("Are you sure you want to reset?")) {
    localStorage.removeItem("employeeData");
    toastForAll.style.backgroundColor = "green";
    showToast("Data reset successfully!");
  }
}

function isFormEmpty() {
  return (
    // personal details
    titleOptions.value === "" &&
    firstNameInput.value === "" &&
    lastNameInput.value === "" &&
    otherNamesInput.value === "" &&
    genderOptions.value === "" &&
    dateOfBirth.value === "" &&
    marriageStatusOpt.value === "" &&
    emailAddress.value === "" &&
    phoneNumberInput.value === "" &&
    digitalAddress.value === "" &&
    homeAddress.value === "" &&
    countryOption.value === "" &&
    nationalityOption.value === "" &&
    nationalIDOption.value === "" &&
    !residentInput.checked === "" &&
    // organizational details
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
    !overtimeExempt.checked === "" &&
    //other info details
    payrollHours.value === "" &&
    salaryPercentage.value === "" &&
    payslip.value === "" &&
    // general ledgers
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

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector("#phone");

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      fetch("https://ipinfo.io/json?token=YOUR_TOKEN")
        .then((response) => response.json())
        .then((data) => callback(data.country))
        .catch(() => callback("gh"));
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("imageData"));
  if (savedData && savedData.image) {
    displayedImage.src = savedData.image;
    displayedImage.style.display = "block";
    changeImageBtn.style.display = "inline-block";
    deleteImageBtn.style.display = "inline-block";
  }

  myFileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        localStorage.setItem("imageData", JSON.stringify({ image: imageData }));

        displayedImage.src = imageData;
        displayedImage.style.display = "block";
        changeImageBtn.style.display = "inline-block";
        deleteImageBtn.style.display = "inline-block";
      };
      reader.readAsDataURL(file);
    }
  });

  changeImageBtn.addEventListener("click", (event) => {
    event.preventDefault();
    myFileInput.click();
  });

  deleteImageBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayedImage.src = "";
    displayedImage.style.display = "none";
    changeImageBtn.style.display = "none";
    deleteImageBtn.style.display = "none";
    myFileInput.value = "";

    localStorage.removeItem("imageData");
  });
});

// modal pop up action
document.addEventListener("DOMContentLoaded", function () {
  addOption.addEventListener("click", () => {
    loadData();
    modal.showModal();
  });

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
  // ends here

  function updateModalContent(selectedPayment) {
    let content = "";

    if (selectedPayment === "Cash") {
      content = `
      <div>
       <div class="containerssss">
          <div class="container">
            <label for="paymentBase"
                >Payment Basis <sup><i class="fa-solid fa-asterisk"></i></sup
              ></label>
               <select name="paymentBase" onchange="enableFields()" class="three-items" id="paymentBase">
                <option value="-1">
                  Select Payment Basis
                </option>
               <option value="Fixed Amount">Fixed Amount</option>
              <option value="Percentage of Net">Percentage of Net</option>
              </select>
              </div>

          <div class="container">
             <label for="paymentOpt"
                >NA <sup><i class="fa-solid fa-asterisk"></i></sup
              ></label>
              <input type="text" name="NA" class="three-items" disabled="" id="nA" />
          </div>
        </div>
      </div>
      `;
    } else if (selectedPayment === "MoMo") {
      content = ` 
        <div> 
          <div class="containers">
            <div class="container">
              <label for="bankOptions"
                >Service Provider <sup> <i class="fa-solid fa-asterisk"></i></sup
              ></label>
              <select name="service-provider" class="modalOnefields three-items" id="bankOptions">
                <option value="" disabled selected hidden>
                  Select service provider
                </option>
                <option value="mtn">MTN</option>
                <option value="telecel">Telecel</option>
                <option value="airtel">Airteltigo</option>
              </select>
                <div class="error-message" id="bankOptError">
                  Input not filled
                </div>
            </div>

            <div class="container"> 
              <label for="Mo-number">
                 Mobile Number <sup><i class="fa-solid fa-asterisk"></i></sup>
              </label>
              <input id="accountNumber" class="modalOnefields three-items" type="tel" name="phone" placeholder="Enter phone number" />

            </div>

              <div class="container">
              <label for="paymentBase"
                >Payment Basis <sup><i class="fa-solid fa-asterisk"></i></sup
              ></label>
               <select name="paymentBase" onchange="enableFields()" class="modalOnefields three-items" id="paymentBase">
                <option value="" disable hidden>
                  Select Payment Basis
                </option>
               <option value="Fixed Amount">Fixed Amount</option>
              <option value="Percentage of Net">Percentage of Net</option>
              </select>
              <div class="error-message" id="paymentBaseError">
                      Input not filled
                    </div>
            </div>
          </div>

          <div class="containers">

            <div class="container">
              <label for="paymentOpt"
                >NA <sup><i class="fa-solid fa-asterisk"></i></sup
              ></label>
              <input type="text" name="NA" class="modalOnefields three-items" disabled="" id="nA" />
              <div class="error-message" id="naError">
                       Input not filled
                     </div>
            </div>
          </div>

          <div class="containersss">
            <div class="container">
              <label for="note">Note</label>
              <textarea name="notes" id="notes" placeholder="Notes"></textarea>
            </div>
          </div>
        </div>`;
    } else if (selectedPayment === "bank") {
      content = ` 
      <div  > 

        <div class="containerssss">
          <div class="container">
            <label for="bankOptions"
              >Bank <sup> <i class="fa-solid fa-asterisk"></i></sup
            ></label>
            <select name="bank" class="modalOnefields branch"  id="bankOptions">
              <option value="" disabled selected hidden>
                Select bank
              </option>
              <option value="Calbank">CalBank</option>
            </select>
            <div class="error-message" id="bankOptionsError">
                      Input not filled
                    </div>
          </div>

          <div class="container">
            <label for="branch"
              >Branch <sup> <i class="fa-solid fa-asterisk"></i></sup
            ></label>
            <select name="branch"  class="modalOnefields branch"  id="branchOptions">
              <option value="" disabled selected hidden>
                Select Branch
              </option>
              <option value="UG">UG</option>
              <option value="East Legon">East Legon</option>
              <option value="Madina">Madina</option>
              <option value="Achimota">Achimota</option>
            </select>
             <div class="error-message" id="bankOptError">
                      Input not filled
                    </div>
          </div>
        </div>

        <div class="containers">
          <div class="container">
            <label for="accountNo"
              >Account Number <sup><i class="fa-solid fa-asterisk"></i></sup
            ></label>
            <input
              type="number"
              name="accountNumber"
              id="accountNumber"  class="modalOnefields three-items"  placeholder="Enter Account No."
            />
            <div class="error-message" id="accountNumberError">
                      Input not filled
                    </div>
          </div>

          <div class="container">
            <label for="paymentOpt"
              >Payment Basis <sup><i class="fa-solid fa-asterisk"></i></sup
            ></label>
            <select name="paymentOpt"  class="modalOnefields three-items"  onchange="enableNAField()" id="paymentBase">
              <option value="" disable hidden>
                Select Payment Basis
              </option>
              <option value="Fixed Amount">Fixed Amount</option>
              <option value="Percentage of Net">Percentage of Net</option>
            </select>
            <div class="error-message" id="paymentBaseError">
                      Input not filled
                    </div>
          </div>

          <div class="container">
            <label for="paymentOpt"
              >NA <sup><i class="fa-solid fa-asterisk"></i></sup
            ></label>
            <input type="text" class="modalOnefields three-items"  name="NA" disabled="" id="nA" disabled/>
            <div class="error-message" id="naError">
                      Input not filled
                    </div>
          </div>
        </div>

        <div class="containersss">
          <div class="container">
            <label for="note">Note</label>
            <textarea name="notes" id="notes" placeholder="Notes"></textarea>
          </div>
        </div>
      </div>`;
    }
    document.querySelector(".roundedabout").innerHTML = content;

    const accountNumbers = document.querySelector("#accountNumber");
    window.intlTelInput(accountNumbers, {
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch("https://ipinfo.io/json?token=YOUR_TOKEN")
          .then((response) => response.json())
          .then((data) => callback(data.country))
          .catch(() => callback("gh"));
      },
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    const newPaymentMethod = document.getElementById("paymentMethod");
    newPaymentMethod.addEventListener("change", function () {
      const selectedPayment = newPaymentMethod.value;
      updateModalContent(selectedPayment);
    });

    loadData();
  }

  function saveData() {
    const data = {
      paymentMethod: document.getElementById("paymentMethod").value,
      defaultCheckbox: document.getElementById("default").checked,
      notes: document.getElementById("notes").value
    };
  }
  saveData();

  // Load data from local storage
  function loadData() {
    const savedData = JSON.parse(localStorage.getItem("paymentInfo"));
    if (savedData) {
      document.getElementById("paymentMethod").value = savedData.paymentMethod;
      document.getElementById("default").checked =
        savedData.defaultCheckbox || false;
      document.getElementById("notes").value = savedData.notes || "";
    }
  }

  // Initial event listener for the payment method select
  paymentMethod.addEventListener("change", function () {
    const selectedPayment = paymentMethod.value;
    updateModalContent(selectedPayment);
  });
});
``;
// payment info details table
const tableElement = [] || JSON.parse(localStorage.getItem("tableElement"));
let id = tableElement.length++;

function createTable() {
  let row = `<table><tr class="header">
    <th>Payment Option</th><th>Service Provider</th><th>Branch</th>
    <th>Account #</th><th>Payment Basis</th><th class="value">Value</th><th>Default</th><th class="action">Action</th>
  </tr>`;

  if (tableElement.length === 1) {
    row += `<tr><td>No records to display</td></tr>`;
    document.getElementById("tableContainer").innerHTML = row;
  } else {
    tableElement.forEach((element, i) => {
      row += `<tr>
        <td>${element.name1}</td>
        <td>${element.name2}</td>
        <td>${element.name3}</td>
        <td>${element.name4}</td>
        <td>${element.name5}</td>
        <td class="value">${element.name6}</td>
        <td>${element.name7}</td>
        <td class="action"><button id="deleteBtn" onclick="deleteRow(${i})"><i class="fa-solid fa-trash"></i></button></td>
      </tr>`;
    });

    row += "</table>";
    document.getElementById("tableContainer").innerHTML = row;
  }
}

function saveDataToLocalStorage() {
  localStorage.setItem("tableElement", JSON.stringify(tableElement));
}

function deleteRow(index) {
  tableElement.splice(index, 1);
  createTable();
}
function addItem() {
  const paymentMethod = document.getElementById("paymentMethod").value;
  const phone = document.getElementById("accountNumber").value;
  const branchOption = document.getElementById("branchOptions")?.value;

  const bankOpts = document.getElementById("bankOptions").value;
  const accountNo = document.getElementById("accountNumber").value;
  const paymentBASE = document.getElementById("paymentBase").value;
  const notAvailable = document.getElementById("nA").value;
  const defaultCheckbox = document.getElementById("default").checked
    ? "Yes"
    : "No";

  const modalValidations1 = document.querySelectorAll(".modalOnefields");

  if (
    paymentMethod &&
    bankOpts &&
    branchOption &&
    accountNo &&
    paymentBASE &&
    notAvailable
  ) {
    tableElement.push({
      name1: paymentMethod,
      name2: bankOpts,
      name3: branchOption,
      name4: accountNo,
      name5: paymentBASE,
      name6: notAvailable,
      name7: defaultCheckbox
    });
    createTable();
  } else if (
    paymentMethod &&
    bankOpts &&
    phone &&
    paymentBASE &&
    notAvailable
  ) {
    tableElement.push({
      name1: paymentMethod,
      name2: bankOpts,
      name3: "NA",
      name4: phone,
      name5: paymentBASE,
      name6: notAvailable,
      name7: defaultCheckbox
    });
    document
      .getElementById("closeBtn")
      .addEventListener("click", () => modal.close());
    document.getElementById("addBtn").addEventListener("click", () => {
      document.querySelector(".roundedabout").innerHTML = "";
      modal.close();
      createTable();
    });
  } else {
    const validateModalField = (input) => {
      if (input.value) {
        input.style.borderColor = "rgba(0, 0, 0, 0.217)";
      } else {
        input.style.borderColor = "red";
      }
    };

    modalValidations1.forEach((modalValidation1) => {
      modalValidation1.addEventListener("input", () => {
        validateModalField(modalValidation1);
      });
    });

    modalValidations1.forEach((modalValidation1) => {
      validateModalField(modalValidation1);
    });
  }
}
saveBtn.addEventListener("click", () => {
  if (!tableElement.length === 0) {
    alert("Nothing in the Data table");
  } else {
    saveDataToLocalStorage();
    createTable();
  }
});

resetBtn.addEventListener("click", () => {
  if (tableElement.length === 0) {
  } else {
    localStorage.removeItem("tableElement");
    tableElement.length = 1;
    createTable();
  }
});
createTable();
// ends here
// generate staffId
function generateStaffID() {
  const prefix = "STAFF";
  const randomSuffix = Math.floor(10000000 + Math.random() * 2000000);
  const staffID = `${prefix} - ${randomSuffix}`;
  document.getElementById("staffID").value = staffID;
}

function enableFields() {
  const salaryGrade = document.getElementById("salaryGrade").value;
  const pB = document.getElementById("paymentBase").value;
  const payrollHours = document.getElementById("payrollHours").value;

  // Enable other fields when salary grade is selected
  if (salaryGrade) {
    document.getElementById("notch").disabled = false;
    document.getElementById("notch").classList.remove("disabled");

    document.getElementById("currency").disabled = false;
    document.getElementById("currency").classList.remove("disabled");

    document.getElementById("salaryType").disabled = false;
    document.getElementById("salaryType").classList.remove("disabled");
  }
  if (pB) {
    document.getElementById("nA").disabled = false;
    document.getElementById("nA").classList.remove("disabled");
  }
  if (payrollHours) {
    document.getElementById("salaryPercentage").disabled = false;
    document.getElementById("salaryPercentage").classList.remove("disabled");
  }
}
function enableNAField() {
  const paymentB = document.getElementById("paymentBase").value;
  if (paymentB) {
    document.getElementById("nA").disabled = false;
    document.getElementById("nA").classList.remove("disabled");
  }
}
$(document).ready(function () {
  // Initialize Select2 on all dropdowns
  $(".gl-dropdown").select2({
    placeholder: "Search GL",
    allowClear: true
  });
});

// downloading input objects into text file
function saveJsonToTxtFile(jsonData, fileName = "data.txt") {
  // Convert JSON object to a string
  const jsonString = JSON.stringify(jsonData, null, 2);

  // Create a Blob from the JSON string
  const blob = new Blob([jsonString], { type: "text/plain" });

  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  // Trigger the download
  link.click();

  // Clean up the URL object to avoid memory leaks
  URL.revokeObjectURL(link.href);
}
// ends here
