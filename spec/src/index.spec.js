var index = require('../../src/index'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	response;

describe('index', function() {
    framework.beforeEachMatchers();
	beforeEach(function(done){
			ctx = context();
			ctx.Promise
				.then(resp => {
					response = resp;
					done();
				})
				.catch(err => {
					response = err;
					done();
				});
			intent = framework.intents.testMultiplyIntent;
			index.handler(intent, ctx, response);
	});
    it('GetAnswerIntent', function() {
		expect(response).not.toBeNull();
		expect(response.response.outputSpeech.ssml).toBe('<speak> 3 times 4 equals 12 </speak>');
    });
	/*
    it('AMAZON.HelpIntent', function() {
        helloWorld.intentHandlers[ 'AMAZON.HelpIntent' ](intent, session, response);

        expect(response.ask).toHaveBeenCalled();
        args = response.ask.argsForCall[ 0 ];
        expect(args[ 0 ]).isSSML('You can say hello to me!');
        expect(args[ 1 ]).toEqual(jasmine.any(String));
    });
	*/
});