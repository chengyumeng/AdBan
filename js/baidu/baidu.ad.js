function doSimpleBlock() {
    chrome.storage.sync.get({rightAd: true,leftAd: true,speedBlock:true}, function (items) {
        if (items.rightAd === true ) {
            $("#content_right").remove();
            $(".rrecom-btn-close").click(function () {
                alert("点击了");
            });
        }
        if (items.leftAd === true ) {
            $("[data-tuiguang]").parentsUntil("#content_left").remove();
            $(".m:contains('广告')").parentsUntil("#content_left").remove();
        }
        if (items.speedBlock === true) {
            // 我还没想好怎么实现
        }
    });
}

function doTuiguangBlock() {
    chrome.storage.sync.get({hardClean: true}, function (items) {
        if (items.hardClean == true) {
            document.getElementById('content_left').addEventListener("DOMNodeInserted", function(){
                doSimpleBlock();
            }, false);

            document.getElementById('content_right').addEventListener("DOMNodeInserted", function(){
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
            var keyword = $("#kw").val();
            var keywordconvert = keyword.replace(/#/g, "%23").replace(/&/g, "%26").replace(/\+/g, "%2B");
            if (anonymity == true) {
                chrome.runtime.sendMessage({greeting: "cleanCookies"}, function(response) {
                    //
                });
            }
            location.href = "https://www.baidu.com/s?ie=utf-8&wd=" + keywordconvert;
            doSimpleBlock();
            doTuiguangBlock();
        }
    }
    document.onclick = function (ev) {
        if (ev.target.id === "su") {
            var keyword = $("#kw").val();
            var keywordconvert = keyword.replace(/#/g, "%23").replace(/&/g, "%26").replace(/\+/g, "%2B");
            if (anonymity == true) {
                chrome.runtime.sendMessage({greeting: "cleanCookies"}, function(response) {
                    //
                });
            }
            location.href = "https://www.baidu.com/s?ie=utf-8&wd=" + keywordconvert;
            doSimpleBlock();
            doTuiguangBlock();
            return
        }
        if (ev.target.className == "pc" && ev.target.innerHTML.length > 0) {
            var keyword = $("#kw").val();
            var keywordconvert = keyword.replace(/#/g, "%23").replace(/&/g, "%26").replace(/\+/g, "%2B");
            if (anonymity == true) {
                chrome.runtime.sendMessage({greeting: "cleanCookies"}, function(response) {
                    //
                });
            }
            var pn = (ev.target.innerHTML -1) * 10
            location.href = "https://www.baidu.com/s?ie=utf-8&wd=" + keywordconvert + "&pn=" + pn;
            doSimpleBlock();
            doTuiguangBlock();
            return
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
    chrome.storage.sync.get({baidu: false}, function (items) {
        if (items.baidu == false ){
            return
        } else {
            doKeyEvent();
            doSimpleBlock();
            doTuiguangBlock();
        }
    });

})