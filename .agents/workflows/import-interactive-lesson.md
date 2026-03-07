---
description: Automatically processes an interactive HTML lesson for a video and integrates it into the app as a React modal.
---
# Interactive Lesson Integration Workflow

**Goal:** Transform a raw HTML interactive lesson provided by the user into a fully functional, integrated React component for the Video Coach app. This automated workflow handles data extraction, AI translation/TTS generation, component transformation, and dynamic routing code updates.

## Prerequisites
1. The user must provide a **YouTube Video ID**.
2. The user must provide the contents or file path to the **raw interactive HTML file**.

---

## Step 1: Extract and Process the Story (Čítanie Integration)
1. Read the provided HTML interactive lesson file.
2. Extract the German text from the "📖 Príbeh" section (the core storytelling text).
3. Determine a suitable `title` and `titleSk` based on the context of the story.
4. Process this text using the exact methods from the `import-story.md` workflow:
   - Use AI to generate line-by-line Slovak translations.
   - Generate a unique sequential `id` (e.g., `story_08_...`).
   - Extract Vocabulary words into a `words` JSON dictionary. **CRITICAL REQUIREMENT: This must generate detailed grammar data (`type`, `article`, `plural`, `cases`, `conjugation`) and you MUST EXTRACT EVERY SINGLE NOUN found in the text so that it can be colorized.** Avoid duplicated word keys already existing globally in `stories.js`.
   - Generate 3 multiple-choice questions for the standard `quiz` array.
   - Write a temporary Node.js ES module script to generate the reading MP3 audio via the OpenAI API (TTS-1, nova voice). Execute the script and save the file to `public/audio/stories/[storyId].mp3`.
   - Take all this generated data and inject it into the `STORIES` array inside `src/data/stories.js`.

## Step 2: Convert Interactive HTML to a React Component
1. Create a new React component file in `src/components/` (e.g., `Lesson_[VideoID].jsx`).
2. Model this component as a Modal following the exact visual layout and structural template of `WalkAndTalkLesson.jsx`. It must accept `isOpen` and `onClose` props.
3. **The Tabs System:** The component must maintain internal state for tabs: `story`, `vocab`, `grammar`, `exercises`.
4. **Príbeh Tab:** Instead of hardcoding the story, import `ReadingPhase` from `../views/StoryReader.jsx`. Pass the newly created story data from Step 1 (imported from `STORIES`) as props so the text functions dynamically.
5. **Slovíčka and Gramatika Tabs:** Extract the HTML structure for these respective sections from the provided raw HTML file. Convert it cleanly to JSX format (e.g. nested components like `const Vocab = () => (...)`). Make sure to preserve Tailwind classes, formatting, emojis, and highlighting logic (blue for der, red for die, green for das).
6. **Übungen Tab:** Extract the JSON configuration arrays from the provided HTML `<script>` tags (`mcData`, `fillBlankData`, `matchData`, `sentenceData`, `translationData`). Pass these configs into the suite of prebuilt interactive exercise tools imported from your codebase (e.g., `ExMultipleChoice`, `ExFillBlanks`, `ExMatching`, `ExSentenceBuilder`, `ExTranslation`). Duplicate the `handleScore` aggregation pattern.

## Step 3: Integrate Lesson Component into Video Coach
1. Open `src/views/VideoCoach.jsx`.
2. Find the static logic checking `videoId === 'uzNrP5ZyH0A'` for rendering the "🎓 Interaktívna lekcia" button (around line 670).
3. Find the static logic rendering the actual Modal (e.g. `{videoId === 'uzNrP5ZyH0A' && <WalkAndTalkLesson ... />}`) at the bottom of the JSX tree.
4. Refactor this implementation so it uses a dynamic mapping (e.g., `const LessonComponent = LESSON_COMPONENTS[videoId]`).
5. Wire up imports to include your newly created `Lesson_[VideoID].jsx` and ensure that clicking the button successfully toggles the `isLessonModalOpen` state for the correct lesson component.

## Step 4: Verification
1. Run `npm run build` to verify there are no JSX syntax errors, missing imports, or trailing commas.
2. Confirm the entire pipeline completed successfully, keeping original style aesthetics and functionality unchanged.
