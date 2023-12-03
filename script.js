import responseData from "./data.js";

// Selecting the HTML element 
const selectCountry = document.querySelector(".select-country");
const selectState = document.querySelector(".select-state");
const selectCity = document.querySelector(".select-city");

// Initial value to display
responseData.forEach((data) => {
  insertSelectValue(data.countryName, data.countryId, selectCountry);
});

// Insert options in the select dynamically
function insertSelectValue(value, id, element) {
  let content = `<option value=${id}>${value}</option>`;
  element.innerHTML += content;
}

// On country select handle functionality
let selectStateData = "";
function handleCountryChange() {
  if (this.value !== "0") {
    selectState.disabled = false;
    let selectCountryData = responseData.find(
      (data) => data.countryId == this.value
    );
    selectState.innerHTML = `<option value="0">Select State</option>`;
    selectCity.innerHTML = `<option value="0">Select City</option>`;
    selectStateData = selectCountryData.states;
    selectStateData.forEach((state) => {
      insertSelectValue(state.stateName, state.stateId, selectState);
    });
  } else {
    selectState.disabled = true;
    selectState.value = "0";
  }
  selectCity.disabled = true;
  selectCity.value = "0";
}

// On state select handle functionality
function handleStateChange() {
  if (this.value !== "0") {
    selectCity.disabled = false;
    let selectCityData = selectStateData.find((data) => data.stateId == this.value);
    selectCity.innerHTML = `<option value="0">Select City</option>`;
    selectCityData.cities.forEach((city) => {
      insertSelectValue(city.cityName, city.cityId, selectCity);
    });
  } else {
    selectCity.disabled = true;
    selectCity.value = "0";
  }
}

// Handle on change event listners
selectCountry.addEventListener("change", handleCountryChange);
selectState.addEventListener("change", handleStateChange);
