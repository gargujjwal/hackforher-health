import { FaHeart, FaUser } from "react-icons/fa";
import { FaBrain, FaHandshake, FaShield } from "react-icons/fa6";

import { Benefit, SupportGroup } from "@/types/support-group";

export const supportGroups = [
  {
    name: "Cervivor",
    description:
      "Cervivor’s Creating Connections Program is a ray of hope for individuals affected by cervical cancer. The innovative program is dedicated to cultivating a supportive community, addressing stigma, and providing essential resources through a monthly virtual support group",
    website: "https://cervivor.org/tag/virtual-support-group/",
    frequency: "Weekly sessions",
    format: "Virtual . In-Person",
    registration: "https://cervivor.org/tag/virtual-support-group/",
  },
  {
    name: "Support Groups for Cervical Cancer",
    description:
      "CancerCare provides free, professional support services for people affected by cervical cancer, as well as cervical cancer treatment information and additional resources, including financial and co-pay assistance",
    website: "https://www.foundationforwomenscancer.org",
    frequency: "Monthly meetings",
    format: "Virtual",
    registration:
      "https://www.cancercare.org/support_groups/tagged/cervical_cancer",
  },
] satisfies SupportGroup[];

export const benefits = [
  {
    icon: <FaUser className="h-6 w-6" />,
    title: "Shared Experiences",
    content:
      "Connect with others who truly understand your journey, sharing stories, challenges, and victories in a safe space.",
  },
  {
    icon: <FaBrain className="h-6 w-6" />,
    title: "Knowledge Exchange",
    content:
      "Learn practical tips, treatment insights, and coping strategies from others who have faced similar situations.",
  },
  {
    icon: <FaHeart className="h-6 w-6" />,
    title: "Emotional Support",
    content:
      "Find comfort in knowing you're not alone, with access to emotional support during every stage of your journey.",
  },
  {
    icon: <FaShield className="h-6 w-6" />,
    title: "Coping Mechanisms",
    content:
      "Discover and develop effective ways to manage stress, anxiety, and treatment-related challenges.",
  },
  {
    icon: <FaHandshake className="h-6 w-6" />,
    title: "Lasting Connections",
    content:
      "Build meaningful relationships with others who understand your experience firsthand.",
  },
] satisfies Benefit[];
