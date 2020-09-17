(function ($) {
 "use strict";

	$("body").on("click", "[data-ma-action]", function(e) {
        e.preventDefault();
        var $this = $(this),
            action = $(this).data("ma-action");
        switch (action) {
            case "nk-login-switch":
                var loginblock = $this.data("ma-block"),
                    loginParent = $this.closest(".nk-block");
                loginParent.removeClass("toggled"), setTimeout(function() {
                    $(loginblock).addClass("toggled")
                });
                break;
				case "print":
                window.print();
                break;
        }
    });

})(jQuery);

// // get any messages and alert user
// document.addEventListener("DOMContentLoaded", function () {
//     var message = document.querySelector("#message").value;
//     if (message.length != 0) {
//         alert(message);
//     }
// });

// insert enter keyup for login page
$("#password, #username").keyup(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit_login();
        return false;
    }
});

// insert enter keyup for register page
$("#register_username, #register_email, #register_password, #confirm_password").keyup(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit_register();
        return false;
    }
});

function submit_login() {
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    var csrfmiddlewaretoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value
    if ((username.length == 0) || (password.length == 0)) {
        alert("Username or password missing");
    } else {
        var form = document.createElement("form");
        form.setAttribute('method', 'POST');
        form.setAttribute('action', '/check_login/');
        document.body.appendChild(form);
        // username
        var i = document.createElement("input");
        i.setAttribute('name', 'username');
        i.setAttribute('value', username);
        form.appendChild(i);
        // password
        var i = document.createElement("input");
        i.setAttribute('name', 'password');
        i.setAttribute('value', password);
        form.appendChild(i);
        // create csrf
        var i = document.createElement("input");
        i.setAttribute('name', 'csrfmiddlewaretoken');
        i.setAttribute('value', csrfmiddlewaretoken);
        form.appendChild(i);
        console.log(form);
        form.submit();
    }
}
function submit_register() {
    const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var register_username = document.querySelector('#register_username').value;
    var register_password = document.querySelector('#register_password').value;
    var confirm_password = document.querySelector('#confirm_password').value;
    var register_email = document.querySelector('#register_email').value;
    var csrfmiddlewaretoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value
    if ((register_username.length == 0) || (register_password.length == 0)) {
        alert("Username or password missing");
        return false;
    }
    if (confirm_password.length == 0) {
        alert("Please confirm your password by entering it again");
        return false;
    }
    if (register_email.length == 0) {
        alert("Please enter your email");
        return false;
    }
    if (!email_pattern.test(register_email)) {
        alert("Please enter a valid email");
        return false;
    }
    if ((register_password != confirm_password)) {
        alert("Password confirmation are not the same!");
        return false;
    }
    var form = document.createElement("form");
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '/register/');
    document.body.appendChild(form);
    // username
    var i = document.createElement("input");
    i.setAttribute('name', 'username');
    i.setAttribute('value', register_username);
    form.appendChild(i);
    // password
    var i = document.createElement("input");
    i.setAttribute('name', 'password');
    i.setAttribute('value', register_password);
    form.appendChild(i);
    // confirmation
    var i = document.createElement("input");
    i.setAttribute('name', 'confirmation');
    i.setAttribute('value', confirm_password);
    form.appendChild(i);
    // Email
    var i = document.createElement("input");
    i.setAttribute('name', 'email');
    i.setAttribute('value', register_email);
    form.appendChild(i);
    // create csrf
    var i = document.createElement("input");
    i.setAttribute('name', 'csrfmiddlewaretoken');
    i.setAttribute('value', csrfmiddlewaretoken);
    form.appendChild(i);
    console.log(form);
    form.submit();

}
