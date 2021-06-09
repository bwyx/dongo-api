/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import { Document } from 'mongoose';

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

interface ReturnJSON extends Document, Record<string, any> {
  createdAt?: string;
  updatedAt?: string;
}

const deleteAtPath = (obj: ReturnJSON, path: string[], index: number) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toJSON = (schema: any): void => {
  let schemaTransform: (doc: Document, ret: ReturnJSON, options: any) => void;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    schemaTransform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform: (doc: Document, ret: ReturnJSON, options: any) => {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return schemaTransform ? schemaTransform(doc, ret, options) : ret;
    },
  });
};

export default toJSON;
