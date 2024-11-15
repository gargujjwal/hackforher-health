import logging

from flask import Flask, jsonify
from flask import request as req
from flask_cors import CORS

from dto import UserInformation, CancerStatus
from model import CervicalCancerPredictionModel

app = Flask(__name__)

# cors configuration
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Configure Model
# model = CervicalCancerPredictionModel()
# try:
#   model.load_model()
# except FileNotFoundError:
#   logging.error("Model pickle file not found, training the model")
#   model.train_model()
#

@app.route('/predict', methods=['POST'])
def predict_cancer_status():
  if req.is_json:
    # get the input data from the request
    input_data = UserInformation.from_dict(req.get_json())
    logging.info(f"Received input data: {input_data}")

    # TODO: call the model here and pass the input data to it
    # then convert the model's prediction into CancerStatus object
    res = CancerStatus(False, 0.972)
    logging.info(f"Response: {res}")
    return jsonify(res)

  logging.info("Invalid request: not JSON")
  return jsonify({"error": "Invalid request, please provide JSON data"}), 400


if __name__ == '__main__':
  app.run()
