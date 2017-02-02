import random
import numpy as np
from sklearn import tree
from math import floor


def simple_classifier(mlClasses):
  
  X = []
  Y = []
  for mlClass in mlClasses:
    x = []
    y = []
    for sample in mlClass.samples:
      x.append(sample['features'])
      y.append(mlClass['label'])
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
  print(results)
  return results


# with open('currentApp.json') as data_file:    
#     data = json.load(data_file)

# class_1 = Bunch(data["mlModel"]["mlClasses"][0])
# class_2 = Bunch(data["mlModel"]["mlClasses"][1])

# class_1['label'] = 1
# class_2['label'] = 2

# classes = [
#   class_1,
#   class_2
# ]

# simple_classifier(classes)