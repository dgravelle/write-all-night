describe('Signup Controller', () => {
  beforeEach(angular.mock.module('app'));

  var controller,
      httpBackend,
      SignupController,
      userService;

  beforeEach(inject((_$controller_, $httpBackend, _UserService_) => {
    controller = _$controller_;
    httpBackend = $httpBackend;
    userService = _UserService_;


    SignupController = controller('SignupController', {
        $scope: {},
        UserService: userService
      });
  }));

  it('should exist', () => {
    expect(SignupController).toBeDefined();
  });

  it('should have a form object', () => {
    expect(SignupController.form).toBeDefined();
  });


  // describe('handleRegistration function', () => {
  //   it('it should display an error message if a user already exists', () => {
  //
  //     SignupController.form.email = 'already@inuse.com';
  //     SignupController.form.password = 'password';
  //
  //     var result = SignupController.handleRegistration();
  //
  //     console.log(SignupController.showError);
  //     expect(SignupController.form).toBeDefined();
  //   });
  // });

});
