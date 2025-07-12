# accounts/mongo_models.py

import mongoengine as me

class User(me.Document):
    username = me.StringField(required=True, unique=True)
    email = me.EmailField(required=True, unique=True)
    password = me.StringField(required=True)
    location = me.StringField()
    availability = me.StringField()
    is_public = me.BooleanField(default=True)
    profile_photo = me.FileField()  # stored in GridFS

    def __str__(self):
        return self.username
