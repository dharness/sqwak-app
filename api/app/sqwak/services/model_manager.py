import random
import numpy as np
from sklearn import tree
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


  clf = tree.DecisionTreeClassifier()
  clf = clf.fit(X_train, Y_train)

  return pickle.dumps(clf)