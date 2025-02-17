import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import SourceAttribution from "./source-attribution";

import { SurvivorStory } from "@/types/survivor-story";

type Props = { stories: SurvivorStory[] };

function StoryDetail({ stories }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const story = stories.find(s => s.id === id);

  if (!story) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl text-headline">Story not found</h2>
        <Button
          className="mt-4 bg-primary text-buttonText"
          onClick={() => navigate("/survivor-story")}
        >
          Back to Stories
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl">
        <Button
          className="mb-6 bg-primary text-buttonText"
          startContent={<FaArrowLeftLong size={20} />}
          onClick={() => navigate("/survivor-story")}
        >
          Back to Stories
        </Button>

        <Card className="bg-cardBackground w-full">
          <CardHeader className="flex flex-col items-start gap-2 bg-primary p-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-textPrimary">
                {story.personalInfo.name}&apos;s Story
              </h2>
              {story.personalInfo.location && (
                <p className="text-textPrimary opacity-80">
                  Location: {story.personalInfo.location}
                </p>
              )}
            </div>
            <div className="mt-2 w-full rounded-lg bg-accent p-3">
              <h3 className="text-lg font-semibold text-textSecondary">
                Diagnosis
              </h3>
              <p className="text-textSecondary">
                {story.diagnosis.condition} - Stage {story.diagnosis.stage}
              </p>
              {story.diagnosis.age && (
                <p className="text-textSecondary">
                  Age at diagnosis: {story.diagnosis.age}
                </p>
              )}
            </div>
          </CardHeader>

          <CardBody className="gap-6 p-6">
            {story.symptoms && story.symptoms.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold text-headline">
                  Symptoms
                </h3>
                <ul className="list-inside list-disc">
                  {story.symptoms.map((symptom, index) => (
                    <li key={index} className="mb-1 text-textSecondary">
                      {symptom.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold text-headline">
                Treatment Journey
              </h3>
              <ul className="list-inside list-disc">
                {story.treatments.map((treatment, index) => (
                  <li key={index} className="mb-1 text-textSecondary">
                    {treatment.type}
                    {treatment.details && (
                      <ul className="ml-6 list-none">
                        {treatment.details.map((detail, idx) => (
                          <li key={idx} className="text-sm text-textSecondary">
                            - {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose max-w-none">
              <h3 className="mb-2 text-lg font-semibold text-headline">
                Personal Journey
              </h3>
              <div className="space-y-4">
                {story.storyDescription.map((para, idx) => (
                  <p
                    key={idx}
                    className="whitespace-pre-line text-textSecondary"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {story.currentLife && (
                <>
                  <h3 className="mb-2 mt-4 text-lg font-semibold text-headline">
                    Life Today
                  </h3>
                  <p className="text-textSecondary">{story.currentLife}</p>
                </>
              )}

              {story.advice && (
                <>
                  <h3 className="mb-2 mt-4 text-lg font-semibold text-headline">
                    Advice for Others
                  </h3>
                  <p className="text-textSecondary">{story.advice}</p>
                </>
              )}
            </div>
          </CardBody>

          <CardFooter className="flex flex-col gap-2 bg-accent bg-opacity-20 p-4">
            <SourceAttribution source={story.source} />
            {story.disclaimer && (
              <p className="text-sm italic text-textSecondary">
                {story.disclaimer}
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default StoryDetail;
