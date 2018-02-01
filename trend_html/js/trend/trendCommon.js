/**
 * Created by wgz on 2018/1/28.
 */

var requestHost = "http://47.91.212.95";
// var requestHost = "http://192.168.0.102:8080";

function deleteRow(event) {
    var target = event.target || event.srcElement;
    var currentRow = target.parentNode.parentNode;
    currentRow.parentNode.removeChild(currentRow);
}

function isArray(object){
    return Object.prototype.toString.call(object)=='[object Array]';
}

function httpGetAsync(theUrl, callback) {
    $.ajax({
        url:theUrl,
        type: "GET",
        dataType: "json",
        cache:false,
        success:callback,
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("失败！error");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
            // alert(errorThrown);
        }
    });
}
function httpPostAsync(theUrl, data, callback) {
    $.ajax({
        type: 'POST',
        url: theUrl,
        data: data,
        success: callback,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            // alert("失败！error");
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
            // alert(errorThrown);
        }
    });
}
