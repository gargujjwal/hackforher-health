import {subtitle, title} from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import InformationForm from "@/components/information-form.tsx";
import {useNavigate} from "react-router-dom";

type ServerResponse = {
  has_cancer: boolean;
  accuracy: number;
}

export default function YourInformationPage() {
  const navigate = useNavigate();

  async function informationFormSubmitHandler(data: Record<string, string>) {
    try {
      const res = await fetch("http://localhost:5000/api/cancer-status", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      });
      if (res.status === 200) {
        const serverRes = await res.json() as ServerResponse;
        navigate(`/cancer-status?hasCancer=${serverRes.has_cancer}&accuracy=${serverRes.accuracy}`);
      } else {
        navigate("/error");
      }

    } catch (err) {
      console.log(err);

    }
  }

  return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-xl text-center justify-center">
            <h1 className={title()}>Fill the form to know if you have <span
                className="text-red-700 font-bold">Cervical Cancer</span> or not</h1>
            <h4 className={subtitle({class: "mt-4"})}>Our curated machine learning will tell with
              very good accuracy</h4>
          </div>

          <InformationForm onSubmit={informationFormSubmitHandler}/>
        </section>
      </DefaultLayout>
  );
}
