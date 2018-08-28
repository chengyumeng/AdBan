function doSimpleBlock() {
    chrome.storage.sync.get({rightAd: true,leftAd: true,speedBlock:true}, function (items) {
        if (items.rightAd === true ) {
            $("#side").remove();
        }
        if (items.leftAd === true ) {
            $("li:contains('广告')").remove();
        }
        if (items.speedBlock === true) {
            // 我还没想好怎么实现
        }
    });
}

function doTuiguangBlock() {
    chrome.storage.sync.get({hardClean: true}, function (items) {
        if (items.hardClean == true) {
            document.getElementById('container').addEventListener("DOMNodeInserted", function(){
                doSimpleBlock();
            }, false);
        }
    });
}

function doKeyEvent(){
    var anonymity = false;
    chrome.storage.sync.get({anonymity: false}, function (items) {
        anonymity = true;
    });

    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter
            var keyword = $("#keyword").val();
            var keywordconvert = keyword.replace(/#/g, "%23").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(" ", "+");
            if (anonymity == true) {
                chrome.runtime.sendMessage({greeting: "cleanCookies"}, function(response) {
                    //
                });
            }
            location.href = "https://www.so.com/s?q=" + keywordconvert;
            doSimpleBlock();
            doTuiguangBlock();
        }
    }
}

$(document).ready(function () {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.greeting == "reload") {
                sendResponse({farewell: "goodbye"});
                window.location.reload();
            }
        });
    chrome.storage.sync.get({qihoo: false}, function (items) {
        if (items.qihoo == false ){
            return
        } else {
            doKeyEvent();
            doSimpleBlock();
            doTuiguangBlock();
        }
    });

})