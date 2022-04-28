$("#register").submit(function (event) {
    const payload = {
        "name": $("#name").val(),
        "contact": $("#contact").val(),
        "email": $("#email").val(),
        "username": $("#username").val(),
        "password": $("#password").val()
    }

    $.ajax({
        url: "/api/register",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(payload),
        success: function (result) {
            localStorage.setItem("user", JSON.stringify(result));
            location.replace("/home");
        },
        error: function (err) {
            alert(err.responseJSON.message);
        }
    });

    event.preventDefault();
});

$("#addProduct").submit(function (event) {
    const user = JSON.parse(localStorage.getItem('user'));
    const payload = {
        "name": $("#productname").val(),
        "price": $("#price").val(),
        "quantity": $("#qtystock").val(),
        "vendor": $("#vendor").val(),
        "warranty": $("#warranty").val()
    }

    $.ajax({
        url: "/api/product",
        type: "POST",
        dataType: "json",
        headers: {
            'x-access-token': user.access_token
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(payload),
        success: function (result) {
            location.replace("/showreport");
        },
        error: function (err) {
            alert(err.responseJSON.message);
        }
    });

    event.preventDefault();
});

$("#login").submit(function (event) {
    const payload = {
        "username": $("#username").val(),
        "password": $("#password").val()
    }

    $.ajax({
        url: "/api/login",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(payload),
        success: function (result) {
            localStorage.setItem("user", JSON.stringify(result));
            location.replace("/home");
        },
        error: function (err) {
            alert(err.responseJSON.message);
        }
    });

    event.preventDefault();
});

$("#logout").click(function (event) {
    localStorage.removeItem("user");
    location.replace("/login");
});

// Dashboard
$(function () {
    const user = JSON.parse(localStorage.getItem('user'));
    const current_endpoint = $(location).attr('pathname');
    $("#welcomeuser").html(`Welcome ${user.user.name}`);

    if (['/login', '/register'].includes(current_endpoint)) {
        if (localStorage.getItem("user")) {
            location.replace("/home");
        }
        // Show Report
    } else if (current_endpoint === "/showreport") {
        $.ajax({
            url: "/api/product",
            type: 'GET',
            dataType: 'json',
            headers: {
                'x-access-token': user.access_token
            },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                let html = '';
                data.products.forEach(function (product, index) {
                    let row = ` <tr>
                                    <th scope="row">${index+1}</th>
                                    <td contenteditable="false" class="${product._id} name">${product.name}</td>
                                    <td contenteditable="false" class="${product._id} price">${product.price}</td>
                                    <td contenteditable="false" class="${product._id} quantity">${product.quantity}</td>
                                    <td contenteditable="false" class="${product._id} vendor">${product.vendor}</td>
                                    <td contenteditable="false" class="${product._id} warranty">${product.warranty}</td>
                                    <td><a id="${product._id}" class="btn btn-warning btn-sm text-white edit">Edit</a> || <a class="btn btn-danger btn-sm text-white delete" data-id="${product._id}">Delete</a></td>
                </tr>`
                    html += row;
                })
                $("#showProduct").html(html);

                $("#showProduct td a.edit").click(function () {
                    var buttonType = $(this).html();
                    if (buttonType === 'Save') {
                        $(this).html('Edit');
                        $("." + this.id).attr('contenteditable', 'false');

                        const payload = {
                            "name": $("." + this.id + ".name").html(),
                            "price": $("." + this.id + ".price").html(),
                            "quantity": $("." + this.id + ".quantity").html(),
                            "vendor": $("." + this.id + ".vendor").html(),
                            "warranty": $("." + this.id + ".warranty").html()
                        }

                        $.ajax({
                            url: `/api/product/${this.id}`,
                            type: "PUT",
                            dataType: "json",
                            headers: {
                                'x-access-token': user.access_token
                            },
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(payload),
                            success: function (result) {
                                location.replace("/showreport");
                            },
                            error: function (err) {
                                alert("Data Failed to update!");
                            }
                        });
                    } else {
                        $(this).html('Save');
                        $("." + this.id).attr('contenteditable', 'true');
                    }
                });

                $("#showProduct td a.delete").click(function () {
                    var product_id = $(this).attr("data-id");
                    $.ajax({
                        url: `/api/product/${product_id}`,
                        type: "DELETE",
                        dataType: "json",
                        headers: {
                            'x-access-token': user.access_token
                        },
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            location.replace("/showreport");
                        },
                        error: function (err) {
                            alert("Product failed to delete!");
                        }
                    });
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
});