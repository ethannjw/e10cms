from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.login_view, name="login"),
    path('check_login/', views.check_login, name='check_login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('index/', views.index, name="index"),
    path('manage_orders/', views.manage_orders, name="manage_order"),
    path('compose_shipment/', views.compose_shipment, name="compose_shipment"),
    path('compose_promo/', views.compose_promo, name="compose_promo"),
    path('compose_product/', views.compose_product, name="compose_product"),
    path('process_order/', views.process_order, name="process_order"),
]
