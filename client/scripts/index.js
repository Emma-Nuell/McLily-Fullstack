// const token = window.localStorage.getItem("token")

let slideIndex = 0;

const showSlides = () => {
    const slides = document.getElementsByClassName("slideshow")
    const radios = document.querySelector(".radios");
   const buttons = radios.querySelectorAll("button");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        buttons[i].checked = false;
        buttons[i].style.backgroundColor = "";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    buttons[slideIndex - 1].checked = true;
    buttons[slideIndex - 1].style.backgroundColor = "aquamarine"; 
  
    setTimeout(showSlides, 5000)
}

showSlides()