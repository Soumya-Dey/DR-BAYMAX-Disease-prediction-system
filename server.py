from flask import Flask, jsonify, request
from joblib import load
import numpy as np
import mongoengine as db

from helper.disease import getDescription, getPrecautions

app = Flask(__name__)
# DB_URI = 'mongodb+srv://admin:mongoadmin12345@cluster0.j1yqw.mongodb.net/drBaymax?retryWrites=true&w=majority'
# db.connect(host=DB_URI)

model = load('./model/gaussian_naive_bayes_with_weights.joblib')

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


@app.route("/")
def root():
    return jsonify(msg='Server running on => http://localhost:5000')


@app.route("/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        data = request.get_json()
        symptoms = np.array(data['symptoms'])

        inputVector = np.zeros(len(symptomDict))
        indices = []
        for symptom in symptoms:
            indices.append(symptomDict[symptom])

        inputVector[indices] = 1
        prediction = model.predict([inputVector])[0].strip()
        print(prediction)

        return jsonify({
            "disease": prediction,
            "description": getDescription(prediction),
            "precautions": getPrecautions(prediction)
        })


if __name__ == "__main__":
    app.run(debug=True)
