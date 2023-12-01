
// npm install xgboost
const XGBoost = require('xgboost');

// Load breast cancer dataset
// (Note: You may need to adapt this part based on how you obtain your data in a Node.js environment)
const { load_breast_cancer } = require('ml-dataset-uci'); // This is just an example dataset, you might need a different one
const data = load_breast_cancer();
const X = data.data;
const y = data.target;

// Split the data into training and testing sets
const { train_test_split } = require('ml-cross-validation');
const { Matrix } = require('ml-matrix');
const [X_train, X_test, y_train, y_test] = train_test_split(new Matrix(X), y, { testSize: 0.2, randomState: 42 });

// Define the XGBoost model
const params = {
  objective: 'binary:logistic',
  eval_metric: 'logloss',
  booster: 'gbtree',
  max_depth: 3,
  learning_rate: 0.01,
  subsample: 0.8,
  colsample_bytree: 0.8,
};

// Convert arrays to XGBoost DMatrix format
const dtrain = XGBoost.DMatrix(X_train, y_train);
const dtest = XGBoost.DMatrix(X_test, y_test);

// Train the XGBoost model
XGBoost.train({ data: dtrain, params }, 100, [(dtest, 'eval')], (err, booster) => {
  if (err) throw err;

  // Make predictions
  booster.predict(dtest, (err, preds) => {
    if (err) throw err;

    // Evaluate accuracy
    const y_pred = preds.map(pred => (pred > 0.5 ? 1 : 0));
    const accuracy = calculateAccuracy(y_test, y_pred);
    console.log(`XGBoost Model Accuracy: ${accuracy.toFixed(4)}`);
  });
});

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
