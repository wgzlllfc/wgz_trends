function login() {
    var username_input = document.getElementById("username_input");
    var password_input = document.getElementById("password_input");

    var username = username_input.value;
    var password = password_input.value;

    var callback = function (result) {
        if (result["result"] == "0") {
            setCookie('username',username,1);
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

function enterOnPassword(event) {
    if(event.keyCode==13) {
        var login_btn = document.getElementById("login_btn");
        login_btn.click();
        return false;
    }
}


function showUserOnIndexPage() {
    var username=getCookie('username');
    var user_span = document.getElementById("user_span");
    user_span.innerHTML = "欢迎：" + username;
}

function exitLog() {
    top.location.replace("login.html");
    setCookie('username',"",1);
}

function getCookie(c_name) {
    if (document.cookie.length>0) {
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1) {
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function setCookie(c_name,value,expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function checkCookie() {
    var username=getCookie('username');
    if (username==null || username=="") {
        location.replace("login.html");
    }
}