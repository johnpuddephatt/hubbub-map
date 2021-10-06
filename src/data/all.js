const sheet = require("../utils/sheet.js");

module.exports = () => {
  return sheet("1", "1Jzy6jjUJ6goiBGg0fS05lRTPyWUfnyeP13yOtIlWfUY", [
    "Address",
    "Latitude",
    "Longitude",
    "Category",
    "Description",
  ]).then((result) => {
    let data = JSON.parse(result);
    return data;
  });
};
