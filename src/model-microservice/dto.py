from dataclasses import dataclass
from typing import Any


@dataclass
class CancerStatus:
  hasCervicalCancer: bool
  accuracy: float


@dataclass
class QuestionnaireSubmission:
  age: int
  sexual_partners: int
  first_intercourse: int
  num_pregnancies: int
  smokes: int
  smokes_years: int
  smokes_packs: int
  hormonal_contraceptives: int
  hormonal_contraceptives_years: int
  iud: int
  iud_years: int
  stds: int
  stds_number: int
  stds_num_diagnosis: int
  stds_time_since_first_diagnosis: int
  stds_time_since_last_diagnosis: int
  stds_condylomatosis: int
  stds_cervical_condylomatosis: int
  stds_vaginal_condylomatosis: int
  stds_vulvo_perineal_condylomatosis: int
  stds_syphilis: int
  stds_pelvic_inflammatory_disease: int
  stds_genital_herpes: int
  stds_molluscum_contagiosum: int
  stds_aids: int
  stds_hiv: int
  stds_hepatitis_b: int
  stds_hpv: int
  dx_cancer: int
  dx_cin: int
  dx_hpv: int
  dx: int
  hinselmann: int
  schiller: int
  citology: int
  biopsy: int

  @classmethod
  def from_dict(cls, data: dict[str, Any]) -> 'QuestionnaireSubmission':
    # Convert string attributes to integers
    return cls(
        age=int(data.get('age', 0)),
        sexual_partners=int(data.get('sexualPartners', 0)),
        first_intercourse=int(data.get('firstIntercourse', 0)),
        num_pregnancies=int(data.get('numPregnancies', 0)),
        smokes=int(data.get('smokes', 0)),
        smokes_years=int(data.get('smokesYears', 0)),
        smokes_packs=int(data.get('smokesPacks', 0)),
        hormonal_contraceptives=int(data.get('hormonalContraceptives', 0)),
        hormonal_contraceptives_years=int(
            data.get('hormonalContraceptivesYears', 0)),
        iud=int(data.get('iud', 0)),
        iud_years=int(data.get('iudYears', 0)),
        stds=int(data.get('stds', 0)),
        stds_number=int(data.get('stdsNumber', 0)),
        stds_num_diagnosis=int(data.get('stdsNumDiagnosis', 0)),
        stds_time_since_first_diagnosis=int(
            data.get('stdsTimeSinceFirstDiagnosis', 0)),
        stds_time_since_last_diagnosis=int(
            data.get('stdsTimeSinceLastDiagnosis', 0)),
        stds_condylomatosis=int(data.get('stdsCondylomatosis', 0)),
        stds_cervical_condylomatosis=int(
            data.get('stdsCervicalCondylomatosis', 0)),
        stds_vaginal_condylomatosis=int(
            data.get('stdsVaginalCondylomatosis', 0)),
        stds_vulvo_perineal_condylomatosis=int(
            data.get('stdsVulvoPerinealCondylomatosis', 0)),
        stds_syphilis=int(data.get('stdsSyphilis', 0)),
        stds_pelvic_inflammatory_disease=int(
            data.get('stdsPelvicInflammatoryDisease', 0)),
        stds_genital_herpes=int(data.get('stdsGenitalHerpes', 0)),
        stds_molluscum_contagiosum=int(data.get('stdsMolluscumContagiosum', 0)),
        stds_aids=int(data.get('stdsAIDS', 0)),
        stds_hiv=int(data.get('stdsHIV', 0)),
        stds_hepatitis_b=int(data.get('stdsHepatitisB', 0)),
        stds_hpv=int(data.get('stdsHPV', 0)),
        dx_cancer=int(data.get('dxCancer', 0)),
        dx_cin=int(data.get('dxCIN', 0)),
        dx_hpv=int(data.get('dxHPV', 0)),
        dx=int(data.get('dx', 0)),
        hinselmann=int(data.get('hinselmann', 0)),
        schiller=int(data.get('schiller', 0)),
        citology=int(data.get('citology', 0)),
        biopsy=int(data.get('biopsy', 0)),
    )
