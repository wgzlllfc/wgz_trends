/**
 * Created by wgz on 2018/1/28.
 */
function addstep(selectedstep)
{
    if(document.getElementByIdx_x("tr1td").innerHTML=="")
        document.getElementByIdx_x("tr1td").innerHTML=selectedstep;
    else if(document.getElementByIdx_x("tr2td").innerHTML=="")
        document.getElementByIdx_x("tr2td").innerHTML=selectedstep;
    else
        document.getElementByIdx_x("tr3td").innerHTML=selectedstep;
}

function addRowToTable(){
    var queryTabel = document.getElementById("key_table");
    appendOneRowInKeywordPage(queryTabel.rows);
}

function deleteRow(event) {
    var target = event.target || event.srcElement;
    var currentRow = target.parentNode.parentNode;
    currentRow.parentNode.removeChild(currentRow);
}

function getKeywordsToRefreshTableInKeywordPage() {
    keywords = ["test", "test"];
    // var callback = function (result) {
    //     var keywords = result["keywords"];
    //     if (isArray(keywords)) {
            for (var i=0;i<keywords.length;i++) {
                appendOneRowInKeywordPage(i);
            }
    //     }
    // }
    // httpGetAsync("http://google/trends/getKeywords", callback)
}

function getKeywordsToRefreshTableInSearchPage() {
    keywords = ["test", "test"];
    // var callback = function (result) {
    //     var keywords = result["keywords"];
    //     if (isArray(keywords)) {
    for (var i=0;i<keywords.length;i++) {
        appendOneRowInKeywordPage(i);
    }
    //     }
    // }
    // httpGetAsync("http://google/trends/getKeywords", callback)
}

function appendOneRowInKeywordPage(i) {
    var keywordInput = document.createElement("input");
    keywordInput.type = "text";
    keywordInput.name = "keyword_input";
    var keywordCell = document.createElement("td");
    keywordCell.append(keywordInput);

    var regionOption1 = document.createElement("option");
    regionOption1.value = "China";
    regionOption1.text = "中国";
    var regionOption2 = document.createElement("option");
    regionOption2.value = "US";
    regionOption2.text = "美国";
    var regionSelect = document.createElement("select");
    regionSelect.style = "width:90px";
    regionSelect.name = "region_select";
    regionSelect.appendChild(regionOption1);
    regionSelect.appendChild(regionOption2);
    var regionCell = document.createElement("td");
    regionCell.appendChild(regionSelect);

    var durationOption1 = document.createElement("option");
    durationOption1.value = "China";
    durationOption1.text = "中国";
    var durationOption2 = document.createElement("option");
    durationOption2.value = "US";
    durationOption2.text = "美国";
    var durationSelect = document.createElement("select");
    durationSelect.style = "width:90px";
    durationSelect.name = "duration_select";
    durationSelect.appendChild(durationOption1);
    durationSelect.appendChild(durationOption2);
    var durationCell = document.createElement("td");
    durationCell.appendChild(durationSelect);

    var intervalOption1 = document.createElement("option");
    intervalOption1.value = "China";
    intervalOption1.text = "中国";
    var intervalOption2 = document.createElement("option");
    intervalOption2.value = "US";
    intervalOption2.text = "美国";
    var intervalSelect = document.createElement("select");
    intervalSelect.style = "width:90px";
    intervalSelect.name = "duration_select";
    intervalSelect.appendChild(intervalOption1);
    intervalSelect.appendChild(intervalOption2);
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

function saveKeywords() {

    // var queryTabel = document.getElementById("key_table");
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

        var keyword = keywordInput.value;
        var region = regionSelect.options[regionSelect.selectedIndex].value;
        var duration = durationSelect.options[durationSelect.selectedIndex].value;
        var interval = intervalSelect.options[intervalSelect.selectedIndex].value;
        resultArray[i] = [keyword, region, duration, interval];
    }
    httpPostAsync();
    
}

function httpGetAsync(theUrl, callback) {
    $.ajax({
        url:theUrl,
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        success:callback,
        error:function(){
            alert("Error");
        }
    });
}

function httpPostAsync(theUrl, data, callback) {
    $.ajax({
        type: 'POST',
        url: theUrl,
        data: data,
        success: callback,
        dataType: jsonp
    });

}

function isArray(object){
    return Object.prototype.toString.call(object)=='[object Array]';
}