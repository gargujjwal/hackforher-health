import {Card, CardBody} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";

import Link from "@/components/util/link";
import {SupportGroup} from "@/types/support-group";

type Props = { group: SupportGroup };

function SupportGroupCard({group}: Props) {
  return (
      <Card>
        <CardBody className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-xl font-semibold">{group.name}</h3>
            <Chip className="text-textPrimary" color="primary">
              {group.format}
            </Chip>
          </div>
          <p className="mb-4 text-textSecondary">{group.description}</p>
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2">
              <span color="secondary">Frequency</span>
              <Chip>{group.frequency}</Chip>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
                isExternal
                showAnchorIcon
                href={group.website}
                underline="hover"
            >
              Visit Website
            </Link>
            <Link
                isExternal
                showAnchorIcon
                href={group.registration}
                underline="hover"
            >
              Register Now
            </Link>
          </div>
        </CardBody>
      </Card>
  );
}

export default SupportGroupCard;
