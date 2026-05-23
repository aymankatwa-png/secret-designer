/*
 * ============================================================
 *  SECRET DESIGNER · CONFIGURATION
 *  Moomken Design 101 · 2026
 * ============================================================
 *
 *  This is the ONLY file you may need to edit.
 *
 *  WHAT'S HERE:
 *  - The 5 trainees with their private codes
 *  - The fixed secret assignments (who designs for whom)
 *  - Your Formspree endpoints (replace placeholders below)
 *  - Each trainee's "info bucket" they share with the group
 *
 * ============================================================
 *  SETUP CHECKLIST (one-time, 5 minutes):
 * ============================================================
 *
 *  1) Create a free Formspree account at https://formspree.io
 *  2) Create TWO forms in your Formspree dashboard:
 *       (a) "Signups"  -> for assignment notifications
 *       (b) "Uploads"  -> for final design submissions
 *  3) Copy each form's endpoint URL (looks like:
 *       https://formspree.io/f/xxxxxxxx)
 *  4) Paste them below in FORMSPREE_SIGNUP and FORMSPREE_UPLOAD
 *  5) That's it. Both forms will email you automatically.
 *
 *  6) Send each trainee their private code (see codes below)
 *     privately via WhatsApp/DM.
 *
 * ============================================================
 */

/* === YOUR FORMSPREE ENDPOINTS (REPLACE THESE) ============ */
const FORMSPREE_SIGNUP = "https://formspree.io/f/xojblnpb";
const FORMSPREE_UPLOAD = "https://formspree.io/f/mpqnljog";

/* === YOUR EMAIL (shown to trainees if they need to contact you) === */
const TRAINER_EMAIL = "a.abukhutwah@moomken.org";

/* ============================================================
 *  THE FIVE TRAINEES
 * ============================================================ */
const TRAINEES = [
  {
    id: 1,
    name: "هديل",
    nameEn: "HADEEL",
    code: "MK-7K2P-RD",
    target: 3,            /* هديل designs for مهند */
    infoCategory: {
      title: "🎨 الألوان والمزاج",
      body: "شارك مع زملائك: ألوانك المفضلة (٣ ألوان)، لون تكرهه، الجو الذي يريحك (هادئ / صاخب / دافئ / بارد)، ومزاجك العام."
    }
  },
  {
    id: 2,
    name: "جهاد",
    nameEn: "JIHAD",
    code: "MK-9X4M-SK",
    target: 5,            /* جهاد designs for هبة */
    infoCategory: {
      title: "⚡ الإيقاع والحركة",
      body: "شارك مع زملائك: هل أنت سريع أم بطيء في القرار؟ منظّم أم فوضوي؟ صباحيّ أم ليليّ؟ وما إيقاع حياتك بشكل عام."
    }
  },
  {
    id: 3,
    name: "مهند",
    nameEn: "MUHANNAD",
    code: "MK-3J8N-SN",
    target: 1,            /* مهند designs for هديل */
    infoCategory: {
      title: "🔮 الرموز والأشياء",
      body: "شارك مع زملائك: ٣ أشياء تمثلك (قهوة، كتاب، دراجة...)، حيوان يشبهك ولماذا، طعامك المفضل، ومكان تحبّه."
    }
  },
  {
    id: 4,
    name: "عبد الله",
    nameEn: "ABDULLAH",
    code: "MK-6F1Q-IN",
    target: 2,            /* عبد الله designs for جهاد */
    infoCategory: {
      title: "🎵 الصوت والكلمات",
      body: "شارك مع زملائك: كلمة أو عبارة تكررها كثيراً، نوع الموسيقى المفضل، لو كنت فيلماً ستكون أي نوع، وأغنية تمثلك."
    }
  },
  {
    id: 5,
    name: "هبة",
    nameEn: "HEBA",
    code: "MK-2W5Y-FG",
    target: 4,            /* هبة designs for عبد الله */
    infoCategory: {
      title: "🌟 الحلم والشخصية",
      body: "شارك مع زملائك: حلمك الكبير، أكثر شيء يضحكك، ٣ صفات تصف بها نفسك، وشيء يفاجئ الناس عنك."
    }
  }
];

/* ============================================================
 *  ASSIGNMENT CIRCLE (visual reference for you):
 *
 *    هديل (1)     ->  مهند (3)
 *    مهند (3)     ->  هديل (1)        (pair swap)
 *    جهاد (2)     ->  هبة  (5)
 *    هبة  (5)     ->  عبد الله (4)
 *    عبد الله (4) ->  جهاد (2)        (rotating 3-cycle)
 *
 *  Nobody designs for themselves. Every trainee is targeted
 *  by exactly one other. Each one gets a unique, locked target.
 * ============================================================ */
