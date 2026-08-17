/**
 * Site-wide FAQs. Grouped by category for /faqs and used for FAQPage JSON-LD.
 * Keep answers evergreen — no fees, no processing times, no guarantees.
 */

export type Faq = { q: string; a: string };
export type FaqGroup = { category: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    category: "Getting Started",
    items: [
      {
        q: "How do I start the process with Reading Study Abroad?",
        a: "Book a free counselling session — call us, message us on WhatsApp, or fill in the free assessment form. We review your academic record, budget and goals, and give you a realistic shortlist of destinations. There is no fee and no obligation for that first session.",
      },
      {
        q: "How early should I begin planning?",
        a: "Ideally six to twelve months before your intended intake. Document attestation, English tests, scholarship deadlines and visa appointments all take time, and the students who run into trouble are almost always the ones who started late.",
      },
      {
        q: "Do you charge for counselling?",
        a: "The initial counselling and profile assessment is free. Service charges for application processing and visa support are explained clearly and in writing before you commit to anything.",
      },
      {
        q: "I don't know which country to choose. Can you help?",
        a: "That is exactly what the counselling session is for. We compare your realistic options across all ten destinations we work with — entry requirements, total cost, language of instruction and how each fits your academic background.",
      },
      {
        q: "Can my parents come to the counselling session?",
        a: "Yes, and we encourage it. Families usually have practical questions about cost, safety and outcomes, and it is far better to answer those together in one sitting.",
      },
    ],
  },
  {
    category: "Eligibility & Academics",
    items: [
      {
        q: "What grades do I need to study abroad?",
        a: "It varies enormously by country, university and course level. Some destinations have accessible entry criteria for students with a modest academic record; competitive programmes expect considerably more. We will tell you honestly where your grades place you.",
      },
      {
        q: "I have a study gap. Does that disqualify me?",
        a: "No, but it must be explained. Universities and visa officers want to see what you did during the gap — work, another qualification, family circumstances. An honest, documented explanation is usually accepted; an unexplained gap raises questions.",
      },
      {
        q: "Can I change my field of study for my Masters?",
        a: "Sometimes. Some fields accept career-changers readily, others require specific prerequisites. It also affects your visa credibility, because an officer will ask why the switch makes sense. We check the policy for each university rather than assuming.",
      },
      {
        q: "Do I need work experience?",
        a: "For most academic programmes, no. Some professional Masters courses — MBA programmes in particular — prefer or require it. Where you do have work experience, it strengthens your application and should be documented properly.",
      },
      {
        q: "Is my Pakistani degree recognised abroad?",
        a: "Degrees from HEC-recognised Pakistani institutions are generally accepted, though several countries require a formal recognition or equivalence step before enrolment. We tell you which destinations require it and guide you through the process.",
      },
    ],
  },
  {
    category: "English Language Tests",
    items: [
      {
        q: "Is IELTS compulsory for studying abroad?",
        a: "Not always. Many universities require proof of English proficiency, but some accept alternatives such as PTE or Duolingo, and a number run their own internal assessment. The embassy may have its own separate requirement. Confirm both before you book a test.",
      },
      {
        q: "Which English test should I take?",
        a: "Whichever your target universities and destination embassy accept. IELTS has the widest acceptance, PTE offers a fully computer-based format, and Duolingo is accepted by a growing but still limited set of institutions.",
      },
      {
        q: "What score will I need?",
        a: "It depends on your course level and destination. Postgraduate, clinical and law programmes typically require higher scores than general undergraduate entry, and individual section minimums often apply. We confirm the exact requirement for your shortlist.",
      },
      {
        q: "Can I retake the test if my score is low?",
        a: "Yes, all three tests can be retaken. Prepare specifically for the weak section rather than repeating general practice — and do a diagnostic before booking, so you are not paying for a retake you could have avoided.",
      },
    ],
  },
  {
    category: "Cost & Funding",
    items: [
      {
        q: "How much does it cost to study abroad?",
        a: "The total depends on the country, the university, the city and your course length. There is a genuine range between destinations — some European options are considerably more affordable than others. We give you a realistic total figure for your specific shortlist during counselling, not a marketing number.",
      },
      {
        q: "How much bank balance do I need to show?",
        a: "The requirement depends on your destination, your tuition fee and your course length, and the thresholds are revised periodically. We calculate the current figure for your case and explain the format and holding period the statement must satisfy.",
      },
      {
        q: "Who can sponsor my studies?",
        a: "Rules differ by country. Some accept only parents or a legal guardian, others allow wider family with proper relationship and income documentation. Confirm the rule for your destination before arranging anything financially.",
      },
      {
        q: "Are scholarships available for Pakistani students?",
        a: "Yes — government-funded programmes, university merit awards, need-based regional schemes and departmental funding all exist, and Pakistani students win them every year. They are competitive and have their own early deadlines. We help you identify what you are genuinely eligible for and apply in time.",
      },
      {
        q: "Can I work while studying?",
        a: "Most study destinations permit some part-time work during study, with hours and conditions set by current immigration rules and printed on your visa. Treat it as support money — never plan to fund your tuition from part-time earnings.",
      },
    ],
  },
  {
    category: "Visa & Documentation",
    items: [
      {
        q: "Can you guarantee my student visa?",
        a: "No. Visa decisions rest solely with the embassy of the country you are applying to. Any consultancy claiming to guarantee a visa is misleading you. What we do is make sure your application is complete, honest, consistent and properly presented.",
      },
      {
        q: "I was refused a visa before. Can I apply again?",
        a: "Yes. A previous refusal is not a permanent bar, but it must be declared honestly and the original reasons must be addressed directly in the new application. Concealing it is far more damaging than the refusal itself.",
      },
      {
        q: "What documents will I need?",
        a: "Typically your passport, academic transcripts and certificates, English test result, CV, Statement of Purpose, recommendation letters, financial documents and photographs. Each destination adds its own requirements — attestation, apostille, equivalence certificates or medical reports. We give you a precise checklist for your case.",
      },
      {
        q: "How long does the visa process take?",
        a: "Processing times vary by embassy, destination and season, and they change. We give you the current realistic expectation for your destination and build your timeline with margin, so a slow decision does not cost you the intake.",
      },
      {
        q: "Will there be an interview?",
        a: "Some destinations include an interview with the embassy, the university or an official assessment centre; others do not. Where one applies, we run mock interviews with you until your answers are confident and consistent with your file.",
      },
    ],
  },
  {
    category: "After You Arrive",
    items: [
      {
        q: "Will you help me find accommodation?",
        a: "Yes. We guide you through university halls and private housing options and help with the application or booking. Start early — good student accommodation fills up months before the intake.",
      },
      {
        q: "Is airport pickup arranged?",
        a: "It depends on the city and whether we have a contact or partner arrangement there. Ask us about your specific destination and we will tell you honestly what is available.",
      },
      {
        q: "Can I contact you after I have travelled?",
        a: "Yes. Students stay in touch with us long after departure, and we would much rather you called than struggled with a registration or banking problem on your own.",
      },
      {
        q: "Can my family visit me while I study?",
        a: "Visitor arrangements are handled separately from your student visa and depend on the current rules and on the visitor's own documentation. Ask us and we will explain the process that applies at the time.",
      },
    ],
  },
];

/** Flattened list, used for JSON-LD and the home page preview. */
export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);

/** The six shown in the home page accordion. */
export const homeFaqs: Faq[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[2].items[0],
  faqGroups[3].items[0],
  faqGroups[4].items[0],
  faqGroups[4].items[1],
];
