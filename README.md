# 🤫 Secret Designer · المصمم الخفي

Interactive landing site for the **Moomken Design 101** secret designer mission.

Each trainee enters their name + private code, gets revealed their secret target,
then later uploads their final design. You (the trainer) receive an email for
**every signup** and **every uploaded design**, automatically.

---

## 🗂 Files in this folder

| File | Purpose |
|---|---|
| `index.html` | The landing page (HTML + all styling) |
| `app.js` | Logic: reveal + signup notification + upload |
| `assignments.js` | **The only file you edit.** Trainees, codes, your Formspree URLs |
| `README.md` | This file |

---

## ✅ How everything works (high level)

1. **Trainee opens the website** (single page, scrolls through the story).
2. At the bottom, they reach the **Secret Draw** section.
3. They **pick their name** and **enter their private code** (sent to them privately by you).
4. If the code is correct → they see **their secret target** + their **info bucket** to share with the group.
   At the same moment, **you get an email**: *"هديل just signed up. She's designing for مهند."*
5. After a few days, they finish their design and come back to **upload it**.
   You get the design **emailed to you** with their name and any notes they wrote.

**Important:** assignments are pre-locked in `assignments.js`. The pairing is fixed before
anyone signs up — nobody can be reassigned, and no two trainees get the same target.
You arrange the circle however you like.

---

## 🚀 SETUP — 3 steps (10 minutes total)

### Step 1 — Set up Formspree (free email forwarding)

Formspree is a free service that takes form submissions and emails them to you.
It handles file uploads too.

1. Go to **https://formspree.io** and sign up (free plan is enough — 50 submissions/month).
2. Verify your email.
3. In the dashboard, click **+ New Form**.
4. Name it `Moomken - Signups`. Use **your email** as the destination.
5. Copy the form's endpoint URL — looks like: `https://formspree.io/f/xpqrgxxx`
6. **Repeat once more:** create a second form called `Moomken - Uploads` (same email).
   Copy its endpoint too.

### Step 2 — Edit `assignments.js`

Open `assignments.js`. At the top you'll see:

```js
const FORMSPREE_SIGNUP = "https://formspree.io/f/YOUR_SIGNUP_ID";
const FORMSPREE_UPLOAD = "https://formspree.io/f/YOUR_UPLOAD_ID";
const TRAINER_EMAIL = "your-email@example.com";
```

Replace the three placeholder lines with:
- Your **Signups** Formspree URL
- Your **Uploads** Formspree URL
- Your real email address

That's it. The 5 trainees, codes, and circular assignments are already filled in:

| Trainee | Code | Designs for |
|---|---|---|
| هديل | `MK-7K2P-RD` | مهند |
| مهند | `MK-3J8N-SN` | هديل |
| جهاد | `MK-9X4M-SK` | هبة |
| هبة | `MK-2W5Y-FG` | عبد الله |
| عبد الله | `MK-6F1Q-IN` | جهاد |

Feel free to change codes to something else, just keep them unique.

### Step 3 — Host on GitHub Pages (free, permanent)

1. Go to **https://github.com/new** and create a public repo named `secret-designer` (or any name).
2. On the new repo page, click **uploading an existing file**.
3. Drag in **all 4 files** (`index.html`, `app.js`, `assignments.js`, `README.md`).
4. Click **Commit changes**.
5. Go to repo **Settings** → left sidebar **Pages**.
6. Under "Source", select branch `main` and folder `/ (root)`. Click **Save**.
7. Wait ~1 minute. Your site is live at:
   `https://YOUR_USERNAME.github.io/secret-designer/`

Done! 🎉

---

## 📩 Sending codes to the trainees

After you've hosted the site, send each trainee a private WhatsApp message with their unique code.
**Don't post the codes in a group chat** — one code per person, sent privately.

### Template message (Arabic)

```
أهلاً [اسم المتدرب] 👋

مهمتك الإبداعية لهذا الأسبوع هنا:
https://YOUR_USERNAME.github.io/secret-designer/

كودك السرّي: [الكود من الجدول أعلاه]

اقرأ الموقع من فوق لتحت، وفي القسم الأخير اختر اسمك واكتب كودك.
لا تكشف الكود ولا اسم زميلك السرّي لأي شخص.

موعد العرض: [اليوم/التاريخ]
بالتوفيق! 🎨
```

### Codes cheat sheet (private, for you)

```
هديل      → MK-7K2P-RD
جهاد      → MK-9X4M-SK
مهند      → MK-3J8N-SN
عبد الله  → MK-6F1Q-IN
هبة       → MK-2W5Y-FG
```

---

## 📬 What emails you'll receive

### When a trainee reveals their target:
```
Subject: 🎨 Secret Designer · New Signup: هديل

هديل (HADEEL) just revealed their secret target.
They are designing for: مهند (MUHANNAD).
Timestamp: 24/05/2026, 14:32:18
```

### When a trainee uploads their design:
```
Subject: 🎨 Design Submission · هديل

trainee_name: هديل
notes: اخترت اللون الأزرق لأن مهند هادئ ومنظم...
[attachment: design_file.png]
```

---

## ❓ FAQ

**Q: What if a trainee loses their code?**
A: Just resend the same code from your cheat sheet. The code stays valid until the mission ends.

**Q: Can a trainee re-reveal a different target by entering different codes?**
A: No. Each code only matches one specific person, and each person's target is locked in `assignments.js`. There's no way to game the system unless someone reads the source code — and even then, they'd just ruin their own surprise.

**Q: What if I want 6 or 7 trainees instead of 5?**
A: Edit `assignments.js` and add more trainees to the `TRAINEES` array. Just make sure each `target` id is used exactly once across all trainees, and no one targets their own id. Also add their names to the upload form `<select>` in `index.html` (look for the `<option>` lines).

**Q: How private is this?**
A: The codes prevent casual peeking. A determined cheater could read the source — but in a small trusted group, the honor system works fine. For real security you'd need a backend, which means paid hosting.

**Q: How big can uploaded designs be?**
A: Formspree free plan caps individual file uploads at 10MB. Should be plenty for a 1080×1080 PNG. If a trainee has a larger file, they can compress it or use [tinypng.com](https://tinypng.com).

**Q: I changed something and the site looks broken.**
A: Open browser DevTools (F12) → Console tab. Any JavaScript error will be in red there. Most likely cause: a syntax error in `assignments.js` (missing comma or quote).

---

## 💡 Want to extend it?

Ideas you could add later:
- A trainer-only dashboard URL showing all 5 assignments at a glance
- A countdown timer to the reveal day
- "View other people's designs" page (after the reveal)
- Vote on "best design" feature
- Multi-language toggle

Just ask Claude to add any of these.

---

**Built for Moomken · Design 101 · 2026**
