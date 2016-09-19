function getForecastXML() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			getForecast(this.responseText);
		}
	};
	xhttp.open("GET", "http://forecast.weather.gov/MapClick.php?lat=36.9737&lon=-86.4412&unit=0&lg=english&FcstType=dwml", true);
	xhttp.send();
}

function getForecast(xmlText){	
	// console.log(xmlText);
	var xmlDoc = $.parseXML(xmlText);
	var x; //generic term that will be reused for work;

	var time14 = [];
	var timeDay = []
	var timeNight = [];
	x = xmlDoc.getElementsByTagName("time-layout");
	for (var i = x.length - 1; i >= 0; i--) {
		if (x[i].children[0].innerHTML == "k-p12h-n13-1") {
				for (var j = 1; j < x[i].children.length; j++) {
					time14.push(x[i].children[j].getAttribute("period-name"));
				}
		} else if (x[i].children[0].innerHTML == "k-p12h-n14-1") {
				for (var j = 1; j < x[i].children.length; j++) {
					time14.push(x[i].children[j].getAttribute("period-name"));
				}
		}
	}
	for (var i = x.length - 1; i >= 0; i--) {
		var check = x[i].children[1].getAttribute("period-name");
		console.log(check);
		if (x[i].children[0].innerHTML == "k-p24h-n7-1" && !check.includes("night") && !check.includes("Night")) {
				for (var j = 1; j < x[i].children.length; j++) {
					timeDay.push(x[i].children[j].getAttribute("period-name"));
				}
		} else if (x[i].children[0].innerHTML == "k-p24h-n7-2" && !check.includes("night") && !check.includes("Night")) {
				for (var j = 1; j < x[i].children.length; j++) {
					timeDay.push(x[i].children[j].getAttribute("period-name"));
				}
		}
	}
	for (var i = x.length - 1; i >= 0; i--) {
		var check = x[i].children[1].getAttribute("period-name");
		if (x[i].children[0].innerHTML == "k-p24h-n6-2" && (check.includes("night") || check.includes("Night"))) {
				for (var j = 1; j < x[i].children.length; j++) {
					timeNight.push(x[i].children[j].getAttribute("period-name"));
				}
		} else if (x[i].children[0].innerHTML == "k-p24h-n7-1" && (check.includes("night") || check.includes("Night"))) {
				for (var j = 1; j < x[i].children.length; j++) {
					timeNight.push(x[i].children[j].getAttribute("period-name"));
				}
		}
	}
	console.log(time14);
	console.log(timeDay);
	console.log(timeNight);


	var weather = [];
	x = xmlDoc.getElementsByTagName("weather");
	for (var i = x.length - 1; i >= 0; i--) {
		if (x[i].getAttribute("time-layout") == "k-p12h-n13-1") {
			for (var j = 1; j < x[i].children.length; j++) {
				weather.push(x[i].children[j].getAttribute("weather-summary"));
			}
		} else if (x[i].getAttribute("time-layout") == "k-p12h-n14-1") {
			for (var j = 1; j < x[i].children.length; j++) {
				weather.push(x[i].children[j].getAttribute("weather-summary"));
			}
		}
	}
	console.log("");
	console.log("Weather:");
	console.log(weather);

	// for (var i = 0; i < weather.length; i++) {
	// 	$("#demo").append(time14[i] + " will be " + weather[i]);
	// 	$("#demo").append("<br><br>");
	// }
	
	// console.log(xmlDoc);
}