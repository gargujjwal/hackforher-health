import { survivorStories } from "@/components/survivor-story/stories";
import StoriesGrid from "@/components/survivor-story/stories-grid";

function SurvivorStoryIndexPage() {
  return <StoriesGrid stories={survivorStories} />;
}

export default SurvivorStoryIndexPage;
