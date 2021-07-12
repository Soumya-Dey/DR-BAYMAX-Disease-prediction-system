from env import JWT_SECRET, MONGO_URI
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from joblib import load
import numpy as np
import mongoengine as db
import jwt

from helper.disease import getDescription, getPrecautions
from classes import User, Prediction

app = Flask(__name__)
bcrypt = Bcrypt(app)
db.connect(host=MONGO_URI)

model = load('./model/mlp-classifier.joblib')

symptomDict = {'itching': 0,
               'skin_rash': 1,
               'continuous_sneezing': 2,
               'shivering': 3,
               'stomach_pain': 4,
               'acidity': 5,
               'vomiting': 6,
               'indigestion': 7,
               'muscle_wasting': 8,
               'patches_in_throat': 9,
               'fatigue': 10,
               'weight_loss': 11,
               'sunken_eyes': 12,
               'cough': 13,
               'headache': 14,
               'chest_pain': 15,
               'back_pain': 16,
               'weakness_in_limbs': 17,
               'chills': 18,
               'joint_pain': 19,
               'yellowish_skin': 20,
               'constipation': 21,
               'pain_during_bowel_movements': 22,
               'breathlessness': 23,
               'cramps': 24,
               'weight_gain': 25,
               'mood_swings': 26,
               'neck_pain': 27,
               'muscle_weakness': 28,
               'stiff_neck': 29,
               'pus_filled_pimples': 30,
               'burning_micturition': 31,
               'bladder_discomfort': 32,
               'high_fever': 33,
               'nodal_skin_eruptions': 34,
               'ulcers_on_tongue': 35,
               'loss_of_appetite': 36,
               'restlessness': 37,
               'dehydration': 38,
               'dizziness': 39,
               'weakness_of_one_body_side': 40,
               'lethargy': 41,
               'nausea': 42,
               'abdominal_pain': 43,
               'pain_in_anal_region': 44,
               'sweating': 45,
               'bruising': 46,
               'cold_hands_and_feets': 47,
               'anxiety': 48,
               'knee_pain': 49,
               'swelling_joints': 50,
               'blackheads': 51,
               'foul_smell_of urine': 52,
               'skin_peeling': 53,
               'blister': 54,
               'dischromic _patches': 55,
               'watering_from_eyes': 56,
               'extra_marital_contacts': 57,
               'diarrhoea': 58,
               'loss_of_balance': 59,
               'blurred_and_distorted_vision': 60,
               'altered_sensorium': 61,
               'dark_urine': 62,
               'swelling_of_stomach': 63,
               'bloody_stool': 64,
               'obesity': 65,
               'hip_joint_pain': 66,
               'movement_stiffness': 67,
               'spinning_movements': 68,
               'scurring': 69,
               'continuous_feel_of_urine': 70,
               'silver_like_dusting': 71,
               'red_sore_around_nose': 72,
               'Unnamed: 73': 73,
               'spotting_ urination': 74,
               'passage_of_gases': 75,
               'irregular_sugar_level': 76,
               'family_history': 77,
               'lack_of_concentration': 78,
               'excessive_hunger': 79,
               'yellowing_of_eyes': 80,
               'distention_of_abdomen': 81,
               'irritation_in_anus': 82,
               'swollen_legs': 83,
               'painful_walking': 84,
               'small_dents_in_nails': 85,
               'yellow_crust_ooze': 86,
               'internal_itching': 87,
               'mucoid_sputum': 88,
               'history_of_alcohol_consumption': 89,
               'swollen_blood_vessels': 90,
               'unsteadiness': 91,
               'inflammatory_nails': 92,
               'depression': 93,
               'fluid_overload': 94,
               'swelled_lymph_nodes': 95,
               'malaise': 96,
               'prominent_veins_on_calf': 97,
               'puffy_face_and_eyes': 98,
               'fast_heart_rate': 99,
               'irritability': 100,
               'muscle_pain': 101,
               'mild_fever': 102,
               'yellow_urine': 103,
               'phlegm': 104,
               'enlarged_thyroid': 105,
               'increased_appetite': 106,
               'visual_disturbances': 107,
               'brittle_nails': 108,
               'drying_and_tingling_lips': 109,
               'polyuria': 110,
               'pain_behind_the_eyes': 111,
               'toxic_look_(typhos)': 112,
               'throat_irritation': 113,
               'swollen_extremeties': 114,
               'slurred_speech': 115,
               'red_spots_over_body': 116,
               'belly_pain': 117,
               'receiving_blood_transfusion': 118,
               'acute_liver_failure': 119,
               'redness_of_eyes': 120,
               'rusty_sputum': 121,
               'abnormal_menstruation': 122,
               'receiving_unsterile_injections': 123,
               'coma': 124,
               'sinus_pressure': 125,
               'palpitations': 126,
               'stomach_bleeding': 127,
               'runny_nose': 128,
               'congestion': 129,
               'blood_in_sputum': 130,
               'loss_of_smell': 131}

# default error handler
@app.errorhandler(Exception)
def server_error(err):
    print(err)
    return jsonify({"errors": [{"msg": "Server error occured. Please try again!"}]}), 500

# route rote
@app.route("/")
def root():
    return jsonify(msg='Server running on => http://localhost:5000')

# route to make a prediction
@app.route("/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        if 'auth-token' not in request.headers:
            return jsonify({"errors": [{'msg': "Auth token missing. Access unauthorized!"}]}), 500

        try:
            payload = jwt.decode(
                request.headers['auth-token'], JWT_SECRET, algorithms=["HS256"])
        except jwt.DecodeError:
            return jsonify({"errors": [{"msg": "Invalid auth token!"}]}), 500
        if 'email' not in payload:
            return jsonify({"errors": [{'msg': "Invalid auth token!"}]}), 500

        user = User.objects(email=payload['email']).first()
        if user is None:
            return jsonify({"errors": [{'msg': "User not found!"}]}), 400

        body = request.get_json()
        symptoms = np.array(body['symptoms'])

        inputVector = np.zeros(len(symptomDict))
        indices = []
        for symptom in symptoms:
            indices.append(symptomDict[symptom])

        inputVector[indices] = 1
        prediction = model.predict([inputVector])[0].strip()
        probability = model.predict_proba([inputVector])[0].max()

        newPrediction = Prediction(
            user=user,
            symptoms=body['symptoms'],
            disease=prediction,
            probability=probability
        )
        newPrediction.save()

        return jsonify({
            "prediction": newPrediction.toJson(),
            "description": getDescription(prediction),
            "precautions": getPrecautions(prediction)
        })

# route to get all previous reports of an user
@app.route('/report', methods=['GET'])
def report():
    if request.method == 'GET':
        if 'auth-token' not in request.headers:
            return jsonify({"errors": [{'msg': "Auth token missing. Access unauthorized!"}]}), 500

        try:
            payload = jwt.decode(
                request.headers['auth-token'], JWT_SECRET, algorithms=["HS256"])
        except jwt.DecodeError:
            return jsonify({"errors": [{"msg": "Invalid auth token!"}]}), 500
        if 'email' not in payload:
            return jsonify({"errors": [{'msg': "Invalid auth token!"}]}), 500

        user = User.objects(email=payload['email']).first()
        if user is None:
            return jsonify({"errors": [{'msg': "User not found!"}]}), 400

        predictions = Prediction.objects(user=user)
        reports = [pred.toJson() for pred in predictions]

        return jsonify({"count": len(reports), "reports": reports})

# route to sign up
@app.route("/register", methods=['POST'])
def register():
    if request.method == 'POST':
        body = request.get_json()

        errors = []
        if 'email' not in body:
            errors.append({"msg": "Email is required!"})
        if 'password' not in body:
            errors.append({"msg": "Password is required!"})
        if 'password' in body and len(body['password']) < 6:
            errors.append({"msg": "Password must be 6 or more characters!"})
        if len(errors) > 0:
            return jsonify({"errors": errors}), 400

        existingUser = User.objects(email=body['email']).first()
        if existingUser is not None:
            return jsonify({"errors": [{"msg": "Email address already exists!"}]}), 400

        user = User(
            email=body['email'],
            password=bcrypt.generate_password_hash(
                body['password']).decode('utf-8'),
            name=body['name']
        )
        user.save()

        jwtToken = jwt.encode({"email": user.email},
                              JWT_SECRET, algorithm="HS256")

        return {'token': jwtToken}

# route to login
@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        body = request.get_json()

        errors = []
        if 'email' not in body:
            errors.append({"msg": "Email is required!"})
        if 'password' not in body:
            errors.append({"msg": "Password is required!"})
        if len(errors) > 0:
            return jsonify({"errors": errors}), 400

        existingUser = User.objects(email=body['email']).first()
        if existingUser is None:
            return jsonify({"errors": [{"msg": "Email or Password incorrect!"}]}), 400

        if bcrypt.check_password_hash(existingUser.password, body['password']):
            jwtToken = jwt.encode({"email": existingUser.email},
                                  JWT_SECRET, algorithm="HS256")

            return {'token': jwtToken}
        else:
            return jsonify({"errors": [{"msg": "Email or Password incorrect!"}]}), 400

# route to get currently logged in user
@app.route('/auth', methods=['GET', 'POST'])
def auth():
    if 'auth-token' not in request.headers:
        return jsonify({"errors": [{'msg': "Auth token missing. Access unauthorized!"}]}), 500

    try:
        payload = jwt.decode(
            request.headers['auth-token'], JWT_SECRET, algorithms=["HS256"])
    except jwt.DecodeError:
        return jsonify({"errors": [{"msg": "Invalid auth token!"}]}), 500
    if 'email' not in payload:
        return jsonify({"errors": [{'msg': "Invalid auth token!"}]}), 500

    user = User.objects(email=payload['email']).first()
    if user is None:
        return jsonify({"errors": [{'msg': "User not found!"}]}), 400

    return jsonify(user.toJson())


if __name__ == "__main__":
    app.run(debug=True)
