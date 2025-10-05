# SelfOS — Phase 1 UX Wireframing & SVGs
_Browser Extension + Companion Webapp — single source-of-truth UX spec_

---

## Design Identity / Tokens

- **Primary Accent (SelfOS Blue):** `#4A90E2`
- **Neutral palette:** background `#f7f7f7`, card `#ffffff`, stroke `#dcdcdc`, text `#333` / `#555`
- **Typography (recommendation):** Inter (4-600)
- **Interaction cadence:** calm micro-transitions < 300ms; overlays targeted for ≤ 20s engagement windows

---

## Purpose of this document

This file contains the full Phase 1 UX wireframing for SelfOS: layout descriptions (as markdown blocks) for each screen/flow, followed by a consecutive sequence of the SVG illustrations used to prototype the wireframes. The extension overlays are designed to operate during AI processing pauses; the companion webapp is the user’s home base for account management and visualized knowledge graph.

---

## Contents

1.  **Browser Extension — Wait-Time Overlay**
2.  **Browser Extension — AI-Result Handoff**
3.  **Companion Webapp — Home Dashboard**
4.  **Companion Webapp — Knowledge Graph View**
5.  **Companion Webapp — Settings & Integrations**
6.  **Consecutive SVG Illustrations (all wireframes)**


## Wait-Time Overlay — Markdown Layout Description

**Purpose**
- Provide a single focused micro-question during an external AI processing pause. 
- Keep total time-in-view under 20s and require a single tap or short text input.

**Trigger**
- External AI request detected (extension listener sees an API call or DOM/extension hook signals processing).
- Overlay animates in only when the AI job is estimated ≥ 8s.

**Hierarchy & Components**
- **Context Bar (top thin strip):**
  - Small label: "AI processing… ⟳"
  - Subtle progress spinner (non-distracting).
- **Prompt Card (center card):**
  - Title: "SelfOS Prompt"
  - One-line micro-question contextual to current task. Example: “Do you prefer concise or verbose explanations?”
  - Optional one-line contextual hint (smaller font).
- **Primary Actions (prominent):**
  - 2–3 tappable options (full-width or split) — primary action in SelfOS Blue (#4A90E2).
- **Secondary Action (small):**
  - “Skip” (text link).
- **Microcopy examples:**
  - Primary: “Concise” / “Verbose”
  - Affirmation on select: “Saved — your AI will adapt.”
- **Behavior / Flow**
  1. Overlay appears; background dimmed to 30% opacity.
  2. User taps choice (or types short input and confirms).
  3. Instant toast: “Preference saved”.
  4. Overlay auto-dismisses when AI returns; if user does nothing, overlay auto-dismisses at AI completion with no data captured.
- **Accessibility**
  - Keyboard navigation, ARIA labels, high-contrast mode, readable text size.
- **Edge Cases**
  - If the AI job cancels or fails, show small note: “Captured locally — try again.” Do not resend without explicit user consent.

## AI-Result Handoff — Markdown Layout Description

**Purpose**
- Provide a minimal, positive confirmation that the micro-input was recorded and that it will influence future AI behaviour.
- Anchor the user back into the main UI with a one-tap dismissal.

**Trigger**
- External AI signals completion (detected by extension).
- If a micro-question was answered during the processing window, the handoff overlay appears for ≤ 2 seconds.

**Hierarchy & Components**
- **Completion Card (center):**
  - Icon: checkmark ✓
  - Short affirmation copy: “Preference saved — your AI now aligns with concise tone.”
- **Primary Action:**
  - “Got it” (button in SelfOS Blue).
- **Behavior / Flow**
  1. Show card for 1.5–2s; fade-in/out.
  2. On “Got it”, dismiss immediately.
  3. Log event to local encrypted vault and sync (background).
- **Microcopy**
  - Keep language concrete and trust-building: “Saved locally — visible in your SelfOS dashboard.”
- **Accessibility**
  - Timed but dismissible via keyboard; screen-reader friendly confirmation.

## Home Dashboard — Markdown Layout Description

**Purpose**
- Provide transparency, a sense of progress, and easy access to preferences and exports.

**Top-Level Layout**
- **Header / Nav:** Branding (SelfOS), Search, Navigation (Dashboard | Knowledge Graph | History | Integrations | Settings)
- **Left Sidebar (compact):** Profile snapshot, last sync time, quick privacy toggle (Full / Minimal)
- **Main Column A (top):** Recent Micro-Trainings — chronological list with short excerpts, timestamp, source (e.g., ChatGPT — Gmail — IDE)
- **Main Column B (bottom):** AI Alignment Progress — compact KPI cards:
  - Alignment Score (e.g., 0–100)
  - Recent Improvements (last 7 days)
  - A/B outcomes summary (e.g., “Conciseness match ↑ 24%”)
- **Right Rail (optional):** Quick export, onboarding tips, and “train now” manual micro-session button.

**Interactions**
- Click a micro-training item to expand into full detail, see how it was used, and optionally redact/export that single datum.
- “Train now” opens extension-like modal for immediate micro-interaction.

**Privacy & Trust**
- Prominent data ownership copy: “Your data — encrypted & exportable.”
- Easy Delete / Export controls available in-line per datum.

## Knowledge Graph View — Markdown Layout Description

**Purpose**
- Make the self-context tangible and explorable; show relationships and stability over time.

**Layout**
- **Central Node:** "You" — single prominent node representing the live self-model.
- **Surrounding Clusters:** Tone, Focus, Habits, Emotion, Domain Expertise, Communication Style.
- **Connections:** Lines between nodes with varying stroke weight denoting strength/confidence of relation.
- **Interaction Modes:**
  - Hover a node: reveal quick metric (e.g., “Conciseness preference: 78%”).
  - Click a node: open time-series view (how this trait changed).
  - Drag to reorganize for user-customized mental model.
- **Supplementary Panel:** Right-side detail panel shows raw micro-trainings that contributed to the selected node; allows redaction or annotation.
- **Behavior**
  - Animated transitions on sync.
  - Ability to export a snapshot (JSON/embeddings) for agent adapters.
## Settings & Integrations — Markdown Layout Description

**Purpose**
- Allow fine-grained controls for integrations, data visibility, export, and deletion.

**Components**
- **Integrations List / Row Items**
  - Service name (ChatGPT, Gemini, Copilot, Notion AI), status pill (Connected / Connect), last sync time, “Manage” button.
- **Data Visibility Mode**
  - Radio / pill choices: Full | Minimal | Manual Approval
  - Inline description of what each mode shares.
- **Export & Delete**
  - Buttons to export full vault (encrypted) or delete entire profile (with confirmation).
- **Enterprise Controls (if enabled)**
  - Seat-level sharing, team graphs opt-in toggle.
- **Behavior**
  - Toggling an integration updates local policy and shows example of what will be shared in a preview popup.
- **Safety**
  - Explicit permission prompts for first-time exports to a third-party service.


# UX Patterns and Microscopy Guidelines
- Keep micro-questions < 10–12 words when possible.
- Prefer choice buttons over free text unless the task calls for nuance.
- Use affirmations immediately: “Saved — visible on Dashboard.”
- Minimize modal interruptions: overlays must be subtle and optional.
- For developer persona (LLM drift risk): include grounding prompts like:
  - “Keep to current scope?” (Yes / Reorient / Explore)
  - “Focus: one-liner vs. full refactor?”

# Data Flow
1. Extension detects external AI processing → shows micro-question.
2. User responds (button or short text) → data written to encrypted local vault immediately.
3. On completion, extension shows handoff; background sync to user’s companion webapp (encrypted transport).
4. Webapp aggregates, clusters, and visualizes the data into the Knowledge Graph.
5. Export adapters (user-initiated) format the graph for consumption by external agents (embedding packs, custom instruction snippets).


# Accessibility and Performance Notes
- Overlays must be keyboard accessible and dismissible.
- Minimal DOM impact — extension should be < 20KB runtime overhead.
- Defer heavy work (embedding generation, clustering) to webapp/cloud to keep extension responsive.
- Provide explicit offline/airplane mode behavior: store-to-vault and sync when online.

