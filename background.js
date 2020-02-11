chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.get('persona', function(data) {
		if (typeof data.persona === 'undefined') {
			chrome.storage.sync.set({persona: 'default'}, function() {
				loadPersona();
			});
		} else {
			loadPersona();
		}
	});
});

function loadPersona() {
	chrome.storage.sync.get('persona', function(data) {
		loadJSON('personas/'+data.persona+'/'+chrome.i18n.getUILanguage()+'.json', function(response) {
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