function getKeywordsToRefreshTableInSearchPage() {
    var callback = function (result) {
        var keywords = result["keywords"];
        if (isArray(keywords)) {
            for (var i=0;i<keywords.length;i++) {
                appendOneRowInSearchPage(i);
            }
        }
    };
    httpGetAsync(requestHost + "/trends/getKeywords", callback)
}

function appendOneRowInSearchPage(i) {
    var keywordCell = document.createElement("td");
    keywordCell.innerText = "China";

    var regionCell = document.createElement("td");
    keywordCell.innerText = "China";

    var durationCell = document.createElement("td");
    durationCell.innerText = "China";

    var intervalCell = document.createElement("td");
    intervalCell.innerText = "China";

    var operation_btn = document.createElement("input");
    operation_btn.name = "operation_btn";
    operation_btn.type = "button";
    operation_btn.value = "展开";
    // operation_btn.onclick = ;

    var operation_btn_div = document.createElement("div");
    operation_btn_div.className = "btn_box floatR";
    operation_btn_div.appendChild(operation_btn);

    var currentRow = document.createElement("tr");
    currentRow.appendChild(keywordCell);
    currentRow.appendChild(regionCell);
    currentRow.appendChild(durationCell);
    currentRow.appendChild(intervalCell);
    currentRow.appendChild(operation_btn_div);

    var searchTabel = document.getElementById("search_table");
    searchTabel.appendChild(currentRow);
}
