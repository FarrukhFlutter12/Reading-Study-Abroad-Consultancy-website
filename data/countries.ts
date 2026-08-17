/**
 * Destination content.
 *
 * EDITING RULE — read before changing anything here:
 * Keep every description evergreen. Do NOT add tuition figures, visa fees,
 * processing times, or post-study work durations. Those change every intake and
 * publishing them exposes the business to liability. Route all specifics to a
 * counselling CTA instead.
 */

export type CountryFaq = { q: string; a: string };

export type Country = {
  slug: string;
  name: string;
  /**
   * Only set where the country name needs an article after "Study in …".
   * "Study in United Kingdom" is wrong; "Study in the United Kingdom" is not.
   */
  articleName?: string;
  flag: string; // /flags/uk.svg
  hero: string; // /destinations/uk.jpg
  blurb: string; // one line, used on the grid card
  intro: string[]; // 2–3 paragraphs
  highlights: string[]; // 4–6 bullets
  popularCourses: string[];
  requirements: string[];
  documents: string[];
  intakes: string[];
  processSteps: string[];
  faqs: CountryFaq[];
  tuitionNote: string;
  languageOfInstruction: string;
  region: "United Kingdom" | "Europe" | "Asia";
};

const COMMON_TUITION_NOTE =
  "Tuition, living costs and financial requirements vary by university, city and programme, and are revised every intake. Contact us for the current figures for the course you have in mind.";

const COMMON_DOCUMENTS = [
  "Valid passport (and any previous passports)",
  "Academic transcripts and certificates (Matric, FSc/A-Levels, Bachelors as applicable)",
  "English language test result, where the university requires one",
  "Updated CV / résumé",
  "Statement of Purpose (SOP)",
  "Letters of Recommendation",
  "Passport-size photographs to the embassy's specification",
  "Financial documents and bank statement in the required format",
  "Experience letters, if you have work experience",
];

export const countries: Country[] = [
  /* ------------------------------------------------------------------ UK */
  {
    slug: "uk",
    name: "United Kingdom",
    articleName: "the United Kingdom",
    flag: "/flags/uk.svg",
    hero: "/destinations/uk.jpg",
    blurb:
      "World-ranked universities, one-year Masters options and a large Pakistani student community.",
    region: "United Kingdom",
    languageOfInstruction: "English",
    intro: [
      "The United Kingdom remains the single most popular destination for Pakistani students, and for good reason. British degrees are recognised by employers worldwide, the academic calendar is compact, and many taught Masters programmes are designed to be completed in a shorter timeframe than their equivalents elsewhere — which keeps the total cost of a postgraduate degree competitive.",
      "UK universities assess applications holistically. Your academic record matters, but so does your Statement of Purpose, your reasons for choosing a particular course, and how clearly you can explain your study plan. This is where working with an experienced counsellor makes a measurable difference: choosing a course that genuinely matches your background is the strongest thing you can do for both your admission and your visa application.",
      "Reading Study Abroad guides you from shortlisting universities through to your visa filing and pre-departure briefing. We help you build a file that is complete, consistent and easy for a visa officer to follow.",
    ],
    highlights: [
      "Instruction is in English across virtually all programmes",
      "Major intakes in September and January, with some universities offering additional entry points",
      "Wide range of universities — from research-intensive institutions to career-focused modern universities",
      "Conditional offers are common, so you can apply before your final results are issued",
      "Established Pakistani student communities in most university cities",
      "Part-time work rights during study are available under the student route, subject to current immigration rules",
    ],
    popularCourses: [
      "Business & Management",
      "Computer Science & Data Science",
      "Accounting & Finance",
      "Public Health",
      "Civil & Mechanical Engineering",
      "Law (LLM)",
      "Nursing & Healthcare Management",
      "International Relations",
      "Project Management",
      "Cyber Security",
    ],
    requirements: [
      "Completed Intermediate / A-Levels for undergraduate entry, or a recognised Bachelors degree for postgraduate entry",
      "Academic grades that meet the individual university's published entry criteria",
      "Proof of English proficiency — usually IELTS, PTE or an accepted alternative, unless the university offers an internal assessment",
      "A clear, well-argued Statement of Purpose explaining your course and career plan",
      "Evidence that you can meet the tuition and living cost requirements set by the university and the immigration rules",
      "A credible study plan — you should be able to explain your choices confidently at interview",
    ],
    documents: COMMON_DOCUMENTS,
    intakes: ["September", "January", "May (selected universities)"],
    processSteps: [
      "Free counselling session to map your profile against realistic university options",
      "Shortlist courses and universities, and confirm entry requirements for the intake you are targeting",
      "Prepare your SOP, CV and references, then submit applications",
      "Receive and review offer letters, then accept your chosen offer",
      "Arrange financial documentation in the format the immigration rules require",
      "Complete your CAS, pay the required fees and file the student visa application",
      "Attend biometrics, prepare for any credibility interview, and complete pre-departure briefing",
    ],
    faqs: [
      {
        q: "Do I need IELTS to study in the UK?",
        a: "Most universities ask for evidence of English proficiency, and IELTS is the most widely accepted test. Some institutions accept PTE, Duolingo or their own internal assessment for certain programmes. The requirement depends on the university and the course level, so confirm with us before you book a test.",
      },
      {
        q: "Can I apply before my final results are announced?",
        a: "Yes. UK universities routinely issue conditional offers based on your interim transcripts, and the condition is cleared once your final result is available. Applying early usually gives you a better choice of courses.",
      },
      {
        q: "How much bank balance do I need to show?",
        a: "The financial requirement depends on your tuition fee, your course length and the city you will live in, and the thresholds are revised periodically. We calculate the exact figure for your case during counselling and guide you on the format the statement must be in.",
      },
      {
        q: "Can I work while studying in the UK?",
        a: "The student route generally permits limited part-time work during term time, with the exact hours set by current immigration rules and the conditions printed on your visa. Treat any earnings as support money, not as a way to fund your tuition.",
      },
      {
        q: "Will a previous visa refusal stop my UK application?",
        a: "Not automatically. A previous refusal must be declared honestly and addressed properly in your new application. We review the refusal reasons with you and build the file so that the earlier concerns are answered directly.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* -------------------------------------------------------------- CYPRUS */
  {
    slug: "cyprus",
    name: "Cyprus",
    flag: "/flags/cyprus.svg",
    hero: "/destinations/cyprus.jpg",
    blurb:
      "English-taught degrees on a Mediterranean island with a straightforward admission process.",
    region: "Europe",
    languageOfInstruction: "English",
    intro: [
      "Cyprus has become a practical starting point for Pakistani students who want an English-taught European degree without an unusually demanding admission process. Universities on the island deliver programmes in English, and entry criteria are generally accessible for students with a solid academic record.",
      "The island is small, safe and warm year-round, with a low-pressure student environment and living costs that are modest by European standards. Class sizes tend to be small, which suits students who prefer direct access to their lecturers.",
      "We help you understand which institutions are properly accredited, match your qualifications to the right programme, and prepare a visa file that clearly demonstrates your academic intent.",
    ],
    highlights: [
      "Programmes taught in English at both undergraduate and postgraduate level",
      "Multiple intakes across the academic year at most institutions",
      "Accessible entry criteria compared with many Western European destinations",
      "Modest living costs relative to Western Europe",
      "Small class sizes and a compact, walkable campus culture",
      "Scholarship and merit discount schemes offered by several universities",
    ],
    popularCourses: [
      "Business Administration (BBA / MBA)",
      "Computer Engineering",
      "Tourism & Hospitality Management",
      "Civil Engineering",
      "Pharmacy",
      "International Relations",
      "Psychology",
      "Architecture",
    ],
    requirements: [
      "Intermediate / A-Levels for Bachelors entry; a recognised Bachelors degree for Masters entry",
      "English proficiency evidence, or the university's own placement assessment where offered",
      "Complete and attested academic documents",
      "Financial evidence covering tuition and living costs for the study period",
      "A valid passport with sufficient remaining validity",
    ],
    documents: COMMON_DOCUMENTS,
    intakes: ["September", "January", "Summer (selected programmes)"],
    processSteps: [
      "Free counselling and profile assessment",
      "Shortlist accredited universities and confirm programme requirements",
      "Submit applications and secure your acceptance letter",
      "Attest and legalise documents as required",
      "Prepare financial documentation",
      "File the student visa application and complete embassy formalities",
      "Pre-departure briefing, accommodation and arrival planning",
    ],
    faqs: [
      {
        q: "Are degrees from Cyprus recognised in Pakistan?",
        a: "Recognition depends on the individual institution and its accreditation status. We only work with properly accredited universities, and we will show you the accreditation of any institution before you apply so you can verify it yourself.",
      },
      {
        q: "Is IELTS mandatory for Cyprus?",
        a: "Several universities accept their own English placement assessment instead of IELTS for certain programmes. Others require a formal test. Confirm with us for the specific university and course, since the policy differs between institutions.",
      },
      {
        q: "How many intakes are there per year?",
        a: "Most universities run a main September intake and a second intake in January, with some summer entry points on selected programmes. Applying early gives you a better shot at accommodation and scholarship consideration.",
      },
      {
        q: "Can family members visit while I study?",
        a: "Visitor arrangements are handled separately from the student visa and depend on the current rules and on the visitor's own documentation. Ask us during counselling and we will explain the process that applies at the time.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* ------------------------------------------------------------ BULGARIA */
  {
    slug: "bulgaria",
    name: "Bulgaria",
    flag: "/flags/bulgaria.svg",
    hero: "/destinations/bulgaria.jpg",
    blurb:
      "EU degrees at some of the most affordable living costs in Europe, with strong medical and engineering faculties.",
    region: "Europe",
    languageOfInstruction: "English and Bulgarian",
    intro: [
      "Bulgaria is an EU member state with a long-established higher education system and some of the most affordable living costs in Europe. Its medical, dental and engineering faculties have been enrolling international students for decades, and many programmes are delivered fully in English.",
      "For Pakistani students, the appeal is the combination of a European degree, a comparatively accessible admission route and a manageable cost of living. Cities such as Sofia, Plovdiv and Varna have active student populations and reasonable rents.",
      "Medical and dental programmes usually involve an entrance assessment in science subjects, so early preparation matters. We assess your subject background honestly and tell you where you stand before you invest in an application.",
    ],
    highlights: [
      "EU member state — your degree is issued within the European higher education area",
      "English-taught programmes available in medicine, dentistry, engineering and business",
      "Among the lower living costs in the EU",
      "Long-standing tradition of teaching international medical students",
      "Preparatory year options for students who need additional language or science grounding",
      "Main intake in autumn, with application windows opening well in advance",
    ],
    popularCourses: [
      "Medicine (MBBS equivalent)",
      "Dentistry",
      "Pharmacy",
      "Veterinary Medicine",
      "Computer Systems & Technologies",
      "Business Administration",
      "Civil Engineering",
      "Nursing",
    ],
    requirements: [
      "Intermediate with Biology, Chemistry and Physics for medical and dental programmes",
      "Intermediate / A-Levels for other Bachelors programmes; a Bachelors degree for Masters entry",
      "An entrance assessment in relevant science subjects for medicine and dentistry at most universities",
      "English proficiency evidence for English-taught programmes",
      "Documents legalised and attested in the sequence the university specifies",
      "Financial evidence covering tuition and living costs",
    ],
    documents: [
      ...COMMON_DOCUMENTS,
      "Medical fitness certificate, where the programme requires one",
      "Documents legalised through the prescribed attestation chain",
    ],
    intakes: ["September / October", "February (selected programmes)"],
    processSteps: [
      "Free counselling and eligibility check against faculty-specific criteria",
      "Shortlist universities and confirm entrance assessment requirements",
      "Begin document attestation early — this stage takes the longest",
      "Submit the application and sit any required entrance assessment",
      "Receive your acceptance and complete enrolment formalities",
      "Prepare financial documents and file the student visa application",
      "Pre-departure briefing, accommodation and arrival support",
    ],
    faqs: [
      {
        q: "Can I study medicine in Bulgaria in English?",
        a: "Yes, several Bulgarian universities run full English-medium medical and dental programmes for international students. Entry usually involves an assessment in Biology and Chemistry, so plan your preparation ahead of the application window.",
      },
      {
        q: "Will a Bulgarian medical degree be recognised in Pakistan?",
        a: "Returning graduates who intend to practise in Pakistan must satisfy the requirements of the relevant Pakistani regulatory body, including its registration and examination process. We will point you to the official requirements so you can verify them directly before committing.",
      },
      {
        q: "Do I need to learn Bulgarian?",
        a: "Not for the English-taught programmes. That said, most medical students take basic Bulgarian language modules because clinical rotations involve interacting with local patients, and everyday life is easier with some of the language.",
      },
      {
        q: "How early should I start my application?",
        a: "Earlier than you think. Document attestation and legalisation for Bulgaria is a multi-step process, and it is the most common reason students miss an intake. Start at least several months before the deadline.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* --------------------------------------------------------------- ITALY */
  {
    slug: "italy",
    name: "Italy",
    flag: "/flags/italy.svg",
    hero: "/destinations/italy.jpg",
    blurb:
      "Historic public universities, strong scholarship culture and English-taught degrees across major cities.",
    region: "Europe",
    languageOfInstruction: "English and Italian",
    intro: [
      "Italy hosts some of the oldest universities in the world and has invested heavily in English-taught degree programmes over the past decade. Public universities in Italy operate on an income-linked fee model, and regional scholarship schemes are a genuine, established part of the system rather than a marketing line.",
      "Design, architecture, fashion, engineering and business are Italy's standout fields, taught in cities with deep industrial and creative networks. Milan, Turin, Bologna, Rome and Padua all host large international student communities.",
      "Applications to Italy run through a structured pre-enrolment process with fixed windows and specific document requirements. Missing a step means waiting for the next cycle, so a properly managed timeline matters more here than almost anywhere else. That is exactly what we handle for you.",
    ],
    highlights: [
      "A growing catalogue of degree programmes taught entirely in English",
      "Public universities apply an income-assessed fee model",
      "Well-established regional scholarship and student support schemes",
      "Strong reputation in design, architecture, fashion, automotive and mechanical engineering",
      "Structured pre-enrolment process with fixed application windows",
      "Central location in Europe with excellent student travel connections",
    ],
    popularCourses: [
      "Fashion & Product Design",
      "Architecture",
      "Mechanical & Automotive Engineering",
      "Management Engineering",
      "Computer Science",
      "International Business",
      "Food Science & Technology",
      "Tourism Management",
    ],
    requirements: [
      "Intermediate / A-Levels for Bachelors entry; a recognised Bachelors degree for Masters entry",
      "English proficiency evidence for English-taught programmes; Italian proficiency for Italian-taught ones",
      "Completion of the official pre-enrolment procedure within the published window",
      "Declaration of Value or the equivalent document verification the university requests",
      "A portfolio for design and architecture programmes",
      "Financial evidence and accommodation arrangements as required",
    ],
    documents: [
      ...COMMON_DOCUMENTS,
      "Declaration of Value / official document verification",
      "Portfolio, for design and architecture applicants",
      "Proof of accommodation arrangement",
    ],
    intakes: ["September / October", "February (selected programmes)"],
    processSteps: [
      "Free counselling and course mapping against Italian entry criteria",
      "Shortlist universities and check scholarship eligibility windows",
      "Prepare documents for verification and translation",
      "Complete the official pre-enrolment application within the published window",
      "Secure admission and, where applicable, scholarship confirmation",
      "Book the visa appointment and prepare the full financial and accommodation file",
      "Pre-departure briefing, residence permit guidance and arrival support",
    ],
    faqs: [
      {
        q: "Are there English-taught programmes in Italy?",
        a: "Yes — a substantial and growing number, particularly at Masters level in engineering, business, design and computer science. Bachelors options in English exist too, though the catalogue is smaller.",
      },
      {
        q: "Are Italian scholarships realistic for Pakistani students?",
        a: "Regional right-to-study scholarship schemes are a real and established part of the Italian system, and Pakistani students do receive them. Eligibility is assessed on family income and academic merit, and the application has its own deadline separate from the university's. Missing that deadline is the most common reason students lose out.",
      },
      {
        q: "What is pre-enrolment and why does it matter?",
        a: "Pre-enrolment is the official step where you register your intention to study in Italy and link it to your chosen programme before applying for the visa. It runs in a fixed window each year. If you miss it, you generally wait for the next cycle regardless of how strong your admission is.",
      },
      {
        q: "Do I need to speak Italian?",
        a: "Not for English-taught degrees. Basic Italian makes daily life, part-time work and paperwork considerably easier, so we encourage students to start learning before departure.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* ----------------------------------------------------------- LITHUANIA */
  {
    slug: "lithuania",
    name: "Lithuania",
    flag: "/flags/lithuania.svg",
    hero: "/destinations/lithuania.jpg",
    blurb:
      "A fast-growing EU tech and business study hub with English-taught degrees and a compact application process.",
    region: "Europe",
    languageOfInstruction: "English",
    intro: [
      "Lithuania is one of the more efficient EU study destinations for Pakistani students. Universities deliver a broad catalogue of English-taught programmes, the admission process is relatively streamlined, and the country has built a genuine reputation in information technology, fintech and engineering.",
      "Vilnius and Kaunas are the main student cities — modern, well connected and considerably cheaper to live in than Western European capitals. The country's technology sector has expanded quickly, which matters for students who want internship and graduate exposure in a real industry environment.",
      "Because Lithuania is in the EU, your degree carries European recognition. We help you target universities that match your profile and prepare the residence permit documentation correctly the first time.",
    ],
    highlights: [
      "Full degree programmes taught in English at Bachelors and Masters level",
      "EU member state with European degree recognition",
      "Strong and growing IT, fintech and engineering sectors",
      "Living costs noticeably lower than Western Europe",
      "Relatively streamlined admission and residence permit process",
      "University-funded merit scholarships available on selected programmes",
    ],
    popularCourses: [
      "Software Engineering",
      "Information Systems & Cyber Security",
      "Business Management",
      "Finance & Banking",
      "Aeronautical Engineering",
      "Mechanical Engineering",
      "International Business & Marketing",
      "Public Health",
    ],
    requirements: [
      "Intermediate / A-Levels for Bachelors entry; a recognised Bachelors degree for Masters entry",
      "English proficiency evidence, or the university's own online English interview where accepted",
      "Recognition of your foreign qualification through the designated national body",
      "Motivation letter and, for some programmes, an online interview",
      "Financial evidence covering tuition and living costs",
    ],
    documents: [
      ...COMMON_DOCUMENTS,
      "Qualification recognition certificate from the designated national body",
      "Motivation letter",
    ],
    intakes: ["September", "February (selected programmes)"],
    processSteps: [
      "Free counselling and profile assessment",
      "Shortlist universities and confirm English requirement per programme",
      "Submit applications and complete any online interview",
      "Apply for recognition of your qualification",
      "Receive the admission letter and pay the required enrolment fees",
      "Prepare the residence permit / visa file and submit it",
      "Pre-departure briefing, accommodation and arrival support",
    ],
    faqs: [
      {
        q: "Do Lithuanian universities accept students without IELTS?",
        a: "Some programmes accept an online English interview conducted by the university instead of a formal test. Others require IELTS or an equivalent. It varies by university and course level, so confirm before booking a test.",
      },
      {
        q: "What is qualification recognition and do I need it?",
        a: "Lithuania requires foreign qualifications to be assessed by a designated national body before enrolment. It is a standard administrative step, but it takes time — starting it late is a common cause of delay.",
      },
      {
        q: "Is Lithuania a good choice for IT students?",
        a: "It is one of the stronger options in the region. The country has an active technology and fintech sector, and several universities have built their IT programmes around industry placement. As with anywhere, internships depend on your own performance and language skills.",
      },
      {
        q: "Can I travel to other European countries from Lithuania?",
        a: "Lithuania is part of the Schengen area, so travel within Schengen is generally straightforward while you hold valid residence documentation. Always carry your residence permit when travelling.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* --------------------------------------------------------------- MALTA */
  {
    slug: "malta",
    name: "Malta",
    flag: "/flags/malta.svg",
    hero: "/destinations/malta.jpg",
    blurb:
      "English-speaking EU island nation with a small, personal higher education sector.",
    region: "Europe",
    languageOfInstruction: "English",
    intro: [
      "Malta is unusual among EU destinations: English is an official language, so daily life, administration and study all happen in English. For Pakistani students who want a European qualification without a language barrier, that is a meaningful advantage.",
      "The higher education sector is small, which means personal attention and compact campuses rather than large lecture halls. Business, hospitality, IT and maritime studies are the strongest areas, reflecting the island's own economy.",
      "Places are limited precisely because the sector is small, so applications need to be submitted early and prepared carefully. We help you assess whether Malta genuinely fits your goals before you commit.",
    ],
    highlights: [
      "English is an official language — no language barrier in study or daily life",
      "EU member state with European degree recognition",
      "Small institutions with a personal, accessible teaching style",
      "Strong programmes in hospitality, tourism, business, IT and maritime studies",
      "Safe, compact island with a mild Mediterranean climate",
      "Growing international student community",
    ],
    popularCourses: [
      "Hospitality & Tourism Management",
      "Business Administration",
      "Information Technology",
      "Digital Marketing",
      "Maritime & Logistics Management",
      "Accounting & Finance",
      "Health Sciences",
    ],
    requirements: [
      "Intermediate / A-Levels for Bachelors entry; a recognised Bachelors degree for Masters entry",
      "English proficiency evidence where the institution requires it",
      "Complete and attested academic documents",
      "Confirmed accommodation arrangement, which Maltese authorities typically expect",
      "Financial evidence covering tuition and living costs",
      "Health insurance cover valid for the study period",
    ],
    documents: [
      ...COMMON_DOCUMENTS,
      "Confirmed accommodation booking or rental agreement",
      "Health insurance covering the study period",
    ],
    intakes: ["September / October", "January (selected programmes)"],
    processSteps: [
      "Free counselling and honest fit assessment",
      "Shortlist institutions and confirm available places for your intake",
      "Submit applications and secure the acceptance letter",
      "Arrange accommodation and health insurance",
      "Prepare financial documentation",
      "File the student visa application and complete embassy formalities",
      "Pre-departure briefing and arrival planning",
    ],
    faqs: [
      {
        q: "Is everything really taught in English in Malta?",
        a: "Yes. English is an official language of Malta and is used in higher education, government administration and business. Maltese is also widely spoken socially, but you will not need it for your studies.",
      },
      {
        q: "Is accommodation hard to arrange in Malta?",
        a: "The island is small and student housing is limited, so accommodation should be arranged before you travel — the authorities generally expect confirmed housing as part of your file. We help you plan this step early rather than leaving it to the last month.",
      },
      {
        q: "How large are the universities?",
        a: "Considerably smaller than in the UK or Italy. That means smaller class sizes and more direct access to teaching staff, but also a narrower range of programmes. We will tell you honestly if your intended field is better served elsewhere.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* --------------------------------------------------------- SOUTH KOREA */
  {
    slug: "south-korea",
    name: "South Korea",
    flag: "/flags/south-korea.svg",
    hero: "/destinations/south-korea.jpg",
    blurb:
      "Technology-focused universities, generous scholarship culture and a rapidly growing intake of Pakistani students.",
    region: "Asia",
    languageOfInstruction: "English and Korean",
    intro: [
      "South Korea has moved quickly up the list of destinations Pakistani students ask about, and the reasons are concrete: internationally ranked universities, deep strength in engineering and technology, and a scholarship culture that is genuinely accessible to strong applicants.",
      "Many graduate programmes — particularly in engineering, IT and the sciences — are delivered fully in English. Korean language study is usually offered alongside, and it makes a real difference to your daily life and to your prospects for internships and part-time work.",
      "Korean applications tend to reward a well-prepared, coherent profile: a focused research or study statement, clean documentation, and clear reasoning about why you chose that university. We help you build exactly that.",
    ],
    highlights: [
      "English-taught programmes widely available at Masters and PhD level",
      "Universities with a strong global research standing in engineering and technology",
      "Well-established scholarship schemes, including government-funded programmes",
      "Korean language courses generally available alongside your degree",
      "Excellent campus infrastructure, transport and student safety",
      "Multiple intakes per year at most universities",
    ],
    popularCourses: [
      "Electrical & Electronic Engineering",
      "Computer Science & AI",
      "Mechanical Engineering",
      "Business Administration",
      "Korean Studies & Language",
      "Chemical Engineering",
      "Materials Science",
      "International Development",
    ],
    requirements: [
      "Intermediate / A-Levels for Bachelors entry; a recognised Bachelors degree for Masters entry",
      "English proficiency evidence for English-taught programmes; TOPIK for Korean-taught programmes",
      "A focused study plan or research proposal — this carries real weight in Korean admissions",
      "Apostilled or consular-authenticated academic documents",
      "Financial evidence covering tuition and living costs",
      "Letters of recommendation, particularly for graduate programmes",
    ],
    documents: [
      ...COMMON_DOCUMENTS,
      "Apostille or consular authentication of academic documents",
      "Study plan or research proposal",
      "Family relation certificate, where requested",
    ],
    intakes: ["March (Spring)", "September (Fall)"],
    processSteps: [
      "Free counselling and assessment of your academic fit for Korean programmes",
      "Shortlist universities and identify scholarship options with their own deadlines",
      "Prepare your study plan, research proposal and recommendation letters",
      "Complete document apostille or authentication",
      "Submit applications and attend any online interview",
      "Receive admission and the Certificate of Admission for the visa file",
      "File the student visa application, then pre-departure and arrival support",
    ],
    faqs: [
      {
        q: "Do I need to know Korean to study in South Korea?",
        a: "Not for English-taught programmes, which are common at graduate level. Korean matters a great deal for daily life, part-time work and internships, so most students study it alongside their degree. Korean-taught programmes require TOPIK.",
      },
      {
        q: "Are scholarships in Korea realistic?",
        a: "Korea has a well-established scholarship culture, including government-funded schemes and university-level awards, and competitive applicants from Pakistan do receive them. They are merit-based and genuinely competitive — a strong academic record and a well-written study plan are what make the difference.",
      },
      {
        q: "What are the intakes?",
        a: "The Korean academic year runs on Spring (March) and Fall (September) intakes. Application windows open several months in advance and scholarship deadlines are usually earlier still, so plan backwards from them.",
      },
      {
        q: "What is apostille and do I need it?",
        a: "Apostille is an internationally recognised authentication of your documents. Korean universities and immigration authorities typically require your academic documents to be apostilled or consular-authenticated. We guide you through the correct sequence.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* ------------------------------------------------------------- HUNGARY */
  {
    slug: "hungary",
    name: "Hungary",
    flag: "/flags/hungary.svg",
    hero: "/destinations/hungary.jpg",
    blurb:
      "Central European EU destination known for medicine, engineering and a well-known government scholarship scheme.",
    region: "Europe",
    languageOfInstruction: "English and Hungarian",
    intro: [
      "Hungary combines an EU degree with living costs that stay manageable, and it has a long record of teaching international students — its medical and engineering faculties have run English-medium programmes for decades.",
      "Budapest, Debrecen, Szeged and Pécs all host substantial international student communities. The country also operates a well-known government scholarship programme that Pakistani students apply to each year, with its own separate timeline and selection process.",
      "Medical programmes require an entrance examination, and application deadlines for scholarships fall much earlier than university deadlines. Getting the calendar right is half the work, and it is the part we manage most closely.",
    ],
    highlights: [
      "EU member state with degrees recognised across the European higher education area",
      "Decades of experience delivering English-medium medical and engineering programmes",
      "A well-known government scholarship scheme with an annual application cycle",
      "Living costs lower than Western Europe, especially outside Budapest",
      "Central European location with strong travel connections",
      "Large, established international student communities in several cities",
    ],
    popularCourses: [
      "General Medicine",
      "Dentistry",
      "Pharmacy",
      "Veterinary Medicine",
      "Computer Science Engineering",
      "Mechanical Engineering",
      "Business Administration",
      "Agricultural Sciences",
    ],
    requirements: [
      "Intermediate with Biology and Chemistry for medical, dental and veterinary programmes",
      "Intermediate / A-Levels for other Bachelors programmes; a Bachelors degree for Masters entry",
      "An entrance examination and often an interview for medical programmes",
      "English proficiency evidence for English-taught programmes",
      "Medical fitness certificate for health-sciences programmes",
      "Financial evidence covering tuition and living costs",
    ],
    documents: [
      ...COMMON_DOCUMENTS,
      "Medical fitness certificate for health-sciences programmes",
      "Entrance examination result, where applicable",
    ],
    intakes: ["September", "February (selected programmes)"],
    processSteps: [
      "Free counselling and assessment against faculty-specific criteria",
      "Decide between self-funded admission and the scholarship route — the deadlines differ",
      "Prepare for and sit the entrance examination where required",
      "Submit applications and complete any interview",
      "Receive the letter of acceptance and complete enrolment",
      "Prepare financial documents and file the residence permit / visa application",
      "Pre-departure briefing, accommodation and arrival support",
    ],
    faqs: [
      {
        q: "How competitive is the Hungarian government scholarship?",
        a: "It is competitive and merit-based, with a fixed annual cycle and its own deadlines that fall well before ordinary university deadlines. Applying does not affect your ability to apply as a self-funded student in parallel, which is what we usually recommend.",
      },
      {
        q: "Is there an entrance exam for medicine in Hungary?",
        a: "Yes. Hungarian medical faculties assess applicants on Biology and Chemistry, often with an interview component. The format varies by university, and preparation should start months before the test.",
      },
      {
        q: "Are Hungarian medical degrees accepted in Pakistan?",
        a: "Graduates intending to practise in Pakistan must meet the requirements of the relevant Pakistani regulatory body, including its registration and examination process. Verify the current requirements with that body directly before you commit — we will show you where to check.",
      },
      {
        q: "Do I need to learn Hungarian?",
        a: "Not for English-taught programmes. Medical students generally take basic Hungarian because clinical rotations involve local patients, and it makes everyday life easier.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* -------------------------------------------------------------- FRANCE */
  {
    slug: "france",
    name: "France",
    flag: "/flags/france.svg",
    hero: "/destinations/france.jpg",
    blurb:
      "Globally ranked business and engineering schools, with public universities charging state-subsidised fees.",
    region: "Europe",
    languageOfInstruction: "English and French",
    intro: [
      "France offers one of the strongest value propositions in European higher education. Public universities operate on state-subsidised fees, and the country's business schools and engineering grandes écoles carry serious international reputations — particularly in management, luxury brand management, aerospace and culinary arts.",
      "English-taught Masters programmes have expanded significantly, so French is not a prerequisite for many postgraduate routes. It remains valuable for daily life, internships and employment, and most institutions provide French language support alongside your degree.",
      "Applications from Pakistan follow a structured official procedure with its own portal, interview stage and fixed calendar. We manage that timeline for you and prepare you properly for the interview, which is a genuine assessment stage rather than a formality.",
    ],
    highlights: [
      "Public universities charge state-subsidised tuition, with fee levels set nationally",
      "Internationally ranked business schools and engineering grandes écoles",
      "A wide and growing range of English-taught Masters programmes",
      "Student support schemes covering transport, housing and dining",
      "Structured official application procedure with a clear annual calendar",
      "Strong reputation in management, aerospace, fashion, hospitality and culinary arts",
    ],
    popularCourses: [
      "International Business & Management",
      "Luxury Brand Management",
      "Aerospace Engineering",
      "Computer Science",
      "Culinary Arts & Hospitality",
      "Data Science",
      "Fashion Management",
      "Civil Engineering",
    ],
    requirements: [
      "Intermediate / A-Levels for Bachelors entry; a recognised Bachelors degree for Masters entry",
      "English proficiency evidence for English-taught programmes; French proficiency (e.g. DELF/TCF) for French-taught ones",
      "Completion of the official application procedure through the designated portal",
      "An interview at the designated centre as part of the official process",
      "Financial evidence and confirmed accommodation arrangement",
      "A clear, well-reasoned motivation letter",
    ],
    documents: [
      ...COMMON_DOCUMENTS,
      "Official application portal registration and file",
      "Confirmed accommodation arrangement",
      "Motivation letter",
    ],
    intakes: ["September (main)", "January (selected programmes)"],
    processSteps: [
      "Free counselling and mapping of your profile to French institutions",
      "Shortlist universities or business schools and confirm language requirements",
      "Register on the official application portal within the published window",
      "Submit applications and prepare thoroughly for the interview stage",
      "Receive admission and complete acceptance formalities",
      "Arrange accommodation, financial documents and the visa appointment",
      "Pre-departure briefing, residence formalities and arrival support",
    ],
    faqs: [
      {
        q: "Can I study in France without knowing French?",
        a: "Yes for English-taught programmes, which are numerous at Masters level. French is still worth learning — it affects your part-time work options, internships and general quality of life, and most institutions offer language classes alongside your degree.",
      },
      {
        q: "What is the official application procedure?",
        a: "Students applying from Pakistan go through a designated official procedure with its own portal, document submission and interview stage, running on a fixed annual calendar. It is mandatory for most routes and cannot be skipped, so the timeline drives everything else.",
      },
      {
        q: "Are French public universities really low-fee?",
        a: "Public universities operate on a state-subsidised fee model, with rates set nationally and differing for international students. Private business schools charge their own, considerably higher fees. We will show you the current published rates for the specific institutions you shortlist.",
      },
      {
        q: "How important is the interview?",
        a: "Very. It is a genuine assessment of your academic intent, your understanding of the programme and your study plan — not a formality. We run mock interviews so you are not seeing the format for the first time on the day.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },

  /* -------------------------------------------------------------- TURKEY */
  {
    slug: "turkey",
    name: "Turkey",
    flag: "/flags/turkey.svg",
    hero: "/destinations/turkey.jpg",
    blurb:
      "Culturally familiar, well-ranked universities with English-taught degrees and a large Pakistani student presence.",
    region: "Asia",
    languageOfInstruction: "English and Turkish",
    intro: [
      "Turkey is one of the most comfortable transitions for Pakistani students. The cultural and religious familiarity is real — halal food is standard, prayer facilities are everywhere, and the social environment feels less abrupt than a move to Western Europe.",
      "Academically, Turkish universities have invested heavily in international programmes. Many institutions teach fully in English, particularly in engineering, medicine, business and international relations, and several rank well regionally. Istanbul, Ankara, Izmir and Antalya all host sizeable Pakistani student communities.",
      "Turkey also runs a well-known government scholarship programme that attracts a very large number of applicants each year. It is highly competitive, and we are candid with students about that while helping them prepare a serious application alongside self-funded options.",
    ],
    highlights: [
      "English-taught programmes across engineering, medicine, business and social sciences",
      "Culturally familiar environment with widely available halal food and prayer facilities",
      "A well-known government scholarship programme with an annual application cycle",
      "Living costs generally lower than Western Europe",
      "Large, established Pakistani student community",
      "Direct flight connections between Pakistan and major Turkish cities",
    ],
    popularCourses: [
      "Medicine",
      "Dentistry",
      "Civil & Mechanical Engineering",
      "Computer Engineering",
      "International Relations",
      "Business Administration",
      "Architecture",
      "Islamic Studies",
    ],
    requirements: [
      "Intermediate / A-Levels for Bachelors entry; a recognised Bachelors degree for Masters entry",
      "English proficiency evidence for English-taught programmes; Turkish proficiency (TÖMER) for Turkish-taught ones",
      "An entrance examination such as YÖS or SAT, where the university requires one",
      "Equivalency certificate for your secondary qualification, where required",
      "Financial evidence covering tuition and living costs",
      "Valid passport and documents attested as required",
    ],
    documents: [
      ...COMMON_DOCUMENTS,
      "Equivalency certificate for secondary qualification, where required",
      "YÖS or SAT result, where the university requires one",
    ],
    intakes: ["September (Fall)", "February (Spring, selected programmes)"],
    processSteps: [
      "Free counselling and university shortlisting",
      "Confirm whether your target universities require YÖS, SAT or an internal assessment",
      "Prepare and attest documents, including equivalency where required",
      "Submit applications and secure the acceptance letter",
      "Prepare financial documentation",
      "File the student visa application and complete embassy formalities",
      "Pre-departure briefing, accommodation and residence permit guidance",
    ],
    faqs: [
      {
        q: "Do I need YÖS to study in Turkey?",
        a: "It depends on the university. Some require YÖS or SAT for undergraduate admission, others assess your Intermediate results directly or run their own internal assessment. We check the specific requirement for each university on your shortlist.",
      },
      {
        q: "How competitive is the Turkish government scholarship?",
        a: "Very. It draws an extremely large number of applicants worldwide each year and selection is merit-based across academics, the personal statement and an interview stage. We will help you prepare a serious application, but we always recommend running self-funded options in parallel rather than relying on it.",
      },
      {
        q: "Is Turkish language required?",
        a: "Not for English-taught programmes. For Turkish-taught programmes you will need TÖMER certification, and most universities offer a preparatory Turkish year for that route.",
      },
      {
        q: "Is Turkey suitable for Pakistani students culturally?",
        a: "Most students settle in quickly. Halal food is standard, mosques and prayer facilities are widely available, and the Pakistani student community in the major cities is well established and active.",
      },
    ],
    tuitionNote: COMMON_TUITION_NOTE,
  },
];

export const countryBySlug = (slug: string) =>
  countries.find((c) => c.slug === slug);

/** Grammatical form for sentences like "Study in …" / "Ready to apply to …". */
export const inName = (c: Country) => c.articleName ?? c.name;

export const countryNames = countries.map((c) => c.name);

export const countrySlugs = countries.map((c) => c.slug);
