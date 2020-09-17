from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.db import IntegrityError

from .models import User, Order

# Templates
login_register_url = "orders/login-register.html"
index_url = "orders/index.html"
manage_order_url = "orders/check-orders.html"
compose_shipment_url = "orders/compose-shipment.html"
compose_promo_url = "orders/compose-promo.html"
compose_product_url = "orders/compose-product.html"
process_order_url = "orders/process-orders.html"

def index(request):
    return render(request, index_url)

def manage_orders(request):
    return render(request, manage_order_url)

def compose_shipment(request):
    return render(request, compose_shipment_url)

def compose_promo(request):
    return render(request, compose_promo_url)

def compose_product(request):
    return render(request, compose_product_url)

def process_order(request):
    return render(request, process_order_url)

@require_http_methods("POST")
def check_login(request):
    # Attempt to sign user in
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    # Check if authentication successful
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, login_register_url, {
            "message": "Invalid username and/or password.",
        })


def login_view(request):
    return render(request, login_register_url)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))

@require_http_methods("POST")
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, login_register_url, {
                "message": "Passwords must match.",
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, login_register_url, {
                "message": "Username already taken.",
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, login_register_url, )
