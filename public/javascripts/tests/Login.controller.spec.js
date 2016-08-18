describe('Login Controller', () => {
    beforeEach(angular.mock.module('app'));

    var controller,
        createController,
        createUserService,
        userService,
        loginController;


    beforeEach(inject((_$controller_, $injector, _UserService_) => {
        controller = _$controller_;
        userService = _UserService_;

        createController = () => {
            return controller('LoginController', {
                $scope: {},
                UserService: userService
            });
        }

        loginController = createController();
    }));



    it('should be defined', () => {
        expect(loginController).toBeDefined();
    });

    it('should be have a login function', () => {
        expect(loginController.login).toBeDefined();
    });

});
