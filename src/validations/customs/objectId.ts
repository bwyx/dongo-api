import { CustomValidator } from 'joi';

const objectId: CustomValidator<string> = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({ custom: `"${value}" is not a valid {{#label}}` });
  }
  return value;
};

export default objectId;
