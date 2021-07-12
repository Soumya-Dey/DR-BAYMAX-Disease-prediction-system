import mongoengine as db
from datetime import datetime
import os
import json


class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)
    name = db.StringField(max_length=30)
    created = db.DateTimeField(default=datetime.utcnow)
    meta = {
        "indexes": ["email", "name"],
        "ordering": ["-created"]
    }

    def toJson(self):
        userDict = {
            "name": self.name,
            "email": self.email,
            "created": str(self.created),
        }

        return userDict


class Prediction(db.Document):
    user = db.ReferenceField(User)
    symptoms = db.ListField(db.StringField())
    disease = db.StringField()
    probability = db.FloatField()
    created = db.DateTimeField(default=datetime.utcnow)
    meta = {
        "indexes": ["user", "disease"],
        "ordering": ["-created"]
    }

    def toJson(self):
        predictionDict = {
            "user": self.user.toJson(),
            "symptoms": self.symptoms,
            "disease": self.disease,
            "probability": self.probability,
            "created": str(self.created),
        }

        return predictionDict
