import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import { FaChartLine, FaUserCircle, FaUserMd } from "react-icons/fa";
import { Button } from "@heroui/button";

import Link from "@/components/util/link";

function LandingPage() {
  return (
    <main className="px-4 py-12 md:px-8 md:py-16">
      <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold text-primary md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Empowering Women&apos;s Health
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-lg text-textSecondary md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the power of our cervical cancer awareness platform, where
            we&apos;re revolutionizing women&apos;s healthcare.
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              as={Link}
              className="text-textPrimary"
              color="primary"
              href="/auth/login"
              size="lg"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="flex h-full w-full items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Image
            alt="HackForHer Health"
            className="md:-96 w-full rounded-lg shadow-lg"
            src="/hero-img.jpg"
          />
        </motion.div>
      </section>

      <section className="mt-16 md:mt-24">
        <h2 className="mb-8 text-3xl font-bold text-secondary md:text-4xl">
          Key Features
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div
            className="flex flex-col items-center rounded-lg p-6 text-center shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <FaChartLine className="mb-4 text-4xl text-primary" />
            <h3 className="mb-2 text-2xl font-bold">
              Cervical Cancer Prediction
            </h3>
            <p className="text-gray-600">
              Our advanced questionnaire can predict cervical cancer with 98.3%
              accuracy.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center rounded-lg p-6 text-center shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <FaUserCircle className="mb-4 text-4xl text-primary" />
            <h3 className="mb-2 text-2xl font-bold">Survivor Stories</h3>
            <p className="text-gray-600">
              Inspiring stories from cervical cancer survivors to provide hope
              and support.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center rounded-lg p-6 text-center shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <FaUserMd className="mb-4 text-4xl text-primary" />
            <h3 className="mb-2 text-2xl font-bold">Doctor Connections</h3>
            <p className="text-gray-600">
              Connect with doctors, schedule appointments, and get personalized
              care.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <h2 className="mb-8 text-3xl font-bold text-secondary md:text-4xl">
          Awareness and Resources
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            className="rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="mb-4 text-2xl font-bold">
              Cervical Cancer Awareness
            </h3>
            <p className="mb-4 text-gray-600">
              Our platform provides comprehensive information and resources to
              raise awareness about cervical cancer, its causes, and prevention
              methods.
            </p>
            <Link
              className="font-medium"
              color="primary"
              href="/awareness-prevention"
              underline="hover"
            >
              Learn More
            </Link>
          </motion.div>
          <motion.div
            className="rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="mb-4 text-2xl font-bold">Myth Busters and FAQ</h3>
            <p className="mb-4 text-gray-600">
              Dispel common myths and misconceptions about cervical cancer, and
              find answers to frequently asked questions.
            </p>
            <Link
              className="font-medium"
              color="primary"
              href="/myth-busters"
              underline="hover"
            >
              Explore
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="mt-16 text-center md:mt-24">
        <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
          About the Developers
        </h2>
        <p className="mb-8 text-textSecondary">
          This application was created by Ujjwal Garg, Utkarsh Shukla, and Naman
          Rath - a team passionate about leveraging technology to improve
          women&apos;s health and create awareness around cervical cancer.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            isExternal
            showAnchorIcon
            className="font-medium"
            color="primary"
            href="https://github.com/gargujjwal"
          >
            Ujjwal Garg
          </Link>
          <Link
            isExternal
            showAnchorIcon
            className="font-medium"
            color="primary"
            href="https://github.com/utkarsh-shukla2003"
          >
            Utkarsh Shukla
          </Link>
          <Link
            isExternal
            showAnchorIcon
            className="font-medium"
            color="primary"
            href="https://github.com/namanrath2003"
          >
            Naman Rath
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
