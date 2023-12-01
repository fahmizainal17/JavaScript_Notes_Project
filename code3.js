//npm install random-forest-classifier

const RandomForestClassifier = require('random-forest-classifier');
const { train_test_split } = require('ml-cross-validation');
const { load_breast_cancer } = require('ml-dataset-uci');
const { Matrix } = require('ml-matrix');

// Load breast cancer dataset
const data = load_breast_cancer();
const X = data.data;
const y = data.target;

// Split the data into training and testing sets
const [X_train, X_test, y_train, y_test] = train_test_split(new Matrix(X), y, { testSize: 0.2, randomState: 42 });

// Define the Random Forest Classifier
const options = {
  n_estimators: 100,  // Number of trees in the forest
  criterion: 'gini',  // Splitting criterion
  max_depth: null,    // Maximum depth of the tree
  max_features: 'auto',  // Number of features to consider when looking for the best split
};

const classifier = new RandomForestClassifier(options);

// Train the Random Forest model
classifier.fit(X_train.toArray(), y_train);

// Make predictions on the test set
const predictions = classifier.predict(X_test.toArray());

// Evaluate accuracy
const accuracy = calculateAccuracy(y_test, predictions);
console.log(`Random Forest Model Accuracy: ${accuracy.toFixed(4)}`);

// Function to calculate accuracy
function calculateAccuracy(y_true, y_pred) {
  let correct = 0;
  for (let i = 0; i < y_true.length; i++) {
    if (y_true[i] === y_pred[i]) {
      correct++;
    }
  }
  return correct / y_true.length;
}
