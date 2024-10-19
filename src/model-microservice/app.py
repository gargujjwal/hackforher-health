from flask import Flask, request as req, jsonify, Response

from entity.cancer_status import CancerStatus
from entity.user_information import UserInformation

app = Flask(__name__)


@app.route('/api/cancer-status', methods=['POST'])
def predict_cancer_status():  # put application's code here
  if req.is_json:
    # get the input data from the request
    input_data = UserInformation.from_dict(req.get_json())
    # TODO:call the model here and pass the input data to it
    # then covert the model's prediction into CancerStatus object
    res = CancerStatus(False, 0.5)
    return jsonify(res)

  return Response(status=400)


if __name__ == '__main__':
  app.run()
