import { SurvivorStory } from "@/types/survivor-story";

export const formatStoryPreview = (story: SurvivorStory) => {
  const previewText = story.storyDescription.slice(0, 150) + "...";

  return {
    ...story,
    previewText,
  };
};
