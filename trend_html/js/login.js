function login() {

    var username_input = document.getElementById("username_input");
    var password_input = document.getElementById("password_input");

    var username = username_input.value;
    var password = password_input.value;
    httpPostAsync(requestHost + "/user/login")
    // location.replace("index.html");
}

function checkLogin() {
    // location.replace("login.html");
}