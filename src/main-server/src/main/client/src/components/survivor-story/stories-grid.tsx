import StoryPreviewCard from "./story-preview-card";

import { SurvivorStory } from "@/types/survivor-story";

type Props = { stories: SurvivorStory[] };

function StoriesGrid({ stories }: Props) {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-headline">
        Survivor Stories
      </h1>
      <p className="mb-12">
        The <b className="font-bold">Survivor Story</b> section of our website
        highlights inspiring personal experiences of individuals who have
        battled cervical cancer. These stories offer hope, strength, and
        resilience, helping others navigate their own journey with support and
        encouragement. By sharing real-life accounts, we aim to foster a sense
        of community, raise awareness, and inspire women to take charge of their
        health and seek early intervention. Each story is a testament to the
        power of hope and perseverance in the face of adversity.
      </p>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stories.map(story => (
          <StoryPreviewCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}

export default StoriesGrid;
