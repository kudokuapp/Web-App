/**
 * Censor every character except the first two character of a word.
 * But if the word is less then 3 character, it will censor the whole word.
 * @constructor
 * @param {string} text - The title of the book.
 */
export function censorWord(text: string) {
  if (text.length > 3) {
    return `${text[0]}${text[1]}${'*'.repeat(text.length - 2)}`;
  } else {
    return `${'*'.repeat(text.length)}`;
  }
}

/**
 * Censor every character except the last four character of a word.
 * @constructor
 * @param {string} text - The uncensored string.
 * @return {string} The censored string. 8 Characters long
 */
export function censorWordFixedChar(text: string) {
  const length = text.length;
  return `${'*'.repeat(4)}${text[length - 4]}${text[length - 3]}${
    text[length - 2]
  }${text[length - 1]}`;
}

/**
 * Censor every character in an INDONESIAN phone number,
 * except the last 4 numbers and the prefix "+628"
 * @constructor
 * @param {string} text - Phone number
 */
export const censorNumber = (text: string) => {
  const arr = text.split('+628');
  const arrLength = arr[1].length;
  return `+628${'*'.repeat(arrLength - 4)}${arr[1][arrLength - 4]}${
    arr[1][arrLength - 3]
  }${arr[1][arrLength - 2]}${arr[1][arrLength - 1]}`;
};

/**
 * Censor every character in a email on a:
 * 1. Before and after the "@" symbol
 * 2. Before and after the "." symbol.
 * Use the censorWord function
 * @constructor
 * @param {string} email - Email
 */
export const censorEmail = (email: string) => {
  const arr1 = email.split('@');
  const arr2 = arr1[1].split('.');
  const arr = [arr1[0], ...arr2];
  const result = `${censorWord(arr[0])}@${censorWord(arr[1])}.${censorWord(
    arr[2]
  )}${arr[3] ? `.${censorWord(arr[3])}` : ''}`;
  return result;
};
