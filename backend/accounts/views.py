# from django.shortcuts import render

# # Create your views here.
# from rest_framework.permissions import AllowAny
# from django.contrib.auth import get_user_model
# from rest_framework.serializers import ModelSerializer
# from rest_framework import generics, permissions
# from .serializers import UserProfileSerializer
# from rest_framework.response import Response
# from rest_framework import status
# from accounts.mongo_models import User
# # from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from django.http import HttpResponse

# User = get_user_model()

# class UserRegisterSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password')
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password']
#         )
#         return user

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserRegisterSerializer
#     permission_classes = [AllowAny]

# # View/Update own profile
# class MyProfileView(generics.RetrieveUpdateAPIView):
#     serializer_class = UserProfileSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_object(self):
#         return self.request.user

# # View public profile of other users
# class PublicProfileView(generics.RetrieveAPIView):
#     queryset = User.objects.filter(is_public=True)
#     serializer_class = UserProfileSerializer
#     permission_classes = [permissions.AllowAny]
#     lookup_field = 'id'


# class UploadProfilePhoto(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         file = request.FILES.get('photo')
#         if not file:
#             return Response({"error": "No photo uploaded"}, status=400)

#         from .mongo_models import User
#         try:
#             user = User.objects.get(username=request.user.username)
#         except User.DoesNotExist:
#             return Response({"error": "User not found"}, status=404)

#         user.profile_photo.replace(file, content_type=file.content_type)  # ✅ use replace
#         user.save()

#         return Response({"message": "Photo uploaded successfully."})


# class GetProfilePhoto(APIView):
#     def get(self, request, user_id):
#         try:
#             user = User.objects.get(id=user_id)
#             if not user.profile_photo:
#                 return Response({"error": "No profile photo"}, status=404)

#             file = user.profile_photo.read()
#             return HttpResponse(file, content_type=user.profile_photo.content_type)
#         except User.DoesNotExist:
#             return Response({"error": "User not found"}, status=404)

from django.http import HttpResponse
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import UserProfileSerializer
from accounts import mongo_models  # Avoid conflicting User model import

# Get the custom user model
User = get_user_model()


# -----------------------------
# User Registration Serializer
# -----------------------------
class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )


# -----------------------------
# Register API
# -----------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]


# -----------------------------
# Login with session (simplified)
# -----------------------------
class SimpleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return Response({"message": "Login successful", "username": user.username})
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# -----------------------------
# Authenticated user’s profile (GET/PUT)
# -----------------------------
class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# -----------------------------
# Public profile view by user ID
# -----------------------------
class PublicProfileView(generics.RetrieveAPIView):
    queryset = User.objects.filter(is_public=True)
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


# -----------------------------
# Upload profile photo (Mongo)
# -----------------------------
class UploadProfilePhoto(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('photo')
        if not file:
            return Response({"error": "No photo uploaded"}, status=400)

        try:
            mongo_user = mongo_models.User.objects.get(username=request.user.username)
        except mongo_models.User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        mongo_user.profile_photo.replace(file, content_type=file.content_type)
        mongo_user.save()

        return Response({"message": "Photo uploaded successfully."})


# -----------------------------
# Get profile photo (Mongo)
# -----------------------------
class GetProfilePhoto(APIView):
    def get(self, request, user_id):
        try:
            user = mongo_models.User.objects.get(id=user_id)
            if not user.profile_photo:
                return Response({"error": "No profile photo"}, status=404)

            file = user.profile_photo.read()
            return HttpResponse(file, content_type=user.profile_photo.content_type)
        except mongo_models.User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
