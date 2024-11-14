import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {Card, CardBody, CardHeader} from "@nextui-org/card";

import {benefits, supportGroups} from "@/components/support-group/data";
import BenefitCard from "@/components/support-group/benefit-card";
import SupportGroupCard from "@/components/support-group/support-group-card";

function SupportGroupIndexPage() {
  return (
      <div className="min-h-screen bg-background p-6">
        <main className="mx-auto max-w-4xl space-y-8">
          {/* Hero Section */}
          <section className="space-y-4 text-center">
            <h1 className="text-4xl font-bold text-primary">
              The Power of Support Groups in Cervical Cancer Journey
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-textSecondary">
              Discover how support groups can provide invaluable emotional
              support, practical guidance, and lasting connections throughout your
              cervical cancer journey.
            </p>
          </section>

          {/* Why Support Groups Matter */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-primary">
                Why Support Groups Matter
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <p className="text-textSecondary">
                Support groups play a crucial role in the cervical cancer journey,
                offering a unique combination of emotional support, practical
                knowledge, and community understanding that complements medical
                treatment. These groups provide a safe space where you can:
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                    <BenefitCard key={index} benefit={benefit}/>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Support Group Directory */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-primary">
              Available Support Groups
            </h2>
            <div className="space-y-4">
              {supportGroups.map((group, index) => (
                  <SupportGroupCard key={index} group={group}/>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold text-primary">
              Common Questions About Support Groups
            </h2>
            <Accordion className="w-full">
              <AccordionItem title="What can I expect in my first support group meeting?">
                Your first meeting will typically begin with introductions and an
                overview of group guidelines. You can choose to share as much or
                as little as you feel comfortable with. The facilitator will guide
                discussions and ensure a supportive, respectful environment for
                all participants.
              </AccordionItem>
              <AccordionItem title="Are support groups confidential?">
                Yes, support groups maintain strict confidentiality. What&apos;s
                shared in the group stays in the group. All participants agree to
                these privacy guidelines before joining.
              </AccordionItem>
              <AccordionItem title="Can I bring a family member or friend?">
                This varies by group. Some groups are exclusively for patients,
                while others welcome caregivers and support persons. Check with
                the specific group&apos;s guidelines before attending.
              </AccordionItem>
              <AccordionItem title="Is there a cost to join these support groups?">
                Most support groups listed here are free of charge. They&apos;re
                typically funded by non-profit organizations or healthcare
                institutions to ensure accessibility for all patients.
              </AccordionItem>
            </Accordion>
          </section>
        </main>
      </div>
  );
}

export default SupportGroupIndexPage;
