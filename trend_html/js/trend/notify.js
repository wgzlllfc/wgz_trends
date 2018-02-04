/**
 * Created by wgz on 2018/1/29.
 */
function getMailInfoToRefreshMailTable() {
    var callback = function (result) {
        var mails = result["mails"];
        if (isArray(mails)) {
            for (var i=0;i<mails.length;i++) {
                var mail = mails[i];
                addFixedRowToMailTable(mail);
            }
        }
    };
    httpGetAsync(requestHost + "/common/getMails", callback)
}

function addFixedRowToMailTable(mail) {
    var mailCell = document.createElement("td");
    mailCell.className = "mail_input";
    mailCell.innerText = mail;

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
    var resultArray=[];
    var mailInputRows = document.getElementsByClassName("mail_input");
    for (var i=0;i<mailInputRows.length;i++) {
        var mailInputRow = mailInputRows[i];
        resultArray.push(mailInputRow.innerText);
    }

    var mailInputElements = document.getElementsByName("mail_input");
    for (var j=0;j<mailInputElements.length;j++) {
        var mailInput = mailInputElements[j];
        resultArray.push(mailInput.value);
    }
    var resultJson = JSON.stringify({"mails":resultArray});
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
                addFixedRowToPhoneTable(mobile);
            }
        }
    };
    httpGetAsync(requestHost + "/common/getMobiles", callback)
}

function addFixedRowToPhoneTable(mobile) {
    var phoneCell = document.createElement("td");
    phoneCell.className = "phone_input";
    phoneCell.innerText = mobile;

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

function addRowToPhoneTable(mobile) {
    var phoneInput = document.createElement("input");
    phoneInput.type = "text";
    phoneInput.name = "phone_input";
    if (mobile) {
        phoneInput.value = mobile;
    }
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
    var resultArray=[];

    var phoneInputRows = document.getElementsByClassName("phone_input");

    for (var i=0;i<phoneInputRows.length;i++) {
        var phoneInputRow = phoneInputRows[i];
        resultArray.push(phoneInputRow.innerText);
    }

    var phoneInputElements = document.getElementsByName("phone_input");

    for (var j=0;j<phoneInputElements.length;j++) {
        var phoneInput = phoneInputElements[j];
        resultArray.push(phoneInput.value);
    }
    var resultJson = JSON.stringify({"mobiles":resultArray});
    var callback = function (result) {
        if (result["result"] == "0") {
            location.reload();
        }
    };
    httpPostAsync(requestHost + "/common/setMobiles", resultJson, callback);
}