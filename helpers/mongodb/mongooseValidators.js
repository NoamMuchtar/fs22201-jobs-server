const DEFAULT_VALIDATION = {
  type: String,
  required: true,
  minLength: 2,
  maxLength: 256,
  trim: true,
  lowercase: true,
};

const PHONE = {
  type: String,
  required: true,
  match: RegExp(/^(?=(?:\D*\d){9,11}\D*$)0\d(?:-?\d){7,9}$/),
};

const EMAIL = {
  type: String,
  required: true,
  lowercase: true,
  trim: true,
  unique: true,
  match: RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
};

const URL = {
  type: String,
  trim: true,
  lowercase: true,
  match: RegExp(
    /^(?:https?:\/\/)?(?:www\.)?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}(?::\d{2,5})?(?:[/?#][^\s]*)?$/,
  ),
};

module.exports = { DEFAULT_VALIDATION, PHONE, EMAIL, URL };
