import sys
import os
import zipfile
import sqlite3
import json
import shutil
import re
import time
from deep_translator import GoogleTranslator

# Configure absolute paths
APKG_PATH = r'c:\Users\USER\Documents\GERMAN\ANKI\Nicos_Weg_A1_Deutsch_Welle_English.apkg'
TEMP_DIR = r'c:\Users\USER\Documents\GERMAN\tmp_anki_unzip'
MEDIA_DIR = r'c:\Users\USER\Documents\GERMAN\public\media\anki'
OUTPUT_DIR = r'c:\Users\USER\Documents\GERMAN\src\data\decks'
DECKS_INDEX = r'c:\Users\USER\Documents\GERMAN\src\data\decks.js'

def main():
    print("Unzipping APKG...")
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR, ignore_errors=True)
    os.makedirs(TEMP_DIR, exist_ok=True)
    os.makedirs(MEDIA_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with zipfile.ZipFile(APKG_PATH, 'r') as zip_ref:
        zip_ref.extractall(TEMP_DIR)

    print("Parsing Media map...")
    media_file = os.path.join(TEMP_DIR, 'media')
    if os.path.exists(media_file):
        with open(media_file, 'r', encoding='utf-8') as f:
            media_map = json.load(f)

        for file_id, filename in media_map.items():
            src_path = os.path.join(TEMP_DIR, file_id)
            if os.path.exists(src_path):
                shutil.copy2(src_path, os.path.join(MEDIA_DIR, filename))

    db_path = os.path.join(TEMP_DIR, 'collection.anki21')
    if not os.path.exists(db_path):
        db_path = os.path.join(TEMP_DIR, 'collection.anki2')
        
    print(f"Connecting to DB: {db_path}")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, flds FROM notes")
    notes = cursor.fetchall()
    conn.close()
    
    # Store by chapter
    chapters = {}

    print(f"Found {len(notes)} notes. Parsing fields...")
    for note in notes:
        fields = note[1].split('\x1f')
        german = fields[0].strip() if len(fields) > 0 else ""
        english = fields[1].strip() if len(fields) > 1 else ""
        english = re.sub(r'<[^>]+>', '', english)
        
        audio = None
        img = None
        
        if len(fields) > 2:
            match = re.search(r'\[sound:(.*?)\]', fields[2])
            if match:
                audio = f"/media/anki/{match.group(1)}"
                
        if len(fields) > 3:
            match = re.search(r'<img src="(.*?)">', fields[3])
            if match:
                img = f"/media/anki/{match.group(1)}"
                
        # Field 4 is the Deck/Chapter name in Nicos Weg
        lesson_title = fields[4].strip() if len(fields) > 4 and fields[4].strip() else 'General'
        
        if not english or not german:
            continue
            
        if lesson_title not in chapters:
            chapters[lesson_title] = []
            
        chapters[lesson_title].append({
            "de": german,
            "en": english,
            "audio": audio,
            "image": img,
            "lessonTitle": lesson_title,
            "source": "anki"
        })

    print(f"Found {len(chapters)} unique chapters.")
    
    translator = GoogleTranslator(source='en', target='sk')
    
    # Track created deck objects
    created_decks = []
    
    # Convert all chapters structure
    # First, let's collect all unique English strings to translate in one big batch process
    print("Collecting unique english phrases...")
    unique_en_phrases = set()
    for items in chapters.values():
        for item in items:
            unique_en_phrases.add(item['en'])
            
    unique_en_list = list(unique_en_phrases)
    translations_map = {}
    
    print(f"Translating {len(unique_en_list)} unique english phrases...")
    
    # Custom batching with progress and delay
    batch_size = 50
    for i in range(0, len(unique_en_list), batch_size):
        batch = unique_en_list[i : i+batch_size]
        print(f"Translating chunk {i//batch_size + 1}/{len(unique_en_list)//batch_size + 1}...")
        
        try:
            res = translator.translate_batch(batch)
            for en, sk in zip(batch, res):
                translations_map[en] = sk if sk else en
        except Exception as e:
            print(f"Chunk failed ({e}). Reverting to English.")
            for en in batch:
                translations_map[en] = en + " (untranslated)"
                
        time.sleep(0.5)

    
    for chapter_name, items in chapters.items():
        
        chapter_vocab = []
        for i, item in enumerate(items):
            en_text = item['en']
            sk_text = translations_map.get(en_text, en_text + " (untranslated)")

            chapter_vocab.append({
                "de": item['de'],
                "sk": sk_text,
                "en": item['en'],
                "audio": item['audio'],
                "image": item['image'],
                "lessonTitle": item['lessonTitle'],
                "source": "anki"
            })
            
        # Write chapter to its own JS file
        # Sanitize filename
        safe_name = re.sub(r'[^a-zA-Z0-9]', '_', chapter_name.lower())
        safe_name = re.sub(r'_+', '_', safe_name).strip('_')
        if not safe_name: safe_name = "general"
        
        deck_id = f"nicos_weg_{safe_name}"
        file_path = os.path.join(OUTPUT_DIR, f"{deck_id}.js")
        
        js_content = f"export const deck_{deck_id} = {{\n"
        js_content += f"  id: '{deck_id}',\n"
        js_content += f"  title: 'Nicos Weg: {chapter_name}',\n"
        js_content += f"  description: 'Kapitola {chapter_name} z Nicos Weg A1.',\n"
        js_content += f"  vocab: " + json.dumps(chapter_vocab, ensure_ascii=False, indent=2) + "\n"
        js_content += "};\n"
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        created_decks.append({
            "id": deck_id,
            "import_name": f"deck_{deck_id}",
            "file": f"./{deck_id}"
        })
        
    print(f"\nWriting main decks.js file with {len(created_decks)} imports...")
    
    # Generate the global decks.js
    decks_js = "import { LESSONS } from './curriculum';\n"
    for d in created_decks:
        decks_js += f"import {{ {d['import_name']} }} from './decks/{d['file'].replace('./', '')}';\n"
        
    decks_js += """
const mainDeckKeys = LESSONS.flatMap((l) =>
  l.vocab.map((v) => ({ ...v, lessonId: l.id, lessonTitle: l.title, source: 'lesson' }))
);

export const mainCourseDeck = {
  id: 'main_course',
  title: 'Hlavný Kurz (Tvoj progres)',
  description: 'Všetky slovíčka a frázy, ktoré si stretol počas lekcií vo svojom progrese.',
  vocab: mainDeckKeys
};

export const ALL_DECKS = [
  mainCourseDeck,
"""
    for d in created_decks:
        decks_js += f"  {d['import_name']},\n"
        
    decks_js += "];\n"
    
    with open(DECKS_INDEX, 'w', encoding='utf-8') as f:
        f.write(decks_js)
        
    print("Cleanup...")
    shutil.rmtree(TEMP_DIR, ignore_errors=True)
    
    # Try removing old monolithic one if we made it
    old_mono = os.path.join(OUTPUT_DIR, 'nicos_weg.js')
    if os.path.exists(old_mono):
        os.remove(old_mono)
        
    print("Done!")

if __name__ == '__main__':
    main()
