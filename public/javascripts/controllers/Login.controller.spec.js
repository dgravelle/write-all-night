describe('Login Controller', () => {

  var controller,
      createController,
      createUserService,
      UsersService;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject((_$controller_, $injector) => {
    controller = _$controller_;

    createUserService = () => {
      return $injector.get('UserService');
    }

    createController = () => {
      return controller('LoginController', { $scope: {}, UserService: UsersService });
    }
  }));

  it('should be defined', () => {
    var loginController = createController;
    UsersService = createUserService;

    expect(loginController).toBeDefined();
  });

});
