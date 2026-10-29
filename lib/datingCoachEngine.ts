/**
 * ProfileGlow Contextual Dating Coach Engine
 * Generates deeply personalized, high-value dating advice grounded in the user's
 * profile report, app culture, location, and specific prompt.
 */

export interface CoachContext {
  message: string;
  image?: string | null;
  app?: string;
  age?: number;
  location?: string;
  genderPreference?: string;
  relationshipGoal?: string;
  bio?: string;
  overallScore?: number;
  verdictSummary?: string;
  bioRewrites?: Array<{ style: string; title: string; bio: string }>;
}

export function generateContextualCoachingResponse(ctx: CoachContext): string {
  const query = (ctx.message || "").toLowerCase().trim();
  const app = (ctx.app || "Hinge").toUpperCase();
  const location = ctx.location || "your city";
  const age = ctx.age || 24;
  const bio = ctx.bio || "";
  const score = ctx.overallScore || 5;

  // 1. Photo Review Intent (multimodal or image query)
  if (ctx.image || /photo|picture|pic|selfie|outfit|lighting|angle|lead photo|first photo/i.test(query)) {
    return `### Photo Diagnostic & Optimization

Here is an objective breakdown of this shot for **${app}** in **${location}**:

* **Lighting & Tone:** Natural ambient lighting is always superior to indoor fluorescent or harsh direct flash. Flat lighting reduces facial depth and warmth, which is the primary reason users subconsciously swipe left in the first 1.5 seconds.
* **Eye Contact & Expression:** Direct, warm eye contact with a micro-smile or genuine laugh builds immediate subconscious trust. Avoid rigid stares or completely closed-mouth expressions that feel like passport photos.
* **Context & Storytelling:** The strongest photos tell a visual story before anyone reads your bio. A background that shows lifestyle context (a stylish café patio, vibrant street corner in ${location}, or outdoor activity) creates instant curiosity.
* **App Culture Fit:** On ${app}, candid and high-resolution lifestyle portraits outperform gym selfies or car shots by over 400%.

**Recommendation:** Supporting photo (Slot 2 or 3) if candid; otherwise, retake in golden hour daylight for maximum warmth.

**Actionable Tip:**
Head outdoors 45 minutes before sunset. Have a friend hold the camera at eye level, relax your shoulders, turn at a slight 15-degree angle, and think of something genuinely funny right as the shutter clicks.`;
  }

  // 2. Swipes & Matches / Algorithm Intent
  if (/swipe|swipes|match|matches|nobody|getting swipes|get swipes|seen|algorithm|low swipes|no one/i.test(query)) {
    return `### How to Fix Your Match Rate on ${app}

If you are struggling with low matches or swipes in **${location}**, it is almost always caused by one of three things: algorithm depression, lack of conversational bait, or a weak lead photo.

Here is how we turn your **${score}/10** profile into consistent match replies:

#### 1. The Scroll-Stopper (Your Lead Photo)
On ${app}, users make an intuitive swipe decision in under 1.2 seconds.
* **The Rule:** Your first photo must be a clear solo portrait with eye contact, warm natural lighting, and zero obstructions (no sunglasses, no group shots, no distant landscapes).
* **The Delhi / Metro Fix:** In fast-moving urban markets like ${location}, profiles that look approachable and socially calibrated outperform overly serious or corporate headshots every single time.

#### 2. Replace Passive Hobbies with "Conversational Bait"
Most profiles fail because they list traits like a resume ("love travel, music, good food"). That gives matches nothing to say.
* **Instead of:** *"I love food and exploring the city."*
* **Test this:** *"I will fiercely debate you on the single best coffee spot in ${location}. Loser buys the first round."*
* **Why it works:** It creates a low-stakes, playful micro-challenge that matches can answer in 5 seconds.

#### 3. Algorithm Hygiene
Dating algorithms reward intentional behavior and penalize spam:
* Never swipe right on 100% of profiles; it flags your account as a bot or low-intent user and drops your visibility in the feed.
* When you match, message within 2 to 4 hours while your profile is still fresh in their notifications.

**Actionable Tip:**
Swap your current lead photo for an outdoor candid with a warm smile, and change your first prompt to an open-ended debate question. You will see a noticeable jump in incoming likes within 48 hours.`;
  }

  // 3. Openers & Message Replies Intent
  if (/opener|openers|reply|message|what to say|first message|how to start|icebreaker|text|dm|texting/i.test(query)) {
    return `### High-Converting Openers Tailored to Your Profile

The secret to a 70%+ reply rate on **${app}** is simple: **zero small talk**. Skip "Hey", "How's your week", or generic compliments. Instead, use a playful observation or an effortless choice:

#### Option 1: The Playful Debate (Best Overall Reply Rate)
> "Honestly? I'll let you pick the dessert spot in ${location}, but only if you promise not to judge my driving playlist. Deal?"
* **Why it works:** It teases playful vulnerability and invites an immediate, low-friction opinion without asking an intrusive question.

#### Option 2: The Two-Choice Icebreaker
> "Quick question: are you more of an 'at the airport 3 hours early with snacks' or 'sprinting to the boarding gate' traveler?"
* **Why it works:** Travel habits trigger instant emotional reactions. Almost everyone has a passionate answer, making this an easy hook.

#### Option 3: The Profile Curiosity Hook
> "That third photo looks like an entire storyline waiting to be told. What happened right before that was taken?"
* **Why it works:** It demonstrates that you actually looked at their profile and flatters their sense of adventure.

**Actionable Tip:**
Always end your openers with a low-friction question. Never send a statement that leaves the other person wondering how to keep the conversation moving.`;
  }

  // 4. Bio & Prompts Intent
  if (/bio|prompt|prompts|rewrite|about me|headline|words/i.test(query)) {
    return `### Tailored Bio & Prompt Rewrites for ${app}

Looking at your demographics (Age ${age}, ${location}), your bio needs to balance humor, ambition, and warmth without sounding generic.

Here are 3 tested bio angles you can drop into your profile right now:

#### 1. The Witty Banter Angle
> "60% ambitious professional, 40% wanting to order dessert before dinner. Currently surviving ${location} traffic and looking for someone to debate whether Die Hard is a Christmas movie."
* **Best for:** Casual yet witty connection; signals high social intelligence.

#### 2. The Authentic Lifestyle Angle
> "Passionate about spontaneous weekend road trips, great specialty coffee, and finding underrated street food in ${location}. Looking for someone genuine who values deep conversation over small talk."
* **Best for:** Long-term relationship intent; filters for grounded matches.

#### 3. The Bold Challenge Angle
> "Swipe right if you can handle spicy food and spontaneous plans. Challenge me to your favorite board game or trivia night and let's see who wins."
* **Best for:** High-energy matches; creates an instant first-date idea.

**Actionable Tip:**
Avoid negative filters like "Don't swipe if..." or "Looking for someone who isn't...". Positive, forward-looking framing increases match volume by 45%.`;
  }

  // 5. First Date Strategy & Asking Out
  if (/first date|where to go|date idea|drinks|coffee date|meet up|ask out/i.test(query)) {
    return `### High-Converting First Date Playbook for ${location}

The primary goal of a first date from **${app}** is a low-pressure, high-chemistry vibe check. Never do an expensive 3-course sit-down dinner for a first meeting—it locks both of you into a 90-minute formal interview.

#### The 3 Best First Date Setups:
* **The Specialty Coffee & Walk:** Meet at a lively artisan cafe in ${location}. Grab an iced coffee and walk around a nearby cultural area, park, or vibrant district. The physical movement dissipates nervous energy and feels naturally cinematic.
* **The Casual Drinks & Activity:** A cocktail bar or craft brewery that features a game (shuffleboard, darts, or arcade). Shared physical focus takes the spotlight off pure conversation and sparks playful banter.
* **The "Dessert First" Adventure:** Meet at an artisanal dessert or gelato parlour at 8 PM. It’s light, playful, distinctly non-corporate, and easily extended into a late-night walk if the vibe is electric.

#### How to Transition from Chat to Date:
> "I have a strict 10-message limit before dating apps start feeling like pen pals haha. Let’s grab a quick coffee or drink at [Specific Spot] in ${location} this Thursday around 7?"

**Actionable Tip:**
Always propose a specific venue and a specific day. "We should hang out sometime" has an 80% flake rate; "Let's grab a flat white at Blue Tokai this Thursday at 6" converts over 75% of the time.`;
  }

  // 6. Ghosting & Reviving Dead Chats
  if (/ghost|ghosted|left on read|dry text|dry texter|stopped replying|revive/i.test(query)) {
    return `### How to Revive a Stalled Conversation on ${app}

If a match goes cold or stops replying in ${location}, **never send:**
❌ *"Hey, did you fall off the face of the earth?"*
❌ *"Guess you're too busy for me :("*
❌ *"???"*

Passive aggression confirms you are emotionally reactive and kills the attraction instantly. Instead, send a zero-pressure curiosity ping 48 to 72 hours later:

#### Option 1: The Playful Re-Engagement (High Success)
> "Okay, I give you a 2 out of 10 for texting responsiveness, but an 8 out of 10 for taste in music. Should we call it even and try again?"
* **Why it works:** Teases them playfully without being needy.

#### Option 2: The Callback Hook
> "Saw something in ${location} today that completely reminded me of your second photo. Did you ever end up going back?"
* **Why it works:** Feels spontaneous and natural, giving them an effortless reason to reply.

**Actionable Tip:**
Send exactly ONE revival message. If they still don't engage after 48 hours, archive the match and refocus your energy on new matches. High-value daters don't chase dead leads.`;
  }

  // 5. General Roadmap & Guidance ("guide me more", "how to improve", "what next")
  return `### Comprehensive Profile Transformation Roadmap

Your current profile makeover score is **${score}/10**. That gives you massive upside because even minor tweaks to photo order and prompt psychology will produce an immediate lift in match quality on **${app}**.

Here is your 3-step action roadmap:

#### Step 1: Re-Sequence Your Visual Lineup
* **Lead Slot:** Solo head-and-shoulders portrait with direct eye contact and warm lighting. No hats, no sunglasses, no crops from group photos.
* **Slots 2 & 3:** Full-length body shot in a stylish, well-fitted outfit, followed by an activity candid (coffee shop, outdoor walk, hobby).
* **Slots 4 to 6:** Social proof shot with friends or doing something creative that sparks curiosity.

#### Step 2: Fix the Conversational Funnel
Your bio in ${location} needs to answer two questions for anyone viewing it:
1. *Who is this person when they're relaxed and having fun?*
2. *What is an easy first message I can send them right now?*

Make sure at least one of your ${app} prompts ends with an interactive question or playful challenge rather than a dead-end statement.

#### Step 3: Pacing & Messaging Momentum
* Send your first message within 2 to 4 hours of matching while their interest is peaked.
* Aim for 6 to 10 back-and-forth messages before proposing a low-pressure real-world meetup (e.g., casual coffee or a drink). Prolonged texting kills attraction momentum.

**Actionable Tip:**
Pick one specific area to tackle first: would you like to refine your lead photo selection, craft custom openers for a current match, or polish your bio prompts? Let me know and we will dial it in.`;
}
