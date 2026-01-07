import { WordCategory, DifficultyLevel, FlashCard, ConjugationTask, StoryTask } from '../types';
import { NOUNS, VERBS, ADJECTIVES, NUMBERS_CARDINAL, NUMBERS_ORDINAL, ADVERBS, PHRASES } from '../data/vocabData';
import { CONJUGATION_DATA } from '../data/conjugationData';
import { STORIES } from '../data/storyData';
import { CLASS_LESSONS } from '../data/classVocabData';
import { getMistakes, getMastered } from './storageService';

// Helper to shuffle array
const shuffle = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getStaticFlashcards = async (category: WordCategory, level: DifficultyLevel): Promise<FlashCard[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  let sourceData: { serbian: string; hungarian: string; hungarianAlt: string[]; display?: string; hint?: string }[] = [];
  switch (category) {
    case WordCategory.NOUNS: sourceData = NOUNS[level] || NOUNS[1]; break;
    case WordCategory.VERBS: sourceData = VERBS[level] || VERBS[1]; break;
    case WordCategory.PHRASES: sourceData = PHRASES[level] || PHRASES[1]; break;
    case WordCategory.ADJECTIVES: sourceData = ADJECTIVES[level] || ADJECTIVES[1]; break;
    case WordCategory.NUMBERS_CARDINAL: sourceData = NUMBERS_CARDINAL[level] || NUMBERS_CARDINAL[1]; break;
    case WordCategory.NUMBERS_ORDINAL: sourceData = NUMBERS_ORDINAL[level] || NUMBERS_ORDINAL[1]; break;
    case WordCategory.ADVERBS: sourceData = ADVERBS[level] || ADVERBS[1]; break;
  }

  const savedMistakes = getMistakes();
  const savedMastered = getMastered();
  
  const priorityList = sourceData.filter(item => savedMistakes.includes(item.serbian));
  const newList = sourceData.filter(item => !savedMistakes.includes(item.serbian) && !savedMastered.includes(item.serbian));
  const reviewList = sourceData.filter(item => savedMastered.includes(item.serbian));

  const deckSize = 10;
  let deck: typeof sourceData = [];

  const shuffledPriority = shuffle(priorityList);
  deck = [...deck, ...shuffledPriority.slice(0, 5)];

  let remainingSlots = deckSize - deck.length;
  const shuffledNew = shuffle(newList);
  deck = [...deck, ...shuffledNew.slice(0, remainingSlots)];

  remainingSlots = deckSize - deck.length;
  if (remainingSlots > 0) {
    const shuffledReview = shuffle(reviewList);
    deck = [...deck, ...shuffledReview.slice(0, remainingSlots)];
  }
  
  const finalSelection = shuffle(deck);

  return finalSelection.map((item, index) => ({
    id: `${category}-${level}-${index}-${Date.now()}`,
    serbian: item.serbian,
    hungarian: item.hungarian,
    hungarianAlt: item.hungarianAlt,
    display: item.display,
    hint: item.hint
  }));
};

export const getClassFlashcards = async (lessonId: number): Promise<FlashCard[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const lesson = CLASS_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return [];
  
  return lesson.words.map((w, idx) => ({
    ...w,
    id: `class-${lessonId}-${idx}-${Date.now()}`
  }));
};

export const getStaticConjugationTask = async (level: DifficultyLevel): Promise<ConjugationTask> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const tasks = CONJUGATION_DATA[level] || CONJUGATION_DATA[1];
  return tasks[Math.floor(Math.random() * tasks.length)];
};

export const getStaticStoryTask = async (level: DifficultyLevel): Promise<StoryTask> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const stories = STORIES[level] || STORIES[1];
  return stories[Math.floor(Math.random() * stories.length)];
};
