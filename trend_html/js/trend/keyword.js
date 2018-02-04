function getKeywordsToRefreshTableInKeywordPage() {
    var callback = function (result) {
        var keywords = result["keywords"];
        if (isArray(keywords)) {
            for (var i=0;i<keywords.length;i++) {
                appendOneFixedRowInKeywordPage(i, keywords[i]);
            }
            top.keyArr = keywords;
        }
    };
    httpGetAsync(requestHost + "/trends/getKeywords", callback)
}

function appendOneFixedRowInKeywordPage(i, keyDict) {
    var keyword = keyDict["word"];
    var region = keyDict["region"];
    var duration = keyDict["duration"];
    var interval = keyDict["interval"];

    // var keywordInput = document.createElement("input");
    // keywordInput.type = "text";
    // keywordInput.name = "keyword_input";
    // keywordInput.value = keyword;
    var keywordCell = document.createElement("td");
    keywordCell.className = "keyword_input";
    keywordCell.innerText = keyword;

    // var regionInput = document.createElement("input");
    // regionInput.type = "text";
    // regionInput.name = "region_select";
    // regionInput.value = region;
    var regionCell = document.createElement("td");
    regionCell.className = "region_select";
    regionCell.innerText = region;

    // var durationInput = document.createElement("input");
    // durationInput.type = "text";
    // durationInput.name = "duration_select";
    // durationInput.value = duration;
    var durationCell = document.createElement("td");
    durationCell.className = "duration_select";
    durationCell.innerText = duration;

    // var intervalInput = document.createElement("input");
    // intervalInput.type = "text";
    // intervalInput.name = "duration_select";
    // intervalInput.value = interval;
    var intervalCell = document.createElement("td");
    intervalCell.className = "interval_select";
    intervalCell.innerText = interval;

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

    var queryTable = document.getElementById("key_table");
    queryTable.appendChild(currentRow);
}

function appendOneRowInKeywordPage(i, keyDict) {
    var keywordValue = keyDict["word"];
    var region = keyDict["region"];
    var duration = keyDict["duration"];
    var interval = keyDict["interval"];

    var keywordInput = document.createElement("input");
    keywordInput.type = "text";
    keywordInput.name = "keyword_input";
    keywordInput.value = keywordValue;
    var keywordCell = document.createElement("td");
    keywordCell.append(keywordInput);

    var regionOption1 = document.createElement("option");
    regionOption1.value = region;
    regionOption1.text = region;
    var regionSelect = document.createElement("select");
    regionSelect.style = "width:90px";
    regionSelect.name = "region_select";
    regionSelect.appendChild(regionOption1);
    var regionCell = document.createElement("td");
    regionCell.appendChild(regionSelect);

    var durationOption1 = document.createElement("option");
    durationOption1.value = duration;
    durationOption1.text = duration;
    var durationSelect = document.createElement("select");
    durationSelect.style = "width:90px";
    durationSelect.name = "duration_select";
    durationSelect.appendChild(durationOption1);
    // durationSelect.appendChild(durationOption2);
    var durationCell = document.createElement("td");
    durationCell.appendChild(durationSelect);

    var intervalOption1 = document.createElement("option");
    intervalOption1.value = interval;
    intervalOption1.text = interval;
    var intervalSelect = document.createElement("select");
    intervalSelect.style = "width:90px";
    intervalSelect.name = "interval_select";
    intervalSelect.appendChild(intervalOption1);
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

    var queryTable = document.getElementById("key_table");
    queryTable.appendChild(currentRow);
}

function addRowToKeywordTable(){
    var keyDict = {"word":"", "region":"global", "duration":"4 hours", "interval": "1 minute"};
    var queryTable = document.getElementById("key_table");
    appendOneRowInKeywordPage(queryTable.rows, keyDict);
}

function saveKeywords() {
    var callback = function () {
        location.reload();
    };
    var resultArray = [];

    var keywordInputRows = document.getElementsByClassName("keyword_input");
    var regionSelecRows = document.getElementsByClassName("region_select");
    var durationSelectRows = document.getElementsByClassName("duration_select");
    var intervalSelectRows = document.getElementsByClassName("interval_select");


    for (var j=0;j<keywordInputRows.length;j++) {
        var keywordInputRow = keywordInputRows[j];
        var regionSelectRow = regionSelecRows[j];
        var durationSelectRow = durationSelectRows[j];
        var intervalSelectRow = intervalSelectRows[j];

        var wordValue = keywordInputRow.innerText;
        var regionValue = regionSelectRow.innerText;
        var durationValue = durationSelectRow.innerText;
        var intervalValue = intervalSelectRow.innerText;
        resultArray.push({
            "word": wordValue,
            "region": regionValue,
            "duration": durationValue,
            "interval": intervalValue
        });
    }

    var keywordInputElements = document.getElementsByName("keyword_input");
    var regionSelectElements = document.getElementsByName("region_select");
    var durationSelectElements = document.getElementsByName("duration_select");
    var intervalSelectElements = document.getElementsByName("interval_select");


    for (var i=0;i<keywordInputElements.length;i++) {
        var keywordInput = keywordInputElements[i];
        var regionSelect = regionSelectElements[i];
        var durationSelect = durationSelectElements[i];
        var intervalSelect = intervalSelectElements[i];

        var word_value = keywordInput.value;
        var region_value = regionSelect.options[regionSelect.selectedIndex].value;
        var duration_value = durationSelect.options[durationSelect.selectedIndex].value;
        var interval_value = intervalSelect.options[intervalSelect.selectedIndex].value;
        resultArray.push({
            "word": word_value,
            "region": region_value,
            "duration": duration_value,
            "interval": interval_value
        });
    }
    
    var resultDict = {"keywords":resultArray};

    var resultJson = JSON.stringify(resultDict);

    httpPostAsync(requestHost+"/trends/setKeywords", resultJson, callback);

}

function getKeywordsToSave() {
    var callback = function (result) {
        var keywords = result["keywords"];

        if (isArray(keywords)) {
            top.keyArr = keywords;
        }
    };
    httpGetAsync(requestHost + "/trends/getKeywords", callback)
}

