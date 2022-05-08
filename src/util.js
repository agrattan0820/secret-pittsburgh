import React from "react";

export function shortenString(string, length) {
  if (string.length > length) {
    return string.substring(0, length) + "...";
  } else {
    return string;
  }
}

export function getNodeText(node) {
  if (["string", "number"].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join("");
  if (typeof node === "object" && node) return getNodeText(node.props.children);
}

export function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
}

export function replaceStagingLink(str) {
  str = str.replaceAll(
    "http://stage.secretpittsburgh.pitt.edu/",
    "https://secretpittsburgh.pitt.edu/sp/"
  );

  str = str.replaceAll("/sp/", "https://secretpittsburgh.pitt.edu/sp/");

  return str;
}

export const isOutOfMaxBounds = (latitude, longitude, maxBounds) => {
  const [[swLng, swLat], [neLng, neLat]] = maxBounds;

  return (
    longitude < swLng ||
    longitude > neLng ||
    latitude < swLat ||
    latitude > neLat
  );
};
