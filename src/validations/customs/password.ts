import { CustomValidator } from 'joi';

const password: CustomValidator<string> = (value, helpers) => {
  const tooShort = value.length < 8;
  const tooShortMessage = 'be at least 8 characters';

  const tooWeak = !value.match(/\d/) || !value.match(/[a-zA-Z]/);
  const tooWeakMessage = 'contain at least 1 letter and 1 number';

  if (tooShort && tooWeak) {
    return helpers.message({ custom: `"password" must ${tooShortMessage} and ${tooWeakMessage}` });
  }

  if (tooShort) {
    return helpers.message({ custom: `"password" must ${tooShortMessage}` });
  }

  if (tooWeak) {
    return helpers.message({ custom: `"password" must ${tooWeakMessage}` });
  }

  return value;
};

export default password;
