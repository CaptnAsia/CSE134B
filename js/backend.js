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