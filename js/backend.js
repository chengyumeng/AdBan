function removeCookieByDomain(u) {
    chrome.cookies.getAll({url: u}, function(cookies){
        var currentC;
        for(var i=0; i<cookies.length; i++) {
            currentC = cookies[i];
            chrome.cookies.remove({
                "url": u,
                "name":currentC.name
            },function (result) {
                console.log("cookie Removed" + u);
            });
        }
    });

}

function doClearCookie() {
    chrome.storage.sync.get({baidu: false,qihoo:false}, function (items) {
        if (items.baidu === true) {
            removeCookieByDomain('https://www.baidu.com/*');
        }
        if (items.qihoo === true) {
            removeCookieByDomain('https://www.so.com/*');
        }

    });
}

function doBackend() {
    chrome.storage.sync.get({anonymity: false}, function (items) {
        if (items.anonymity === true) {
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse) {
                    if (request.greeting == "cleanCookies") {
                        doClearCookie();
                    }
                    sendResponse({farewell: "goodbye"});
                });
            setInterval(function(){doClearCookie();},1024*1024);
        }
    });
}

doBackend();