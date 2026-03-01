---
description: Automatically processes raw German text into a fully mapped Story for the Citanie app.
---

# Workflow: Import Story

This workflow instructs me (Antigravity AI) on how to act when you provide raw German text to import into the app. 

### Trigger
You write: "Import this story: [YOUR RAW GERMAN TEXT]"

### My Autonomous Actions:

1.  **Analyze & Metadata:**
    *   I will read your raw German text.
    *   I will look at `src/data/stories.js` to determine the next sequential `storyId` (e.g., `story_06`).
    *   I will generate a fitting German title and translate it to a Slovak `titleSk`.
    *   I will generate a URL-friendly `slug` (e.g., `story_06_der_neue_text`).
    *   I will estimate the CEFR level (`A1`, `A2`, or `B1`) based on the vocabulary.
    *   I will write a short 1-sentence `description` in Slovak.

2.  **Sentence Parsing & Translation:**
    *   I will break the text down into individual sentences.
    *   For each sentence, I will provide the original German (`de`) and an accurate Slovak translation (`sk`) that fits the context.

3.  **Quiz Generation:**
    *   I will generate exactly 3 reading comprehension questions in German based on the text.
    *   Each question will have 4 options in German, one correct `answer` index (0-3), and a short Slovak `explanation`.

4.  **Deep Grammar Mapping:**
    *   I will identify the most important verbs, nouns, and adjectives in the text.
    *   For *every single one of these words*, I will generate the exact massive JSON dictionary structure required by `useAI.js`. 
        *   Nouns: `type`, `sk`, `article`, `plural`, `cases` (Nominativ, Akkusativ, Dativ, Genitiv), `example`, `exampleSk`.
        *   Verbs: `type`, `sk`, `infinitiv`, `conjugation` (ich, du, er/sie/es, wir, ihr, sie), `example`, `exampleSk`.
        *   Adjectives: `type`, `sk`, `example`, `exampleSk`.

5.  **Code Injection:**
    *   I will use my codebase tools to gracefully append this massive new story object directly into the `STORIES` array inside `c:\Users\USER\Documents\GERMAN\src\data\stories.js`. 

6.  **Audio Generation:**
    *   I will create a temporary Node.js script.
    *   This script will read your `OPENAI_API_KEY` from the `.env` file.
    *   It will securely call the OpenAI API (using the `nova` premium voice) to generate an MP3 of the full German text.
    *   I will save the resulting audio file directly to `public/audio/stories/[slug].mp3`.
    *   I will delete the temporary script.

7.  **Confirmation:**
    *   I will notify you that the story is fully imported and ready to read in your browser!
