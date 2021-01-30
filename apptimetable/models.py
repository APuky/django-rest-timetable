from django.db import models

# Create your models here.
class Order(models.Model):
	order_name = models.CharField(max_length=255)
	client = models.CharField(max_length=255)
	order_quantity = models.IntegerField()
	start_date = models.DateField()
	end_date = models.DateField()

class Machine(models.Model):
	machine_name = models.CharField(max_length=80)
	order_id = models.ForeignKey(Order, on_delete=models.CASCADE)