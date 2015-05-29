Parse.initialize("AExU8zqOb8xQlqLVykAzD3CyD2YfQmzJM41lOyj7", "lqsaTVz8JWchE92g8GDbGb6SzfrKmJaKOqIiFTeK");

var myStackJson;
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

            // If the page has already loaded then call the loadMyStack function
            if (page === 'inventory.html' && pageLoaded) {
                loadMyStack();
            }
        }
          jsonFinished = true;
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
}

function loadMyStack() {
    var tbody = document.createElement('tbody');
    var myTable = document.getElementsByClassName('my_stack')[0].firstElementChild  //document.getElementById('my-stack-inventory');
    var purityHeader = document.getElementById('purity-header');
    var myStackTotalValue = document.getElementById('my-stack-total-value');

    var metal = getParameter('metal');
    if (metal === '') {
        metal = 'gold';
    }

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

    var bullionStack = myStackJson[metal];
    var totalBullionValue = 0;

    if (bullionStack.length === 0) {
        var newRow = tbody.insertRow(tbody.rows.length);
        var newCell = newRow.insertCell(newRow.cells.length);
        newCell.appendChild(document.createTextNode('None'));
        myTable.appendChild(tbody);

        myStackTotalValue.innerHTML = '$0.00';
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

            totalBullionValue += bullion['unitPrice'] * bullion['quantity'];
        }
        myTable.appendChild(tbody);
        linkTable();
    }
    myStackTotalValue.innerHTML = '$' + totalBullionValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    /*
    var Bullion = Parse.Object.extend("Bullion");
    var query = new Parse.Query(Bullion);
    query.equalTo("metal", metal);
    query.find({
      success: function(results) {
        // alert("Successfully retrieved " + results.length + " bullions.");

        if (results.length === 0) {
            tbody.innerHTML = "<tr><td>None<\/td><\/tr>";
            myStackTotalValue.innerHTML = '$0.00';
        }
        else {
            totalBullionValue = 0;
            for (var i = 0; i < results.length; i++) {
                var bullion = results[i];
                var newRow = tbody.insertRow(tbody.rows.length);
                newRow.setAttribute('data-id', bullion.id);
                var newElement;
                var image = newRow.insertCell(newRow.cells.length);
                image.className = 'stack_img_col';
                newElement = document.createElement('div');
                newElement.className ='coin_mini';
                image.appendChild(newElement);

                var name = newRow.insertCell(newRow.cells.length);
                newElement = document.createTextNode(bullion.get('name'));
                name.appendChild(newElement);

                var quantity = newRow.insertCell(newRow.cells.length);
                quantity.appendChild(document.createTextNode(bullion.get('quantity')));

                var weight = newRow.insertCell(newRow.cells.length);

                weight.appendChild(document.createTextNode(bullion.get('weight')));

                var purity = newRow.insertCell(newRow.cells.length);
                purity.appendChild(document.createTextNode(bullion.get('purity')));

                var value = newRow.insertCell(newRow.cells.length);
                value.appendChild(document.createTextNode('$' + bullion.get('unitPrice')));

                totalBullionValue += bullion.get('unitPrice') * bullion.get('quantity');
            }
            myStackTotalValue.innerHTML = '$' + totalBullionValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
          myTable.appendChild(tbody);
          linkTable();
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    */
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
        /*
        */
}

$(function() {
    $(document).ajaxStop(function() {
        $(this).unbind("ajaxStop"); //prevent running again when other calls finish
    });
});