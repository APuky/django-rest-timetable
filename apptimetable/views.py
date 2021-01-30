from django.shortcuts import render
from .models import Machine,Order
from .serializers import MachineSerializer, OrderSerializer
from rest_framework import generics
# Create your views here.

class MachineListCreate(generics.ListCreateAPIView):
	queryset = Machine.objects.all()
	serializer_class = MachineSerializer

class OrderListCreate(generics.ListCreateAPIView):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer