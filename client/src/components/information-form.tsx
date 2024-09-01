import {Controller, useForm} from "react-hook-form";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import useLocalStorageJSON from "@/hooks/use-localstorage-json.ts";
import {Select, SelectItem} from "@nextui-org/select";


type FormFieldNames =
    | "age"
    | "sexualPartners"
    | "firstIntercourse"
    | "numPregnancies"
    | "smokes"
    | "smokesYears"
    | "smokesPacks"
    | "hormonalContraceptives"
    | "hormonalContraceptivesYears"
    | "iud"
    | "iudYears"
    | "stds"
    | "stdsNumber"
    | "stdsNumDiagnosis"
    | "stdsTimeSinceFirstDiagnosis"
    | "stdsTimeSinceLastDiagnosis"
    | "stdsCondylomatosis"
    | "stdsCervicalCondylomatosis"
    | "stdsVaginalCondylomatosis"
    | "stdsVulvoPerinealCondylomatosis"
    | "stdsSyphilis"
    | "stdsPelvicInflammatoryDisease"
    | "stdsGenitalHerpes"
    | "stdsMolluscumContagiosum"
    | "stdsAIDS"
    | "stdsHIV"
    | "stdsHepatitisB"
    | "stdsHPV"
    | "dxCancer"
    | "dxCIN"
    | "dxHPV"
    | "dx"
    | "hinselmann"
    | "schiller"
    | "citology"
    | "biopsy";

type FormField = {
  name: FormFieldNames;
  label: string;
  placeholder: string;
  desc: string;
  type: "number" | "binary";
}

const inputGroups = [
  {
    legend: "Personal Information",
    fields: [
      {
        name: "age",
        label: "Age",
        placeholder: "Enter your age",
        desc: "Your current age in years",
        type: "number"
      },
      {
        name: "sexualPartners",
        label: "Number of sexual partners",
        placeholder: "Enter number",
        desc: "Total number of sexual partners",
        type: "number"
      },
      {
        name: "firstIntercourse",
        label: "First sexual intercourse",
        placeholder: "Enter age",
        desc: "Age at first sexual intercourse",
        type: "number"
      },
      {
        name: "numPregnancies",
        label: "Number of pregnancies",
        placeholder: "Enter number",
        desc: "Total number of pregnancies",
        type: "number"
      },
    ]
  },
  {
    legend: "Smoking History",
    fields: [
      {
        name: "smokes",
        label: "Smokes",
        placeholder: "Choose Yes or No",
        desc: "Do you currently smoke?",
        type: "binary"
      },
      {
        name: "smokesYears",
        label: "Smoking duration",
        placeholder: "Enter years",
        desc: "Number of years smoking",
        type: "number"
      },
      {
        name: "smokesPacks",
        label: "Packs per year",
        placeholder: "Enter number",
        desc: "Number of packs smoked per year",
        type: "number"
      },
    ]
  },
  {
    legend: "Contraceptive Use",
    fields: [
      {
        name: "hormonalContraceptives",
        label: "Hormonal Contraceptives",
        placeholder: "Choose Yes or No",
        desc: "Do you use hormonal contraceptives?",
        type: "binary"
      },
      {
        name: "hormonalContraceptivesYears",
        label: "Duration of use",
        placeholder: "Enter years",
        desc: "Years using hormonal contraceptives",
        type: "number"
      },
      {
        name: "iud",
        label: "IUD",
        placeholder: "Choose Yes or No",
        desc: "Do you use an IUD?",
        type: "binary"
      },
      {
        name: "iudYears",
        label: "IUD usage duration",
        placeholder: "Enter years",
        desc: "Years using IUD",
        type: "number"
      },
    ]
  },
  {
    legend: "STD History",
    fields: [
      {
        name: "stds",
        label: "STDs",
        placeholder: "Choose Yes or No",
        desc: "Have you had any STDs?",
        type: "binary"
      },
      {
        name: "stdsNumber",
        label: "Number of STDs",
        placeholder: "Enter number",
        desc: "Total number of STDs",
        type: "number"
      },
      {
        name: "stdsNumDiagnosis",
        label: "Number of diagnoses",
        placeholder: "Enter number",
        desc: "Number of STD diagnoses",
        type: "number"
      },
      {
        name: "stdsTimeSinceFirstDiagnosis",
        label: "Time since first diagnosis",
        placeholder: "Enter years",
        desc: "Years since first STD diagnosis",
        type: "number"
      },
      {
        name: "stdsTimeSinceLastDiagnosis",
        label: "Time since last diagnosis",
        placeholder: "Enter years",
        desc: "Years since last STD diagnosis",
        type: "number"
      },
    ]
  },
  {
    legend: "Specific STDs",
    fields: [
      {
        name: "stdsCondylomatosis",
        label: "Condylomatosis",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with condylomatosis?",
        type: "binary"
      },
      {
        name: "stdsCervicalCondylomatosis",
        label: "Cervical condylomatosis",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with cervical condylomatosis?",
        type: "binary"
      },
      {
        name: "stdsVaginalCondylomatosis",
        label: "Vaginal condylomatosis",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with vaginal condylomatosis?",
        type: "binary"
      },
      {
        name: "stdsVulvoPerinealCondylomatosis",
        label: "Vulvo-perineal condylomatosis",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with vulvo-perineal condylomatosis?",
        type: "binary"
      },
      {
        name: "stdsSyphilis",
        label: "Syphilis",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with syphilis?",
        type: "binary"
      },
      {
        name: "stdsPelvicInflammatoryDisease",
        label: "Pelvic inflammatory disease",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with pelvic inflammatory disease?",
        type: "binary"
      },
      {
        name: "stdsGenitalHerpes",
        label: "Genital herpes",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with genital herpes?",
        type: "binary"
      },
      {
        name: "stdsMolluscumContagiosum",
        label: "Molluscum contagiosum",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with molluscum contagiosum?",
        type: "binary"
      },
      {
        name: "stdsAIDS",
        label: "AIDS",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with AIDS?",
        type: "binary"
      },
      {
        name: "stdsHIV",
        label: "HIV",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with HIV?",
        type: "binary"
      },
      {
        name: "stdsHepatitisB",
        label: "Hepatitis B",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with Hepatitis B?",
        type: "binary"
      },
      {
        name: "stdsHPV",
        label: "HPV",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with HPV?",
        type: "binary"
      },
    ]
  },
  {
    legend: "Diagnosis and Tests",
    fields: [
      {
        name: "dxCancer",
        label: "Cancer diagnosis",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with cancer?",
        type: "binary"
      },
      {
        name: "dxCIN",
        label: "CIN diagnosis",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with CIN?",
        type: "binary"
      },
      {
        name: "dxHPV",
        label: "HPV diagnosis",
        placeholder: "Choose Yes or No",
        desc: "Diagnosed with HPV?",
        type: "binary"
      },
      {
        name: "dx",
        label: "Other diagnosis",
        placeholder: "Choose Yes or No",
        desc: "Any other relevant diagnosis?",
        type: "binary"
      },
      {
        name: "hinselmann",
        label: "Hinselmann test",
        placeholder: "Choose Yes for Positive or No for Negative",
        desc: "Result of Hinselmann test",
        type: "binary"
      },
      {
        name: "schiller",
        label: "Schiller test",
        placeholder: "Choose Yes for Positive or No for Negative",
        desc: "Result of Schiller test",
        type: "binary"
      },
      {
        name: "citology",
        label: "Cytology",
        placeholder: "Choose Yes for Positive or No for Negative",
        desc: "Result of cytology test",
        type: "binary"
      },
      {
        name: "biopsy",
        label: "Biopsy",
        placeholder: "Choose Yes for Positive or No for Negative",
        desc: "Result of biopsy",
        type: "binary"
      },
    ]
  }
] satisfies { legend: string; fields: FormField[] }[];

type FormValue = {
  [key in FormFieldNames]: string
}

const FORM_INITIAL_VALUE = {
  age: "25",
  sexualPartners: "3",
  firstIntercourse: "18",
  numPregnancies: "2",
  smokes: "1",
  smokesYears: "5",
  smokesPacks: "10",
  hormonalContraceptives: "1",
  hormonalContraceptivesYears: "3",
  iud: "0",
  iudYears: "0",
  stds: "1",
  stdsNumber: "2",
  stdsNumDiagnosis: "2",
  stdsTimeSinceFirstDiagnosis: "5",
  stdsTimeSinceLastDiagnosis: "2",
  stdsCondylomatosis: "0",
  stdsCervicalCondylomatosis: "0",
  stdsVaginalCondylomatosis: "0",
  stdsVulvoPerinealCondylomatosis: "0",
  stdsSyphilis: "0",
  stdsPelvicInflammatoryDisease: "0",
  stdsGenitalHerpes: "0",
  stdsMolluscumContagiosum: "0",
  stdsAIDS: "0",
  stdsHIV: "0",
  stdsHepatitisB: "0",
  stdsHPV: "0",
  dxCancer: "0",
  dxCIN: "0",
  dxHPV: "0",
  dx: "0",
  hinselmann: "0",
  schiller: "0",
  citology: "0",
  biopsy: "0"
} satisfies FormValue;

type Props = {
  onSubmit: (data: FormValue) => Promise<void> | void;
}

export default function InformationForm(props: Props) {
  const [storedIp, setStoredIp] = useLocalStorageJSON<FormValue>("usr-info", FORM_INITIAL_VALUE);
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<FormValue>({defaultValues: storedIp});

  async function submitHandler(data: FormValue) {
    setStoredIp(data);
    await props.onSubmit(data);
  }

  return (
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        {inputGroups.map((group, groupIndex) => (
            <fieldset key={groupIndex} className="border border-gray-300 p-4 rounded-md">
              <legend className="text-lg font-semibold px-2">{group.legend}</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.fields.map((field) => (
                    <Controller
                        key={field.name}
                        name={field.name}
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (field.type === "number" ?
                                <Input
                                    type={field.type}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    description={field.desc}
                                    value={value}
                                    onChange={onChange}
                                    className="max-w-xs"
                                    isRequired
                                    required
                                /> : <Select
                                    defaultSelectedKeys={[value]}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    description={field.desc}
                                    value={value}
                                    onChange={onChange}
                                    className="max-w-xs"
                                    isRequired
                                    required
                                >
                                  <SelectItem key="1" value="1">Yes</SelectItem>
                                  <SelectItem key="0" value="0">No</SelectItem>
                                </Select>
                        )}
                    />
                ))}
              </div>
            </fieldset>
        ))}
        <Button type="submit" color="primary" className="mt-4" fullWidth isLoading={isSubmitting}>
          Submit
        </Button>
      </form>
  );
}
