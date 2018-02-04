
function trendSearch(keyword, geo, time) {
    var explorQuery = "q=" + keyword + "geo=" + geo + "&date=" + time;
    trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":keyword,"geo":geo,"time":time}],"category":0,"property":""}, {"exploreQuery":explorQuery,"guestPath":"https://trends.google.com:443/trends/embed/"});
}

function getThresholds(dict) {
    var queryDict = {"keywords":[dict, dict]};
    var queryJson = JSON.stringify(queryDict);
    var callback = function () {
        
    };
    httpPostAsync(requestHost + "/trends/searchThresholdsByKeywords", queryJson, callback)
}

function getKeywordsToRefreshTableInSearchPage() {
    var callback = function (result) {
        top.keyArr = result["keywords"];
        if (isArray(top.keyArr)) {
            for (var i=0;i<top.keyArr.length;i++) {
                var keyDict = top.keyArr[i];
                appendOneRowInSearchPage(i, keyDict);
            }
        }
    };
    httpGetAsync(requestHost + "/trends/getKeywords", callback)
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

    var operation_btn = document.createElement("input");
    operation_btn.name = "operation_btn";
    operation_btn.type = "button";
    operation_btn.value = "展开";
    operation_btn.id = "operation_" + i;
    operation_btn.onclick = operationBtnAction;

    var operation_btn_div = document.createElement("div");
    operation_btn_div.className = "btn_box floatR";
    operation_btn_div.appendChild(operation_btn);

    var keywordRow = document.createElement("tr");
    keywordRow.appendChild(keywordCell);
    keywordRow.appendChild(regionCell);
    keywordRow.appendChild(durationCell);
    keywordRow.appendChild(intervalCell);
    keywordRow.appendChild(operation_btn_div);

    var thresholdsDescCell = document.createElement("td");
    thresholdsDescCell.innerText = "阈值";

    var thresholdsCell = document.createElement("td");
    thresholdsCell.colSpan = "3";
    thresholdsCell.align = "center";
    thresholdsCell.innerText = "111";

    var thresholdsRow = document.createElement("tr");
    thresholdsRow.id = "thresholdsRow_" + i;
    thresholdsRow.style = "display:none;";
    thresholdsRow.appendChild(thresholdsDescCell);
    thresholdsRow.appendChild(thresholdsCell);

    var trendsCell = document.createElement("td");
    var trendsCellId = "trendsCell_" + i;
    trendsCell.id = trendsCellId;
    trendsCell.colSpan = "5";

    // var newScript = document.createElement("script");
    // newScript.type = "text/javascript";
    // newScript.text = "trends.embed.renderExploreWidget(\"TIMESERIES\", {\"comparisonItem\":[{\"keyword\":\"qishan\",\"geo\":\"\",\"time\":\"now 4-H\"}],\"category\":0,\"property\":\"\"}, {\"exploreQuery\":\"date=now%204-H&q=qishan\",\"guestPath\":\"https:\/\/trends.google.com:443/trends/embed\/\"});";
    // trendsCell.appendChild(newScript);

    // var html = '<div>html</div><script>alert(1);<\/script>';
    // var cont = document.getElementById('cont');
    // trendsCell.innerHTML = trendHtml;
    // var oldScript = trendsCell.getElementsByTagName('script')[0];
    // trendsCell.removeChild(oldScript);
    // var scriptText = oldScript.innerHTML;
    // eval(scriptText);



    var trendsRow = document.createElement("tr");
    trendsRow.id = "trendsRow_" + i;
    trendsRow.style = "display:none;";
    trendsRow.appendChild(trendsCell);

    var search_table = document.getElementById("search_table");
    search_table.appendChild(keywordRow);
    search_table.appendChild(thresholdsRow);
    search_table.appendChild(trendsRow);

}

function operationBtnAction(event) {
    var target = event.target || event.srcElement;
    var arr = target.id.split("_");
    var index = arr[arr.length - 1];
    top.currentKeyDict = top.keyArr[parseInt(index)];
    location.replace("sub_search.html");
    // var currentThresholdsRow = $("#thresholdsRow_"+index);
    // if (currentThresholdsRow.is(":hidden")) {
    //     currentThresholdsRow.show();
    // } else {
    //     currentThresholdsRow.hide();
    // }
    // var currentTrendsRow = $("#trendsRow_"+index);
    //
    // if (currentTrendsRow.is(":hidden")) {
    //
    //     // var trendsCellId = "trendsCell_" + index;
    //     // var currentTrendsCell = $("#trendsCell_"+index);
    //     // alert("another");
    //     // var trendScript = "trends.embed.renderExploreWidget(\"TIMESERIES\", {\"comparisonItem\":[{\"keyword\":\"qishan\",\"geo\":\"\",\"time\":\"now 4-H\"}],\"category\":0,\"property\":\"\"}, {\"exploreQuery\":\"date=now%204-H&q=qishan\",\"guestPath\":\"https:\/\/trends.google.com:443/trends/embed\/\"});";
    //     // var trendHtml = "<td id='trendsCell_0'><script type='text/javascript'>"+trendScript+"<\/script><\/td>";
    //     // currentTrendsCell.html(trendHtml);
    //     // var oldScript = currentTrendsCell.getElementsByTagName('script')[0];
    //     // currentTrendsCell.removeChild(oldScript);
    //     // var scriptText = oldScript.innerHTML;
    //     // eval(scriptText);
    //     currentTrendsRow.show();
    // } else {
    //     currentTrendsRow.hide();
    // }
}

function appendSubSearchRow() {

    var keyDict = top.currentKeyDict;
    var keywordCell = document.getElementById("word");
    keywordCell.innerText = keyDict["word"];

    var regionCell = document.getElementById("region");
    regionCell.innerText = keyDict["region"];

    var durationCell = document.getElementById("duration");
    durationCell.innerText = keyDict["duration"];

    var intervalCell = document.getElementById("interval");
    intervalCell.innerText = keyDict["interval"];
}

function getback() {
    location.replace("search.html");
}
