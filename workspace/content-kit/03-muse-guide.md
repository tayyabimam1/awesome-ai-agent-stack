# Using Muse (Meta's AI agent) for this campaign

Muse is Meta's personal AI agent, launched in September 2026 on iOS, Android and muse.ai ([Meta](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)).

> ⚠️ **Availability:** at launch Muse rolled out **in the US**. If it isn't available in your country yet, everything below still works with any AI assistant (Claude, ChatGPT, Gemini): the prompts are the same.

---

## What Muse can and can't do for this

| Task | Muse? | How |
|---|---|---|
| Rewrite and adapt the posts in this kit | ✅ | Paste a post and a prompt from below |
| Turn an article into a thread or LinkedIn post | ✅ | Prompts below |
| Make images (carousels, covers, charts) | ✅ | **Muse Image** ([Meta](https://about.fb.com/news/2026/07/introducing-muse-image-meta-ai/)) |
| Read your Facebook, Instagram and Threads accounts | ✅ | Connected automatically if they're in the same Meta Accounts Centre |
| Publish or schedule to X, LinkedIn and other platforms | ⚠️ Via connector | Add a scheduling tool such as **Postiz** as a connector ([Postiz guide](https://postiz.com/blog/meta-muse-ai-connectors-schedule-social-media-posts)) |
| Publish directly to Instagram, Facebook or Threads | ❓ Not documented | Meta's pages describe *reading* these accounts, not publishing ([PostFast](https://postfa.st/blog/meta-muse-ai-social-media-managers)). Post by hand, or through the scheduler. |
| Post on Reddit | ❌ Do it yourself | Each subreddit needs a human post and replies |
| Submit to the main awesome list | ❌ Do it yourself | That list rejects AI-generated pull requests |
| Check facts and star counts | ❌ Do it yourself | Always compare with the website |

---

## One-time setup (about 15 minutes)

1. Open **muse.ai** or the Muse app and sign in with your Meta account.
2. In Meta **Accounts Centre**, make sure your Facebook, Instagram and Threads accounts are linked. Muse picks them up automatically.
3. Create a **Postiz** account (or another scheduler with a Muse connector), connect **X** and **LinkedIn** in Postiz, then add Postiz as a connector in Muse.
4. Give Muse this context once, so every later request is shorter:

> **Context prompt (paste once):**
> I maintain "Awesome AI Agent Stack", a free, open-source (CC BY 4.0) curated map of 2,990 tools for building AI agents, in 29 categories, ranked by GitHub stars. Website: https://tayyabimam1.github.io/awesome-ai-agent-stack/. Repo: https://github.com/tayyabimam1/awesome-ai-agent-stack. 556 entries are hand-picked; the rest pass a mechanical bar (public, maintained in the last 18 months, not archived). Key finding: skills and context-engineering tools have 3.8M combined stars vs 3.5M for coding agents. My tone: plain, practical, no hype, no emoji in headings, at most 3 hashtags. Never invent star counts or features; only use numbers I give you.

---

## Weekly workflow with Muse (about 1 hour a week)

**Monday: article.** Take next week's article from `articles/`. Ask Muse to proofread it (prompt A). Publish on dev.to yourself.

**Tuesday: images.** Ask Muse Image for a cover and a carousel (prompts D and E).

**Wednesday: social.** Ask Muse to turn the article into a LinkedIn post and an X thread (prompts B and C). Review them, then schedule through Postiz: LinkedIn on Wednesday, the X thread on Thursday.

**Thursday: Reddit (you, not Muse).** Post that week's Reddit post from `01-reddit-posts.md` and answer comments for 2 hours.

**Friday: Threads and Instagram.** Post the Threads text and the carousel.

---

## Prompts

**A. Proofread an article**
> Proofread this dev.to article. Fix grammar and clarity only. Keep every tool name, star count, number and link exactly as written. Don't add claims. Return the full article in Markdown.
> [paste article]

**B. LinkedIn post from an article**
> Write a LinkedIn post (under 200 words) from this article. First line is a hook without emoji. One personal sentence about why I built the list. End with "Link in the first comment 👇". At most 3 hashtags. Use only facts from the article.
> [paste article]

**C. X thread from an article**
> Turn this article into an X thread of 6 posts, each under 270 characters. Post 1: a hook with a number. Posts 2–5: one tool group each, with star counts from the article. Post 6: the link [paste link]. No hashtags except one in the last post.
> [paste article]

**D. Article cover image (Muse Image)**
> Create a 1000×420 image, dark background #0d1117, in a clean GitHub style. Large white title: "[article title]". Small gold (#d29922) star icon with "ranked by GitHub stars". Footer in blue (#4493f8): tayyabimam1.github.io/awesome-ai-agent-stack. No other text, no robots, no glowing brains.

**E. Instagram carousel (Muse Image, one slide at a time)**
> Create a 1080×1080 slide, dark background #0d1117, white text, gold (#d29922) accents, clean GitHub style. Slide [n] of 5: "[slide text from 02-social-posts.md]". Large readable text, generous margins, no stock-photo people.

**F. Reply to a comment (then edit it yourself)**
> Someone commented on my post: "[comment]". Draft a short, friendly reply. If it's criticism, thank them and say what I'll change. If it's a tool suggestion, invite them to open a pull request. No defensiveness.

**G. Weekly performance check (if Muse can read your Meta accounts)**
> Look at my Threads and Instagram posts from this week. Which got the most engagement, and what do the top ones have in common? Suggest 3 topics for next week based on that.

---

## Before anything goes out: checklist

- [ ] Every star count matches the website (they change daily)
- [ ] Every tool name is spelled exactly like its GitHub repo
- [ ] Links open the right page
- [ ] No claims the article doesn't make ("best", "fastest", "used by X")
- [ ] It sounds like you. Rewrite at least one sentence in your own words.
