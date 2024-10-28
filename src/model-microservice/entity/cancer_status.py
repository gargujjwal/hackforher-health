from dataclasses import dataclass


@dataclass
class CancerStatus:
  hasCervicalCancer: bool
  accuracy: float
