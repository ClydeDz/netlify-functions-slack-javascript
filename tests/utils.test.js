const utils = require("../netlify/utils");
const chai = require("chai");

let assert = chai.assert;

describe("parseRequestBody", () => {
    it("returns empty string when empty string is passed", () => {
        let result = utils.parseRequestBody("", "application/x-www-form-urlencoded");
        assert.isEmpty(result);
    });

    it("returns empty string when null value is passed", () => {
        let result = utils.parseRequestBody(null, "application/x-www-form-urlencoded");
        assert.isEmpty(result);
    });

    it("returns empty string when a simple string is passed", () => {
        let result = utils.parseRequestBody("abc123", "application/json");
        assert.isEmpty(result);
    });

    it("returns expected JSON result when url encoded value is passed", () => {
        let expectedJson = {
            token: "AbCD123",
            team_id: "T1234ABCD",
            team_domain: "demoapp"
        };
        let mockBodyInput = `token=AbCD123&team_id=T1234ABCD&team_domain=demoapp`;

        let result = utils.parseRequestBody(mockBodyInput, "application/x-www-form-urlencoded");

        assert.strictEqual(result.token, expectedJson.token);
        assert.strictEqual(result.team_domain, expectedJson.team_domain);
        assert.strictEqual(result.team_id, expectedJson.team_id);
    });

    it("returns expected JSON result when JSON value is passed", () => {
        let expectedJson = {
            token: "TOKEN123",
            team_id: "TEAM123",
            api_app_id: "APPID123",
            event: {
                bot_id: "BOTID",
                bot_profile: {
                    id: "BOTPROFLEID"
                }
            }
        };
        let mockBodyInput = `{"token":"TOKEN123","team_id":"TEAM123","api_app_id":"APPID123","event":
            {"bot_id":"BOTID","bot_profile":{"id":"BOTPROFLEID"}}}`;

        let result = utils.parseRequestBody(mockBodyInput, "application/json");

        assert.deepEqual(result, expectedJson);
    });
});

describe("isUrlVerificationRequest", () => {
    it("returns true when type is url_verification", () => {
        let payload = {
            type: "url_verification",
        };
        let result = utils.isUrlVerificationRequest(payload);
        assert.isTrue(result);
    });

    it("returns false when type is some_other_event", () => {
        let payload = {
            type: "some_other_event",
        };
        let result = utils.isUrlVerificationRequest(payload);
        assert.isFalse(result);
    });

    it("returns false when type is not passed", () => {
        let payload = {
            body: "demo",
            header: "slack",
        };
        let result = utils.isUrlVerificationRequest(payload);
        assert.isFalse(result);
    });

    it("returns false when payload passed is null", () => {
        let payload = null;
        let result = utils.isUrlVerificationRequest(payload);
        assert.isFalse(result);
    });

    it("returns false when payload passed is undefined", () => {
        let payload = undefined;
        let result = utils.isUrlVerificationRequest(payload);
        assert.isFalse(result);
    });
});

describe("generateReceiverEvent", () => {
    it("returns expected payload in the object", () => {
        let payload = "";
        let result = utils.generateReceiverEvent(payload);
        assert.strictEqual(result.body, payload);
    });

    it("returns ack() as a promise", () => {
        let payload = "";
        let result = utils.generateReceiverEvent(payload);
        assert.isTrue(result.ack() instanceof Promise);
    });

    it("returns expected response when no response is passed to ack()", async() => {
        let payload = "";
        let result = utils.generateReceiverEvent(payload);
        let actualResponse = null;

        await Promise.resolve(result.ack()).then((promiseReturnValue)=> {
            let promiseResponse = JSON.parse(JSON.stringify(promiseReturnValue));
            actualResponse = {...promiseResponse};
        });

        assert.strictEqual(actualResponse.body, "");
        assert.strictEqual(actualResponse.statusCode, 200);
    });

    it("returns expected response when mock response is passed to ack()", async() => {
        let payload = "";
        let result = utils.generateReceiverEvent(payload);
        let actualResponse = null;

        await Promise.resolve(result.ack("mock response")).then((promiseReturnValue)=> {
            let promiseResponse = JSON.parse(JSON.stringify(promiseReturnValue));
            actualResponse = {...promiseResponse};
        });

        assert.strictEqual(actualResponse.body, "mock response");
        assert.strictEqual(actualResponse.statusCode, 200);
    });
});