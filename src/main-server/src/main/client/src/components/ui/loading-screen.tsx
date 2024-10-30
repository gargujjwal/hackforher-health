import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const FACTS = [
  "Cervical cancer is the fourth most common cancer in women worldwide.",
  "The human papillomavirus (HPV) causes more than 90% of cervical cancers.",
  "Cervical cancer is preventable through HPV vaccination and screening.",
  "The Pap smear test helps detect precancerous cells early.",
  "HPV vaccines are effective against most cancer-causing strains.",
  "Smoking increases the risk of developing cervical cancer.",
  "Regular screening can reduce cervical cancer mortality by 80%.",
  "Many women with early-stage cervical cancer have no symptoms.",
  "Bleeding between periods or after menopause can be a symptom.",
  "Women aged 21-65 should get regular cervical cancer screenings.",
] as const;

function LoadingScreen() {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % FACTS.length);
    }, 3000); // Change fact every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
      <div
          className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-400 to-green-500 text-white">
        <div className="text-center space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
                key={factIndex}
                animate={{opacity: 1, y: 0}}
                className="text-xl font-medium px-4"
                exit={{opacity: 0, y: -10}}
                initial={{opacity: 0, y: 10}}
                transition={{duration: 0.8}}
            >
              {FACTS[factIndex]}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 grid place-content-center">
            <DotLottieReact
                autoplay
                loop
                className="size-24"
                src="/lottie-animations/loading-screen-animation.lottie"
            />
          </div>
        </div>
      </div>
  );
}

export default LoadingScreen;
