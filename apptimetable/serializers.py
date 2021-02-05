from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model = Order
		fields =('id', 'order_name','client','order_quantity','machine_name','start_date','end_date')

