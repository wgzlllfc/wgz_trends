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
        
    };
    var theUrl = requestHost+"/trends/getConnectionStatus";
    httpGetAsync(theUrl,callback);
}
