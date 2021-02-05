from django.db import models

# Create your models here.
class Order(models.Model):
	order_name = models.CharField(max_length=255)
	client = models.CharField(max_length=255)
	order_quantity = models.IntegerField()
	machine_name = models.CharField(max_length=80)
	start_date = models.DateTimeField()
	end_date = models.DateTimeField()