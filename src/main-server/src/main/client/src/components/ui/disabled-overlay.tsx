import {Tooltip} from "@nextui-org/tooltip";

import {ChildrenProps} from "@/types";

type Props = ChildrenProps & { tooltipContent?: string };

function DisabledOverlay({children, tooltipContent}: Props) {
  return (
      <div className="relative">
        <div className="pointer-events-none opacity-50">{children}</div>
        <Tooltip
            content={tooltipContent ?? "You can't interact with it"}
            placement="top"
        >
          <div
              className="absolute inset-0 bg-gray-200 opacity-50 pointer-events-auto z-10 rounded-md cursor-not-allowed"/>
        </Tooltip>
      </div>
  );
}

export default DisabledOverlay;
