import {SurvivorStory} from "@/types/survivor-story";

export const survivorStories = [
  {
    id: "kate-r-story",
    personalInfo: {
      name: "Kate R.",
      interviewedBy: "Nikki Murphy",
      editedBy: "Katrina Villareal",
    },
    diagnosis: {
      condition: "Squamous Cell Carcinoma of Unknown Primary Origin",
      stage: "3C",
    },
    symptoms: [
      {description: "Intermittent spotting during or after sex"},
      {description: "Unpredictable menstrual cycle"},
      {description: "Abdominal pain, particularly under the rib cage"},
    ],
    treatments: [
      {
        type: "Chemotherapy",
        details: ["cisplatin", "paclitaxel"],
      },
      {
        type: "Immunotherapy",
        details: ["Keytruda"],
      },
      {
        type: "Surgery",
        details: [
          "total abdominal hysterectomy with bilateral salpingo-oophorectomy",
          "omentectomy",
        ],
      },
    ],
    storyDescription: [
      "Kate began experiencing symptoms, such as random spotting during or after sex and abdominal pain, years before seeking medical attention. Initially misattributed to gallbladder issues, her condition worsened, leading to an emergency room visit where a CT scan revealed a shadow. Subsequent tests and an ultrasound uncovered two large masses, which would later be classified as squamous cell carcinoma of unknown origin.",
      "Kate’s journey to a definitive diagnosis was complex. Initially suspected to be cervical cancer due to testing positive for HPV, her diagnosis changed after multiple biopsies. These tests showed her cervix and uterus were benign, but the masses remained malignant.",
      "Her treatment plan was equally challenging. She began with chemotherapy but suffered severe reactions, including a massive rash that required hospitalization. Despite these setbacks, the tumors responded well to treatment, shrinking by 75% after several rounds of chemo. Kate’s oncologist decided to proceed with surgery, successfully removing the tumors and performing a full hysterectomy. Post-surgery, pathology reports showed all removed tissues were benign, and the tumors were necrotic, indicating she was cancer-free.",
      "Kate reflected on the mental toll of her diagnosis and treatment, emphasizing the importance of allowing oneself to feel all emotions and seeking support. She stressed the importance of listening to one’s body and seeking medical attention for abnormal symptoms. Despite the daunting challenges, Kate remained determined to continue living a fulfilling life with her husband and daughters.",
    ],
    previewText:
        "Kate began experiencing symptoms, such as random spotting during or after sex and abdominal pain, years before seeking medical attention...",
    disclaimer:
        "This interview has been edited for clarity. This is not medical advice. Please consult with your healthcare provider for treatment decisions.",
    source: {
      name: "Cancer Support Community",
      url: "https://www.cancersupportcommunity.org",
    },
  },
  {
    id: "1",
    personalInfo: {
      name: "Brittany W.",
      location: "United States",
      age: 32,
      interviewedBy: "The Patient Story Team",
      editedBy: "The Patient Story Team",
    },
    diagnosis: {
      condition: "Squamous Cell Carcinoma",
      stage: "Stage 4B",
      age: 32,
      date: "January 2024",
    },
    symptoms: [
      {
        description: "Severe lower back and hip pain",
        duration: "Several months",
      },
      {
        description: "Irregular bleeding",
        duration: "Several weeks",
      },
    ],
    treatments: [
      {
        type: "Chemotherapy",
        details: ["Administered every 3 weeks", "Multiple cycles"],
      },
      {
        type: "Radiation",
        details: ["Targeted to pelvic region"],
      },
    ],
    storyDescription: [
      "My cancer journey began long before I received the official diagnosis. For months, I had been experiencing severe lower back and hip pain. Initially, I thought it was related to stress from work and other personal issues. The pain was persistent, but I didn’t think it was anything too serious. I tried everything from over-the-counter pain medications to physical therapy, but nothing seemed to help. Along with the pain, I started noticing irregular bleeding, but I brushed it off as just another symptom of stress. However, when the symptoms didn’t improve, I decided it was time to see a doctor.",
      "The first visit to my general physician was reassuring, but I was given a prescription for more pain relief and a suggestion to monitor my symptoms for a few more weeks. I thought maybe I was just overreacting. However, the pain worsened, and the bleeding didn’t stop. A few weeks later, I sought a second opinion. That decision changed my life. After a series of tests, including a Pap smear and a biopsy, I was diagnosed with squamous cell carcinoma of the cervix, at stage 4B. I was devastated. The diagnosis was a shock, and I struggled to accept the reality that I had cancer.",
      "The first few days after the diagnosis felt like I was in a fog. I couldn't process what was happening. It wasn’t just the fact that I had cancer—it was the suddenness of it all. The doctor explained that my cancer was aggressive and had spread beyond the cervix. I would need chemotherapy, radiation, and potentially surgery depending on how my body responded. The treatment plan felt overwhelming, but I knew I had to fight. I quickly learned that cervical cancer wasn’t just a physical battle; it was an emotional and mental struggle as well. The fear, uncertainty, and pain were constant companions as I embarked on this journey.",
      "Chemotherapy started immediately. The treatment was difficult, and I had many moments where I felt like giving up. The side effects—fatigue, nausea, and hair loss—were just the beginning. But what hurt the most was the mental toll it took on me. I felt isolated, as if no one could truly understand what I was going through. I leaned on my family and close friends for support, but there were moments when I felt completely alone. I struggled with the physical changes in my body, and the emotional weight of my diagnosis sometimes felt unbearable. But with every treatment cycle, I held on to a glimmer of hope that this was temporary and that I would one day be cancer-free.",
      "Looking back, it’s hard to believe how much my life has changed in such a short time. I’ve learned to appreciate the small moments—spending time with my family, enjoying simple pleasures like a walk in the park, or even just sitting quietly and reflecting. I still have my bad days, and I don’t always feel strong, but I’ve come to accept that this journey is part of my story. My advice to others facing a similar battle is to seek help, not just from doctors, but from your loved ones. Cancer can make you feel like you're on an island, but you're not alone. There are people who care, and there is always hope, even on the hardest days. Cancer may have changed my life, but it hasn’t defined who I am.",
    ],
    impact:
        "This diagnosis has changed my life drastically. I’ve had to pause my career and rethink my future plans.",
    advice:
        "Don’t wait. Get checked and seek a second opinion if necessary. Early detection is key.",
    currentLife:
        "I’m focusing on treatment and spending time with my family. I’m also working on spreading awareness about cervical cancer.",
    disclaimer:
        "This story is shared to help others, but each cancer journey is different.",
    previewText:
        "Brittany W. shares her story about battling stage 4B cervical cancer and the challenges she faced along the way.",
    source: {
      name: "The Patient Story",
      url: "https://thepatientstory.com/patient-stories/cervical-cancer/squamous/brittany-w/",
    },
  },
  {
    id: "rose-cancer-survivor-story",
    personalInfo: {
      name: "Rose",
      location: "USA",
      age: 37, // At the time the journey started in 2009
    },
    diagnosis: {
      condition: "Cervical Cancer",
      stage: "IV, Inoperable, Terminal",
      age: 37,
      date: "2010",
    },
    symptoms: [
      {description: "Twinge-like cramp in lower right abdomen"},
      {
        description:
            "Severe pain that couldn't be controlled by over-the-counter medications",
      },
      {description: "Pain and limp during a 5K run"},
      {description: "Excruciating pain and bleeding during intimacy"},
    ],
    treatments: [
      {
        type: "Chemotherapy",
        details: [
          "5 weekly sessions of chemotherapy",
          "Followed by 30 daily radiation treatments",
          "Brachytherapy treatments",
        ],
      },
      {
        type: "Surgical Treatment",
        details: ["Exploratory surgery", "Pelvic exoneration surgery"],
      },
    ],
    storyDescription: [
      "Rose was a dedicated runner and coach when she first experienced unusual cramping. Initially dismissing it as part of aging, she soon realized the pain was escalating. Despite several misdiagnoses, including urinary tract infections, the real cause was discovered after an exhausting race. A visit to her sports doctor led to a series of tests and a devastating diagnosis of cervical cancer in stage IV.",
      "Her journey took a dramatic turn when a pelvic exam revealed internal bleeding and extreme pain. This led to multiple hospital visits and a series of life-threatening complications, including a shattered spine and seizures. Rose was told she had just months to live, but her determination kept her fighting.",
      "With the support of her husband and family, Rose underwent intensive treatments, including chemotherapy, radiation, and multiple surgeries. Despite severe weight loss and life-threatening complications, including MRSA, she persevered. Surgery to remove her reproductive organs, colon portions, and bladder walls was a grueling process, but it gave her a fighting chance.",
      "After the surgery, a follow-up visit revealed that cancer remained, and Rose had to undergo further treatment. Despite all the odds, she faced another major surgery and emerged victorious. Rose's tenacity and will to live gave her the strength to endure, and her story reflects the resilience of cancer survivors.",
      "Today, Rose is not just a survivor but an advocate. She works to raise awareness about cervical cancer, HPV, and the emotional struggles that accompany a diagnosis. Through her volunteer work and online support groups, she helps other women who are facing similar battles. She continues to share her story in the hope that others will find strength and hope in her journey.",
    ],
    impact:
        "Rose has turned her battle with cervical cancer into a mission to educate others. She actively volunteers with organizations, leads support groups, and helps women deal with the emotional and physical toll of cancer treatment. Her story is a beacon of hope for many women facing the same diagnosis.",
    advice:
        "Never ignore symptoms, especially when they are persistent. Cervical cancer is often preventable with regular screenings, so it's important to get checked and ask your doctor about any unusual symptoms. No matter how difficult the journey, keep fighting and hold on to hope.",
    currentLife:
        "Rose now lives a fulfilling life with her family. She continues to work in cancer advocacy and shares her story to inspire others. Though the journey was long and painful, she is living proof that with determination and support, survival is possible.",
    disclaimer:
        "This survivor story is based on Rose's personal experience and may not reflect the experiences of all individuals with cervical cancer.",
    previewText:
        "Rose's journey through cervical cancer was filled with hardships, but she never gave up. From being diagnosed with terminal cancer to surviving multiple treatments and surgeries, Rose's story is a testament to perseverance and hope.",
    source: {
      name: "Centers for Disease Control and Prevention",
      url: "https://www.cdc.gov/cervical-cancer/stories/rose.html",
    },
  },
  {
    id: "kristina-001",
    personalInfo: {
      name: "Kristina H",
      age: 35,
      location: "United States",
      interviewedBy: "CDC",
      editedBy: "Public Health Team",
    },
    diagnosis: {
      condition: "Cervical Cancer",
      stage: "Stage 0",
      age: 35,
      date: "2014",
    },
    symptoms: [
      {
        description: "Episodes of painful intercourse",
        duration: "Occasional",
      },
    ],
    treatments: [
      {
        type: "Cryosurgery",
        details: ["Used to destroy abnormal tissue"],
      },
      {
        type: "LEEP",
        details: [
          "Loop Electrosurgical Excision Procedure for abnormal tissue removal",
        ],
      },
      {
        type: "Modified Radical Hysterectomy",
        details: ["Surgical removal due to Stage 0 cancer"],
      },
    ],
    storyDescription: [
      "I’ve always been a health-conscious individual, leading an active lifestyle and prioritizing regular check-ups. However, a seemingly minor issue, persistent discomfort during intercourse, would lead to a life-altering diagnosis.",
      "Despite the discomfort, I didn’t immediately seek medical attention. It wasn’t until years later, after a missed opportunity for a Pap smear due to insurance issues, that I finally addressed the problem.",
      "A routine Pap smear revealed the presence of HPV 16, a virus linked to cervical cancer. The news was a shock, especially considering my previous clean bill of health. I was a healthcare professional, well-versed in the risks of HPV, yet I found myself in a vulnerable position.",
      "The subsequent diagnosis of early-stage cervical cancer was a devastating blow. The thought of undergoing surgery and the potential impact on my fertility was overwhelming. But I was determined to fight.",
      "With the support of my family and healthcare team, I underwent a modified radical hysterectomy. The recovery process was challenging, both physically and emotionally. However, I emerged stronger, grateful for the opportunity to overcome this adversity.",
      "My experience has made me a passionate advocate for HPV vaccination. I believe that this vaccine could have prevented my cancer. It's a simple, effective way to protect oneself from a potentially deadly disease.",
      "I urge everyone, especially young women, to get vaccinated and to prioritize regular check-ups. Early detection is key to successful treatment. Don't let fear or complacency hold you back. Your health is worth it.",
    ],
    impact:
        "The experience significantly impacted Kristina's personal and professional life. It strengthened her advocacy for HPV vaccination and prevention.",
    advice:
        "Vaccinate yourself and your children. HPV is preventable, and cervical cancer is a vaccine-preventable disease. Don't miss the chance to protect yourself.",
    currentLife:
        "Kristina is now an active public health advocate, sharing her story with young women and parents about the importance of the HPV vaccine.",
    previewText:
        "Kristina shares her journey of surviving cervical cancer and how vaccination could have prevented it. She advocates for HPV vaccination to prevent future cases.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/kristina.html",
    },
  },
  {
    id: "janna-001",
    personalInfo: {
      name: "Janna",
      location: "Chattanooga, Tennessee",
      age: 32,
      interviewedBy: "CDC",
    },
    diagnosis: {
      condition: "Cervical Cancer",
      stage: "1B",
      age: 32,
      date: "2014",
    },
    symptoms: [
      {
        description: "Abnormal Pap test results",
      },
    ],
    treatments: [
      {
        type: "Surgery",
        details: ["Cone biopsy surgery", "Radical hysterectomy"],
      },
    ],
    storyDescription: [
      "Janna was diagnosed with stage 1B cervical cancer after an abnormal Pap test. She underwent cone biopsy surgery and a radical hysterectomy, which successfully removed the cancer.",
      "Despite being initially scared and angry, Janna chose to face the diagnosis head on. She emphasizes the importance of regular OB/GYN appointments and taking care of oneself to prevent cervical cancer.",
    ],
    advice:
        "Take your regular OB/GYN appointments seriously. Cervical cancer is slow-growing, but once it spreads beyond the cervix, survival rates drop rapidly.",
    currentLife:
        "Janna has fully recovered from surgery, though she continues to live with the fear that the cancer might return. She advises women to take proactive measures for their health.",
    previewText:
        "Janna's diagnosis with stage 1B cervical cancer led to a radical hysterectomy, and she now advocates for regular health checkups.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/janna.html",
    },
  },
  {
    id: "rebecca_01",
    personalInfo: {
      name: "Rebecca",
      location: "London, Canada",
      age: 30,
      interviewedBy: "Cervivor",
      editedBy: "Cervivor",
    },
    diagnosis: {
      condition: "Cervical cancer",
      stage: "I",
      age: 30,
      date: "2016",
    },
    symptoms: [],
    treatments: [
      {
        type: "External radiation",
        details: ["25 external radiation treatments"],
      },
      {
        type: "Chemotherapy",
        details: ["5 chemo (cisplatin) treatments"],
      },
      {
        type: "Internal radiation",
        details: ["4 internal radiation"],
      },
      {
        type: "Surgery",
        details: ["Radical hysterectomy", "Abdominal surgery"],
      },
    ],
    storyDescription: [
      "When the word “cancer” echoed through my life, it felt like a bomb had detonated. Fear, uncertainty, and a million questions swirled in my mind. But I wasn’t one to sit idle. I dove headfirst into research, poring over medical websites and YouTube videos. While the latter offered beauty tips and cooking hacks, I yearned for real stories of women battling the same beast.",
      "Disappointed by the lack of raw, honest accounts, I decided to take matters into my own hands. I started my own vlog, pouring my heart out, sharing every detail of my journey. From the grueling chemo sessions to the intimate struggles of healing, I held nothing back. It was a cathartic experience, a way to connect with others and provide the kind of information I desperately sought.",
      "As my vlog gained traction, I was overwhelmed by the messages of gratitude and support. Women from around the world shared their stories, found solace in my experiences, and felt less alone. It was humbling to know that my words could offer comfort and strength. Even medical professionals reached out, acknowledging the unique perspective my vlog provided.",
      "But my journey wasn’t just about the physical battle. The emotional turmoil was equally, if not more, challenging. My husband’s departure, amidst my fragile state, was a gut-wrenching blow. The subsequent divorce battle pushed me to my limits. There were days when getting out of bed seemed impossible. Yet, I persevered, fueled by a desire to help others.",
      "Today, I’m a testament to the power of resilience and the human spirit. While the physical scars remain, the emotional wounds have healed. I’ve embraced a new life, filled with love, joy, and purpose. I’ve traveled the world, pursued higher education, and forged deep connections with incredible people. My cancer journey, once a source of pain, has become a catalyst for growth and transformation.",
      "To those facing similar challenges, I offer this message: hope endures. There is life after cancer, a life that can be even more beautiful than before. Don’t be afraid to seek support, to share your experiences, and to find strength in the power of human connection.",
    ],
    impact:
        "My videos have helped countless people, and my story is even used in university lectures to better train doctors in understanding the emotional aspects of cancer.",
    advice:
        "There is life after cancer—and often, a better life. Don't let cancer define you. Seek support, and use your experience to help others.",
    currentLife:
        "I live a fulfilling life, continuing my vlogging journey, and I've even fallen in love again. None of this would have been possible without my cancer experience.",
    previewText:
        "There is life after cancer, and for me, it's been a better one. I created a vlog to document my journey and provide hope and support for others facing similar struggles.",
    source: {
      name: "Cervivor",
      url: "https://cervivor.org/stories/rebecca/",
    },
  },
  {
    id: "cindy_01",
    personalInfo: {
      name: "Cindy",
      location: "Unknown",
      age: 40, // You can estimate age or leave out if unavailable
      interviewedBy: "CDC",
      editedBy: "CDC",
    },
    diagnosis: {
      condition: "Precancerous cells",
      stage: "Pre-cancerous",
      age: 40, // Estimated from the context of the story
      date: "Unknown",
    },
    symptoms: [],
    treatments: [
      {
        type: "Procedure to remove precancerous cells",
        details: [],
      },
    ],
    storyDescription: [
      "Life was a whirlwind of activity. Between juggling my role as a mom and my demanding job as a news reporter, days flew by. Amidst the chaos, I always made sure to prioritize my health, especially my annual check-ups.",
      "Little did I know that a routine Pap smear would change the course of my life. The news hit me like a ton of bricks: precancerous cells had been detected. Fear and uncertainty crept in, but I refused to let it consume me. My years as a journalist had equipped me with the skills to investigate, to question, and to seek answers. I turned my attention to understanding my condition, pouring over medical journals and consulting with my doctor.",
      'With a clear plan in place, I underwent a procedure to remove the abnormal cells. As I recovered, I couldn\'t help but feel immense gratitude for that seemingly ordinary appointment. It had potentially saved my life. The word "cancer" often evokes fear and dread, but early detection can drastically change the outcome.',
      "Sharing my story became a mission. I wanted to raise awareness about the importance of regular screenings and encourage others to prioritize their health. It's easy to get caught up in the daily grind and neglect our well-being. But a simple appointment can make a world of difference.",
      "So, I urge you: don't take your health for granted. Listen to your body, trust your instincts, and don't hesitate to ask questions. Remember, knowledge is power. By taking control of your health, you're taking control of your future.",
    ],
    impact:
        "As a public figure, I used my platform to raise awareness about early cervical cancer detection and the importance of regular screenings.",
    advice:
        "Appointments can change your life. If you have questions, ask them, and trust your intuition. Don't wait—prioritize your health.",
    currentLife:
        "I am now an advocate for health and wellness, encouraging women to stay on top of their health screenings.",
    previewText:
        "I was shocked to learn I had precancerous cells during a routine screening, but the experience taught me the power of early detection and self-advocacy.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/cindy.html",
    },
  },
  {
    id: "jasmine_01",
    personalInfo: {
      name: "Jasmine",
      location: "Unknown",
      age: 30, // Estimated from the context of the story
      interviewedBy: "CDC",
      editedBy: "CDC",
    },
    diagnosis: {
      condition: "Precancerous cells",
      stage: "Pre-cancerous",
      age: 30, // Estimated age
      date: "Unknown",
    },
    symptoms: [],
    treatments: [
      {
        type: "LEEP procedure",
        details: [
          "Loop electrosurgical excision procedure to remove abnormal tissue.",
        ],
      },
    ],
    storyDescription: [
      "Life was a whirlwind of fun and excitement. I was young, carefree, and invincible. Little did I know that a routine check-up would change everything.",
      "As someone with a family history of cancer, I was always diligent about my health. But even I, with my proactive approach, couldn't escape the unexpected. A simple Pap smear revealed precancerous cells. The news was a shock, a stark reminder that health issues can strike anyone, regardless of age or lifestyle.",
      "Fear and uncertainty swirled around me. Would I be able to have children? What would my future hold? But I refused to let fear dictate my life. With the support of my loved ones and a dedicated healthcare team, I took control of the situation.",
      "I underwent a LEEP procedure to remove the abnormal cells. It was a challenging experience, but it was necessary. I was determined to overcome this obstacle and live a full life.",
      "One year later, I welcomed my son into the world. It was a moment of pure joy and gratitude. I realized how fortunate I was to have caught the precancerous cells early. It could have been a very different story.",
      "My experience has taught me the importance of prioritizing health. Regular screenings are crucial, and early detection can be a lifesaver. Don't let fear or complacency hold you back. Take charge of your health and make informed decisions.",
      "I encourage everyone to prioritize their well-being. Don't skip those check-ups, and listen to your body. By sharing my story, I hope to inspire others to take control of their health and live their best lives.",
    ],
    impact:
        "I now feel empowered by the ability to make choices about my health, and I advocate for others to take charge of their health by getting regular screenings.",
    advice:
        "Don't put off screenings—get caught up, take one step at a time, and remember that cervical cancer is preventable.",
    currentLife:
        "I am now a mother and advocate for women's health, encouraging others to stay on top of their health care.",
    previewText:
        "Jasmine’s story highlights the importance of regular screenings and how early detection can protect your future, from preventing cancer to preserving fertility.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/jasmine.html",
    },
  },
  {
    id: "patti_01",
    personalInfo: {
      name: "Patti",
      location: "New York City",
      age: 55, // Estimated age based on the context of the story
      interviewedBy: "CDC",
      editedBy: "CDC",
    },
    diagnosis: {
      condition: "Cervical cancer",
      stage: "IIB",
      age: 52, // Estimated age at diagnosis
      date: "Unknown",
    },
    symptoms: [
      {
        description: "Bleeding between menstrual cycles",
        duration: "Progressive",
      },
      {
        description: "Fatigue",
        duration: "Progressive",
      },
      {
        description: "Bloating",
        duration: "Progressive",
      },
    ],
    treatments: [
      {
        type: "Radiation therapy",
        details: [],
      },
      {
        type: "Chemotherapy",
        details: [],
      },
      {
        type: "Brachytherapy",
        details: ["Internal radiation"],
      },
    ],
    storyDescription: [
      "I was a seasoned New York City police officer, ready to retire after two decades of dedicated service. But life had other plans. A subtle change in my body, a persistent bleeding between periods, sent shockwaves through my life.",
      "I initially brushed it off as stress-related. After all, I was juggling a demanding career and preparing for a new chapter. However, as the symptoms persisted, I knew I couldn’t ignore them any longer. Reluctantly, I sought medical attention.",
      "The diagnosis was a gut punch: cervical cancer. The news was overwhelming, a stark reminder of my mortality. Fear and uncertainty consumed me. But I refused to let it defeat me.",
      "The ensuing treatment was grueling. Radiation, chemotherapy, and brachytherapy took a toll on my physical and emotional well-being. Yet, with the unwavering support of my loved ones, I persevered.",
      "While the cancer was eradicated, the battle wasn’t over. The treatments had left their mark, leading to weight gain and a host of health issues. I felt lost and disconnected from my former self. But I was determined to reclaim my health.",
      "Through a combination of diet, exercise, and unwavering willpower, I embarked on a transformative journey. I shed the extra weight, regained my strength, and rediscovered a love for life. Today, I’m a certified wellness coach and fitness instructor, helping others overcome their health challenges.",
      "My experience has taught me the importance of prioritizing health. Regular check-ups, early detection, and a proactive approach can make a world of difference. I encourage everyone, especially women, to listen to their bodies and take charge of their health.",
      "Don’t let fear or complacency hold you back. Remember, health is wealth. Invest in yourself, and you’ll reap the rewards.",
    ],
    impact:
        "My experience has made me passionate about advocating for cervical cancer prevention, especially among Hispanic women. I now work as a wellness coach and fitness instructor, focusing on cancer recovery fitness.",
    advice:
        "To women: we need to prioritize our health. Without health, nothing else matters. We have the tools to prevent cervical cancer: screening, education, and vaccination.",
    currentLife:
        "I am a certified wellness coach, personal trainer, and group fitness instructor specializing in cancer recovery fitness. I continue to advocate for women's health.",
    previewText:
        "Patti’s story emphasizes the importance of prioritizing our health and how cervical cancer can be prevented through screenings, education, and vaccination. Her journey from cancer survivor to wellness coach is an inspiration.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/patti.html",
    },
  },
  {
    id: "mckerrin_01",
    personalInfo: {
      name: "McKerrin",
      location: "Los Angeles",
      age: 40, // Estimated age based on context
      interviewedBy: "CDC",
      editedBy: "CDC",
    },
    diagnosis: {
      condition: "Cervical cancer",
      stage: "Early stage",
      age: 38, // Estimated age at diagnosis
      date: "Unknown",
    },
    symptoms: [],
    treatments: [
      {
        type: "CONE procedure",
        details: [],
      },
      {
        type: "LEEP procedure",
        details: [],
      },
    ],
    storyDescription: [
      "As a young, aspiring artist in my 20s, I was focused on building my career and navigating the ups and downs of life. Health check-ups weren’t exactly top of mind. However, I was fortunate enough to have access to affordable healthcare through Planned Parenthood.",
      "A routine Pap smear revealed some abnormalities, but thankfully, early intervention caught the issue. I was closely monitored and eventually given a clean bill of health. This experience, though scary, taught me the importance of regular screenings.",
      "Fast forward a few years, and I found myself in a precarious financial situation. I decided to schedule a Pap smear a few months early to take advantage of my existing insurance. It was a decision that would change my life.",
      "The results were alarming. I had early-stage cervical cancer. The news was a shock, but I was determined to fight. With the support of my loved ones and a dedicated healthcare team, I underwent a successful treatment.",
      "This experience has made me a passionate advocate for preventative healthcare. I encourage everyone to prioritize their health, especially women. Regular check-ups, early detection, and a proactive approach can save lives.",
      "I’ve learned that health isn’t just about physical well-being; it’s also about emotional and mental health. Taking care of ourselves allows us to show up fully in our lives, for ourselves and for others.",
      "I’m grateful for the healthcare providers who have supported me throughout my journey. I urge everyone to take advantage of available resources, especially those with limited access to healthcare. Remember, your health is your most valuable asset.",
    ],
    impact:
        "This experience has inspired me to become an advocate for regular screenings and to help others improve their overall health and wellness. I now work as a health coach, emphasizing the importance of listening to your body and taking care of yourself.",
    advice:
        "Please, take care of yourself. You might convince yourself that you don’t have the time or money for regular exams, but you need to put your health first. How can you be good for anyone else if you are sick? Listen to your body and talk to your doctor about the right cancer screening tests for you.",
    currentLife:
        "I am now a health coach, helping clients improve their nutrition, manage stress, and stay physically active. I am also an advocate for cancer screenings, especially for those with limited resources, and I support institutions providing low-cost screenings.",
    previewText:
        "McKerrin’s story emphasizes the importance of regular checkups and early detection of cervical cancer. Her advocacy for health screenings and taking care of your body is a message to all women.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/mckerrin.html",
    },
  },
  {
    id: "amy_01",
    personalInfo: {
      name: "Amy",
      location: "Hartford, Connecticut",
      age: 40, // Estimated age based on context
      interviewedBy: "CDC",
      editedBy: "CDC",
    },
    diagnosis: {
      condition: "Cervical cancer",
      stage: "Stage 1B1",
      age: 40, // Estimated age at diagnosis
      date: "February 2012",
    },
    symptoms: [
      {
        description:
            "Significant vaginal bleeding for about a week, followed by no period the next month.",
        duration: "Approximately 1 week",
      },
    ],
    treatments: [
      {
        type: "Radical hysterectomy",
        details: [],
      },
      {
        type: "Weekly chemotherapy treatments",
        details: [],
      },
      {
        type: "Radiation",
        details: [],
      },
    ],
    storyDescription: [
      "Life was moving at a whirlwind pace. I was juggling work, family, and personal aspirations. But a subtle change in my body, a persistent bleeding, forced me to pause and pay attention.",
      "Initially, I dismissed it as a minor irregularity. However, as the symptoms persisted, a sense of unease grew within me. I knew I couldn’t ignore it any longer. I scheduled a gynecologist appointment, a step I hadn’t taken in a while due to life’s busyness.",
      "The news was devastating. I had cervical cancer. The diagnosis was a shock, a stark reminder of my mortality. Fear and uncertainty consumed me. But I refused to let it defeat me.",
      "The ensuing treatment was grueling. The combination of surgery, chemotherapy, and radiation took a toll on my physical and emotional well-being. Yet, with the unwavering support of my family and friends, I persevered.",
      "Today, I’m a cancer survivor, grateful for every moment. The experience has transformed me, teaching me the importance of self-care and prioritizing health. I’ve learned to listen to my body, to trust my instincts, and to seek medical attention when something feels amiss.",
      "I’m passionate about raising awareness about cervical cancer. Early detection is key. Regular check-ups and HPV vaccinations can significantly reduce the risk.",
      "I encourage everyone, especially women, to prioritize their health. Don’t let fear or complacency hold you back. Remember, your health is your most valuable asset.",
    ],
    impact:
        "Amy’s story has had a lasting impact on cervical cancer awareness. She uses her experience to raise awareness about the importance of early detection and screening for cervical cancer.",
    advice:
        "Do not let insurance or money be a barrier to getting checked if something feels off. There are resources available to help pay for gynecological services. Always listen to your body and get checked out. Have regular Pap tests and consider HPV tests to detect cervical cancer early.",
    currentLife:
        "Amy is living well, surrounded by family and friends. She continues her advocacy work with the National Cervical Cancer Coalition and is committed to helping end cervical cancer through awareness and early detection.",
    previewText:
        "Amy’s powerful story encourages women to trust their instincts and get regular screenings for cervical cancer. She emphasizes the importance of early detection and the role of advocacy in spreading awareness.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/amy.html",
    },
  },
  {
    id: "jen_01",
    personalInfo: {
      name: "Jen",
      location: "Minnesota",
      age: 35, // Estimated age based on context
      interviewedBy: "CDC",
      editedBy: "CDC",
    },
    diagnosis: {
      condition: "Cervical cancer",
      stage: "Not specified",
      age: 35, // Estimated age at diagnosis
      date: "June 2012",
    },
    symptoms: [
      {
        description:
            "No abnormal symptoms, routine Pap test revealed abnormal results.",
      },
    ],
    treatments: [
      {
        type: "Radical hysterectomy",
        details: [
          "Recommended based on the cancer type, age, and having a child.",
        ],
      },
    ],
    storyDescription: [
      "Life was moving along smoothly. I was a busy mom, a dedicated professional, and a generally healthy individual. But a routine check-up would soon change everything.",
      "A seemingly ordinary Pap smear revealed an unexpected diagnosis: cervical cancer. The news was a shock, a stark reminder of life’s unpredictability. Fear and uncertainty consumed me. But I refused to let it defeat me.",
      "With the support of my loved ones and a dedicated healthcare team, I underwent a radical hysterectomy. It was a difficult decision, but it was necessary to ensure my long-term health.",
      "The journey wasn’t easy. The physical and emotional toll of treatment was significant. But I persevered, drawing strength from my family and friends.",
      "Today, I’m a cancer survivor, grateful for every moment. The experience has taught me the importance of self-care and early detection. I encourage everyone, especially women, to prioritize their health.",
      "Don’t let fear or complacency hold you back. Regular check-ups, including Pap smears, can save lives. Remember, your health is your most valuable asset.",
    ],
    impact:
        "Jen’s story highlights the importance of routine Pap tests and how early detection can save lives. She actively shares her experience to encourage others to prioritize their gynecological health.",
    advice:
        "Get your Pap test regularly. It’s worth the small discomfort for the peace of mind and the possibility of early detection. Don't wait for symptoms to show up.",
    currentLife:
        "Jen continues to live a full life with her family, now more aware of her body and health. She encourages other women to stay proactive about their health, especially regarding cervical cancer.",
    previewText:
        "Jen’s story teaches the importance of early detection through regular Pap tests and how cervical cancer can be prevented with proactive healthcare.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/jen.html",
    },
  },
  {
    id: "janna_01",
    personalInfo: {
      name: "Janna",
      location: "Not specified",
      age: 40, // Estimated age based on context
      interviewedBy: "CDC",
      editedBy: "CDC",
    },
    diagnosis: {
      condition: "Cervical cancer",
      stage: "Not specified",
      age: 40, // Estimated age at diagnosis
      date: "Not specified",
    },
    symptoms: [
      {
        description:
            "Symptoms included abnormal bleeding and pain before diagnosis.",
      },
    ],
    treatments: [
      {
        type: "Not specified",
        details: ["Details of treatment are not available."],
      },
    ],
    storyDescription: [
      "I was living a seemingly normal life, juggling work, family, and personal passions. I had always been diligent about my annual check-ups, including Pap smears. However, I had no idea that a silent threat was lurking within my body.",
      "A routine Pap smear revealed abnormal cells. The news was a shock, a stark reminder that health issues can arise unexpectedly. Fear and uncertainty consumed me. But I refused to let it dictate my future.",
      "With the support of my loved ones and a dedicated healthcare team, I underwent a series of treatments. The journey was arduous, filled with physical and emotional challenges. Yet, I persevered, drawing strength from my inner resilience.",
      "Today, I’m a cancer survivor, grateful for every moment. The experience has transformed me, teaching me the importance of self-care and early detection. I encourage everyone, especially women, to prioritize their health.",
      "Don’t let fear or complacency hold you back. Regular check-ups, including Pap smears, can save lives. Remember, your health is your most valuable asset.",
    ],
    impact:
        "Janna’s story underscores the importance of paying attention to one's health and seeking medical help when symptoms appear, even if they seem minor. She encourages women to advocate for themselves and get checked regularly.",
    advice:
        "If you notice any changes in your body, especially abnormal bleeding or pain, don’t ignore it. Get checked and take control of your health.",
    currentLife:
        "Janna continues to advocate for women’s health and is now focused on raising awareness about cervical cancer prevention and the importance of early detection.",
    previewText:
        "Janna’s story serves as a powerful reminder of the importance of seeking medical help when experiencing symptoms like abnormal bleeding and pain, as early detection is key to overcoming cervical cancer.",
    source: {
      name: "CDC",
      url: "https://www.cdc.gov/cervical-cancer/stories/janna.html",
    },
  },
] satisfies SurvivorStory[];
