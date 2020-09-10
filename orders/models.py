from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Order(models.Model):
    SHIPPING_CAT=[
        ('SP', 'Singpost Normal Mail'),
        ('NV', 'Ninjavan'),
        ('QX', 'Qxpress'),
    ]

    order_no = models.CharField(max_length=128)
    status = models.CharField(max_length=128)
    order_time = models.DateTimeField(auto_now_add=True)
    option_code = models.CharField(max_length=128, default="")
    qty = models.DecimalField(max_digits=9, decimal_places=0)
    description = models.TextField()
    recipient = models.CharField(max_length=128)
    mobile = models.CharField(max_length=128)
    address = models.TextField()
    country = models.CharField(max_length=128)
    zipcode = models.CharField(max_length=128)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    shipping = models.CharField(max_length=128, choices=SHIPPING_CAT, default='SP')
    tracking_no = models.CharField(null=True, blank=True, max_length=128)
