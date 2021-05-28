import pandas as pd
import numpy as np

diseaseDescriptions = pd.read_csv(
    './data/Disease_descriptions.csv', dtype=str, keep_default_na=False)
diseasePrecautions = pd.read_csv(
    './data/Disease_precautions.csv', dtype=str, keep_default_na=False)

diseases = diseaseDescriptions.iloc[:, 0]
descriptions = diseaseDescriptions.iloc[:, 1]
precautions = diseasePrecautions.iloc[:, 1:]

descDict = {}
precautionDict = {}

for i, disease in enumerate(diseases):
    descDict[disease] = descriptions[i]
    precautionDict[disease] = np.array(precautions.iloc[i, :])


def getDescription(disease):
    return descDict[disease.strip()]


def getPrecautions(disease):
    return ','.join(precautionDict[disease.strip()])
