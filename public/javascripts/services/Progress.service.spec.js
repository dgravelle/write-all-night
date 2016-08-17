describe('Progress service', function() {


  var ProgressService,
      httpBackend;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject((_ProgressService_, $httpBackend) => {
    ProgressService = _ProgressService_;
    httpBackend = $httpBackend;
  }));

  it('should be defined', function () {
    expect(ProgressService).toBeDefined();
  });
});
