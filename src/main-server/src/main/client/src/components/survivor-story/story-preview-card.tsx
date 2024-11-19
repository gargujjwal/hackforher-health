import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "react-router-dom";

import SourceAttribution from "./source-attribution";

import { SurvivorStory } from "@/types/survivor-story";

type Props = { story: SurvivorStory };

function StoryPreviewCard({ story }: Props) {
  return (
    <Card
      isPressable
      as={Link}
      className="bg-cardBackground w-full transition-transform hover:scale-[1.02]"
      to={`/survivor-story/${story.id}`}
    >
      <CardHeader className="bg-primary p-4">
        <h3 className="text-xl font-semibold text-textPrimary">
          {story.personalInfo.name}&apos;s Story
        </h3>
      </CardHeader>

      <CardBody className="p-4">
        <div className="mb-3">
          <span className="text-sm font-medium text-secondary">
            {story.diagnosis.condition} - Stage {story.diagnosis.stage}
          </span>
          {story.diagnosis.age && (
            <p className="text-sm text-textSecondary">
              Diagnosed at age {story.diagnosis.age}
            </p>
          )}
        </div>
        <p className="line-clamp-3 text-textSecondary">{story.previewText}</p>
      </CardBody>

      <CardFooter className="flex flex-col gap-2 bg-accent bg-opacity-20 p-3">
        <Button className="w-full bg-secondary text-buttonText" size="sm">
          Read Full Story
        </Button>
        <SourceAttribution source={story.source} />
      </CardFooter>
    </Card>
  );
}

export default StoryPreviewCard;
