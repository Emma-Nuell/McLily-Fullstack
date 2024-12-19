const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const phone = document.getElementById("phone")
const signUp = document.getElementById("signUp")
const form = document.getElementById("form")
const errormsg = document.getElementById("error")
const passwordDescription = document.getElementById("password-description")
const passwordStrength = document.getElementById("passwordStrength")
let url = "http://127.0.0.1:3000"

// console.log(lname, fname, email, password, cpassword, signUp, login )

let userTyping = false
function isStrongPassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
    const hasNumber = /[0-9]/.test(password);
  
    return hasUppercase && hasLowercase && hasSpecialChar && hasNumber;
  }
const displayDescription = () => {
    if (!userTyping) {
        passwordDescription.textContent = `Password must contain at least one uppercase letter,
        one lowercase letter, one special character, and one number`
    }
}

function checkPasswordStrength(password) {
  
    if (password === "") {
      passwordStrength.textContent = "";
    } else {
      passwordDescription.style.display = "none";
  
      if (isStrongPassword(password)) {
        passwordStrength.textContent = "Strong password!";
        passwordStrength.style.color = "green";
      } else {
        passwordStrength.textContent = "Password is not strong enough.";
        passwordStrength.style.color = "red";
      }
    }
  }
password.addEventListener("focus", displayDescription)
password.addEventListener("input", function (){
    checkPasswordStrength(this.value);
  })


  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}
signUp.addEventListener("click", (e) => {
    e.preventDefault()

    if (fname.value == "") {
        errormsg.textContent = "Firstname cannot be empty"
        e.preventDefault()
    } 
    else if (lname.value =="") {
        errormsg.textContent = "Lastname cannot be empty"
        e.preventDefault()
    }
    else if (email.value =="") {
        errormsg.textContent = "Email cannot be empty"
        e.preventDefault()
    }
    else if (!isValidEmail(email.value)) {
        errormsg.textContent = "Invalid email address."
        e.preventDefault()
    }
    else if (phone.value == "") {
        errormsg.textContent = "Phone Number cannot be empty"
        e.preventDefault()
    }
    else if (password.value =="") {
        errormsg.textContent = "Password cannot be empty"
        e.preventDefault()
    }
    else {
      errormsg.textContent = ""
        const user = {
            firstName: fname.value,
            lastName: lname.value,
            email: email.value,
            phoneNo: phone.value,
            password: password.value     
        }
    
        createAccount(user)
       form.reset()
    }
})

async function createAccount(data) {
  try {
      const response = await fetch(`${url}/accounts/auth/signup`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.error) errormsg.innerText = result.error

      if (response.status === 200) window.location.href = 'login.html'

      console.log(result);
  } catch (error) {
      errormsg.innerText = error.error
      console.error(error);
  }
}