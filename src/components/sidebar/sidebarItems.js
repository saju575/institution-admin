const PUBLIC = "public";
const PRIVATE = "private";

export const sidebarItems = [
  {
    title: "প্রথম পাতা",
    links: [
      { path: "/", label: "জরুরী নিউজ", type: PUBLIC },
      { path: "/about-us", label: "আমাদের কথা", type: PUBLIC },
      { path: "/aim-objective", label: "লক্ষ্য ও উদ্দেশ্য", type: PUBLIC },
    ],
  },
  {
    title: "প্রশাসনিক",
    links: [
      { path: "/management-committee", label: "পরিচালনা কমিটি", type: PUBLIC },
      {
        path: "/president-message",
        label: "প্রতিষ্ঠানের সভাপতি সম্পর্কে",
        type: PUBLIC,
      },
      { path: "/principal-message", label: "অধ্যক্ষ সম্পর্কে", type: PUBLIC },
      { path: "/teachers", label: "শিক্ষকবৃন্দ", type: PUBLIC },
      { path: "/workers", label: "কর্মকর্তা", type: PUBLIC },
    ],
  },
  {
    title: "একাডেমিক",
    links: [
      { path: "/class-routine", label: "ক্লাস রুটিন", type: PUBLIC },
      { path: "/exam-routine", label: "পরীক্ষার রুটিন", type: PUBLIC },
      { path: "/notice", label: "নোটিশ", type: PUBLIC },
      { path: "/syllabus", label: "সিলেবাস", type: PUBLIC },
    ],
  },
  {
    title: "সহপাঠ",
    links: [
      { path: "/scout-guide", label: "বয় ও গার্লস স্কাউট গাইড", type: PUBLIC },
      {
        path: "/debate-competition",
        label: "বিতর্ক প্রতিযোগিতা",
        type: PUBLIC,
      },
      { path: "/play", label: "ক্রিয়া", type: PUBLIC },
    ],
  },
  {
    title: "ভর্তি",
    links: [
      { path: "/admission-notice", label: "ভর্তি বিজ্ঞপ্তি", type: PUBLIC },
      {
        path: "/admission-exam-syllabus",
        label: "ভর্তি পরিক্ষার সিলেবাস",
        type: PUBLIC,
      },
      {
        path: "/list-of-selected-students-seeking-admission",
        label: "ভর্তি নির্বাচিত শিক্ষার্থীর তালিকা",
        type: PUBLIC,
      },
      {
        path: "/list-of-selected-students-waiting-admission",
        label: "ভর্তি অপেক্ষমান শিক্ষার্থীর তালিকা",
        type: PUBLIC,
      },
    ],
  },
  {
    title: "রেজাল্ট",
    links: [
      { path: "/school-result", label: "স্কুলের রেজাল্ট প্রকাশ", type: PUBLIC },
      { path: "/check-school-result", label: "স্কুল রেজাল্ট", type: PUBLIC },
    ],
  },
  {
    title: "গ্যালারি",
    links: [{ path: "/events", label: "ইভেন্টস", type: PUBLIC }],
  },
  {
    title: "যোগাযোগ",
    links: [{ path: "/contact", label: "যোগাযোগ", type: PUBLIC }],
  },
  {
    title: "অ্যাডমিন প্রোফাইল",
    links: [
      { path: "/profile", label: "প্রোফাইল", type: PUBLIC },
      { path: "/admin-list", label: "অ্যাডমিন তালিকা", type: PRIVATE },
    ],
  },
];
