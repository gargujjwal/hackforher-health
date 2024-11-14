import {benefits} from "./data";

type Props = { benefit: (typeof benefits)[0] };

function BenefitCard({benefit}: Props) {
  return (
      <div className="flex items-start gap-4 rounded-lg bg-accent/10 p-4">
        <div className="text-primary">{benefit.icon}</div>
        <div>
          <h3 className="mb-2 font-semibold">{benefit.title}</h3>
          <p className="text-sm text-textSecondary">{benefit.content}</p>
        </div>
      </div>
  );
}

export default BenefitCard;
