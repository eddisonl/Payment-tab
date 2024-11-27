"use strict";
const cancelBtn = document.getElementById("cancel");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
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

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve and populate the form with saved data if it exists
  populateForm();

  // Add event listener for the Save button
  saveBtn.addEventListener("click", saveData);

  // Add event listener for the Reset button
  resetBtn.addEventListener("click", resetData);
});

function saveData() {
  if (
    !firstNameInput?.value ||
    !lastNameInput?.value ||
    !genderOptions?.value ||
    !dateOfBirth?.value ||
    !marriageStatusOpt?.value ||
    !emailAddress?.value ||
    !phoneNumberInput?.value ||
    !countryOption?.value ||
    !nationalityOption?.value
  ) {
    // console.log(saveData());
    alert("please fill all required forms");
    return;
  }

  const formData = {
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
    myFileInput: myFileInput.value
  };

  localStorage.setItem("employeeData", JSON.stringify(formData));
  alert("Data saved successfully!");

  saveJsonToTxtFile(formData, "formData.txt");
}

function populateForm() {
  const savedData = localStorage.getItem("employeeData");
  if (savedData) {
    const formData = JSON.parse(savedData);

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
  }
}

function resetData() {
  const savedData = localStorage.getItem("employeeData");

  if (!savedData && isFormEmpty()) {
    alert("No Data to reset. The form and storage are already empty.");
    return;
  }

  if (confirm("Are you sure you want to reset?")) {
    localStorage.removeItem("employeeData");
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

    alert("Data reset successfully!");
  }
}

function isFormEmpty() {
  return (
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
    !residentInput.checked
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector("#phone");

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto", // Change to a specific country code if needed (e.g., 'us')
    geoIpLookup: function (callback) {
      fetch("https://ipinfo.io/json?token=YOUR_TOKEN")
        .then((response) => response.json())
        .then((data) => callback(data.country))
        .catch(() => callback("gh")); // Fallback country code
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // For formatting/validation
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

function saveJsonToTxtFile(jsonData, fileName = "data.txt") {
  // Convert JSON object to a string
  const jsonString = JSON.stringify(jsonData, null, 2); // `null, 2` adds indentation for readability

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
