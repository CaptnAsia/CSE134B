Parse.initialize("AExU8zqOb8xQlqLVykAzD3CyD2YfQmzJM41lOyj7", "lqsaTVz8JWchE92g8GDbGb6SzfrKmJaKOqIiFTeK");

var myStackJson;
var historicPrices = 0;
var jsonFinished = false;

function loadMyStackJson() {
    myStackJson = {
        'gold': [],
        'silver': [],
        'platinum': []
    }

    var Bullion = Parse.Object.extend("Bullion");
    var query = new Parse.Query(Bullion);
    query.containedIn('owner', [Parse.User.current()])
    query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " bullions.");

        if (results.length === 0) {
            //alert('My Stack is empty!');
        }
        else {
            totalBullionValue = 0;
            for (var i = 0; i < results.length; i++) {
                var bullion = results[i];
                var metal = bullion.get('metal');

                myStackJson[metal].push({
                    'id': bullion.id,
                    'name': bullion.get('name'),
                    'origin': bullion.get('origin'),
                    'purchaseDate': bullion.get('purchaseDate'),
                    'quantity': bullion.get('quantity'),
                    'premium': bullion.get('premium'),
                    'unitPrice': bullion.get('unitPrice'),
                    'weight': bullion.get('weight'),
                    'purity': bullion.get('purity')
                });
            }
            //alert(JSON.stringify(myStackJson));

            if (page === 'home.html' && pageLoaded) {
                //loadTotalDaily();
            }

            // If the page has already loaded then call the loadMyStack function
            if (page === 'inventory.html' && pageLoaded) {
                var metal = getParameter('metal');
                if (metal === '') {
                    metal = 'gold';
                }

                loadPurityHeader(metal);
                loadMyStack(metal);
                loadTotalValue(metal);
                if (historicPrices) {
                    loadMetalDaily(metal);
                }
            }
        }
          jsonFinished = true;
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
}
function loadMetalDaily(metal) {
    alert(graphData.data.labels['2015-05-28']);
}
/*function loadMetalDaily(metal) {
    var authtoken = 'C5xqJubuHk82paW6ryzH';
    var xmlhttp;
    var dbLink;

    if (window.XMLHttpRequest) {
        xmlhttp= new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var today = new Date();
    var endDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
    today.setMonth(today.getMonth()-1);
    var startDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
    if (metal == 'platinum') {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LPPM/PLAT.json';
    } else if (metal == 'silver') {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LBMA/SILVER.json';
    } else {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LBMA/GOLD.json';
    }

    dbLink += "?trim_start="+startDate+"&trim_end="+endDate+"&auth_token="+authtoken;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myData = JSON.parse(xmlhttp.responseText);
            var bullionStack = myStackJson[metal];
            alert(JSON.stringify(bullionStack));
            var yAxis = new Array(myData.data.length);

            for (var i = (myData.data.length-1); i >= 0; i--) {
                var quandlNextDay = (i === 0)? -1 : Date.parse(myData.data[i - 1][0]);
                var quandlTodayValue = myData.data[i][1];

                if (i === 1) {
                    alert(myData.data[i - 1][0]);
                    alert(quandlNextDay);
                    alert(quandlTodayValue);
                }

                for (var j = 0; j < bullionStack.length; j++) {
                    var entry = bullionStack[j];
                    var entryDate = Date.parse(entry['purchaseDate']);
                    if (i === myData.data.length-1 && j === 0) {
                        alert(entry['purchaseDate']);
                        alert(entryDate);
                    }

                    if (entryDate < quandlNextDay || quandlNextDay === -1) {
                        var amountOzt = (entry['weight'] / 31.1) * entry['quantity'] * entry['purity'];
                        yAxis[myData.data.length - i - 1] += amountOzt * quandlTodayValue;
                    }
                }
            }

            alert(yAxis);
        }
    }
    xmlhttp.open("GET",dbLink);
    xmlhttp.send();
}*/

function loadPurityHeader(metal) {
    var purityHeader = document.getElementById('purity-header');

    switch (metal) {
        case 'gold':
            purityHeader.innerHTML = "% au";
            break;
        case 'silver':
            purityHeader.innerHTML = "% ag";
            break;
        case 'platinum':
            purityHeader.innerHTML = "% pt";
            break;
        default:
            purityHeader.innerHTML = "% au";
    }
}

function loadTotalValue(metal) {
    var myStackTotalValue = document.getElementById('my-stack-total-value');

    var bullionStack = myStackJson[metal];
    var totalBullionValue = 0;

    if (bullionStack.length !== 0) {
        for (var i = 0; i < bullionStack.length; i++) {
            var bullion = bullionStack[i];
            totalBullionValue += bullion['unitPrice'] * bullion['quantity'];
        }
    }
    myStackTotalValue.innerHTML = '$' + totalBullionValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function loadMyStack(metal) {
    var tbody = document.createElement('tbody');
    var myTable = document.getElementsByClassName('my_stack')[0].firstElementChild  //document.getElementById('my-stack-inventory');

    var bullionStack = myStackJson[metal];

    if (bullionStack.length === 0) {
        var newRow = tbody.insertRow(tbody.rows.length);
        var newCell = newRow.insertCell(newRow.cells.length);
        newCell.appendChild(document.createTextNode('None'));
        myTable.appendChild(tbody);
    }
    else {
        for (var i = 0; i < bullionStack.length; i++) {
            var bullion = bullionStack[i];

            var newRow = tbody.insertRow(tbody.rows.length);
            newRow.setAttribute('data-id', bullion.id);

            var image = newRow.insertCell(newRow.cells.length);
            image.className = 'stack_img_col';
            var newElement = document.createElement('div');
            newElement.className ='coin_mini';
            image.appendChild(newElement);

            var name = newRow.insertCell(newRow.cells.length);
            newElement = document.createTextNode(bullion['name']);
            name.appendChild(newElement);

            var quantity = newRow.insertCell(newRow.cells.length);
            quantity.appendChild(document.createTextNode(bullion['quantity']));

            var weight = newRow.insertCell(newRow.cells.length);

            weight.appendChild(document.createTextNode(bullion['weight']));

            var purity = newRow.insertCell(newRow.cells.length);
            purity.appendChild(document.createTextNode(bullion['purity']));

            var value = newRow.insertCell(newRow.cells.length);
            value.appendChild(document.createTextNode('$' + bullion['unitPrice']));
        }
        myTable.appendChild(tbody);
        linkTable();
    }
}

function linkTable() {
    var myStack = document.getElementsByClassName('my_stack')[0].firstElementChild;
    for (var i = 1, row; row = myStack.rows[i]; i++) {
        row.addEventListener("click", function (event) {
            if (window.event) {
                event = window.event;
            }
            var target = event.target ? event.target : event.srcElement;
            //alert(event.target + ' ' + event.target.getAttribute('data-id'));
            window.location.href = './view.html?id=' + event.target.parentNode.getAttribute('data-id');
        }, false);
    }
}

function signupPressed(event) {
    if (window.event) {
        event = window.event;
    }
    var target = event.target ? event.target : event.srcElement;
    if (!target.getAttribute('data-pressed')) {
        document.getElementById('log-in-button').style.display = "none";
        target.previousElementSibling.style.display = "block";
        target.setAttribute('data-pressed', '1');
    } else {
        var newUser = document.forms['sign-up-form'];
        var user = new Parse.User();
        user.set("username", newUser['email'].value);
        user.set("password", newUser['password'].value);
        user.set("email", newUser['email'].value);

        user.signUp(null, {
            success: function(user) {
                alert(user.getEmail() + "signed up");
            },
            error: function (user, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

}

function loginPressed(event) {
    if (window.event) {
        event = window.event;
    }

    var target = event.target ? event.target : event.srcElement;
    if (!target.getAttribute('data-pressed')) {
        document.getElementById('sign-up-button').style.display = "none";
        target.previousElementSibling.style.display = "block";
        target.setAttribute('data-pressed', '1');
    } else {
        var login = document.forms['log-in-form'];
        Parse.User.logIn(login['email'].value, login['password'].value, {
            success: function(user) {
                window.location.href = "./home.html";
            },
            error: function(user, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
}

function logOutPressed(event) {
    Parse.User.logOut();
    window.location.href = "./";
}

function loadQuandl() {
    if (page == 'home.html') {
        getData('gold');
        getData('silver');
        getData('platinum');
    } else if (page == 'inventory.html') {
        getData(getParameter('metal'));
    }
}

function getData(metal) {
    metal = metal.toLowerCase();
    var authtoken = 'C5xqJubuHk82paW6ryzH';
    var dbLink;
    var today = new Date();
    var endDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
    today.setDate(today.getDate()-30);
    var startDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
    if (metal == 'platinum') {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LPPM/PLAT.json';
    } else if (metal == 'silver') {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LBMA/SILVER.json';
    } else {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LBMA/GOLD.json';
    }
    dbLink += "?trim_start="+startDate+"&trim_end="+endDate+"&auth_token="+authtoken;
    $.ajax({url: dbLink, success: function(result) {
        var xAxis = new Array();
        var yAxis = new Array();
        //var date = new Date();
        var offset = 0;
        var date = new Date(result.data[result.data.length-1][0]);
        for (var i = result.data.length-1; i >= 0; i--) {
            var chartDate = new Date(result.data[i][0]);
            while (date < chartDate) {
                var dateString = date.getFullYear() + '-' +
                    (date.getMonth() < 9 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '-' +
                    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
                xAxis[offset] = dateString;
                yAxis[offset] = yAxis[offset] ? yAxis[offset] : yAxis[offset-1];
                date.setDate(date.getDate()+1);
                offset++;
            }
            xAxis[offset] = result.data[i][0];
            yAxis[offset] = result.data[i][1];
            date.setDate(date.getDate()+1);
            offset++;
        }
        console.log(result.data[1][0]);
        if (!graphData.data.labels) graphData.data.labels = xAxis;
        var graphColor;
        if (metal == 'platinum') graphColor = '#BBF5FF';
        else if (metal == 'silver') graphColor = '#C29FFF';
        else graphColor = '#9FFF98';
        if (!graphData.data.datasets) graphData.data.datasets = new Array();
        graphData.data.datasets.push( {
            label: '1ozt' + metal,
            fillColor: "rgba(104, 206, 222, 0.05)",
            strokeColor: graphColor,
            pointColor: graphColor,
            pointStrokeColor: "rgba(255,255,255,0.6)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "#fff",
            data: yAxis
        });
        historicPrices++;
        if (pageLoaded && ((page == 'inventory.html' && historicPrices == 1) ||
            (page == 'home.html' && historicPrices == 3))) {
            finishGraph();
        }
    }})
}
/* var finishGraph = function (xAxis, yAxis, metal) {
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
};*/
/*
function getData(metal) {
    metal = metal.toLowerCase();
    var authtoken = 'C5xqJubuHk82paW6ryzH';
    var xmlhttp;
    var dbLink;
    if (window.XMLHttpRequest) {
        xmlhttp= new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var today = new Date();
    var endDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
    today.setMonth(today.getMonth()-1);
    var startDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
    if (metal == 'platinum') {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LPPM/PLAT.json';
    } else if (metal == 'silver') {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LBMA/SILVER.json';
    } else {
        dbLink = 'http://www.quandl.com/api/v1/datasets/LBMA/GOLD.json';
    }

    dbLink += "?trim_start="+startDate+"&trim_end="+endDate+"&auth_token="+authtoken;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myData = JSON.parse(xmlhttp.responseText);
            var xAxis = new Array(myData.data.length);
            var yAxis = new Array(myData.data.length);
            for (var i = (myData.data.length-1); i >= 0; i--) {
                xAxis[myData.data.length - i - 1] = myData.data[i][0];
                yAxis[myData.data.length - i - 1] = myData.data[i][1];
            }
            finishGraph(xAxis, yAxis, metal);
        }
    }
    xmlhttp.open("GET",dbLink);
    xmlhttp.send();
}*/

function saveBullion() {
	var Bullion = Parse.Object.extend("Bullion");
	var bullion = new Bullion();
	
	var m_type = document.getElementById("metal_type");
	var m_input = m_type.options[m_type.selectedIndex].text;
	var c_type = document.getElementById("coin_type");
	var c_input = c_type.options[c_type.selectedIndex].text;
	var field = document.getElementsByName("premium");
	bullion.set("premium", Number(field[0].value));

	//var field_input = Number(field[0].value);
	field = document.getElementsByName("quantity");
	bullion.set("quantity", Number(field[0].value));
	field = document.getElementsByName("unit_price");
	bullion.set("unit_price", Number(field[0].value));


	
	bullion.set("investment", 1);
	bullion.set("metal", m_input);
	bullion.set("name", c_input);
	bullion.set("origin", "US");
	//bullion.set("owner", "");
	//bullion.set("purchaseDate", "US Eagle");
	bullion.set("purity", .85);
	//bullion.set("quantity", Number(field[0].value));
	//bullion.set("unitPrice", Number(field[0].value));
	bullion.set("weight", 1.234);

	bullion.save(null, {
	  success: function(bullion) {
		// Execute any logic that should take place after the object is saved.
		alert('New object created with objectId: ' + bullion.id);
	  },
	  error: function(bullion, error) {
		// Execute any logic that should take place if the save fails.
		// error is a Parse.Error with an error code and message.
		alert('Failed to create new object, with error code: ' + error.message);
	  }
	});
}

$(function() {
    $(document).ajaxStop(function() {
        $(this).unbind("ajaxStop"); //prevent running again when other calls finish
    });
});