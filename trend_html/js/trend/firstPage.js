function getCurrentTime() {
    var callback = function (result) {
        var currentTime = result["currentTime"];
        var timeLabel = document.getElementById("time");
        timeLabel.textContent = currentTime;
    };
    var theUrl = requestHost+"/common/getCurrentTime";
    httpGetAsync(theUrl,callback);
}

function getConnectionStatus() {
    var callback = function (result) {
        var status = result["result"];
        var statusLabel = document.getElementById("status");
        if (parseInt(status) == 0) {
            statusLabel.textContent = "成功";
        } else {
            statusLabel.textContent = "失败";
        }

    };
    var theUrl = requestHost+"/trends/getConnectionStatus";
    httpGetAsync(theUrl,callback);
}

function refreshFirstPage() {
    getCurrentTime();
    getConnectionStatus();
}
