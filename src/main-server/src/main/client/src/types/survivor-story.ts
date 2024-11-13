export type Source = {
  name: string;
  url: string;
};

export type Treatment = {
  type: string;
  details?: string[];
};

export type Symptom = {
  description: string;
  duration?: string;
};

export type Diagnosis = {
  condition: string;
  stage: string;
  age?: number;
  date?: string;
};

export type PersonalInfo = {
  name: string;
  location?: string;
  age?: number;
  interviewedBy?: string;
  editedBy?: string;
};

export interface SurvivorStory {
  id: string;
  personalInfo: PersonalInfo;
  diagnosis: Diagnosis;
  symptoms?: Symptom[];
  treatments: Treatment[];
  storyDescription: string[];
  impact?: string;
  advice?: string;
  currentLife?: string;
  disclaimer?: string;
  previewText: string;
  source: Source;
}
