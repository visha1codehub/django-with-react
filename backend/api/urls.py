from django.urls import path
from .views import ItemList

urlpatterns = [
    path('data/', ItemList.as_view(), name='item-list'),  # For GET and POST
    path('data/<int:pk>/', ItemList.as_view(), name='item-detail'),  # For PUT and DELETE
]
