describe('Login Controller', () => {
    beforeEach(angular.mock.module('app'));

    var controller,
        createController,
        createUserService,
        userService,
        loginController;


    beforeEach(inject((_$controller_, _UserService_) => {
        controller = _$controller_;
        userService = _UserService_;

        loginController = controller('LoginController', {
              $scope: {},
              UserService: userService
          });
    }));



    it('should be defined', () => {
        expect(loginController).toBeDefined();
    });

    it('should be have a login function', () => {
        expect(loginController.login).toBeDefined();
    });

});
