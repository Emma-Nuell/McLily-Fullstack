const mobileFooter = document.querySelector(".mobile-footer")
const foooterButtons = mobileFooter.querySelectorAll("span")

foooterButtons[0].addEventListener("click", () => {
    window.location.href = "index.html"
})
foooterButtons[3].addEventListener("click", () => {
    window.location.href = "profile.html"
})