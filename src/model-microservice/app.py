import logging

from flask import Flask, jsonify
from flask import request as req

from entity.cancer_status import CancerStatus
from entity.user_information import UserInformation

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

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
