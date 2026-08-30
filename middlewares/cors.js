const cors = require("cors");

const corsmiddleware = cors({
  origin: [
    "http://127.0.0.1:5500",
    "https://127.0.0.1:5500",
    "https://localhost:5500",
    "http://localhost:5500",
    "http://nomu.co.il",
    "http://www.nomu.co.il",
    "https://nomu.co.il",
    "https://www.nomu.co.il",
  ],
});

module.exports = corsmiddleware;
