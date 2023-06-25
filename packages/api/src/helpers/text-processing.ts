import { Content } from '../../../shared';
import { removeStopwords } from 'stopword';
import pkg from 'pluralize';
const { isSingular, singular } = pkg;

const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export const getKeywordsFromContent = (text: Content) => {
  const title = text.blocks[0]?.text;
  if (!title) return [];
  return getKeywords(title);
};

export const getKeywords = (text?: string): string[] => {
  if (!text) return [];
  const titleLowercase = text.toLowerCase();
  const titleNoPunctuation = titleLowercase.replace(punctuation, '');
  const words = titleNoPunctuation.split(' ');
  const keywords = removeStopwords(words);
  const normalisedWords = keywords.map(word => {
    if (isSingular(word)) return word;
    return singular(word);
  });
  return normalisedWords;
};
