/**
 * Created by wgz on 2018/1/29.
 */
function getMailInfoToRefreshMailTable() {
    var callback = function (result) {
        var mails = result["mails"];
        if (isArray(mails)) {
            for (var i=0;i<mails.length;i++) {
                var mail = mails[i];
                addRowToMailTable(mail);
            }
        }
    };
    httpGetAsync(requestHost + "/common/getMails", callback)
}

function addRowToMailTable(mail) {
    var mailInput = document.createElement("input");
    mailInput.type = "text";
    mailInput.name = "mail_input";
    if (mail) {
        mailInput.value = mail;
    }
    var mailCell = document.createElement("td");
    mailCell.append(mailInput);

    var del_btn = document.createElement("input");
    del_btn.name = "del_btn";
    del_btn.type = "button";
    del_btn.value = "删除";
    del_btn.onclick = deleteRow;

    var del_btn_div = document.createElement("div");
    del_btn_div.className = "btn_box floatR";
    del_btn_div.appendChild(del_btn);

    var currentRow = document.createElement("tr");
    currentRow.appendChild(mailCell);
    currentRow.appendChild(del_btn_div);

    var mailTabel = document.getElementById("mail_table");
    mailTabel.appendChild(currentRow);
}

function saveMails() {
    var keywordInputElements = document.getElementsByName("mail_input");

    var resultArray=[];

    for (var i=0;i<keywordInputElements.length;i++) {
        var keywordInput = keywordInputElements[i];

        var keyword = keywordInput.value;
        resultArray[i] = [keyword, region, duration, interval];
    }
    var resultJson = JSON.stringify(resultArray);
    var callback = function (result) {
        if (result["result"] == "0") {
            location.reload();
        }
    };
    httpPostAsync(requestHost + "/common/setMails", resultJson, callback);
}

function getPhoneInfoToRefreshPhoneTable() {
    var callback = function (result) {
        var mobiles = result["mobiles"];
        if (isArray(mobiles)) {
            for (var i=0;i<mobiles.length;i++) {
                var mobile = mobiles[i];
                addRowToPhoneTable(mobile);
            }
        }
    };
    httpGetAsync(requestHost + "/common/getMobiles", callback)
}

function addRowToPhoneTable() {
    var phoneInput = document.createElement("input");
    phoneInput.type = "text";
    phoneInput.name = "mail_input";
    var phoneCell = document.createElement("td");
    phoneCell.append(phoneInput);

    var del_btn = document.createElement("input");
    del_btn.name = "del_btn";
    del_btn.type = "button";
    del_btn.value = "删除";
    del_btn.onclick = deleteRow;

    var del_btn_div = document.createElement("div");
    del_btn_div.className = "btn_box floatR";
    del_btn_div.appendChild(del_btn);

    var currentRow = document.createElement("tr");
    currentRow.appendChild(phoneCell);
    currentRow.appendChild(del_btn_div);

    var phoneTabel = document.getElementById("phone_table");
    phoneTabel.appendChild(currentRow);
}

function savePhones() {
    var phoneInputElements = document.getElementsByName("phone_input");

    var resultArray=[];

    for (var i=0;i<phoneInputElements.length;i++) {
        var phoneInput = phoneInputElements[i];
        resultArray[i] = phoneInput.value;
    }
    var resultJson = JSON.stringify(resultArray);
    var callback = function (result) {
        if (result["result"] == "0") {
            location.reload();
        }
    };
    httpPostAsync(requestHost + "/common/setMobiles", resultJson, callback);
}