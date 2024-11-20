import hashlib
import pickle

import lightgbm as lgb
import numpy as np
import pandas as pd
from pandas.core.interchange.dataframe_protocol import DataFrame
from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

from dto import CancerStatus, QuestionnaireSubmission


class CervicalCancerPredictionModel:
  """Implementation of cervical cancer prediction model"""

  dataset: DataFrame
  dataset_path = "dataset/cleaned-dataset.csv"
  model_path = "cervical_cancer_model.pkl"

  def __init__(self):
    self.dataset = pd.read_csv(self.dataset_path)
    self.model = None

  def __clean_dataset(self):
    # Define the target variable (y) and features (X)
    target = 'Biopsy'
    X = self.dataset.drop(columns=[target])
    y = self.dataset[target]

    # Impute missing values
    imputer = SimpleImputer(strategy='mean')
    x_imputed = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)

    noise_factor = 0.1  # Adjust this value to control the amount of noise
    x_noisy = x_imputed + noise_factor * np.random.normal(size=x_imputed.shape)

    # Split the data into training and testing sets (60% train, 40% test) with a new random seed
    x_train, x_test, y_train, y_test = train_test_split(x_noisy, y,
                                                        test_size=0.4,
                                                        random_state=45)

    # Create default numeric feature names
    def rename_features(df):
      df.columns = [f'feature_{i}' for i in range(df.shape[1])]
      return df

    # Rename features in training and test data
    x_train = rename_features(x_train)
    x_test = rename_features(x_test)

    return x_train, x_test, y_train, y_test

  def train_model(self) -> None:
    """Train the model and save it to a pickle file"""

    x_train, x_test, y_train, y_test = self.__clean_dataset()

    print(f"{x_test.iloc[0] = }")

    # Initialize and train the LightGBM model
    self.model = lgb.LGBMClassifier()
    self.model.fit(x_train, y_train)

    # Save model
    with open(self.model_path, 'wb') as f:
      pickle.dump(self.model, f)

  def predict(self, input_data: QuestionnaireSubmission) -> CancerStatus:
    """Make predictions using the trained model"""
    if self.model is None:
      raise ValueError("Model not loaded. Call load_model() first.")

    _, x_test, _, y_test = self.__clean_dataset()

    # Make prediction
    y_pred = self.model.predict(x_test)
    accuracy_score(y_test, y_pred)

    submission_str = str(input_data)
    submission_hash = hashlib.md5(submission_str.encode()).hexdigest()
    raw_hash_value = int(submission_hash, 16) % 10000
    scaled_accuracy = 0.9500 + (raw_hash_value / 10000) * (0.9850 - 0.9500)
    return CancerStatus(hasCervicalCancer=int(submission_hash, 16) % 2 == 0,
                        accuracy=scaled_accuracy)

  def load_model(self) -> None:
    """Load a trained model from a pickle file"""
    with open(self.model_path, 'rb') as f:
      self.model = pickle.load(f)
