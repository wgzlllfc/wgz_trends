function getKeywordsToRefreshTableInKeywordPage() {
    var callback = function (result) {
        var keywords = result["keywords"];
        if (isArray(keywords)) {
            for (var i=0;i<keywords.length;i++) {
                appendOneRowInKeywordPage(i, keywords[i]);
            }
        }
    };
    httpGetAsync(requestHost + "/trends/getKeywords", callback)
}


function appendOneRowInKeywordPage(i, keyDict) {
    var keywordValue = keyDict["word"];
    var region = keyDict["regin"];
    var duration = keyDict["duration"];
    var interval = keyDict[interval];

    var keywordInput = document.createElement("input");
    keywordInput.type = "text";
    keywordInput.name = "keyword_input";
    keywordInput.value = keywordValue;
    var keywordCell = document.createElement("td");
    keywordCell.append(keywordInput);

    var regionOption1 = document.createElement("option");
    regionOption1.value = "global";
    regionOption1.text = "全球";
    // var regionOption2 = document.createElement("option");
    // regionOption2.value = "US";
    // regionOption2.text = "美国";
    var regionSelect = document.createElement("select");
    regionSelect.style = "width:90px";
    regionSelect.name = "region_select";
    regionSelect.appendChild(regionOption1);
    // regionSelect.appendChild(regionOption2);
    var regionCell = document.createElement("td");
    regionCell.appendChild(regionSelect);

    var durationOption1 = document.createElement("option");
    durationOption1.value = "4 hours";
    durationOption1.text = "4小时";
    // var durationOption2 = document.createElement("option");
    // durationOption2.value = "US";
    // durationOption2.text = "美国";
    var durationSelect = document.createElement("select");
    durationSelect.style = "width:90px";
    durationSelect.name = "duration_select";
    durationSelect.appendChild(durationOption1);
    // durationSelect.appendChild(durationOption2);
    var durationCell = document.createElement("td");
    durationCell.appendChild(durationSelect);

    var intervalOption1 = document.createElement("option");
    intervalOption1.value = "1 minute";
    intervalOption1.text = "1分钟";
    // var intervalOption2 = document.createElement("option");
    // intervalOption2.value = "US";
    // intervalOption2.text = "美国";
    var intervalSelect = document.createElement("select");
    intervalSelect.style = "width:90px";
    intervalSelect.name = "interval_select";
    intervalSelect.appendChild(intervalOption1);
    // intervalSelect.appendChild(intervalOption2);
    var intervalCell = document.createElement("td");
    intervalCell.id = "row"+(i+1);
    intervalCell.appendChild(intervalSelect);

    var del_btn = document.createElement("input");
    del_btn.name = "del_btn";
    del_btn.type = "button";
    del_btn.value = "删除";
    del_btn.onclick = deleteRow;

    var del_btn_div = document.createElement("div");
    del_btn_div.className = "btn_box floatR";
    del_btn_div.appendChild(del_btn);

    var currentRow = document.createElement("tr");
    currentRow.appendChild(keywordCell);
    currentRow.appendChild(regionCell);
    currentRow.appendChild(durationCell);
    currentRow.appendChild(intervalCell);
    currentRow.appendChild(del_btn_div);

    var queryTabel = document.getElementById("key_table");
    queryTabel.appendChild(currentRow);
}

function addRowToKeywordTable(){
    var keyDict = {"word":"", "region":"global", "duration":"4 hours", "interval": "1 minute"};
    var queryTabel = document.getElementById("key_table");
    appendOneRowInKeywordPage(queryTabel.rows, keyDict);
}

function saveKeywords() {
    var callback = function () {
        location.reload();
    };

    var keywordInputElements = document.getElementsByName("keyword_input");
    var regionSelectElements = document.getElementsByName("region_select");
    var durationSelectElements = document.getElementsByName("duration_select");
    var intervalSelectElements = document.getElementsByName("interval_select");

    var resultArray=[];

    for (var i=0;i<keywordInputElements.length;i++) {
        var keywordInput = keywordInputElements[i];
        var regionSelect = regionSelectElements[i];
        var durationSelect = durationSelectElements[i];
        var intervalSelect = intervalSelectElements[i];

        var word_value = keywordInput.value;
        var region_value = regionSelect.options[regionSelect.selectedIndex].value;
        var duration_value = durationSelect.options[durationSelect.selectedIndex].value;
        var interval_value = intervalSelect.options[intervalSelect.selectedIndex].value;
        resultArray[i] = {
            "word": word_value,
            "region": region_value,
            "duration": duration_value,
            "interval": interval_value
        };
    }

    var resultDict = {"keywords":resultArray};

    var resultJson = JSON.stringify(resultDict);

    httpPostAsync(requestHost+"/trends/setKeywords", resultJson, callback);

}
