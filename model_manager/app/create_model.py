from generated import ModelManager_pb2
import random
import numpy as np
from sklearn import tree
from math import floor

def create_model(ml_classes):
  X = []
  Y = []
  for ml_class in ml_classes:
    x = []
    y = []
    for sample in ml_class.samples:
      x.append(sample.features)
      y.append(ml_class.label)
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

  predictions = clf.predict(X_test)

  count = (np.array(Y_test) == predictions).sum()
  results = str((count/float(len(Y_test))) * 100.) + "%"
  return clf

if (__name__ == "__main__"):
  f = open('reqest.p', "r")
  create_model_request = ModelManager_pb2.CreateModelRequest()
  create_model_request.ParseFromString(f.read())

  model = create_model(create_model_request.ml_classes)
  print(model)