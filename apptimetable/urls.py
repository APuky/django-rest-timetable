from django.urls import path
from . import views

urlpatterns = [
	path('api/Order',views.OrderListCreate.as_view()),
]