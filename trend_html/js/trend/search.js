function getKeywordsToRefreshTableInSearchPage() {
    if (!top.keyArr || (isArray(top.keyArr) && top.keyArr.length == 0)) {
        var callback = function (result) {
            top.keyArr = result["keywords"];
            if (isArray(top.keyArr)) {
                for (var i=0;i<top.keyArr.length;i++) {
                    var keyDict = top.keyArr[i];
                    appendOneRowInSearchPage(i, keyDict);
                }
                getThresholds(top.keyArr);
            }
        };
        httpGetAsync(requestHost + "/trends/getKeywords", callback)
    } else {
        for (var i=0;i<top.keyArr.length;i++) {
            var keyDict = top.keyArr[i];
            appendOneRowInSearchPage(i, keyDict);
        }
        getThresholds(top.keyArr);
    }
}

function appendOneRowInSearchPage(i, keyDict) {

    // var keywordTh = document.createElement("th");
    // keywordTh.innerText = "关键词";
    //
    // var regionTh = document.createElement("th");
    // regionTh.innerText = "地区";
    //
    // var durationTh = document.createElement("th");
    // durationTh.innerText = "时长";
    //
    // var intervalTh = document.createElement("th");
    // intervalTh.innerText = "间隔";
    //
    // var headerRow = document.createElement("tr");
    // headerRow.appendChild(keywordTh);
    // headerRow.appendChild(regionTh);
    // headerRow.appendChild(durationTh);
    // headerRow.appendChild(intervalTh);

    var keywordCell = document.createElement("td");
    keywordCell.innerText = keyDict["word"];

    var regionCell = document.createElement("td");
    regionCell.innerText = keyDict["region"];

    var durationCell = document.createElement("td");
    durationCell.innerText = keyDict["duration"];

    var intervalCell = document.createElement("td");
    intervalCell.innerText = keyDict["interval"];

    // var operation_btn = document.createElement("input");
    // operation_btn.name = "operation_btn";
    // operation_btn.type = "button";
    // operation_btn.value = "展开";
    // operation_btn.id = "operation_" + i;
    // operation_btn.onclick = operationBtnAction;

    // var operation_btn_div = document.createElement("div");
    // operation_btn_div.className = "btn_box floatR";
    // operation_btn_div.appendChild(operation_btn);

    var keywordRow = document.createElement("tr");
    keywordRow.appendChild(keywordCell);
    keywordRow.appendChild(regionCell);
    keywordRow.appendChild(durationCell);
    keywordRow.appendChild(intervalCell);
    // keywordRow.appendChild(operation_btn_div);

    var thresholdsDescCell = document.createElement("td");
    thresholdsDescCell.innerText = "阈值";

    var thresholdsCell = document.createElement("td");
    thresholdsCell.id = "thresholdsCell_"+i;
    thresholdsCell.colSpan = "4";
    thresholdsCell.align = "center";

    var thresholdsRow = document.createElement("tr");
    thresholdsRow.id = "thresholdsRow_" + i;
    // thresholdsRow.style = "display:none;";
    thresholdsRow.appendChild(thresholdsDescCell);
    thresholdsRow.appendChild(thresholdsCell);


    var search_table = document.getElementById("search_table");
    search_table.appendChild(keywordRow);
    search_table.appendChild(thresholdsRow);
}

function addTrendsDraw(keyarr) {
    // var currentTrendsRow = $("#trendsRow_"+index);
    // var trendsCellId = "trendsCell_" + index;
    // var currentTrendsCell = $("#trendsCell_"+index);

    var currentTrendsCell = document.getElementById("trendsCell_"+index);
    var trendScriptElement = document.createElement("script");
    trendScriptElement.type="text/javascript";
    // trendScriptElement.text =
    currentTrendsCell.appendChild(trendScriptElement);
}

function operationBtnAction(event) {
    var target = event.target || event.srcElement;
    var arr = target.id.split("_");
    var index = arr[arr.length - 1];
    // top.currentKeyDict = top.keyArr[parseInt(index)];
    // location.replace("sub_search.html");

    var currentThresholdsRow = $("#thresholdsRow_"+index);
    if (currentThresholdsRow.is(":hidden")) {
        currentThresholdsRow.show();
    } else {
        currentThresholdsRow.hide();
    }
    var currentTrendsRow = $("#trendsRow_"+index);

    if (currentTrendsRow.is(":hidden")) {

        // var trendsCellId = "trendsCell_" + index;
        // var currentTrendsCell = $("#trendsCell_"+index);
        // alert("another");
        // var trendScript = "trends.embed.renderExploreWidget(\"TIMESERIES\", {\"comparisonItem\":[{\"keyword\":\"qishan\",\"geo\":\"\",\"time\":\"now 4-H\"}],\"category\":0,\"property\":\"\"}, {\"exploreQuery\":\"date=now%204-H&q=qishan\",\"guestPath\":\"https:\/\/trends.google.com:443/trends/embed\/\"});";
        // var trendHtml = "<td id='trendsCell_0'><script type='text/javascript'>"+trendScript+"<\/script><\/td>";
        // currentTrendsCell.html(trendHtml);
        var currentTrendsCell = document.getElementById("trendsCell_"+index);
        // alert(currentTrendsCell);
        var oldScript = document.getElementById('trendsDiv');
        // alert(oldScript);
        // // currentTrendsCell.removeChild(oldScript);
        var scriptText = oldScript.innerHTML;
        alert(scriptText);
        eval(scriptText);
        currentTrendsRow.show();
    } else {
        currentTrendsRow.hide();
    }
}

function refreshDataOnSubSearchPage() {

    var keyDict = top.currentKeyDict;
    var keywordCell = document.getElementById("word");
    keywordCell.innerText = keyDict["word"];

    var regionCell = document.getElementById("region");
    regionCell.innerText = keyDict["region"];

    var durationCell = document.getElementById("duration");
    durationCell.innerText = keyDict["duration"];

    var intervalCell = document.getElementById("interval");
    intervalCell.innerText = keyDict["interval"];

    getThresholds(keyDict);
}

function getThresholds(keywordArr) {
    var queryDict = {"keywords":keywordArr};
    var queryJson = JSON.stringify(queryDict);
    var callback = function (result) {
        var thresholds = result["thresholds"];
        if (isArray(thresholds) && thresholds.length>0) {
            for (var i = 0; i < thresholds.length; i++) {
                var threshold = thresholds[i];
                var thresholdsCell = document.getElementById("thresholdsCell_"+i);
                thresholdsCell.innerText = ""+threshold;
            }
        }
    };
    httpPostAsync(requestHost + "/trends/searchThresholdsByKeywords", queryJson, callback)
}

function getback() {
    location.replace("search.html");
}

function removeUnusedRow() {
    var currentTable = document.getElementById("sub_search_table");
    var tbody = currentTable.lastChild;
    if (top.keyArr && isArray(top.keyArr)) {
        for (var i = 30; i>=top.keyArr.length; i--) {
            var currentKeyRow = document.getElementById("keyRow_"+i);
            var currentThresholdsRow = document.getElementById("thresholdsRow_"+i);
            // var currentTrendsRow = document.getElementById("trendsRow_"+i);

            // tbody.removeChild(currentTrendsRow);
            tbody.removeChild(currentThresholdsRow);
            tbody.removeChild(currentKeyRow);
        }
    } else {
        var trs = currentTable.getElementsByTagName("tr");

        for(var j = trs.length - 1; j > 0; j--) {
            currentTable.deleteRow(j);
        }
    }

}

function basicTrendsDraw(i) {
    if(isArray(top.keyArr) && i < top.keyArr.length) {
        var currentKeyDict = top.keyArr[i];
        trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":currentKeyDict["word"],"geo":"","time":"now 4-H"}],"category":0,"property":""}, {"exploreQuery":"date=now%204-H&q="+currentKeyDict["word"],"guestPath":"https://trends.google.com:443/trends/embed/"});
    }
}

function trendsDraw(i, isForce) {
    alert(i);
    if (isForce) {
        basicTrendsDraw(i)
    } else {
        alert(i);
        var currentThresholdsRow = $("#thresholdsRow_"+i);
        if (!currentThresholdsRow.is(":hidden")) {
            basicTrendsDraw(i);
        }
    }
}

function setIntervalToRefreshTrendsDraw(i) {
    trendsDraw(i,true);
    setInterval(trendsDraw, 1000 * 20, i, false);
}


function refreshDataOnNewSearchPage() {
    removeUnusedRow();
    if (isArray(top.keyArr)) {
        for (var i = 0; i < top.keyArr.length; i++) {
            var keyDict = top.keyArr[i];
            var keywordCell = document.getElementById("word_"+i);
            keywordCell.innerText = keyDict["word"];
            var regionCell = document.getElementById("region_"+i);
            regionCell.innerText = keyDict["region"];
            var durationCell = document.getElementById("duration_"+i);
            durationCell.innerText = keyDict["duration"];

            var intervalCell = document.getElementById("interval_"+i);
            intervalCell.innerText = keyDict["interval"];
        }
        getThresholds(top.keyArr);
    }
}

function unCollapse(event) {
    var target = event.target || event.srcElement;
    var currentKeyRow = target.parentNode.parentNode.parentNode;
    var arr = currentKeyRow.id.split("_");
    var index = arr[arr.length - 1];
    if (target.value == "展开") {
        target.value = "收起";
    } else {
        target.value = "展开"
    }

    var currentThresholdsRow = $("#thresholdsRow_"+index);
    if (currentThresholdsRow.is(":hidden")) {
        currentThresholdsRow.show();
    } else {
        currentThresholdsRow.hide();
    }

    var currentTrendsRow = $("#trendsRow_"+index);
    if (currentTrendsRow.is(":hidden")) {
        currentTrendsRow.show();
    } else {
        currentTrendsRow.hide();
    }
}

function reloadTrendsDraw() {
    var keysNeedToRefresh = [];
    for (var i = 0; i < top.keyArr.length; i++) {

        var currentThresholdsRow = $("#thresholdsRow_"+i);
        if (!currentThresholdsRow.is(":hidden")) {
            keysNeedToRefresh.push(i);
        }
        var currentTrendRow = $("#trendsRow_"+i);
        if (!currentTrendRow.is(":hidden")) {
            var row = document.getElementById("trendsRow_"+i);
            row.location.reload(true);
        }
    }
    if (keysNeedToRefresh.length > 0) {
        getThresholds(top.keyArr);
    }
}

function reloadNewSearchPage() {
    // top.keysNeedToRefresh = [];
    // for (var i = 0; i < top.keyArr.length; i++) {
    //     var thresholdsRow = $("#thresholdsRow_"+i);
    //     if (!thresholdsRow.is(":hidden")) {
    //         top.keysNeedToRefresh.push(i);
    //     }
    // }
    location.reload();
}
function setIntervalToRefrsh() {
    setInterval(reloadNewSearchPage, 1000 * 60);
}

function dispalyStyle() {
    if (isArray(top.keyArr)) {
        for (var i = 0; i < top.keyArr.length; i++) {
            var currentThresholdsRow = document.getElementById("thresholdsRow_"+i);
            var currentTrendsRow = document.getElementById("trendsRow_"+i);
            var btn = document.getElementById("unCollapse_"+i);
            if (top.keysNeedToRefresh && top.keysNeedToRefresh.indexOf(i) != -1) {
                currentThresholdsRow.style = "display: table-row";
                currentTrendsRow.style = "display: table-row";
                btn.value = "收起";
            } else {
                currentThresholdsRow.style = "display: none";
                currentTrendsRow.style = "display: none";
                btn.value = "展开";
            }
        }
    }
}
