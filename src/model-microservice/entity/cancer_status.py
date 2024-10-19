from dataclasses import dataclass


@dataclass
class CancerStatus:
  has_cancer: bool
  accuracy: float
