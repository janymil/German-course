import { LESSONS } from './curriculum';
import { nicosWegDeck as nwRawDeck } from './decks/nicos_weg';

const mainCourseChapters = LESSONS.map(l => ({
  id: l.id,
  title: l.title,
  vocab: l.vocab.map((v) => ({ ...v, lessonId: l.id, lessonTitle: l.title, source: 'lesson' }))
}));

export const mainCourseDeck = {
  id: 'main_course',
  title: 'Hlavný Kurz (Tvoj progres)',
  description: 'Všetky slovíčka a frázy, ktoré si stretol počas lekcií vo svojom progrese.',
  chapters: [
    {
      id: 'main_course_all',
      title: 'Všetky slovíčka dokopy',
      vocab: mainCourseChapters.flatMap(c => c.vocab)
    },
    ...mainCourseChapters
  ]
};

export const nicosWegDeck = {
  ...nwRawDeck,
  chapters: [
    {
      id: 'nicos_weg_all',
      title: 'Všetky lekcie dokopy',
      vocab: nwRawDeck.chapters.flatMap(c => c.vocab)
    },
    ...nwRawDeck.chapters
  ]
};

export const ALL_DECKS = [
  mainCourseDeck,
  nicosWegDeck
];
