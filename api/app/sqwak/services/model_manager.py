import random
import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler
from math import floor
import pickle

def create_model(ml_classes, pickled=True):
  X = []
  Y = []
  for ml_class in ml_classes:
    x = []
    y = []
    for audio_sample in ml_class['audio_samples']:
      x.append(audio_sample['features'])
      y.append(audio_sample['label'])

    X = X + x
    Y = Y + y

  n = len(Y)

  cutoff = int(floor(n * 0.7))

  X_train = X[:cutoff]
  Y_train = Y[:cutoff]
  X_test = X[cutoff:]
  Y_test = Y[cutoff:]


  clf = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), random_state=1, shuffle=True)
  scaler = StandardScaler()
  scaler.fit(X_train)
  X_train = scaler.transform(X_train)
  X_test = scaler.transform(X_test)

  clf.fit(X_train, Y_train)

  return pickle.dumps(clf)


def predict(working_model, features):
  clf = pickle.loads(working_model)

  features = np.array(features)
  features = features.reshape(1,-1) 

  predictions = clf.predict(features)
  probabilities = clf.predict_proba(features)
  probabilities = np.multiply(probabilities, 100)

  results = []

  for p in probabilities:
      for i, value in enumerate(p):
          result = {}
          result['label'] = clf.classes_[i]
          result['probability'] = value
          results.append(result)
  
  return results