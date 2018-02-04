function login() {
    var username_input = document.getElementById("username_input");
    var password_input = document.getElementById("password_input");

    var username = username_input.value;
    var password = password_input.value;

    var callback = function (result) {
        if (result["result"] == "0") {
            top.user = username;
            location.replace("index.html");
        } else {
            alert("用户名或者密码有误，请重新输入。");
            username_input.value = "";
            password_input.value = "";
        }
    };

    var queryDict = {"userName":username, "password":password};
    var queryJson = JSON.stringify(queryDict);
    httpPostAsync(requestHost + "/user/login", queryJson, callback)
}

function checkLogin() {
    if (!top.user) {
        location.replace("login.html");
        alert("需要先登录");
    }
}

function showUserOnIndexPage() {
    var user_span = document.getElementById("user_span");
    user_span.innerHTML = "欢迎：" +user;

}

function exitLog() {
    top.location.replace("login.html");
}