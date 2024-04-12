from django.urls import path
from . import views

# from .views import ProcessImageView

urlpatterns = [
    path("hello-world/", views.hello_world, name="hello_world"),
    path("process/", views.process, name="process"),
]
