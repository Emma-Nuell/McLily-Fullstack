import { cityOptions } from "./import.js"
const ebutton = document.getElementById("edit")
const dstate = document.getElementById("dstate")
const dlga = document.getElementById("dlga")
const editInfo = document.getElementById("edit-info")
const addressInfo = document.getElementById("address")
const infoHeader = document.getElementById("info-header")
const footer = document.querySelector("footer")

const span = document.createElement("span")
const i = document.createElement("i")
const h3 = document.createElement("h3")
h3.innerText = "Edit Delivery Address"
i.classList.add("ri-arrow-left-line")
i.addEventListener("click", () => {
    window.location.href = "address.html"
})
span.appendChild(i)
span.appendChild(h3)

// infoHeader.innerHTML = span


ebutton.addEventListener("click", () => {
    infoHeader.innerHTML = ""
    infoHeader.appendChild(span )
    addressInfo.style.display = "none"
    editInfo.style.display = "flex"
})

function updateCityDropdown() {
    const selectedState = dstate.value;

    dlga.innerHTML = '';

    cityOptions[selectedState].forEach(element => {
        const option = document.createElement("option");
        option.text = element;
        dlga.appendChild(option);
    });
}

updateCityDropdown();
dstate.addEventListener("change", updateCityDropdown)