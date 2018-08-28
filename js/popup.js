function reload(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "reload"}, function(response) {
        });
    });
}

chrome.storage.sync.get({leftAd:true,rightAd: true, anonymity: true, speedBlock:true,hardClean: true,baidu:true,qihoo:true}, function (items) {
    for(key in items ) {
        console.log(key + items[key]);
        document.getElementById(key).checked = items[key];
        var jsonfile = {};
        jsonfile[key] = items[key]
        chrome.storage.sync.set(jsonfile, function () {
            console.log('保存成功！' + key + items[key]);
        });
    }
    boxs = document.getElementsByClassName('box')
    for (var i=0; i < boxs.length; i++) {
        boxs[i].onclick = function(e){
            key = e.srcElement['value'];
            checked = e.srcElement['checked'];
            var jsonfile = {};
            jsonfile[key] = checked
            chrome.storage.sync.set(jsonfile, function () {
                console.log('保存成功！' + jsonfile);
            });
            reload();
        }
    };
});

$(document).ready(function() {
    $("#donate").click(function () {
        if ($("#zhifubaoimg").hasClass("hidden")) {
            $("#zhifubaoimg").removeClass("hidden");
        } else {
            $("#zhifubaoimg").addClass("hidden");
        }
    });
});