chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get('langPath', function(data) {
		if (typeof data.langPath === 'undefined') {
			chrome.storage.sync.set({langPath: 'lang/@@ui_locale/default.json'}, function() {
				loadLang();
			});
		} else {
			loadLang();
		}
	});
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({})],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});

function loadLang() {
	chrome.storage.sync.get('langPath', function(data) {
		loadJSON(data.langPath, function(response) {
			chrome.storage.local.set({lang: JSON.parse(response)});
		});
	});
}

function loadJSON(path, callback) {   

	var xobj = new XMLHttpRequest();
    
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}