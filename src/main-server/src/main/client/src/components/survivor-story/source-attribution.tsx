import Link from "../util/link";

import { Source } from "@/types/survivor-story";

type Props = { source: Source };

function SourceAttribution({ source }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm text-textSecondary">
      <span>Source:</span>
      <Link isExternal showAnchorIcon color="primary" href={source.url}>
        {source.name}
      </Link>
    </div>
  );
}

export default SourceAttribution;
