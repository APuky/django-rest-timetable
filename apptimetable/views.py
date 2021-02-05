from django.shortcuts import render
from .models import Order
from .serializers import OrderSerializer
from rest_framework import generics
# Create your views here.

class OrderListCreate(generics.ListCreateAPIView):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer