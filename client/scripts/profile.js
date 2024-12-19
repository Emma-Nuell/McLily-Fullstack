import { cityOptions } from "./import.js";
const list = document.getElementById("list");
const links = list.querySelectorAll("a");
const accountView = document.getElementById("account-view")
const addressView = document.getElementById("address-view")
const afname = document.getElementById("afname")
const alname = document.getElementById("alname")
const aemail = document.getElementById("aemail")
const acpassword = document.getElementById("acpassword")
const anpassword = document.getElementById("anpassword")
const aconpassword = document.getElementById("aconpassword")
const abutton = document.getElementById("asave")
const ebutton = document.getElementById("edit")
const dfname = document.getElementById("dfname")
const dlname = document.getElementById("dlname")
const dnumber = document.getElementById("dnumber")
const dstreet = document.getElementById("dstreet")
const ddirections = document.getElementById("ddirections")
const dcity = document.getElementById("dcity")
const dstate = document.getElementById("dstate")
const dlga = document.getElementById("dlga")
const dbutton = document.getElementById("dsave")
const header = document.getElementById("header")
const infoHeader = document.getElementById("info-header")
const accountInfo = document.getElementById("account")
const addressInfo = document.getElementById("address")
const editInfo = document.getElementById("edit-info")
let url = "http://127.0.0.1:3000"

const token = window.localStorage.getItem("token")


async function getProfile() {
    const response = await fetch(`${url}/user/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data
}

const userDetails = await getProfile()
afname.value = `${userDetails.firstname}`
alname.value = `${userDetails.lastname}`
aemail.value = `${userDetails.email}`


addressView.addEventListener("click", (e) => {
    header.innerHTML = `<h2>Delivery Addresses</h2>`
    infoHeader.innerHTML = `<h3>Delivery Address</h3> <button>Add New Address</button>`

    accountInfo.style.display = "none"
    addressView.classList.add("active")
    accountView.classList.remove("active")
    addressInfo.style.display = "flex"
    editInfo.style.display = "none"
})
ebutton.addEventListener("click", () => {
    infoHeader.innerHTML = `<span><i class="ri-arrow-left-line"></i><h3>Edit Delivery Address</h3></span>`
    addressInfo.style.display = "none"
    editInfo.style.display = "flex"
})
accountView.addEventListener("click", () => {
    addressInfo.style.display = "none"
    editInfo.style.display = "none"
    accountInfo.style.display = "flex"
    addressView.classList.remove("active")
    accountView.classList.add("active")
    header.innerHTML = `<h2>Account Information</h2>`
    infoHeader.innerHTML = `<h3>Account Information</h3>`
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