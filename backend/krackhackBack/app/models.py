from django.db import models

class UserProfile(models.Model):
    user_id = models.AutoField(primary_key=True)  # Auto-incrementing ID
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100,default=" ")
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp
    
    def __str__(self):
        return self.name  # Display name in admin panel
