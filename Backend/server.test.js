const request = require("supertest");
const { server, numtoroman } = require("./server");

let testServer;

beforeAll((done) => {
    const TEST_PORT = process.env.TEST_PORT || 8081;
    testServer = server.listen(TEST_PORT, () => {
      console.log(`Test server running on port ${TEST_PORT}...`);
      done();
    });
});

afterAll((done) => {
    if (testServer) {
        testServer.close(done);
    } else {
        done();
    }
});

describe("Unit Tests for numtoroman Function", () => {
    test("Converts 1 to 'I'", () => {
        expect(numtoroman(1)).toBe("I");
    });

    test("Converts 4 to 'IV'", () => {
        expect(numtoroman(4)).toBe("IV");
    });

    test("Converts 9 to 'IX'", () => {
        expect(numtoroman(9)).toBe("IX");
    });

    test("Converts 58 to 'LVIII'", () => {
        expect(numtoroman(58)).toBe("LVIII");
    });

    test("Converts 3999 to 'MMMCMXCIX'", () => {
        expect(numtoroman(3999)).toBe("MMMCMXCIX");
    });
});

describe("Integration Tests for /romannumeral API", () => {
    test("GET /romannumeral?query=10 should return X", async () => {
        const response = await request(testServer).get("/romannumeral?query=10");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ input: 10, output: "X" });
    });

    test("GET /romannumeral?query=3999 should return MMMCMXCIX", async () => {
        const response = await request(testServer).get("/romannumeral?query=3999");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ input: 3999, output: "MMMCMXCIX" });
    });

    test("GET /romannumeral?query=0 should return 400 error", async () => {
        const response = await request(testServer).get("/romannumeral?query=0");
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid entry. Read instructions.");
    });

    test("GET /romannumeral?query=abc should return 400 error", async () => {
        const response = await request(testServer).get("/romannumeral?query=abc");
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid entry. Read instructions.");
    });

    test("GET /invalidroute should return 404 error", async () => {
        const response = await request(testServer).get("/invalidroute");
        expect(response.status).toBe(404);
        expect(response.text).toBe("Not Found");
    });
});
