
var dataBind = {
	'metal': getParameter('metal') || 'gold'
}

function loadTopNav(){
	document.write("    <nav>");
	document.write("        <svg class=\"icon-spinner2\">");
	document.write("            <symbol id=\"icon-spinner2\" viewBox=\"0 0 1024 1024\">");
	document.write("                <title>spinner2<\/title>");
	document.write("                <path class=\"path1\" d=\"M1024 384h-384l143.53-143.53c-72.53-72.526-168.96-112.47-271.53-112.47s-199 39.944-271.53 112.47c-72.526 72.53-112.47 168.96-112.47 271.53s39.944 199 112.47 271.53c72.53 72.526 168.96 112.47 271.53 112.47s199-39.944 271.528-112.472c6.056-6.054 11.86-12.292 17.456-18.668l96.32 84.282c-93.846 107.166-231.664 174.858-385.304 174.858-282.77 0-512-229.23-512-512s229.23-512 512-512c141.386 0 269.368 57.326 362.016 149.984l149.984-149.984v384z\"><\/path>");
	document.write("            <\/symbol>");
	document.write("            <use xlink:href=\"#icon-spinner2\"><\/use>");
	document.write("        <\/svg>");
	document.write("        <a href=\"home.html\">ShinyStack<\/a>");
	document.write("        <svg class=\"icon-cog\">");
	document.write("            <symbol id=\"icon-cog\" viewBox=\"0 0 1024 1024\">");
	document.write("                <title>cog<\/title>");
	document.write("                <path class=\"path1\" d=\"M933.79 610.25c-53.726-93.054-21.416-212.304 72.152-266.488l-100.626-174.292c-28.75 16.854-62.176 26.518-97.846 26.518-107.536 0-194.708-87.746-194.708-195.99h-201.258c0.266 33.41-8.074 67.282-25.958 98.252-53.724 93.056-173.156 124.702-266.862 70.758l-100.624 174.292c28.97 16.472 54.050 40.588 71.886 71.478 53.638 92.908 21.512 211.92-71.708 266.224l100.626 174.292c28.65-16.696 61.916-26.254 97.4-26.254 107.196 0 194.144 87.192 194.7 194.958h201.254c-0.086-33.074 8.272-66.57 25.966-97.218 53.636-92.906 172.776-124.594 266.414-71.012l100.626-174.29c-28.78-16.466-53.692-40.498-71.434-71.228zM512 719.332c-114.508 0-207.336-92.824-207.336-207.334 0-114.508 92.826-207.334 207.336-207.334 114.508 0 207.332 92.826 207.332 207.334-0.002 114.51-92.824 207.334-207.332 207.334z\"><\/path>");
	document.write("            <\/symbol>");
	document.write("            <use xlink:href=\"#icon-cog\"><\/use>");
	document.write("        <\/svg>");
	document.write("	<aside>");
	document.write("		<div id='settingsBox' style=\"visibility: hidden;\"><span id=\"currentUser\"><\/span>");
	document.write("			<span id=\"log-in-button\">Log Out<\/span><\/div>");
	document.write("	<\/aside>");
	document.write("<\/nav>");
}

function loadTopNavPersist(){
	document.write("    <nav style='display: block; visibility: visible;'>");
	document.write("        <svg class=\"icon-spinner2\">");
	document.write("            <symbol id=\"icon-spinner2\" viewBox=\"0 0 1024 1024\">");
	document.write("                <title>spinner2<\/title>");
	document.write("                <path class=\"path1\" d=\"M1024 384h-384l143.53-143.53c-72.53-72.526-168.96-112.47-271.53-112.47s-199 39.944-271.53 112.47c-72.526 72.53-112.47 168.96-112.47 271.53s39.944 199 112.47 271.53c72.53 72.526 168.96 112.47 271.53 112.47s199-39.944 271.528-112.472c6.056-6.054 11.86-12.292 17.456-18.668l96.32 84.282c-93.846 107.166-231.664 174.858-385.304 174.858-282.77 0-512-229.23-512-512s229.23-512 512-512c141.386 0 269.368 57.326 362.016 149.984l149.984-149.984v384z\"><\/path>");
	document.write("            <\/symbol>");
	document.write("            <use xlink:href=\"#icon-spinner2\"><\/use>");
	document.write("        <\/svg>");
	document.write("        <a href=\"home.html\">ShinyStack<\/a>");
	document.write("        <svg class=\"icon-cog\">");
	document.write("            <symbol id=\"icon-cog\" viewBox=\"0 0 1024 1024\">");
	document.write("                <title>cog<\/title>");
	document.write("                <path class=\"path1\" d=\"M933.79 610.25c-53.726-93.054-21.416-212.304 72.152-266.488l-100.626-174.292c-28.75 16.854-62.176 26.518-97.846 26.518-107.536 0-194.708-87.746-194.708-195.99h-201.258c0.266 33.41-8.074 67.282-25.958 98.252-53.724 93.056-173.156 124.702-266.862 70.758l-100.624 174.292c28.97 16.472 54.050 40.588 71.886 71.478 53.638 92.908 21.512 211.92-71.708 266.224l100.626 174.292c28.65-16.696 61.916-26.254 97.4-26.254 107.196 0 194.144 87.192 194.7 194.958h201.254c-0.086-33.074 8.272-66.57 25.966-97.218 53.636-92.906 172.776-124.594 266.414-71.012l100.626-174.29c-28.78-16.466-53.692-40.498-71.434-71.228zM512 719.332c-114.508 0-207.336-92.824-207.336-207.334 0-114.508 92.826-207.334 207.336-207.334 114.508 0 207.332 92.826 207.332 207.334-0.002 114.51-92.824 207.334-207.332 207.334z\"><\/path>");
	document.write("            <\/symbol>");
	document.write("            <use xlink:href=\"#icon-cog\"><\/use>");
	document.write("        <\/svg>");
	document.write("	<aside>");
	document.write("		<div id='settingsBox' style=\"visibility: hidden;\"><span id=\"currentUser\"><\/span>");
	document.write("			<span id=\"log-in-button\">Log Out<\/span><\/div>");
	document.write("	<\/aside>");
	document.write("    <\/nav>");
}

function loadSideNav(selected){
	var metal = getParameter('metal').toLowerCase();
	document.write("    <aside>");
	document.write("        <a href=\"home.html\">");
	if(selected == 0)
		document.write("        <figure class='nav-selected'>");
	else
		document.write("        <figure>");
	document.write("            <br\/>");
	document.write("              <svg class=\"icon-home2\">");
	document.write("                    <symbol id=\"icon-home2\" viewBox=\"0 0 1024 1024\">");
	document.write("                        <title>home2<\/title>");
	document.write("                        <path class=\"path1\" d=\"M426.667 853.333v-256h170.667v256h213.333v-341.333h128l-426.667-384-426.667 384h128v341.333z\"><\/path>");
	document.write("                    <\/symbol>");
	document.write("                    <use xlink:href=\"#icon-home2\"><\/use>");
	document.write("                <\/svg>");
	document.write("");
	document.write("            <figcaption>Home<\/figcaption>");
	document.write("        <\/figure>       ");
	document.write("        <\/a> ");
	document.write("        <a href=\"inventory.html?metal=Gold\">");
	if((selected == 1 && !metal)|| metal == 'gold')
		document.write("        <figure class='nav-selected'>");
	else
		document.write("        <figure>");
	document.write("            Au");
	document.write("            <figcaption>My Gold<\/figcaption>");
	document.write("        <\/figure>       ");
	document.write("        <\/a> ");
	document.write("        <a href=\"inventory.html?metal=Silver\">");
	if(metal == 'silver')
		document.write("        <figure class='nav-selected'>");
	else
		document.write("        <figure>");
	document.write("            Ag");
	document.write("            <figcaption>My Silver<\/figcaption>");
	document.write("        <\/figure>       ");
	document.write("        <\/a> ");
	document.write("        <a href=\"inventory.html?metal=Platinum\">");
	if(metal == 'platinum')
		document.write("        <figure class='nav-selected'>");
	else
		document.write("        <figure>");
	document.write("            Pt");
	document.write("            <figcaption>My Platinum<\/figcaption>");
	document.write("        <\/figure>");
	document.write("        <\/a> ");
	document.write("    <\/aside>");
}

function loadFooter(){
	document.write("    <footer>");
	document.write("        &copy; 2015 Team Bread");
	document.write("    <\/footer> ");

}
var data;
/* MIKE LU CODE START */


var finishGraph = function (xAxis, yAxis, metal) {
	metal = metal.toLowerCase();
	var pointStroke = "rgba(255,255,255,0.6)";
	var pointHighlightFill = "#fff";
	var pointHighlightStroke = "#fff";
	var graphColor;
	if (metal == 'platinum') graphColor = '#BBF5FF';
	else if (metal == 'silver') graphColor = '#C29FFF';
	else graphColor = '#9FFF98';
	data = {
		labels: xAxis,
		datasets: [
			/*{
				label: "Gold Total",
				fillColor: "rgba(104, 206, 222, 0.05)",
				strokeColor: "#FF6D67",
				pointColor: "#FF6D67",
				pointStrokeColor: pointStroke,
				pointHighlightFill: pointHighlightFill,
				pointHighlightStroke: pointHighlightStroke,
				data: yAxis
			},*/
			 {
			 label: "1ozt "+ metal,
			 fillColor: "rgba(104, 206, 222, 0.05)",
			 strokeColor: graphColor,
			 pointColor: graphColor,
			 pointStrokeColor: pointStroke,
			 pointHighlightFill: pointHighlightFill,
			 pointHighlightStroke: pointHighlightStroke,
			 data: yAxis
			 }
		]
	};

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
	var coinChart = new Chart(ctx).Line(data,options);
	coinChart.update();
}

// simple check if market is open. Only checks if outside 930-1600 and if on weekends
function isMarketOpen() {
	//13:30 UTC = 9:30 EST
	//20:00 UTC = 16:00 EST
	var openHour = 13;
	var openMin = 30;
	var closeHour = 20;
	var satDay = 6;
	var sunDay = 0;
	var date = new Date();
	var closes = '';
	var textAppend = document.createElement('span');
	if (date.getDay() == satDay || date.getDay() == sunDay ||
		date.getUTCHours() >= closeHour ||
		(date.getUTCHours() == openHour && date.getMinutes() <= openMin) ||
		(date.getUTCHours() < openHour)){
		var addOn = 0;
		var hour = date.getUTCMinutes() == 0 ? 0 : 1
		textAppend.style.color = '#FF6A65';
		textAppend.appendChild(document.createTextNode('closed'));
		closes = 'opens in ';
		if (date.getUTCDay() == satDay && date.getUTCHours() > 13) closes += '1d ';
		else if (date.getUTCDay() == 5 && date.getUTCHours() > 13) closes += '2d '
		var hoursLeft = date.getUTCHours() >= closeHour ? date.getUTCHours()-20 : date.getUTCHours()+hour;
		closes += (addOn+ 16 - hoursLeft) + 'h' + (60*hour-date.getMinutes()) + 'min';
	} else {
		textAppend.style.color = '#A7FF8B';
		textAppend.appendChild(document.createTextNode('open'));
		closes = 'closes in ' + (closeHour - date.getUTCHours()) + 'h ' + (60*hour-date.getMinutes()) + 'min';
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

var path = window.location.pathname;
var page = path.split("/").pop();

$(window).load(function() {

	loadMyStackJson();

	// Change {{metal}} to the metal value
	for (var key in dataBind) {
		if (dataBind.hasOwnProperty(key)) {
			$('.metal').each(function(index) {
				dataBind[key] = dataBind[key].charAt(0).toUpperCase() + dataBind[key].slice(1);
				this.innerHTML = $(this).html().replace('{{'+key+'}}', dataBind[key]);;
			})
		}
	}

	// change the lengend colors for inventory page
	if (page =="inventory.html") {
		var legendColor;
		switch (getParameter('metal').toLowerCase()) {
			case 'silver': legendColor = 3; break;
			case 'platinum': legendColor = 2; break;
			default: legendColor = 1;
		}
		$('.legend-item-color').each(function (index) {
			this.setAttribute('id', 'legend-'+(legendColor+(3*index)));
		})
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

	 $('tr').click(function(){
	 	$(this).find('a')[0].click();
	 });

	/* * * * * * * * * * * * * *
	 *                         *
	 *        GRAPHING         *
	 *                         *
	 * * * * * * * * * * * * * */
 	// graph for wire2 page
 	var drawGraph = function(){
 		var pointStroke = "rgba(255,255,255,0.6)";
 		var pointHighlightFill = "#fff";
 		var pointHighlightStroke = "#fff";

 		if(page == "home.html") {
 			var data = {
 				labels: ["January", "February", "March", "April", "May", "June", "July"],
 				datasets: [
 				{
 					label: "Gold Total",
 					fillColor: "rgba(104, 206, 222, 0.05)",
 					strokeColor: "#FF6D67",
 					pointColor: "#FF6D67",
 					pointStrokeColor: pointStroke,
 					pointHighlightFill: pointHighlightFill,
 					pointHighlightStroke: pointHighlightStroke,
 					data: [700,820,700,800,730,950,900]
 				},
 				{
 					label: "Platinum Total",
 					fillColor: "rgba(104, 206, 222, 0.05)",
 					strokeColor: "#FFA859",
 					pointColor: "#FFA859",
 					pointStrokeColor: pointStroke,
 					pointHighlightFill: pointHighlightFill,
 					pointHighlightStroke: pointHighlightStroke,
 					data: [467, 555, 490, 550, 555, 560, 660]
 				},
 				{
 					label: "Silver Total",
 					fillColor: "rgba(104, 206, 222, 0.05)",
 					strokeColor: "#F3FF88",
 					pointColor: "#F3FF88",
 					pointStrokeColor: pointStroke,
 					pointHighlightFill: pointHighlightFill,
 					pointHighlightStroke: pointHighlightStroke,
 					data: [200, 350, 300, 389, 330, 400, 488]
 				},
 				{
 					label: "1oz Gold",
 					fillColor: "rgba(104, 206, 222, 0.05)",
 					strokeColor: "#9FFF98",
 					pointColor: "#9FFF98",
 					pointStrokeColor: pointStroke,
 					pointHighlightFill: pointHighlightFill,
 					pointHighlightStroke: pointHighlightStroke,
 					data: [100, 110, 120, 90, 102, 135, 115]
 				},
 				{
 					label: "1oz Platinum",
 					fillColor: "rgba(104, 206, 222, 0.05)",
 					strokeColor: "#BBF5FF",
 					pointColor: "#BBF5FF",
 					pointStrokeColor: pointStroke,
 					pointHighlightFill: pointHighlightFill,
 					pointHighlightStroke: pointHighlightStroke,
 					data: [56, 78, 67, 68, 73, 80, 76]
 				},
 				{
 					label: "1oz Silver",
 					fillColor: "rgba(104, 206, 222, 0.05)",
 					strokeColor: "#C29FFF",
 					pointColor: "#C29FFF",
 					pointStrokeColor: pointStroke,
 					pointHighlightFill: pointHighlightFill,
 					pointHighlightStroke: pointHighlightStroke,
 					data: [20, 22, 20, 32, 35, 50, 40]
 				},
 				]
 			};

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
			var coinChart = new Chart(ctx).Line(data,options);
			coinChart.update();
		}
		else if(page =="inventory.html"){
			getData(getParameter('metal'));
		}
	};





	drawGraph();

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
