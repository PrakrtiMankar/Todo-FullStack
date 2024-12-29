//array to store temp user signup detail
let userArr=[];

let form = document.querySelector('form');

form.addEventListener("submit", () => {
    event.preventDefault()
    let username = form.username.value
    let email = form.email.value
    let password = form.password.value
    let country = form.country.value
    let mobile = form.mobile.value

    if(username == '' || email == '' || password == '' || country == '' || mobile == ''){
        let emptyString = username == '' ? "username" : email == '' ? "email" : password == '' ? "password" : country == '' ? "country" : mobile == '' ? "mobile" : null;
        alert(`Enter ${emptyString}`)
    }

    signupFunc(username, email, password, country, mobile)

})

function signupFunc(username, email, password, country, mobile ) {
    userArr[userArr.length] = {
        "name": username,
        "email": email,
        "password": password,
        "country": country,
        "mobile": mobile
    };

    fetch(`https://verbena-bow-fahrenheit.glitch.me/usersTodoSpace`)
    .then((res) => res.json())
    .then((data) => {
        let user = data.filter((el, i) => el.email == email)
        if(user.length!=0) {
            //user found
            alert("User already registered, please login");
            window.location.href = "login.html";
        }
        else{
            //user not present
            fetch(`https://verbena-bow-fahrenheit.glitch.me/usersTodoSpace`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(userArr[userArr.length-1])
            })
            .then(() => {
                alert("Signup Successful");
                window.location.href = "login.html"
            });
        }
    })
    .catch((err) => {
        console.log(err)
        alert("Somthing went wrong, Please try again later")
    });

    console.log(userArr, "userArr");
}