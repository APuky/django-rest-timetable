from rest_framework import serializers
from .models import Order,Machine

class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model = Order
		fields =('id', 'order_name','client','order_quantity','start_date','end_date')

class MachineSerializer(serializers.ModelSerializer):
	class Meta:
		model = Machine
		fields =('id', 'machine_name','order_id')
