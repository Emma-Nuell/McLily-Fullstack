
const boo = document.querySelector(".boo")
const accDropdown = document.querySelector(".acc-dropdown")
const name1 = boo.querySelector("p")
const signIn = accDropdown.querySelector("button")
const balabulu = accDropdown.querySelectorAll(".balabulu span")
const loginDropdown = document.querySelector(".login-dropdown")
const arrowUp = document.querySelector(".fa-angle-up")
const arrowDown = document.querySelector(".fa-angle-down")
const loggedIcon = document.querySelector(".ri-user-follow-line")
const guestIcon = document.querySelector(".guest")
const signOut = document.getElementById("signoutbtn")
const menu = document.querySelector(".ri-menu-line")
const mobileDropdown = document.querySelector(".mobile-dropdown")
const times = document.getElementById("times")
const searchBar = document.querySelector(".search-bar")
const mobileHedaer = document.querySelector(".mobile-header")
const login = document.getElementById("mlogin")
const signUp = document.getElementById("msignUp")
const buttons = document.querySelector(".buttons")
const loggedUser = document.querySelector(".logged-user")
const uname = loggedUser.querySelector(".uname")
const uemail = loggedUser.querySelector(".uemail")
const loggedInfo = document.querySelector(".logged-info")
const loggedShit = document.querySelector(".logged-shit")
const loggedOut = document.querySelector(".logged-logOut")
const loggedAddress = document.querySelector(".logged-address")
const bala= document.querySelector(".bala")
let dropdownState = false;

const token = window.localStorage.getItem("token")
const userName = window.localStorage.getItem("name")
const lastName = window.localStorage.getItem("lname")
const email = window.localStorage.getItem("email")

const user = userName ? userName : "User"

 
if (token) {
    name1.innerText = `Hi, ${user}`
    loggedIcon.style.display = "inline"
    guestIcon.style.display = "none"
    boo.addEventListener("click", () => {
        if (!dropdownState) {
            loginDropdown.style.display = "flex"
            arrowDown.style.display = "none"
            arrowUp.style.display = "inline"
            dropdownState = true
    }
        else {
            loginDropdown.style.display = "none"
            arrowDown.style.display = "inline"
            arrowUp.style.display = "none"
            dropdownState = false
        }
    })
}
else {
    name1.innerText = `Account`
    loggedIcon.style.display = "none"
    guestIcon.style.display = "inline"
    boo.addEventListener("click", () => {
        if (!dropdownState) {
            accDropdown.style.display = "flex"
            arrowDown.style.display = "none"
            arrowUp.style.display = "block"
            dropdownState = true
    }
        else {
            accDropdown.style.display = "none"
            arrowDown.style.display = "inline"
            arrowUp.style.display = "none"
            dropdownState = false
        }
    })
    balabulu.forEach(element => {
        element.addEventListener("click", () => {
            window.location.href = "login.html"
        })
    });
}
signIn.addEventListener("click", () => {
    window.location.href = "login.html"
})
signOut.addEventListener("click", () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("name")
    window.location.href  = "index.html"
})
menu.addEventListener("click", () => {
    mobileHedaer.style.height = "60px"
    mobileDropdown.style.display = "flex"
    menu.style.display = "none"
    times.style.display = "inline"
    searchBar.style.display = "none"
})
times.addEventListener("click", () => {
    mobileDropdown.style.display = "none"
    menu.style.display = "inline"
    times.style.display = "none"
    searchBar.style.display = "flex"
    mobileHedaer.style.height = "92px"
})

login.addEventListener("click", () => {
    window.location.href = "login.html"
})
signUp.addEventListener("click", () => {
    window.location.href = "signup.html"
})

if (token) {
    buttons.style.display = "none"
    loggedUser.style.display = "flex"
    uname.innerText = `${userName} ${lastName}`
    uemail.innerText = `${email}`
    loggedInfo.style.display = "table-row"
    loggedShit.style.display = "flex"
    loggedUser.style.display = "flex"
} else {
    buttons.style.display = "flex"
    loggedUser.style.display = "none"
    uname.innerText = `User`
    uemail.innerText = `example@gmail.com`
    loggedInfo.style.display = "none"
    loggedShit.style.display = "none"
    loggedUser.style.display = "none"
}
loggedOut.addEventListener("click", () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("name")
    window.location.href  = "index.html"
})
loggedAddress.addEventListener("click", () => {
    window.location.href = "address.html"
})
bala.addEventListener("click", () => {
    window.location.href="profile.html";
})