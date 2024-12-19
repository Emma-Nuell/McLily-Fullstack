const email = document.getElementById("email")
const password = document.getElementById("password")
const login = document.getElementById("login")
const form = document.getElementById("form")
const errormsg = document.getElementById("error")
let url = "http://127.0.0.1:3000"

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

  
login.addEventListener("click", (e) => {
    e.preventDefault()

    if (email.value == "") {
        errormsg.textContent = "Email cannot be empty"
        e.preventDefault()
 
    }
    else if (!isValidEmail(email.value)) {
        errormsg.textContent = "Invalid email address."
        e.preventDefault()
    }
    else if (password.value =="") {
        errormsg.textContent = "Password cannot be empty"
        e.preventDefault()
    }
    else {  
        errormsg.textContent = ""
        let user = {
            email: email.value,
            password: password.value
        }
        loginUser(user)
       form.reset()
    }

})

async function loginUser(data) {
    try {
        const response = await fetch(`${url}/accounts/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        console.log(result);

        if (response.status === 200) {
            window.localStorage.setItem('token', result.token)  
            window.localStorage.setItem('name', result.user.firstName)  
            window.localStorage.setItem('lname', result.user.lastName)  
            window.localStorage.setItem('email', result.user.email)  
            window.localStorage.setItem('password', result.user.password)  
            window.location.href = 'index.html'
        }

        if (result.error) errormsg.innerText = result.error

    } catch (error) {
        errormsg.innerText = error.error
        console.error(error);
    }
}