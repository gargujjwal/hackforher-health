import DefaultLayout from "@/layouts/default";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {useSearchParams} from "react-router-dom";
import {title} from "@/components/primitives.ts";

export default function CancerStatusPage() {
  const [searchParams] = useSearchParams();
  const hasCancer = searchParams.get('hasCancer') === 'true';
  const accuracy = searchParams.get('accuracy');

  return (
      <DefaultLayout>
        <section className="flex items-center justify-center gap-4 py-4 md:py-6">
          <div className="flex justify-center items-center bg-gray-100">
            <Card className="p-6 shadow-lg rounded-xl bg-white space-y-3">
              <CardHeader>
                <h1 className={title()}>Cancer Diagnosis</h1>
              </CardHeader>
              <CardBody>
                <p className="text-center text-2xl mb-2">
                  {hasCancer ? (
                      <span className="text-red-500 font-semibold">You have cancer</span>
                  ) : (
                      <span className="text-green-500 font-semibold">You do not have cancer</span>
                  )}
                </p>
                <p className="text-center text-gray-600">
                  Accuracy: <span className="font-semibold">{accuracy}%</span>
                </p>
              </CardBody>
            </Card>
          </div>
        </section>
      </DefaultLayout>
  );
}
