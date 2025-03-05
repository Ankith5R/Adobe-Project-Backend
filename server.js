const http = require("http");
const url = require("url");

//Logic to convert a number to its Roman number equivalent.
const numtoroman = (num) => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const roman_symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let roman = "";
    for (let i = 0; i < values.length && num > 0; i++) {
        while (values[i] <= num) {
            num -= values[i];
            roman += roman_symbols[i];
        }
    }
    return roman;
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const parsedUrl = url.parse(req.url, true);


    if (parsedUrl.pathname === "/romannumeral" && req.method === "GET") {
        const query = parsedUrl.query.query;

        if (!query || isNaN(query) || query.includes(".") || query < 1 || query > 3999 || query === "0") {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid entry. Read instructions.");
            return;
        }

        const number = parseInt(query);
        const romanNumber = numtoroman(number);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ input: number, output: romanNumber }));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }

});


if (require.main === module) {
    server.listen(8080, () => {
        console.log("Server running on http://localhost:8080/romannumeral?query={integer}");
    })
}
module.exports = { server, numtoroman };