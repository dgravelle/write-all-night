describe('Progress service', () => {
    var ProgressService,
        httpBackend;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject((_ProgressService_, $httpBackend) => {
        ProgressService = _ProgressService_;
        httpBackend = $httpBackend;
    }));

    it('should be defined', () => {
        expect(ProgressService).toBeDefined();
    });


    describe('getStoryProgress function', () => {
        it('should have a getStoryProgress function', () => {
            expect(ProgressService.getStoryProgress).toBeDefined();
        });

        it('should return an object with a bunch of properties', () => {
            var result;

            httpBackend
                .whenGET('/progress/1')
                .respond({})

            httpBackend.expectGET('/progress/1');

        });
    });
});
