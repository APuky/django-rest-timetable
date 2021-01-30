from django.urls import path
from . import views

urlpatterns = [
	path('api/Machine',views.MachineListCreate.as_view()),
	path('api/Order',views.OrderListCreate.as_view()),
]