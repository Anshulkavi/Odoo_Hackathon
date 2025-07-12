# from django.urls import path
# from .views import RegisterView, MyProfileView, PublicProfileView, UploadProfilePhoto, GetProfilePhoto
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# # ✅ Define the list before using it
# urlpatterns = [
#     path('signup/', RegisterView.as_view(), name='signup'),
#     path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('me/', MyProfileView.as_view(), name='my-profile'),
#     path('users/<int:id>/', PublicProfileView.as_view(), name='public-profile'),
#     path('upload-photo/', UploadProfilePhoto.as_view(), name='upload-photo'),
#     path('profile-photo/<str:user_id>/', GetProfilePhoto.as_view(), name='get-photo'),
# ]

from django.urls import path
from .views import (
    RegisterView, MyProfileView, PublicProfileView,
    UploadProfilePhoto, GetProfilePhoto, SimpleLoginView
)

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('simple-login/', SimpleLoginView.as_view(), name='simple-login'),  # new
    path('me/', MyProfileView.as_view(), name='my-profile'),
    path('users/<int:id>/', PublicProfileView.as_view(), name='public-profile'),
    path('upload-photo/', UploadProfilePhoto.as_view(), name='upload-photo'),
    path('profile-photo/<str:user_id>/', GetProfilePhoto.as_view(), name='get-photo'),
]
