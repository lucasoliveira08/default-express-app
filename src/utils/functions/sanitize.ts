import xss from "xss";

export const Sanitize = (object: any): any => {
  try {
    Object.keys(object).forEach(function (key) {
      if (object[key] && typeof object[key] === "object") {
        return Sanitize(object[key]);
      }

      object[key] = xss(object[key], {});
    });

    return object;
  } catch (error) {
    throw new Error("Validation failed - " + error);
  }
};
