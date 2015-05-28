Parse.initialize("AExU8zqOb8xQlqLVykAzD3CyD2YfQmzJM41lOyj7", "lqsaTVz8JWchE92g8GDbGb6SzfrKmJaKOqIiFTeK");

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