// ─── CURATED VIDEO LIBRARY ───────────────────────────────────────────────────
// Videos pre-processed with scripts/preprocess-videos.cjs.
// Cached subtitles + SK translations are served from src/data/video-database/{id}.json.
// Run `node scripts/preprocess-videos.cjs <youtubeUrl>` to add a new video.

export const VIDEO_LIBRARY = [
  {
    category: 'Filmy a príbehy',
    categoryDescription: 'Filmy a série zamerané na výučbu nemčiny alebo jednoduché porozumenie.',
    level: 'A1–A2',
    color: 'indigo',
    videos: [
      {
        id: '4-eDoThe6qo',
        title: 'Nicos Weg – Ganzer Film',
        description: 'Celý film Nicos Weg. Výborné pre začiatočníkov na pochopenie základov nemčiny.',
        duration: '1h 43m',
      },
      {
        id: 'XM8CXQ7e3j4',
        title: 'Pluspunkt Deutsch - A1',
        description: 'Celý vzdelávací film Pluspunkt Deutsch s bežnými situáciami a užitočnou slovnou zásobou.',
        duration: '36m',
        hasSrt: true,
      },
      {
        id: 'zmAUPwb89c0',
        title: 'Mein Weg nach Deutschland',
        description: 'Príbeh o Nevin, ktorá začína nový život v Nemecku. Praktické konverzácie úroveň A1.',
        duration: '1h 0m',
      },
      {
        id: 'H6I85wc8H3I',
        title: 'Hotel Heidelberg - Kinder, Kinder',
        description: 'Nemecká filmová komédia. Ideálne na zvykanie si na prirodzené tempo rodenej reči.',
        duration: '1h 24m',
        hasSrt: true,
      },
    ],
  },
  {
    category: 'Extra auf Deutsch',
    categoryDescription: 'Komediálny TV seriál pre učiacich sa nemčiny. Jednoduché dialógy, reálna situácia.',
    level: 'A1–A2',
    color: 'amber',
    videos: [
      {
        id: 'kZhSAffTLFQ',
        title: 'Extra – Folge 1: Ein Freund aus Amerika',
        description: 'Sam prichádza do Nemecka. Základné frázy a každodenné situácie.',
        duration: '~24 min',
      },
      {
        id: '9dgyuTCugyw',
        title: 'Extra – Folge 2: Sam geht einkaufen',
        description: 'Sam sa učí nakupovať. Slovíčka v obchode a s peniazmi.',
        duration: '~24 min',
        hasSrt: true,
      },
      {
        id: '_IxMzOZRRvM',
        title: 'Extra – Folge 3: Sam hat Hunger',
        description: 'Jedlo, reštaurácia a varenie. Praktická slovná zásoba.',
        duration: '~24 min',
      },
    ],
  },
];
