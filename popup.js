let greeting = document.getElementById('greeting');

var date = new Date();

chrome.storage.local.get('lang', function(data) {
	let time = date.getHours();
	let text;
	for (entry of data.lang.greetings) {
		if (time >= entry.from && time < entry.to) {
			text = entry.text;
			break;
		}
	}
	greeting.innerText = text;
});