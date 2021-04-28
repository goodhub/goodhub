import { Content } from '@strawberrylemonade/goodhub-lib';
import { removeStopwords } from 'stopword';
import { isSingular, singular } from 'pluralize';

const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export const getKeywordsFromContent = (text: Content) => {
  const title = text.blocks[0].text;
  return getKeywords(title);
}

export const getKeywords = (text: string) => {
  const titleNoPunctuation = text.replace(punctuation, '');
  const words = titleNoPunctuation.split(' ');
  const keywords = removeStopwords(words);
  const normalisedWords = keywords.map((word) => {
    if (isSingular(word)) return word;
    return singular(word);
  });
  return normalisedWords;
}