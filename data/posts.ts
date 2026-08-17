/**
 * Blog posts. Content is structured as blocks so posts render without an MDX
 * pipeline — the client can add a post by copying an existing object.
 *
 * Same content rule as everywhere else: no fees, no processing times, no
 * guarantees, no invented statistics.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
  cover?: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "documents-required-student-visa-pakistan",
    title: "Documents Required for a Student Visa from Pakistan",
    excerpt:
      "The document set every Pakistani student needs, why each one exists, and the paperwork mistakes that cause the most avoidable refusals.",
    category: "Visa Guidance",
    date: "2026-02-10",
    readingMinutes: 8,
    body: [
      {
        type: "p",
        text: "Every destination publishes its own checklist, and you must always follow the one issued by the embassy you are applying to. But underneath the variations, student visa files from Pakistan are built from the same core set of documents. Understanding what each one is for makes the whole process far less intimidating — and helps you spot the gaps in your own file before an officer does.",
      },
      {
        type: "h2",
        text: "1. Identity documents",
      },
      {
        type: "ul",
        items: [
          "A valid passport with enough remaining validity for your intended course, plus any previous passports you hold",
          "CNIC or B-Form, depending on your age",
          "Passport-size photographs taken to the embassy's exact specification — background colour, dimensions and headroom all matter, and photos are rejected for this regularly",
        ],
      },
      {
        type: "p",
        text: "Check the spelling of your name across your passport, your academic certificates and your bank documents. A mismatch — even a middle name that appears in one place and not another — creates a query that is entirely avoidable, and correcting it later takes far longer than getting it right now.",
      },
      { type: "h2", text: "2. Academic documents" },
      {
        type: "ul",
        items: [
          "Matriculation and Intermediate certificates and detailed marks sheets, or O/A-Level results",
          "Bachelors degree and full transcripts, if you are applying for postgraduate study",
          "Attestation from the relevant boards, HEC and the Ministry of Foreign Affairs where your destination requires it",
          "Apostille or consular authentication, for destinations that require it rather than standard attestation",
        ],
      },
      {
        type: "callout",
        title: "Start attestation early",
        text: "Attestation and legalisation is the single most common reason Pakistani students miss an intake. It is a multi-step process involving several offices, none of which can be rushed. Begin it as soon as your shortlist is confirmed — not after your offer letter arrives.",
      },
      { type: "h2", text: "3. English language proof" },
      {
        type: "p",
        text: "Most universities require evidence of English proficiency, usually IELTS or PTE, and some accept Duolingo or their own internal assessment. Note that the university requirement and the embassy requirement are two separate things: a university may waive a test that the embassy still expects to see. Confirm both before you book.",
      },
      { type: "h2", text: "4. Financial documents" },
      {
        type: "ul",
        items: [
          "Bank statement covering the maintenance period your destination requires, in the prescribed format",
          "Bank certificate or solvency letter, where required",
          "Sponsor's income evidence — salary slips, tax returns, business registration or agricultural income records",
          "Affidavit of support from your sponsor, and documents evidencing your relationship to them",
        ],
      },
      {
        type: "p",
        text: "This is where files most often fall apart. The amount is rarely the problem. The problems are format, maintenance period and unexplained deposits. A large sum that appears in the account a week before filing will attract scrutiny — you must be able to evidence where it came from, so plan the timing months ahead rather than weeks.",
      },
      { type: "h2", text: "5. Supporting documents" },
      {
        type: "ul",
        items: [
          "Statement of Purpose explaining your course choice and study plan",
          "Letters of Recommendation from teachers or supervisors who actually know your work",
          "Updated CV",
          "Offer or acceptance letter from your university",
          "Proof of tuition deposit payment, where you have made one",
          "Medical or police certificates, where the destination requires them",
          "Accommodation confirmation, for destinations that expect it",
        ],
      },
      { type: "h2", text: "The mistakes that cost students an intake" },
      {
        type: "ol",
        items: [
          "Starting attestation too late — the most common single cause of a missed intake",
          "Name spellings that differ between passport, certificates and bank documents",
          "A large, unexplained deposit shortly before filing",
          "Booking the wrong English test because acceptance was never checked",
          "Hiding a previous refusal, which is treated far more seriously than the refusal itself",
          "Submitting a Statement of Purpose that was downloaded rather than written",
        ],
      },
      {
        type: "callout",
        title: "Before you submit",
        text: "Read your own file the way an officer would. Does your course choice follow logically from what you have already studied? Do your finances add up on paper? Is the same name spelled the same way on every page? If any answer is no, fix it before submission — not after a refusal.",
      },
      {
        type: "p",
        text: "If you would like your file reviewed before you submit it, book a free counselling session with us. We will go through your documents against the current requirement for your destination and tell you plainly what is missing.",
      },
    ],
  },

  {
    slug: "choose-right-country-for-your-budget",
    title: "How to Choose the Right Country for Your Budget",
    excerpt:
      "A practical framework for comparing study destinations on total cost — not just tuition — so you pick a country you can actually finish your degree in.",
    category: "Planning",
    date: "2026-03-04",
    readingMinutes: 9,
    body: [
      {
        type: "p",
        text: "Most students compare destinations by tuition fee alone. That is the wrong number. What determines whether you can comfortably complete your degree is the total cost of the whole period — and tuition is often not even the largest part of it.",
      },
      { type: "h2", text: "Work out your real total, not the headline fee" },
      {
        type: "p",
        text: "Before comparing any two countries, build the full picture for each:",
      },
      {
        type: "ul",
        items: [
          "Tuition for the entire programme, not the first year only",
          "Accommodation, which varies dramatically between a capital city and a smaller university town",
          "Food, transport and mobile costs in that specific city",
          "Health insurance, where it is mandatory",
          "Visa application and biometric costs",
          "Flights, and the initial setup costs of your first month",
          "The bank balance you must show and maintain — money that has to sit in an account, whether or not you spend it",
        ],
      },
      {
        type: "callout",
        title: "City matters more than country",
        text: "The cost gap between a capital city and a regional university town inside the same country is frequently larger than the gap between two countries. If your budget is tight, widen your search to smaller cities before you rule an entire destination out.",
      },
      { type: "h2", text: "Group your options by cost profile" },
      {
        type: "p",
        text: "Rather than ranking destinations, it helps to sort them into broad profiles and see which profile your budget actually reaches.",
      },
      { type: "h3", text: "Lower total cost, EU degree" },
      {
        type: "p",
        text: "Bulgaria, Hungary and Lithuania combine EU-recognised degrees with living costs that are among the more manageable in Europe. Bulgaria and Hungary have long traditions of teaching international medical students in English; Lithuania has built a genuine reputation in IT and engineering. If budget is your binding constraint but you want a European qualification, start here.",
      },
      { type: "h3", text: "Subsidised public fees, higher living costs" },
      {
        type: "p",
        text: "France and Italy both operate state-subsidised fee models at public universities, and both have established scholarship schemes. The trade-off is living costs in the major cities and a more structured, deadline-driven application process. Get the calendar right and the value is excellent; miss a pre-enrolment window and you wait a year.",
      },
      { type: "h3", text: "English-medium, no language barrier" },
      {
        type: "p",
        text: "The UK, Malta and Cyprus all deliver study and daily life in English. The UK carries the strongest global recognition and the highest cost; Cyprus and Malta sit lower on both. If you cannot commit to learning another language alongside your degree, this group removes that variable entirely.",
      },
      { type: "h3", text: "Regionally strong, culturally familiar" },
      {
        type: "p",
        text: "Turkey and South Korea both offer well-regarded universities with English-taught programmes and active scholarship cultures. Turkey adds cultural and religious familiarity that many Pakistani students find makes the transition markedly easier. South Korea is the stronger option if your field is engineering or technology.",
      },
      { type: "h2", text: "Four questions that narrow the list quickly" },
      {
        type: "ol",
        items: [
          "What is the absolute maximum your family can commit for the full programme, including the balance you must show? Anything above that line is not a real option, however attractive.",
          "Can you learn another language alongside your degree? If not, restrict yourself to fully English-taught programmes and confirm that daily administration works in English too.",
          "Does your field have a natural home? Engineering and IT point one way, medicine another, design and fashion another again. Field fit affects your career more than the country name.",
          "How important is proximity and cost of travel home? Flight cost and duration matter more over three or four years than students expect at the outset.",
        ],
      },
      {
        type: "callout",
        title: "The mistake to avoid",
        text: "Stretching to the most expensive option your family can barely afford is the single most damaging financial decision students make. Running out of money midway through a degree is far worse than starting at a well-matched university you can comfortably finish. Choose the destination you can complete.",
      },
      {
        type: "p",
        text: "Bring your real budget to a counselling session and we will build the total-cost picture for each option on your shortlist, so you are comparing like with like.",
      },
    ],
  },

  {
    slug: "common-visa-refusal-reasons",
    title: "Common Student Visa Refusal Reasons and How to Avoid Them",
    excerpt:
      "The refusal reasons that appear most often on Pakistani student applications — and the practical steps that prevent each one.",
    category: "Visa Guidance",
    date: "2026-04-01",
    readingMinutes: 10,
    body: [
      {
        type: "p",
        text: "Student visa refusals are rarely mysterious. Embassies assess whether you are a genuine student with a credible plan and the means to fund it, and refusals cluster around a small number of recurring problems. Almost all of them are preventable with proper preparation.",
      },
      { type: "h2", text: "1. Insufficient or badly presented finances" },
      {
        type: "p",
        text: "The most frequent reason, and usually not about the amount. Files fail because the funds were not held for the required maintenance period, the statement was not in the prescribed format, a large deposit appeared shortly before filing with no explanation, or the sponsor's relationship and income were not properly evidenced.",
      },
      {
        type: "ul",
        items: [
          "Confirm the exact amount, format and holding period for your destination before you move any money",
          "Have funds in place well ahead of the maintenance window, not days before it",
          "Document the source of any significant deposit with supporting evidence",
          "Evidence your sponsor's income and your relationship to them properly",
        ],
      },
      { type: "h2", text: "2. A course choice that cannot be explained" },
      {
        type: "p",
        text: "If you studied Commerce and are now applying for a Masters in Public Health, an officer will want to understand why. Career changes are legitimate and happen constantly — but they must be reasoned. An applicant who cannot explain the connection between their previous study and their chosen course reads as someone whose real purpose is something other than study.",
      },
      {
        type: "ul",
        items: [
          "Choose a course that follows logically from your background where you can",
          "Where you are changing direction, explain it clearly in your SOP and be ready to defend it at interview",
          "Know your course content — modules, duration, structure — before you file",
          "Be able to explain why this university and this city, specifically",
        ],
      },
      { type: "h2", text: "3. Incomplete or inconsistent documents" },
      {
        type: "p",
        text: "Missing transcripts, unattested certificates, expired documents, and name spellings that differ between passport and academic records. Individually small, collectively fatal — inconsistency reads as carelessness at best.",
      },
      {
        type: "callout",
        title: "Do a consistency pass",
        text: "Lay out your passport, certificates, bank documents and application form side by side. Check that your name, your father's name and every date match exactly across all of them. This one exercise catches a surprising share of the problems that cause queries.",
      },
      { type: "h2", text: "4. A weak or copied Statement of Purpose" },
      {
        type: "p",
        text: "Officers read a great many statements and recognise a template instantly. A generic SOP full of phrases about world-class education and bright futures says nothing about you, and it collapses the moment you are asked to expand on it.",
      },
      {
        type: "ul",
        items: [
          "Write it yourself, in your own voice, with specific detail about your own studies and plans",
          "Name the modules that interest you and say why",
          "State your plan after graduation clearly and honestly",
          "Never submit anything you could not talk about confidently for five minutes",
        ],
      },
      { type: "h2", text: "5. Poor interview performance" },
      {
        type: "p",
        text: "Where an interview applies, students are refused for inconsistency far more than for weak English. Answers that contradict the submitted file, vague knowledge of the course, or an inability to explain the funding arrangement are what create doubt.",
      },
      {
        type: "ul",
        items: [
          "Know your own file thoroughly before you attend",
          "Practise out loud — reading your answers silently is not preparation",
          "Answer honestly, even when the honest answer feels less impressive",
          "Do not memorise scripts; they fail at the first follow-up question",
        ],
      },
      { type: "h2", text: "6. A concealed previous refusal" },
      {
        type: "p",
        text: "This one is entirely self-inflicted. Refusal history is visible to the authorities. Concealing it is treated as a misrepresentation, and the consequences of that are far more serious and far longer-lasting than the original refusal.",
      },
      {
        type: "ul",
        items: [
          "Declare every previous refusal, for any country, honestly",
          "Obtain and read the original refusal letter carefully",
          "Address each stated reason directly with new evidence in the fresh application",
          "Explain plainly what has changed since",
        ],
      },
      { type: "h2", text: "7. Weak ties to Pakistan" },
      {
        type: "p",
        text: "Officers assess whether you intend to return after your studies. Family, property, a job to return to, or a documented career plan back home all help. This does not mean you can never work abroad afterwards under the applicable rules — it means your stated intention must be consistent and credible.",
      },
      {
        type: "callout",
        title: "If you have already been refused",
        text: "A refusal is not a permanent bar. Get the refusal letter, understand precisely what was doubted, fix that specific issue with evidence, and reapply properly. Reapplying with the same file and hoping for a different officer is the one approach that reliably fails.",
      },
      {
        type: "p",
        text: "If you have a refusal on record, bring the letter to a counselling session. We will go through the stated reasons with you and tell you candidly what needs to change before you file again.",
      },
    ],
  },

  {
    slug: "ielts-vs-pte-vs-duolingo",
    title: "IELTS vs PTE vs Duolingo — Which Should You Take?",
    excerpt:
      "How the three main English tests differ in format, scoring and acceptance, and how to work out which one is right for your destination.",
    category: "Test Preparation",
    date: "2026-05-06",
    readingMinutes: 8,
    body: [
      {
        type: "p",
        text: "Booking an English test before checking which one your universities and embassy accept is one of the most common — and most expensive — mistakes students make. Here is how the three main options actually differ, and how to choose between them.",
      },
      { type: "h2", text: "IELTS" },
      {
        type: "p",
        text: "The International English Language Testing System is the most widely accepted English test globally and the safest default when you are unsure. It tests Listening, Reading, Writing and Speaking, and is scored in bands. The Speaking section is a face-to-face conversation with a human examiner, which some students find far more natural than speaking to a computer and others find more stressful.",
      },
      {
        type: "ul",
        items: [
          "Widest acceptance across universities and immigration authorities",
          "Available in paper-based and computer-delivered formats",
          "Speaking is a real conversation with an examiner",
          "Take the Academic version for university study, not General Training",
        ],
      },
      {
        type: "callout",
        title: "Check the version",
        text: "IELTS Academic and IELTS General Training are not interchangeable, and some destinations additionally require a specific UKVI-approved version for immigration purposes. Confirm which version your destination needs before booking — sitting the wrong one means paying twice.",
      },
      { type: "h2", text: "PTE Academic" },
      {
        type: "p",
        text: "The Pearson Test of English is fully computer-based and AI-scored, including the Speaking section, which you record into a microphone. Results are typically returned quickly, which matters when you are working against a tight admission deadline. It suits students who are comfortable with computers and would rather not sit across from an examiner.",
      },
      {
        type: "ul",
        items: [
          "Entirely computer-based, with automated scoring",
          "Results usually returned faster than paper-based alternatives",
          "No human examiner in the Speaking section",
          "Tasks are integrated — one question often tests two skills at once",
        ],
      },
      { type: "h2", text: "Duolingo English Test" },
      {
        type: "p",
        text: "The Duolingo English Test is taken online from home, is shorter than the other two, and costs significantly less. Acceptance has grown steadily but remains narrower — and, importantly, a university accepting it does not mean the embassy will. Verify both before you rely on it.",
      },
      {
        type: "ul",
        items: [
          "Taken online at home, with strict technical and environment requirements",
          "Considerably shorter and cheaper than IELTS or PTE",
          "Adaptive format — question difficulty adjusts as you answer",
          "Acceptance is growing but narrower; always confirm for both university and embassy",
        ],
      },
      { type: "h2", text: "How to choose" },
      {
        type: "ol",
        items: [
          "List your target universities and check which tests each one accepts. This step alone often decides it for you.",
          "Check your destination embassy's separate requirement — it can differ from the university's.",
          "Consider your own comfort: face-to-face speaking versus recording into a microphone is a real difference in performance for many students.",
          "Factor in your deadline. If you need a result quickly, the turnaround time matters.",
          "Factor in cost, but only after acceptance is confirmed. A cheaper test that nobody on your list accepts is not cheaper.",
        ],
      },
      { type: "h2", text: "Preparing properly" },
      {
        type: "p",
        text: "Whichever test you choose, the approach is the same. Sit a full practice test first to find out where you actually stand — students routinely misjudge this in both directions. Then spend most of your preparation time on your weakest section rather than repeating the section you already enjoy.",
      },
      {
        type: "ul",
        items: [
          "Take a timed diagnostic before you book anything",
          "Prioritise your weakest section; Writing is the most common weak point",
          "Practise Speaking out loud and record yourself — silent reading does not build fluency",
          "Learn the format thoroughly, so no part of the test surprises you on the day",
          "Only book the real test once your practice scores are consistently at or above your target",
        ],
      },
      {
        type: "callout",
        title: "One question first",
        text: "Before you book anything, ask: do my target universities and my destination embassy accept this test, and what score do they require? Every other consideration comes second.",
      },
      {
        type: "p",
        text: "Not sure which test your shortlist accepts? Send us your target universities and we will confirm the requirement for each one.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const postSlugs = posts.map((p) => p.slug);

export const sortedPosts = [...posts].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date),
);
