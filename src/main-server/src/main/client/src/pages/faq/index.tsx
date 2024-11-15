import { questions } from "@/components/faq/data";
import QuestionsAccordian from "@/components/faq/questions-accordian";

function FAQIndexPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h2 className="mb-6 text-center text-2xl font-semibold text-headline">
        Frequently Asked Questions
      </h2>
      <p className="mb-12">
        Our Frequently Asked Questions (FAQ) section aims to provide clear and
        concise answers to common concerns about cervical cancer. Whether
        you&apos;re learning about its stages, potential treatments, or risk
        factors, this section offers vital information to help you make informed
        decisions about your health. For further details, each question includes
        a direct link to trusted medical resources, so you can access more
        in-depth answers and stay updated with the latest insights.
      </p>
      <QuestionsAccordian questions={questions} />
    </div>
  );
}

export default FAQIndexPage;
