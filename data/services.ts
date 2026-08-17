/**
 * Service pages. `icon` is a key resolved by components/Icon.tsx — keep the two in sync.
 * Same rule as countries.ts: describe what we do, never promise an outcome.
 */

export type Service = {
  slug: string;
  title: string;
  short: string; // card blurb
  icon: string;
  intro: string[];
  included: string[];
  forWhom: string[];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "career-counselling",
    title: "Free Career Counselling",
    short:
      "An honest, no-obligation session to map your grades, budget and goals to realistic destinations.",
    icon: "compass",
    intro: [
      "Most students arrive with a country in mind before they have looked at whether it fits their academic profile, their budget or the career they actually want. Our counselling session works the other way round: we start with your background and your constraints, then work out which destinations genuinely make sense.",
      "The session is free and carries no obligation. If we think a destination is a poor fit for your profile, we will say so — sending a student into an application they are unlikely to succeed in helps nobody.",
    ],
    included: [
      "One-to-one session at our Hayatabad office, or over the phone and WhatsApp",
      "Review of your academic record, English test status and financial position",
      "A realistic shortlist of destinations matched to your profile",
      "Explanation of the timeline for each intake you are considering",
      "A clear list of what you need to prepare next, and in what order",
      "Written follow-up summary so you have the plan in front of you",
    ],
    forWhom: [
      "Students finishing Intermediate, A-Levels or a Bachelors degree",
      "Anyone unsure which country suits their grades and budget",
      "Students who have had a visa refused and want a candid reassessment",
      "Parents who want to understand the process and the real costs before committing",
    ],
    steps: [
      {
        title: "Book your session",
        body: "Call, WhatsApp or submit the free assessment form. We will confirm a time that works for you.",
      },
      {
        title: "Bring your documents",
        body: "Transcripts, any English test result and a rough idea of your budget. Incomplete is fine — we work with what you have.",
      },
      {
        title: "Profile assessment",
        body: "We map your academic record and finances against the entry requirements of the destinations you are considering.",
      },
      {
        title: "Get your plan",
        body: "You leave with a shortlist, a timeline and a prioritised action list — whether or not you proceed with us.",
      },
    ],
    faqs: [
      {
        q: "Is the counselling session really free?",
        a: "Yes. The initial counselling and profile assessment carries no fee and no obligation to proceed.",
      },
      {
        q: "What should I bring?",
        a: "Your academic transcripts and certificates, your passport if you have one, and any English test result. If you do not have all of it yet, come anyway — we will tell you what to arrange.",
      },
      {
        q: "Can my parents attend?",
        a: "Absolutely, and we encourage it. Families usually have questions about cost, safety and the return on the investment, and it is better to answer those together.",
      },
    ],
  },
  {
    slug: "university-selection",
    title: "University & Course Selection",
    short:
      "Shortlist courses that match your background, budget and visa profile — not just a famous name.",
    icon: "search",
    intro: [
      "Course selection is the single decision that most affects both your admission chances and your visa outcome. A course that has no logical connection to your previous studies is harder to defend at every stage — to the admissions team, to the visa officer, and eventually to an employer.",
      "We build your shortlist around three things at once: whether you meet the entry criteria, whether the total cost is realistic for your family, and whether the progression from your existing qualification makes sense on paper.",
    ],
    included: [
      "A shortlist covering ambitious, matched and safe options",
      "Verification of entry requirements for each course and intake",
      "Review of how each course connects to your previous qualification",
      "Comparison of total cost — tuition plus living costs by city",
      "Check of scholarship and merit-discount eligibility where it exists",
      "Guidance on how course choice affects your visa credibility",
    ],
    forWhom: [
      "Students with a destination in mind but no clear course",
      "Applicants changing field between Bachelors and Masters",
      "Students who need to balance ranking against affordability",
      "Anyone who has been advised to apply for a course they cannot explain",
    ],
    steps: [
      {
        title: "Profile and priorities",
        body: "We record your grades, subjects, budget ceiling and career direction.",
      },
      {
        title: "Draft shortlist",
        body: "We prepare options across ambitious, matched and safe categories with the requirements set out side by side.",
      },
      {
        title: "Review together",
        body: "We go through each option with you and your family, including honest notes on the weaknesses of each.",
      },
      {
        title: "Confirm and proceed",
        body: "You confirm the final list and we move to application preparation.",
      },
    ],
    faqs: [
      {
        q: "How many universities should I apply to?",
        a: "It depends on the destination and how strong your profile is. Applying to a mix of ambitious, matched and safe options is generally sound; applying to twenty places at random is not. We will recommend a number for your specific case.",
      },
      {
        q: "Can I switch to a different field for my Masters?",
        a: "Sometimes, but it needs justification. Some fields accept career-changers readily, others require specific prerequisites. We check the policy for each university rather than assuming, and we will tell you if the switch weakens your visa case.",
      },
      {
        q: "Should I choose the highest-ranked university I can get into?",
        a: "Not automatically. Ranking matters less than fit, total cost and completion. A student who finishes comfortably at a well-matched university is better placed than one who struggles financially at a more prestigious one.",
      },
    ],
  },
  {
    slug: "admission-application",
    title: "Admission Application Processing",
    short:
      "We prepare, check and submit your applications, then track them to offer letter.",
    icon: "clipboard",
    intro: [
      "An application is rejected far more often for being incomplete or inconsistent than for weak grades. Missing transcripts, mismatched names across documents, unsigned references and unexplained study gaps are the usual culprits — all avoidable.",
      "We assemble your file, check every document against the university's own checklist, submit through the correct portal, and follow up until a decision is issued. You always know where each application stands.",
    ],
    included: [
      "Complete document collection and verification against the university checklist",
      "Application form completion and portal submission",
      "Consistency check across names, dates and grades on every document",
      "Guidance on attestation, translation and legalisation where required",
      "Direct follow-up with admissions offices",
      "Review of your offer letter and its conditions before you accept",
    ],
    forWhom: [
      "Students applying to multiple universities or multiple countries",
      "Applicants with study gaps or non-standard academic histories",
      "Anyone who has had an application rejected on documentation grounds",
      "Students who cannot manage portal deadlines alongside their current studies",
    ],
    steps: [
      {
        title: "Document collection",
        body: "We give you a precise checklist and check every item as it arrives.",
      },
      {
        title: "File preparation",
        body: "Forms completed, documents verified, supporting material assembled and cross-checked.",
      },
      {
        title: "Submission",
        body: "We submit through the correct portal or channel for each university and confirm receipt.",
      },
      {
        title: "Follow-up to decision",
        body: "We chase admissions offices, respond to queries and keep you updated until the offer is issued.",
      },
    ],
    faqs: [
      {
        q: "How long does an admission decision take?",
        a: "It varies widely by university, country and how busy the intake is. We give you the realistic range for your specific universities during counselling and follow up if a decision is slower than expected.",
      },
      {
        q: "What is a conditional offer?",
        a: "An offer that depends on you meeting stated conditions — final results, an English score, or a document you have not yet supplied. Once you meet them, it becomes an unconditional offer.",
      },
      {
        q: "Can I apply to more than one country at the same time?",
        a: "Yes, and for some students it is the sensible approach. It does mean parallel document requirements and deadlines, which is precisely the work we manage.",
      },
    ],
  },
  {
    slug: "visa-guidance",
    title: "Student Visa Filing & Guidance",
    short:
      "Complete visa file preparation, form filing and embassy formalities — handled step by step.",
    icon: "shield",
    intro: [
      "The visa stage is where most of the risk sits. Embassies assess whether you are a genuine student with a credible study plan and the means to fund it — and they look for consistency across every document you submit.",
      "We prepare your file so that the story it tells is coherent: your course choice follows from your academic history, your finances are documented in the required format, and your intentions are clearly stated. We do not, and cannot, guarantee an outcome. What we do is make sure your application is complete, honest and properly presented.",
    ],
    included: [
      "Country-specific document checklist with the correct formats",
      "Visa application form completion and review",
      "Financial documentation review against the current requirements",
      "Appointment booking and fee payment guidance",
      "Biometrics and submission-day briefing",
      "Interview preparation where the embassy conducts one",
      "Guidance on declaring and addressing any previous refusal",
    ],
    forWhom: [
      "Students holding an offer letter and preparing to file",
      "Applicants with a previous visa refusal on record",
      "Students with sponsors, or with complex financial documentation",
      "Anyone who wants a second pair of eyes on the file before submission",
    ],
    steps: [
      {
        title: "Requirement briefing",
        body: "We walk you through exactly what your destination's embassy expects, in the format it expects.",
      },
      {
        title: "File assembly",
        body: "Documents collected, checked and arranged in the required order.",
      },
      {
        title: "Form filing",
        body: "The application is completed carefully and reviewed against your supporting documents for consistency.",
      },
      {
        title: "Appointment and submission",
        body: "We guide you through fee payment, biometrics and the submission appointment.",
      },
      {
        title: "Interview preparation",
        body: "Where an interview applies, we run mock sessions until you can answer confidently.",
      },
    ],
    faqs: [
      {
        q: "Can you guarantee my visa will be approved?",
        a: "No, and you should be cautious of anyone who says otherwise. Visa decisions rest solely with the embassy. Our role is to make sure your application is complete, honest, consistent and well presented.",
      },
      {
        q: "I was refused before. Should I hide it?",
        a: "Never. Concealing a previous refusal is far more damaging than the refusal itself and can lead to a long-term ban. Declare it, and address the original reasons directly in the new application — that is what we help you do.",
      },
      {
        q: "How long before my intake should I file?",
        a: "As early as your offer and documents allow. Processing times vary by embassy and season, and late filing is one of the most common reasons students defer to the next intake.",
      },
    ],
  },
  {
    slug: "sop-lor",
    title: "SOP, LOR & CV Writing Support",
    short:
      "Guidance to write a Statement of Purpose that sounds like you — and holds up under scrutiny.",
    icon: "file",
    intro: [
      "Your Statement of Purpose is often the only place in the application where you speak for yourself. Admissions officers and visa officers read a great many of them, and a generic, downloaded template is recognised immediately.",
      "We do not write your SOP for you and hand it over. We guide you through structuring it, interviewing you to draw out your actual reasons and experiences, then reviewing and refining your drafts. The result is genuinely yours — which matters, because you may be asked about it at interview.",
    ],
    included: [
      "Structured guidance on SOP format and what each section must accomplish",
      "A working session to draw out your genuine motivation and experiences",
      "Detailed review and revision notes on your drafts",
      "Guidance on requesting strong recommendation letters from the right referees",
      "CV formatting to international academic standards",
      "Help explaining study gaps or grade dips honestly and constructively",
    ],
    forWhom: [
      "Every applicant — the SOP is required almost everywhere",
      "Students with a study gap, a grade dip or a change of field to explain",
      "Applicants for competitive scholarship programmes",
      "Students who find writing about themselves difficult",
    ],
    steps: [
      {
        title: "Discovery session",
        body: "We interview you about your background, motivation and plans, and take detailed notes.",
      },
      {
        title: "Structure and outline",
        body: "We give you a section-by-section outline built around your material.",
      },
      {
        title: "You draft",
        body: "You write the first draft in your own voice. This is the part that cannot be outsourced.",
      },
      {
        title: "Review and refine",
        body: "We return specific, actionable feedback and work with you through revisions until it is strong.",
      },
    ],
    faqs: [
      {
        q: "Will you write my SOP for me?",
        a: "No. We guide, structure and review it, but the writing has to be yours. A ghost-written SOP falls apart the moment an interviewer asks you to expand on something in it — and it is easy to spot.",
      },
      {
        q: "How long should an SOP be?",
        a: "It depends on the university's own instructions, which always take precedence. Where none are given, a focused piece of roughly one to two pages is the usual expectation.",
      },
      {
        q: "Who should write my recommendation letters?",
        a: "Someone who has actually taught or supervised you and can speak to specific work you did. A senior name who barely knows you produces a weaker letter than a lecturer who can describe your project in detail.",
      },
    ],
  },
  {
    slug: "financial-documentation",
    title: "Financial Documents & Bank Statement Guidance",
    short:
      "Get your financial file right the first time — format, timing and sponsor documentation.",
    icon: "wallet",
    intro: [
      "Financial documentation causes more avoidable refusals than almost anything else. The problem is rarely the amount — it is the format, the maintenance period, unexplained large deposits, or a sponsor relationship that is not properly evidenced.",
      "We explain exactly what your destination requires, in what format, and for how long the funds must be held. Then we review your documents against those requirements before submission.",
    ],
    included: [
      "Country-specific explanation of the financial requirement and its format",
      "Guidance on the maintenance period and how it is counted",
      "Sponsor documentation and relationship evidence guidance",
      "Review of bank statements for issues an officer would flag",
      "Help explaining the legitimate source of funds",
      "Guidance on affidavits and supporting income evidence",
    ],
    forWhom: [
      "Every student filing a visa application",
      "Applicants funded by a sponsor — parents, siblings or relatives",
      "Students whose funds come from business income, property or agriculture",
      "Anyone previously refused on financial grounds",
    ],
    steps: [
      {
        title: "Requirement briefing",
        body: "We tell you the amount, the format and the holding period your destination currently requires.",
      },
      {
        title: "Planning",
        body: "We help you plan the timing so funds are in place and properly maintained before you file.",
      },
      {
        title: "Sponsor documentation",
        body: "Relationship evidence, income proof and affidavits prepared in the correct form.",
      },
      {
        title: "Pre-submission review",
        body: "We read your statements the way an officer would and flag anything that needs explaining.",
      },
    ],
    faqs: [
      {
        q: "How much money do I need to show?",
        a: "It depends on your destination, your tuition fee, your course length and the city you will live in — and the thresholds are revised periodically. We calculate the current figure for your specific case rather than quoting a general number.",
      },
      {
        q: "Can my uncle or brother sponsor me?",
        a: "Rules on who may sponsor differ by country. Some accept only parents or a legal guardian, others allow wider family with proper documentation. We check the current rule for your destination before you arrange anything.",
      },
      {
        q: "What if a large amount was recently deposited?",
        a: "A sudden deposit shortly before filing attracts scrutiny. It is not automatically fatal, but you must be able to evidence where the money came from. Plan the timing early to avoid the issue entirely.",
      },
    ],
  },
  {
    slug: "scholarship-assistance",
    title: "Scholarship & Funding Assistance",
    short:
      "Identify the scholarships you are actually eligible for, and apply before the deadline closes.",
    icon: "award",
    intro: [
      "Scholarships fall into a few broad categories: government-funded programmes, university merit awards, need-based regional schemes and departmental funding. Each has separate eligibility criteria and — critically — separate deadlines that usually fall well before ordinary admission deadlines.",
      "We help you identify what you are genuinely eligible for and build the timeline backwards from those deadlines. We are straightforward about competitiveness: the well-known government programmes attract enormous numbers of applicants, and no consultancy can influence the outcome.",
    ],
    included: [
      "Assessment of your scholarship eligibility against your academic profile",
      "Identification of merit, need-based and departmental funding options",
      "A deadline calendar built backwards from each scholarship's cut-off",
      "Guidance on scholarship essays and motivation statements",
      "Support assembling the supporting documents each scheme requires",
      "A parallel self-funded plan so a scholarship result does not derail your intake",
    ],
    forWhom: [
      "Students with a strong academic record seeking merit funding",
      "Students from lower-income households applying to need-based schemes",
      "Masters and PhD applicants seeking departmental or research funding",
      "Anyone for whom the destination depends on securing funding",
    ],
    steps: [
      {
        title: "Eligibility assessment",
        body: "We review your grades, finances and target countries against real scholarship criteria.",
      },
      {
        title: "Opportunity shortlist",
        body: "You get a list of schemes you can realistically apply to, with each deadline stated.",
      },
      {
        title: "Application support",
        body: "We guide your essays, documentation and submission for each scheme.",
      },
      {
        title: "Parallel planning",
        body: "We keep your self-funded applications moving so a scholarship decision never becomes a single point of failure.",
      },
    ],
    faqs: [
      {
        q: "Can you guarantee me a scholarship?",
        a: "No. Scholarship decisions are made by the awarding bodies on merit and, for need-based schemes, on assessed financial need. Anyone promising a guaranteed scholarship is not being honest with you.",
      },
      {
        q: "Do I need to apply for admission first?",
        a: "It varies. Some schemes require an existing admission offer, others run their own independent selection and place you afterwards. We map the sequence for each scheme you are targeting.",
      },
      {
        q: "Are full scholarships realistic?",
        a: "Fully funded scholarships exist and Pakistani students do win them every year — but they are highly competitive and demand an excellent academic record plus a strong written application. Plan for them, do not rely on them.",
      },
    ],
  },
  {
    slug: "test-preparation",
    title: "IELTS / PTE / Duolingo Preparation",
    short:
      "Choose the right English test for your destination and prepare with a clear, structured plan.",
    icon: "languages",
    intro: [
      "Students often book an English test before checking which one their target universities and embassy actually accept — and then sit the wrong one. IELTS is the most broadly accepted, PTE offers a fully computer-based format with quick results, and Duolingo is accepted by a growing but still limited set of institutions.",
      "We help you choose the right test for your destination, set a realistic target band based on your course requirements, and follow a structured preparation plan built around your current level.",
    ],
    included: [
      "Guidance on which test your target universities and embassy accept",
      "A realistic target score based on your course and destination",
      "Diagnostic assessment of your current level",
      "A section-by-section preparation plan with a weekly structure",
      "Recommended free and low-cost practice resources",
      "Guidance on test registration, centres and booking",
      "Speaking and writing practice with feedback",
    ],
    forWhom: [
      "Students who have not yet taken an English test",
      "Applicants who need to retake and improve a specific section",
      "Students unsure which test their destination accepts",
      "Anyone who needs a structured plan rather than unfocused practice",
    ],
    steps: [
      {
        title: "Test selection",
        body: "We confirm which test your shortlisted universities and embassy accept, and which suits you.",
      },
      {
        title: "Diagnostic",
        body: "A practice assessment establishes where you actually stand, section by section.",
      },
      {
        title: "Preparation plan",
        body: "A weekly plan targeting your weakest sections first, with resources and practice material.",
      },
      {
        title: "Practice and booking",
        body: "Speaking and writing practice with feedback, then guidance on registering for the real test.",
      },
    ],
    faqs: [
      {
        q: "Which test should I take?",
        a: "Whichever your target universities and destination embassy accept. IELTS has the widest acceptance; PTE suits students who prefer a computer-based format; Duolingo is accepted by a narrower set of institutions. Confirm acceptance before you book.",
      },
      {
        q: "What score do I need?",
        a: "It depends on your course level, university and destination. Postgraduate and clinical programmes typically require more than general undergraduate entry. We confirm the exact requirement for your shortlist so you prepare for the right target.",
      },
      {
        q: "How long should I prepare for?",
        a: "It depends entirely on your starting level. A diagnostic test gives a realistic answer within a week. Booking the test before you know where you stand is how students end up paying for a retake.",
      },
      {
        q: "Do you run classes at the office?",
        a: "Contact us for our current class schedule and format — we will tell you exactly what is running when you enquire.",
      },
    ],
  },
  {
    slug: "interview-preparation",
    title: "Embassy & Mock Interview Preparation",
    short:
      "Practise the questions you will actually be asked, until your answers are calm and consistent.",
    icon: "mic",
    intro: [
      "Several destinations include an interview — with the embassy, the university, or an official assessment centre. The purpose is to test whether you are a genuine student who understands your own study plan. Students who are refused at this stage usually fail on consistency, not on English.",
      "We run mock interviews using the questions actually asked for your destination, then give you specific feedback on your answers, your body language and the gaps between what you say and what your file says.",
    ],
    included: [
      "Destination-specific question bank drawn from real interview experiences",
      "One-to-one mock interview sessions",
      "Feedback on content, delivery and confidence",
      "Cross-checking your answers against your submitted documents",
      "Guidance on how to answer questions about finances and post-study intentions",
      "Practice explaining a previous refusal, where one exists",
    ],
    forWhom: [
      "Students applying to destinations with a mandatory interview stage",
      "Applicants facing a university admission interview",
      "Students with a previous refusal who must explain it",
      "Anyone who finds formal interviews stressful",
    ],
    steps: [
      {
        title: "Briefing",
        body: "We explain the format, the assessors' priorities and what they are actually checking for.",
      },
      {
        title: "Question preparation",
        body: "We work through the likely questions and help you build honest, specific answers.",
      },
      {
        title: "Mock interview",
        body: "A full simulated interview run under realistic conditions.",
      },
      {
        title: "Feedback and repeat",
        body: "Specific correction, then repeat sessions until your answers are consistent and confident.",
      },
    ],
    faqs: [
      {
        q: "What do interviewers actually assess?",
        a: "Whether you are a genuine student. They test your knowledge of your course and university, your reasons for choosing them, your funding, and your plans after graduation. Consistency with your written file matters more than polished English.",
      },
      {
        q: "Should I memorise my answers?",
        a: "No. Memorised answers sound rehearsed and collapse under a follow-up question. Know your material well enough to answer naturally in your own words.",
      },
      {
        q: "What if my English is weak?",
        a: "Speak slowly and answer honestly. Interviewers are assessing genuineness, not fluency. Asking politely for a question to be repeated is entirely acceptable.",
      },
    ],
  },
  {
    slug: "post-arrival",
    title: "Accommodation, Airport Pickup & Post-Arrival Support",
    short:
      "Support does not stop at the visa — we help you land, settle in and get registered.",
    icon: "home",
    intro: [
      "The first two weeks abroad are the hardest: finding your accommodation, registering with the university, opening a bank account, arranging a local SIM and understanding how residence formalities work. Doing all of that alone, jet-lagged, in an unfamiliar city is a lot.",
      "We help you arrange accommodation before departure, connect you with students already in your destination city, and stay reachable while you settle in.",
    ],
    included: [
      "Guidance on university halls and private accommodation options",
      "Help with accommodation applications and booking",
      "Airport pickup coordination where it is available in your city",
      "Introductions to existing students in your destination city",
      "Pre-departure briefing covering what to pack, currency and first-week priorities",
      "Guidance on registration, bank account opening and residence formalities",
      "A point of contact you can reach after you arrive",
    ],
    forWhom: [
      "Students travelling abroad for the first time",
      "Anyone who has not yet arranged accommodation",
      "Students going to a city with no existing family or contacts",
      "Families who want reassurance about the arrival arrangements",
    ],
    steps: [
      {
        title: "Accommodation planning",
        body: "We start well before departure — good student housing fills up early.",
      },
      {
        title: "Pre-departure briefing",
        body: "A full session on travel, packing, money, documents and your first-week checklist.",
      },
      {
        title: "Arrival coordination",
        body: "Pickup arranged where available, and contacts shared for your destination city.",
      },
      {
        title: "Settling-in support",
        body: "Guidance on registration, banking and residence formalities, and a contact you can call.",
      },
    ],
    faqs: [
      {
        q: "Is airport pickup available everywhere?",
        a: "It depends on the city and on whether we have a contact or partner arrangement there. Ask us about your specific destination and we will tell you honestly what is available.",
      },
      {
        q: "When should I book accommodation?",
        a: "As early as you can. University halls and good private housing fill months ahead of the intake, and students who leave it late usually end up paying more for something further out.",
      },
      {
        q: "Can I contact you after I arrive?",
        a: "Yes. Students stay in touch with us long after departure, and we would rather you called than struggled with something on your own.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

export const serviceSlugs = services.map((s) => s.slug);
