var pageLoaded = false;
var path = window.location.pathname;
var page = path.split("/").pop();
var graphData = {'data': {}}
var dataBind = {'metal': getParameter('metal') || 'gold'}
var marketPriceLoaded = false;
var bidPrices = [0,0,0];
var data;
var coinChart;


//Initialization functions: run immediately
loadMyStackJson();
loadQuandl();


/* MIKE LU CODE START */
var finishGraph = function() {
	var options = {
		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,

		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(104, 206, 222, 0.1)",

		//Number - Width of the grid lines
		scaleGridLineWidth : 1,

		//Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines: true,

		//Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines: true,

		scaleLabel: function(label){return '$' + label.value},

		//Boolean - Whether the line is curved between points
		bezierCurve : true,

		//Number - Tension of the bezier curve between points
		bezierCurveTension : 0.4,

		//Boolean - Whether to show a dot for each point
		pointDot : true,

		//Number - Radius of each point dot in pixels
		pointDotRadius : 4,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,

		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 20,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill : true,

		//String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

		responsive: true,

		maintainAspectRatio: false,
	};

	var ctx = document.getElementById("total-chart").getContext("2d");
	coinChart = new Chart(ctx).Line(graphData.data,options);
	coinChart.update();
}

// simple check if market is open. Only checks if outside 930-1600 and if on weekends
function isMarketOpen() {
	console.log('called twice?');
	//13:30 UTC = 9:30 EST
	//20:00 UTC = 16:00 EST
	var openHour = 13;
	var openMin = 30;
	var closeHour = 20;
	var satDay = 6;
	var sunDay = 0;
	var date = new Date();
	var hour = date.getUTCMinutes() == 0 ? 0 : 1
	var closes = '';
	var textAppend = document.createElement('span');
	/* closed if:
		day is sat or sunday
		time is greater than closing hours
	 	less than opening hour
		equal to opening hours but less than opening minutes
	 */
	if (date.getDay() == satDay || date.getDay() == sunDay ||
		date.getUTCHours() >= closeHour ||
		(date.getUTCHours() < openHour) ||
		(date.getUTCHours() == openHour && date.getMinutes() <= openMin)
		){

		textAppend.style.color = '#FF6A65';
		textAppend.appendChild(document.createTextNode('closed'));
		closes = 'opens in ';
		if (date.getDay() == satDay) closes += '1d ';
		else if (date.getDay() == 5) closes += '2d '
		var hoursLeft = date.getUTCHours() >= closeHour ? date.getUTCHours()-20 : date.getUTCHours()+hour;
		closes += (16 - hoursLeft) + 'h' + (60*hour-date.getUTCMinutes()) + 'min';
	} else {
		textAppend.style.color = '#A7FF8B';
		textAppend.appendChild(document.createTextNode('open'));
		closes = 'closes in ' + (closeHour - hour - date.getUTCHours()) + 'h ' + (60*hour-date.getUTCMinutes()) + 'min';
	}

	document.getElementsByClassName('market-open')[0].appendChild(textAppend);
	document.getElementsByClassName('market-time')[0].appendChild(document.createTextNode(closes));
}

function toggleSettings() {
	document.getElementById('settingsBox').style.visibility =
		document.getElementById('settingsBox').style.visibility == 'hidden' ? 'visible' : 'hidden';
}


/* MIKE LU CODE END */
function getParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")).toLowerCase();
}

function todayFormatted() {
	var today = new Date();
	var month = today.getMonth()+1;
	var day = today.getDate();
	if(month < 10) {
		month = "0"+month;
	}
	if(day < 10) {
		day = "0"+day;
	}
	var today_formatted = today.getFullYear()+"-"+month+"-"+day;
	return today_formatted;
}

// purchase_date cannot be past today
function update_purchase_date() {
	var metal = document.getElementById("metal_type");
	metal = metal.options[metal.selectedIndex].value;
	var purchase_date = document.getElementsByName("purchase_date");
	var pDateObj = new Date(purchase_date[0].value);
	var today = new Date();
	if(pDateObj >= today){
		purchase_date[0].value = todayFormatted();
	}
	// quandl only goes back so far...
	else if(purchase_date[0].value < "1990-04-02" && metal == "platinum") {
		purchase_date[0].value = "1990-04-02";
	}
	else if(purchase_date[0].value < "1968-01-02") {
		purchase_date[0].value = "1968-01-02";
	}
	update_unit_price();
}

function update_total() {
	var quantity = document.getElementsByName("quantity");
	var premium = document.getElementsByName("premium");
	var unit_price = document.getElementById("unit_price");
	if(quantity[0].value < 1) {
		quantity[0].value = 1;
	}
	if(premium[0].value < 0.01) {
		premium[0].value = 0.01;
	}
	
	quantity[0].value = Math.floor(quantity[0].value);
	premium[0].value = Number(premium[0].value).toFixed(2);
	unit_price.textContent = Number(unit_price.textContent).toFixed(2);
	var total = (quantity[0].value * (Number(premium[0].value) + Number(unit_price.textContent))).toFixed(2);
	var total_location = document.getElementById("added_val");
	total_location.innerHTML = "<strong>"+total+"</strong>";
		}
		
$(window).load(function() {
	if (pageLoaded) {
		return;
	}
	for (var key in dataBind) {
		if (dataBind.hasOwnProperty(key)) {
			$('.metal').each(function(index) {
				dataBind[key] = dataBind[key].charAt(0).toUpperCase() + dataBind[key].slice(1);
				this.innerHTML = $(this).html().replace('{{'+key+'}}', dataBind[key]);;
			})
		}
	}
	// makes sure data is finished before loading the user's stack
	console.log('window load: ' + jsonFinished);
	if (jsonFinished) {
		loadMyStack(getParameter('metal'));
	}
	// quandl data?
	if (historicPrices == 1) {
	}
	pageLoaded = true;

	// Change {{metal}} to the metal value


	// change the lengend colors for inventory page
	if (page =='home.html') {
		if (historicPrices == 3 && jsonFinished) {
			finishGraph();
		}
	} else if (page =="inventory.html") {
		var legendColor;
		switch (getParameter('metal').toLowerCase()) {
			case 'silver':
				legendColor = 3;
				break;
			case 'platinum':
				legendColor = 2;
				break;
			default:
				legendColor = 1;
		}
		$('.legend-item-color').each(function (index) {
			this.setAttribute('id', 'legend-' + (legendColor + (3 * index)));
		})

		if (historicPrices) {
			loadMetalDaily(getParameter('metal').toLowerCase());
			if (jsonFinished) finishGraph();
		}
	} else if(page == "new.html") {
			//change to current day
		var today_formatted = todayFormatted();
		var purchaseDate = document.getElementsByName("purchase_date");
		purchaseDate[0].value = today_formatted;
		update_unit_price();

	} else if(page == "view.html"){
		var bull_id = getParameter('id');
		//var metal = getParameter('metal');
		loadBullion(bull_id);
	} else if (page == 'user.html') {
		var currUser = Parse.User.current();
		document.getElementById('user_email').innerHTML = currUser.get('username');
	}

	// check if the market is open



	/* * * * * * * * * * * * * *
	 *                         *
	 *        GENERAL          *
	 *                         *
	 * * * * * * * * * * * * * */

	/* MIKE LU CODE HERE: Adding eventListeners to sign-up and login buttons */
	if (document.getElementById('sign-up-button')) {
		document.getElementById("sign-up-button").addEventListener("click", signupPressed, false);
		document.getElementById("log-in-button").addEventListener("click", loginPressed, false);
	}

	if (document.getElementById('settingsBox')) {
		document.getElementsByClassName("icon-cog")[0].addEventListener("click", toggleSettings, false);
		document.getElementById('log-in-button').addEventListener("click", logOutPressed, false);
		document.getElementById('sign-up-button').addEventListener('click', function() { window.location.href = './user.html'}, false);
		// input the current user name
		document.getElementById('currentUser').appendChild(document.createTextNode(Parse.User.current().get('username')));
	}

	if (page == 'home.html') {
		isMarketOpen();
	}


	/* MIKE LU CODE END */

	$('.icon-spinner2').click(function(){
		location.reload();	
	});
	if(page != "new.html")
	{
		$('tr').click(function(){
			$(this).find('a')[0].click();
		});
	}


 	/* FRANKIE CODE: */
 	//Link view.html,new.html back to inventory.html 
 	var get_para = getParameter('metal');
 	if(get_para.length == 0) get_para = "gold";
	var addr = "inventory.html?metal=" + get_para;
	var links = document.getElementsByClassName("return_link");
	if(links){
		for(var i = 0; i < links.length; i++){
			links[i].href = addr;
		}
	}
	//For links directing to new.html in inventory.html, add metal=gold/silver/platinum parameter
	links = document.getElementsByClassName("add_new_coin");
	if(links){
		addr = "new.html?metal=" + get_para;
		for(var i = 0; i < links.length; i++){
				links[i].href = addr;
		}
	}

	//drawGraph();

	/* * * * * * * * * * * * * *
	 *                         *
	 *     MOBILE HANDLING     *
	 *                         *
	 * * * * * * * * * * * * * */

	 $('.mtb-1').click(function(){
	 	$('.graph-panel').removeClass('graph-panel-show');
	 	$('.market-status').fadeIn(0);
	 	$('.market-list').fadeIn(0);
	 	if( page == "inventory.html")
	 		$('.my_stack').fadeIn(0);
	 	$('.mtb-2').removeClass('mobile-toggle-selected');
	 	$('.mtb-1').addClass('mobile-toggle-selected');

	 });

	 $('.mtb-2').click(function(){
	 	$('.market-status').fadeOut(0);
	 	$('.market-list').fadeOut(0);
	 	if( page == "inventory.html")
	 		$('.my_stack').fadeOut(0);
	 	$('.mtb-1').removeClass('mobile-toggle-selected');
	 	$('.mtb-2').addClass('mobile-toggle-selected');
	 	$('.graph-panel').addClass('graph-panel-show');
	 	drawGraph();
	 });

	 var resizer = function(){
	 	winWidth = $(window).width();
	 	winHeight = $(window).height();

	 	if (winWidth > 999){
	 		$('.graph-panel').removeClass('graph-panel-show');
	 		$('.market-status').fadeIn(0);
	 		$('.market-list').fadeIn(0);
	 		if( page == "inventory.html")
	 			$('.my_stack').fadeIn(0);
	 		$('.mtb-2').removeClass('mobile-toggle-selected');
	 		$('.mtb-1').addClass('mobile-toggle-selected');
	 	}
	 };

	 $(window).resize(resizer);


	});
