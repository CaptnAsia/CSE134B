Parse.initialize("AExU8zqOb8xQlqLVykAzD3CyD2YfQmzJM41lOyj7", "lqsaTVz8JWchE92g8GDbGb6SzfrKmJaKOqIiFTeK");

var myStackJson;
var historicPrices = 0;
var myGraphData = {'gold': [], 'silver': [], 'platinum': []}
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
        if (results.length === 0) {
        }
        else {
            totalBullionValue = 0;
            for (var i = 0; i < results.length; i++) {
                var bullion = results[i];
                var metal = bullion.get('metal').toLowerCase();
                console.log("Adding metal: " + metal);

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

            if (page === 'home.html' && pageLoaded && historicPrices) {
                //loadTotalDaily();
                makeMyGraph('gold');
                makeMyGraph('silver');
                makeMyGraph('platinum');
                finishGraph();
            }

            // If the page has already loaded then call the loadMyStack function
            if (page === 'inventory.html' && pageLoaded) {

                var metal = getParameter('metal');
                if (metal === '') {
                    metal = 'gold';
                }

                loadPurityHeader(metal);
                loadMyStack(metal);
                if (historicPrices) {
                    console.log('test');
                    makeMyGraph(metal);
                    finishGraph();
                }
            }
        }
        jsonFinished = true;
      },
      error: function(error) {
        //alert("Error: " + error.code + " " + error.message);
      }
    });
}

/* TODO: fix on next release */
function makeMyGraph(metal) {
    if (myStackJson[metal].length == 0) {
        return;
    }
    console.log('adding my ' + metal + 'values to graph');
    //value check and default to gold
    if(metal.length == 0) metal = "gold";
    /*weight*goldprice*purity*/
    myGraphData[metal] = new Array(graphData.data.labels.length);
    for (var i = 0; i < myGraphData[metal].length; i++) {
        myGraphData[metal][i] = null;
    }
    for (var i = 0; i < myStackJson[metal].length; i++) {
        var pDate = myStackJson[metal][i].purchaseDate;
        var j = 0;
        var eDate = new Date(graphData.data.labels[0]);
        if (pDate > eDate) {
            j = graphData.data.labels.indexOf(formatDate(pDate));
        }
        while (j < myGraphData[metal].length) {
            if (!myGraphData[metal][j]) {
                myGraphData[metal][j] = 0;
            }
            var k, d;
            for (k = 0, d = graphData.data.datasets; k < graphData.data.datasets.length; k++) {
                if (d[k].label == ('1ozt'+metal)) {
                    break;
                }
            }
            var value = myStackJson[metal][i].quantity*
                    myStackJson[metal][i].weight*
                    graphData.data.datasets[k].data[j];
            myGraphData[metal][j] += value.toFixed(2);
            j++;
        }
    }
    var graphColor;

    switch (metal) {
        case 'platinum': graphColor = '#FFA859'; break;
        case 'silver': graphColor = '#F3FF88'; break;
        default: graphColor = '#FF6D67'; break;

    }
    graphData.data.datasets.push( {
        label: 'my ' + metal,
        fillColor: "rgba(104, 206, 222, 0.05)",
        strokeColor: graphColor,
        pointColor: graphColor,
        pointStrokeColor: "rgba(255,255,255,0.6)",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#fff",
        data: myGraphData[metal]
    });

}


function formatDate(date) {
    var month = date.getMonth() < 9 ? '0' : '';
    return date.getFullYear() + '-' + month +(date.getMonth()+1) + '-' + date.getDate();
}

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

function loadMyStack(metal) {
    var tbody = document.createElement('tbody');
    var myTable = document.getElementsByClassName('my_stack')[0].firstElementChild  //document.getElementById('my-stack-inventory');

    var bullionStack = myStackJson[metal];
    console.log(bullionStack);
    if (bullionStack.length == 0) {
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


//Ricky's load bullion for view.html
function loadBullion(bullion_id){
    var bullTable = document.getElementsByClassName('coin_detail')[0].firstElementChild;
    var tbody = document.createElement('tbody');
    var Bullion = Parse.Object.extend("Bullion");
    var query = new Parse.Query(Bullion);
    query.containedIn('owner', [Parse.User.current()])
    //query.containedIn('id'.toLowerCase(), [bullion_id])
    query.find({
      success: function(results) {
        //alert(results.length);
        //var bullion = results;
        //if(results.length != 0){
        //alert(bullion);
        //var count =0;
        for(var i = 0; i < results.length; i++){
                //alert(results[0]);
                var bullion = results[i];
                //alert(bullion.id + 'is id');
                //alert(bullion_id + 'is bullion_id');
                var metal = bullion.get('metal');
                //var bullion = myStackJson[metal];
                //for(var x = 0; x < bullion.length; x++){
                    if(bullion.id.toLowerCase() === bullion_id){
                            var metalRow = tbody.insertRow(tbody.rows.length);
                            var metal1 = metalRow.insertCell(metalRow.cells.length); 
                            metal1.appendChild(document.createTextNode('Metal'));
                            var metal2 = metalRow.insertCell(metalRow.cells.length);
                            metal2.appendChild(document.createTextNode(metal));
                            
                            var typeRow = tbody.insertRow(tbody.rows.length);
                            var type1 = typeRow.insertCell(typeRow.cells.length); 
                            type1.appendChild(document.createTextNode('Type'));
                            var type2 = typeRow.insertCell(typeRow.cells.length);
                            type2.appendChild(document.createTextNode(bullion.get('name')));
                            
                            var qtyRow = tbody.insertRow(tbody.rows.length);
                            var qty1 = qtyRow.insertCell(qtyRow.cells.length); 
                            qty1.appendChild(document.createTextNode('Qty.'));
                            var qty2 = qtyRow.insertCell(qtyRow.cells.length);
                            qty2.appendChild(document.createTextNode(bullion.get('quantity')));

                            var purchRow = tbody.insertRow(tbody.rows.length);
                            var purch1 = purchRow.insertCell(purchRow.cells.length); 
                            purch1.appendChild(document.createTextNode('Purchase Date'));
                            var purch2 = purchRow.insertCell(purchRow.cells.length);
                            var date = bullion.get('purchaseDate');
                            date = String(date).split(" ");
                            purch2.appendChild(document.createTextNode(date[1] + ' ' + date[2] + ', ' + date[3]));
                            
                            var PremiumRow = tbody.insertRow(tbody.rows.length);
                            var Premium1 = PremiumRow.insertCell(PremiumRow.cells.length); 
                            Premium1.appendChild(document.createTextNode('Premium'));
                            var Premium2 = PremiumRow.insertCell(PremiumRow.cells.length);
                            Premium2.appendChild(document.createTextNode(bullion.get('premium')));

                            var unitPriceRow = tbody.insertRow(tbody.rows.length);
                            var unitPrice1 = unitPriceRow.insertCell(unitPriceRow.cells.length); 
                            unitPrice1.appendChild(document.createTextNode('Unit Price'));
                            var unitPrice2 = unitPriceRow.insertCell(unitPriceRow.cells.length);
                            //alert(bullion.get('unitPrice'));
                            unitPrice2.appendChild(document.createTextNode(bullion.get('unitPrice')));

                            var purityRow = tbody.insertRow(tbody.rows.length);
                            var purity1 = purityRow.insertCell(purityRow.cells.length); 
                            purity1.appendChild(document.createTextNode(bullion.get('metal') + '%'));
                            var purity2 = purityRow.insertCell(purityRow.cells.length);
                            purity2.appendChild(document.createTextNode(bullion.get('purity')));

                            var weightPerUnitRow = tbody.insertRow(tbody.rows.length);
                            var weightPerUnit1 = weightPerUnitRow.insertCell(weightPerUnitRow.cells.length); 
                            weightPerUnit1.appendChild(document.createTextNode('Weight/unit (g)'));
                            var weightPerUnit2 = weightPerUnitRow.insertCell(weightPerUnitRow.cells.length);
                            var cellData = Number(bullion.get('weight'));
                            weightPerUnit2.appendChild(document.createTextNode(cellData));
                            /*
                            var gramsPerUnitRow = tbody.insertRow(tbody.rows.length);
                            var gramsPerUnit1 = gramsPerUnitRow.insertCell(gramsPerUnitRow.cells.length); 
                            gramsPerUnit1.appendChild(document.createTextNode(bullion.get('metal') + ' g/u'));
                            var gramsPerUnit2 = gramsPerUnitRow.insertCell(gramsPerUnitRow.cells.length);
                            var cellData2 = (Number(bullion.get('weight')) * Number(bullion.get('purity')))/(Number(bullion.get('quantity')));
                            gramsPerUnit2.appendChild(document.createTextNode(cellData2));
                            */
                            var oztPerUnitRow = tbody.insertRow(tbody.rows.length);
                            var oztPerUnit1 = oztPerUnitRow.insertCell(oztPerUnitRow.cells.length); 
                            oztPerUnit1.appendChild(document.createTextNode(bullion.get('metal') + ' ozt/u'));
                            var oztPerUnit2 = oztPerUnitRow.insertCell(oztPerUnitRow.cells.length);
                            var cellData2 = ((Number(bullion.get('weight'))) / 31.1034768).toFixed(5);
                            oztPerUnit2.appendChild(document.createTextNode(cellData2));

                            var totalOztRow = tbody.insertRow(tbody.rows.length);
                            var totalOzt1 = totalOztRow.insertCell(totalOztRow.cells.length); 
                            totalOzt1.appendChild(document.createTextNode('Total au (ozt)'));
                            var totalOzt2 = totalOztRow.insertCell(totalOztRow.cells.length);
                            var cellData3 = ((Number(bullion.get('weight'))) * Number(bullion.get('quantity'))/31.1034768).toFixed(5);
                            totalOzt2.appendChild(document.createTextNode(cellData3));

                            var totalRow = tbody.insertRow(tbody.rows.length);
                            var total1 = totalRow.insertCell(totalRow.cells.length); 
                            total1.appendChild(document.createTextNode('Total'));
                            var total2 = totalRow.insertCell(totalRow.cells.length);
                            var total3 = (Number(bullion.get('premium'))+ Number(bullion.get('unitPrice'))) * Number(bullion.get('quantity'));
                            total2.appendChild(document.createTextNode('$ ' + total3));
                    }   
                //}  
            } 
        //alert(count + 'is count');
        bullTable.appendChild(tbody);   
       },
        error: function(error) {
            //alert("Error: " + error.code + " " + error.message);
        }
    });
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
            //var bullion_id = event.target.parentNode.getAttribute('data-id');
            window.location.href = './view.html?metal=' + getParameter('metal') + '&id=' + event.target.parentNode.getAttribute('data-id');
            //loadBullion(bullion_id);
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
                //alert("Error: " + error.code + " " + error.message);
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
                //alert("Error: " + error.code + " " + error.message);
            }
        });
    }
}

function logOutPressed(event) {
    Parse.User.logOut();
    window.location.href = "./index.html";
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
                date.setDate(date.getDate()+1);
                var dateString = date.getFullYear() + '-' +
                    (date.getMonth() < 9 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '-' +
                    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
                xAxis[offset] = dateString;
                yAxis[offset] = yAxis[offset] ? yAxis[offset] : yAxis[offset-1];
                offset++;

            }
            xAxis[offset] = result.data[i][0];
            yAxis[offset] = result.data[i][1].toFixed(2);
            date.setDate(date.getDate()+1);
            offset++;

        }
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

            if (jsonFinished) {
                if (historicPrices == 3) {
                    makeMyGraph('gold');
                    makeMyGraph('silver');
                    makeMyGraph('platinum');
                } else {
                    makeMyGraph(getParameter('metal'));
                }
                finishGraph();
            }
        }
    }})
}


function saveBullion() {
	var Bullion = Parse.Object.extend("Bullion");
	var bullion = new Bullion();
	
	var purchaseDate = document.getElementsByName("purchase_date");
	var save_date = new Date(purchaseDate[0].value);
	alert(save_date)
	
	var save_input = document.getElementById("metal_type");
	bullion.set("metal", save_input.options[save_input.selectedIndex].text);
	save_input = document.getElementById("coin_type");
	bullion.set("name", save_input.options[save_input.selectedIndex].text);
	
	save_input = document.getElementsByName("premium");
	bullion.set("premium", Number(save_input[0].value));

	save_input = document.getElementsByName("quantity");
	bullion.set("quantity", Number(save_input[0].value));
	
	save_input = document.getElementsByName("unit_price");
	bullion.set("unitPrice", Number(save_input[0].value));
	
	bullion.set("origin", "US");
	bullion.set("owner", Parse.User.current());
	bullion.set("purchaseDate", save_date);
	bullion.set("purity", .85);
	bullion.set("weight", 1.234);

	bullion.save(null, {
	  success: function(bullion) {
		// Execute any logic that should take place after the object is saved.
		alert('New object created with objectId: ' + bullion.id);
	  },
	  error: function(bullion, error) {
		// Execute any logic that should take place if the save fails.
		// error is a Parse.Error with an error code and message.
	  }
	});
}

$(function() {
    $(document).ajaxStop(function() {
        $(this).unbind("ajaxStop"); //prevent running again when other calls finish
    });
});