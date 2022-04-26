import sanitizeHtml from "sanitize-html";

function iterAll(object: any) {
  Object.keys(object).forEach(function (key) {
    if (
      typeof object[key] === "boolean" ||
      typeof object[key] === "undefined" ||
      typeof object[key] === "function" ||
      typeof object[key] === "symbol"
    ) {
      return;
    }

    if (object[key] && typeof object[key] === "object") {
      iterAll(object[key]);
      return;
    }
    const verifyIfIsNumber =
      typeof object[key] === "string" ? false : !Number.isNaN(object[key]);

    object[key] = sanitizeHtml(object[key], {
      allowedTags: [],
      allowedAttributes: {},
    });

    if (verifyIfIsNumber) {
      try {
        object[key] = Number(object[key]);
      } catch (error) {
        console.log("Error", error);
      }
    }
  });
}

export const Sanitize = (value: any) =>
  new Promise((resolve, reject) => {
    try {
      iterAll(value);
      resolve(value);
    } catch (error) {
      throw new Error("Validation failed - " + error);
    }
  });
