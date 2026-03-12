"use strict";

const { replace } = "";
const ca = /[&<>'"]/g;
const esca = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
};
const pe = (m) => esca[m];

const escape = (es) =>
  typeof es === "string" ? replace.call(es, ca, pe) : es;

exports.escape = escape;
