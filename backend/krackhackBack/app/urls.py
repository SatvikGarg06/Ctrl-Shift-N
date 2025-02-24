from django.urls import path
from .views import SignupView, LoginView,dockerView,deployView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('docker/', dockerView.as_view(), name='docker'),
    path("deploy/",deployView.as_view(),name="deploy")
]
