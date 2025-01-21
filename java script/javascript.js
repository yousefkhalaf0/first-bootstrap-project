var emailInput = document.getElementById('emailId');
var passwordInput = document.getElementById('passwordId');
var userNameInput = document.getElementById('userNameId');
var signUpEmailInput = document.getElementById('signUpEmailId');
var signUpPasswordInput = document.getElementById('signUpPasswordId');

var emailErrorMsg = document.getElementById('emailErrorId');
var passwordErrorMsg = document.getElementById('passwordErrorId');
var userNameErrorMsg = document.getElementById('userNameErrorId');
var signUpEmailErrorMsg = document.getElementById('signUpEmailErrorId');
var signUpPasswordErrorMsg = document.getElementById('signUpPasswordErrorId');

var container = document.getElementById('postsContainer');
var apiData = [];

// sign in
function validateEmail() {
    var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (emailRegex.test(emailInput.value)) {
        emailErrorMsg.classList.add('e-none');
    }
    else {
        emailErrorMsg.classList.remove('e-none');
    }
}

function validatePassword() {
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (passwordRegex.test(passwordInput.value)) {
        passwordErrorMsg.classList.add('p-none');
    }
    else {
        passwordErrorMsg.classList.remove('p-none');
    }
}

function submitForm() {
    validateEmail();
    validatePassword();

    if (emailErrorMsg.classList.contains('e-none') && passwordErrorMsg.classList.contains('p-none')) {
        console.log('Sign In Form submitted');
        emailInput.value = '';
        passwordInput.value = '';
        // document.getElementById('signInForm').submit();
        location.href = 'index.html';
    }
}


// sign up
function validateUserName() {
    var userNameRegex = /^[a-z0-9_-]{3,15}$/;
    if (userNameRegex.test(userNameInput.value)) {
        userNameErrorMsg.classList.add('userName-none');
    } else {
        userNameErrorMsg.classList.remove('userName-none');
    }
}

function validateSignUpEmail() {
    var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (emailRegex.test(signUpEmailInput.value)) {
        signUpEmailErrorMsg.classList.add('signUp-e-none');
    } else {
        signUpEmailErrorMsg.classList.remove('signUp-e-none');
    }
}

function validateSignUpPassword() {
    var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (passwordRegex.test(signUpPasswordInput.value)) {
        signUpPasswordErrorMsg.classList.add('signUp-p-none');
    } else {
        signUpPasswordErrorMsg.classList.remove('signUp-p-none');
    }
}

function submitSignUpForm() {
    validateUserName();
    validateSignUpEmail();
    validateSignUpPassword();

    if (userNameErrorMsg.classList.contains('userName-none') &&
        signUpEmailErrorMsg.classList.contains('signUp-e-none') &&
        signUpPasswordErrorMsg.classList.contains('signUp-p-none')) {
        console.log('Sign up Form submitted');
        userNameInput.value = '';
        signUpEmailInput.value = '';
        signUpPasswordInput.value = '';
        // document.getElementById('signUpForm').submit();
        location.href = 'index.html';
    }
}


//API
function GetData() {
    var xhr = new XMLHttpRequest();
    var token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWM3YTEyMGVmYzBmMjYwN2M2NmY0M2FjOTZlNTE4NyIsIm5iZiI6MTczNDY5OTE0OS42MDcsInN1YiI6IjY3NjU2ODhkMzMwYmNlNmVjOTkwZDkzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.esHqUVs2EKpxNE00BUZOjw-aOb2Ed7d9qJDEkisIR6I'
    var url = `https://api.themoviedb.org/3/trending/all/day?language=en-US`;

    xhr.open("GET", url);
    xhr.setRequestHeader("Authorization", token);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            apiData = response.results.map(item => ({
                overview: item.overview,
            }));

            //testing in console => done
            // console.log('Returned data:', apiData);
            displayPosts();
        }
    };
    xhr.send();
}

function displayPosts() {
    apiData.forEach((card) => {
        container.innerHTML += `<div class="row mx-1 mt-2 border rounded">
                    <div class="col-2 mt-3">
                        <img class="rounded-circle" src="/resources/person.png" height="50px">
                    </div>
                    <div class="col-10">
                        <div class="row ps-1 pt-2">
                            <div class="col-11">
                                <p><span class="fw-bold">Yousef Khalaf </span>@yk369 . 18h</p>
                            </div>
                            <div class="col-1 ps-0">
                                <i class="btn bi bi-three-dots"></i>
                            </div>
                        </div>
                        <div class="col">
                            ${card.overview}
                            <br>
                            <div class="row my-3">
                                <div class="col"><i class="postIcon bi bi-chat-fill"></i></div>
                                <div class="col"><i class="postIcon bi bi-reply-fill"></i></div>
                                <div class="col"><i class="postIcon bi bi-heart-fill"></i></div>
                                <div class="col"><i class="postIcon bi bi-share-fill"></i></div>
                            </div>
                        </div>
                    </div>
                </div>`
    });
}

GetData();