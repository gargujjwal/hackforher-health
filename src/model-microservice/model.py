import pickle
from abc import ABC, abstractmethod

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler


class Model(ABC):
  """Abstract interface for prediction models"""

  @abstractmethod
  def train_model(self, data_path: str) -> None:
    """Train the model and save it to a pickle file

    Args:
        data_path: Path to the training data CSV file
    """
    pass

  @abstractmethod
  def predict(self, input_data: pd.DataFrame) -> np.ndarray:
    """Make predictions using the trained model

    Args:
        input_data: DataFrame containing features for prediction

    Returns:
        Array of predictions
    """
    pass

  @abstractmethod
  def load_model(self, model_path: str) -> None:
    """Load a trained model from a pickle file

    Args:
        model_path: Path to the saved model pickle file
    """
    pass


class CervicalCancerPredictionModel(Model):
  """Implementation of cervical cancer prediction model"""

  def __init__(self):
    self.model = None
    self.scaler = MinMaxScaler()
    self.imputer = SimpleImputer(strategy='mean')

  def _preprocess_data(self, data: pd.DataFrame) -> pd.DataFrame:
    """Preprocess the input data

    Args:
        data: Raw input DataFrame

    Returns:
        Preprocessed DataFrame
    """
    # Replace "?" with NaN
    data = data.replace("?", np.nan)

    # Convert columns to numeric
    data = data.apply(pd.to_numeric, errors='coerce')

    # List of categorical columns
    categorical_columns = ['Smokes', 'Hormonal Contraceptives', 'IUD', 'STDs',
                           'Dx:Cancer', 'Dx:CIN', 'Dx:HPV', 'Dx',
                           'Hinselmann', 'Cytology', 'Schiller']

    # Get existing categorical columns
    existing_columns = [col for col in categorical_columns if
                        col in data.columns]

    # Apply one-hot encoding
    data = pd.get_dummies(data=data, columns=existing_columns)

    return data

  def train_model(self, data_path: str = "dataset.csv") -> None:
    """Train the model and save it to a pickle file"""
    # Load data
    data = pd.read_csv(data_path)

    # Preprocess data
    processed_data = self._preprocess_data(data)

    # Split features and target
    X = processed_data.iloc[:, :46]
    y = processed_data.iloc[:, 46]

    # Split into train and test sets
    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.4,
                                              random_state=45)

    # Fit and transform with imputer
    X_train = self.imputer.fit_transform(X_train)

    # Scale features
    X_train = self.scaler.fit_transform(X_train)

    # Initialize and train model
    self.model = RandomForestClassifier()
    self.model.fit(X_train, y_train)

    # Save model
    with open('cervical_cancer_model.pkl', 'wb') as f:
      pickle.dump({
        'model': self.model,
        'scaler': self.scaler,
        'imputer': self.imputer
      }, f)

  def predict(self, input_data: pd.DataFrame) -> np.ndarray:
    """Make predictions using the trained model"""
    if self.model is None:
      raise ValueError("Model not loaded. Call load_model() first.")

    # Preprocess input data
    processed_data = self._preprocess_data(input_data)

    # Impute missing values
    processed_data = self.imputer.transform(processed_data)

    # Scale features
    processed_data = self.scaler.transform(processed_data)

    # Make prediction
    predictions = self.model.predict(processed_data)
    return predictions

  def load_model(self, model_path: str = 'cervical_cancer_model.pkl') -> None:
    """Load a trained model from a pickle file"""
    with open(model_path, 'rb') as f:
      model_data = pickle.load(f)
      self.model = model_data['model']
      self.scaler = model_data['scaler']
      self.imputer = model_data['imputer']
