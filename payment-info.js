const addOption = document.getElementById("addOption");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const addBtn = document.getElementById("addBtn");
const paymentMethod = document.getElementById("paymentMethod");

const cancelBtn = document.getElementById("cancel");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");

const defaultCheckbox = document.getElementById("default");
// const serviceOptions = document.getElementById("serviceOptions");
const bankOptions = document.getElementById("bankOptions");
const branchOptions = document.getElementById("branchOptions");
const phone = document.getElementById("accountNumber");
// const paymentBasis = document.getElementById("paymentBasis");
const paymentBase = document.getElementById("paymentBase");
const notAvailable = document.getElementById("nA");
const notes = document.getElementById("notes");
const accountNumber = document.getElementById("accountNumber");
// const paymentOpt = document.getElementById("paymentOpt");

document.addEventListener("DOMContentLoaded", function () {
  addOption.addEventListener("click", () => {
    loadData();
    modal.showModal();
  });

  closeBtn.addEventListener("click", () => {
    modal.close();
  });

  function updateModalContent(selectedPayment) {
    let content = "";

    if (selectedPayment === "Cash") {
      content = `
        <div class="payment-header"><p1>Add Payment Info</p1></div>
        <div class="roundedabout">
          <div class="containers">
            <div class="container">
              <label for="paymentOp">Payment Option</label>
              <select name="paymentMethod" id="paymentMethod">
                <option value="#" disabled selected hidden>Select Payment Option</option>
                <option value="bank">Bank</option>
                <option value="MoMo">Mobile Money</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div class="container">
              <input type="checkbox" name="default" id="default" />Default
            </div>
          </div>
          <div class="containers">
            <!-- Add Cash-specific fields here -->
          </div>
        </div>
        <div class="footer">
          <button type="button" id="closeBtn"><i class="fa-solid fa-xmark"></i> close</button>
          <button type="button" id="addBtn" onclick="addItem()"><i class="fa-regular fa-floppy-disk"></i> Add</button>
        </div>`;
    } else if (selectedPayment === "MoMo") {
      content = ` 
          <div> 
            <div class="containers">
              <div class="container">
                <label for="bankOptions"
                  >Service Provider <sup> <i class="fa-solid fa-asterisk"></i></sup
                ></label>
                <select name="service-provider" id="bankOptions">
                  <option value="" disabled selected hidden>
                    Select service provider
                  </option>
                  <option value="mtn">MTN</option>
                  <option value="telecel">Telecel</option>
                  <option value="airtel">Airteltigo</option>
                </select>
              </div>

              <div class="container"> 
                <label for="Mo-number">
                   Mobile Number <sup><i class="fa-solid fa-asterisk"></i></sup>
                </label>
                <input id="accountNumber" type="tel" name="phone" placeholder="Enter phone number" />
              </div>

                <div class="container">
                <label for="paymentBase"
                  >Payment Basis <sup><i class="fa-solid fa-asterisk"></i></sup
                ></label>
                 <select name="paymentBase" id="paymentBase">
                  <option value="" disabled selected hidden>
                    Select Payment Basis
                  </option>
                 <option value="hourly">Hourly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </div>

            <div class="containers">

              <div class="container">
                <label for="paymentOpt"
                  >NA <sup><i class="fa-solid fa-asterisk"></i></sup
                ></label>
                <input type="text" name="NA" id="nA" />
              </div>
            </div>

            <div class="containers">
              <div class="container">
                <label for="note">Note</label>
                <textarea name="notes" id="notes" placeholder="Notes"></textarea>
              </div>
            </div>
          </div>`;
      // document.body.innerHTML += content;
    } else if (selectedPayment === "bank") {
      content = ` 
        <div  > 

          <div class="containers">
            <div class="container">
              <label for="bankOptions"
                >Bank <sup> <i class="fa-solid fa-asterisk"></i></sup
              ></label>
              <select name="bank" id="bankOptions">
                <option value="" disabled selected hidden>
                  Select bank
                </option>
                <option value="Calbank">CalBank</option>
              </select>
            </div>

            <div class="container">
              <label for="branch"
                >Branch <sup> <i class="fa-solid fa-asterisk"></i></sup
              ></label>
              <select name="branch" id="branchOptions">
                <option value="" disabled selected hidden>
                  Select Branch
                </option>
                <option value="UG">UG</option>
                <option value="East Legon">East Legon</option>
                <option value="Madina">Madina</option>
                <option value="Achimota">Achimota</option>
              </select>
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
                id="accountNumber" placeholder="Enter Account No."
              />
            </div>

            <div class="container">
              <label for="paymentOpt"
                >Payment Basis <sup><i class="fa-solid fa-asterisk"></i></sup
              ></label>
              <select name="paymentOpt" id="paymentBase">
                <option value="" disabled selected hidden>
                  Select Payment Basis
                </option>
                <option value="hourly">Hourly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div class="container">
              <label for="paymentOpt"
                >NA <sup><i class="fa-solid fa-asterisk"></i></sup
              ></label>
              <input type="text" name="NA" id="nA" />
            </div>
          </div>

          <div class="containers">
            <div class="container">
              <label for="note">Note</label>
              <textarea name="notes" id="notes" placeholder="Notes"></textarea>
            </div>
          </div>
        </div>`;
    }
    document.querySelector(".roundedabout").innerHTML = content;
    // modal.innerHTML = content;

    const accountNumbers = document.querySelector("#accountNumber");
    window.intlTelInput(accountNumbers, {
      initialCountry: "auto", // You can change this to a specific country code (e.g., 'us')
      geoIpLookup: function (callback) {
        fetch("https://ipinfo.io/json?token=YOUR_TOKEN") // Replace with your IP Info token
          .then((response) => response.json())
          .then((data) => callback(data.country))
          .catch(() => callback("gh")); // Fallback to 'us' if geo lookup fails
      },
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // For number formatting/validation
    });

    const newPaymentMethod = document.getElementById("paymentMethod");
    newPaymentMethod.addEventListener("change", function () {
      const selectedPayment = newPaymentMethod.value;
      updateModalContent(selectedPayment);
    });

    document
      .getElementById("closeBtn")
      .addEventListener("click", () => modal.close());
    document
      .getElementById("addBtn")
      .addEventListener("click", () => modal.showModal());

    loadData();
  }

  function saveData() {
    const data = {
      paymentMethod: document.getElementById("paymentMethod").value,
      defaultCheckbox: document.getElementById("default").checked,
      notes: document.getElementById("notes").value
    };
    // localStorage.setItem("paymentInfo", JSON.stringify(data));
  }

  // Load data from local storage
  function loadData() {
    const savedData = JSON.parse(localStorage.getItem("paymentInfo"));
    console.log(`savedData.`, savedData);
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

const tableElement = [] || JSON.parse(localStorage.getItem("tableElement"));
let id = tableElement.length++;
console.log(tableElement.length);

function createTable() {
  let row = `<table><tr class="header">
    <th>Payment Option</th><th>Service Provider</th><th>Branch</th>
    <th>Account #</th><th>Payment Basis</th><th>Value</th><th>Default</th><th>Action</th>
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
        <td>${element.name6}</td>
        <td>${element.name7}</td>
        <td><button id="deleteBtn" onclick="deleteRow(${i})"><i class="fa-solid fa-trash"></i></button></td>
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

const branchOption = document.getElementById("branchOptions").value;
function addItem() {
  const paymentMethod = document.getElementById("paymentMethod").value;
  console.log(branchOption);
  const phone = document.getElementById("accountNumber").value;

  const bankOpts = document.getElementById("bankOptions").value;
  const accountNo = document.getElementById("accountNumber").value;
  const paymentBASE = document.getElementById("paymentBase").value;
  const notAvailable = document.getElementById("nA").value;
  const defaultCheckbox = document.getElementById("default").checked
    ? "Yes"
    : "No";

  console.log(notAvailable);

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
      name3: "",
      name4: phone,
      name5: paymentBASE,
      name6: notAvailable,
      name7: defaultCheckbox
    });
    createTable();
  } else {
    alert("Please fill all fields");
  }
  console.log(paymentMethod);
}

saveBtn.addEventListener("click", () => {
  if (tableElement.length === 1) {
    alert("Nothing in the Data table");
  } else {
    alert("Data saved successfully");
    saveDataToLocalStorage();
    createTable();
  }
  console.log(tableElement);
});

resetBtn.addEventListener("click", () => {
  if (tableElement.length === 1) {
    alert("nothing in the data Data table");
  } else {
    localStorage.removeItem("tableElement");
    tableElement.length = 1;
    alert("Data reset successfully");
    createTable();
  }
});
createTable();
