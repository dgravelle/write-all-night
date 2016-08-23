describe('Users Service', () => {
  beforeEach(angular.mock.module('app'));

  var httpBackend,
      userService;

  beforeEach(inject(($httpBackend, _UserService_) => {
    httpBackend = $httpBackend;
    userService = _UserService_;
  }))

  it('should be defined', () => {
    expect(userService).toBeDefined();
  })
})
