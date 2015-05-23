Parse.initialize("AExU8zqOb8xQlqLVykAzD3CyD2YfQmzJM41lOyj7", "lqsaTVz8JWchE92g8GDbGb6SzfrKmJaKOqIiFTeK");

function signupPressed() {
    if (!event.target.getAttribute('data-pressed')) {
        document.getElementById('log-in-button').style.display = "none";
        event.target.previousElementSibling.style.display = "block";
        event.target.setAttribute('data-pressed', '1');
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

function loginPressed() {
    if (!event.target.getAttribute('data-pressed')) {
        document.getElementById('sign-up-button').style.display = "none";
        event.target.previousElementSibling.style.display = "block";
        event.target.setAttribute('data-pressed', '1');
    } else {
        var login = document.forms['log-in-form'];
        Parse.User.logIn(login['email'].value, login['password'].value, {
            success: function(user) {
                window.location.href = "./wire2.html";
            },
            error: function(user, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
}

function getData(metal) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp= new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (metal == 'gold') {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var myData = JSON.parse(xmlhttp.responseText);
                var xAxis = new Array(myData.data.length);
                var yAxis = new Array(myData.data.length);
                for (var i = (myData.data.length-1); i >= 0; i--) {
                    xAxis[myData.data.length - i - 1] = myData.data[i][0];
                    yAxis[myData.data.length - i - 1] = myData.data[i][1];
                }
                finishGraph(xAxis, yAxis);
            }
        }
    }
    xmlhttp.open("GET","https://www.quandl.com/api/v1/datasets/WSJ/AU_EIB.json?trim_start=2015-04-23&trim_end=2015-05-23");
    xmlhttp.send();
        /*
        */
}