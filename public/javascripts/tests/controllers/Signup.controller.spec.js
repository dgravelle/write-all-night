describe('Signup Controller', () => {
  beforeEach(angular.mock.module('app'));

  var controller,
      httpBackend,
      SignupController,
      rootScope,
      userService;

  beforeEach(inject((_$controller_, $httpBackend, $rootScope, _UserService_) => {
    controller = _$controller_;
    httpBackend = $httpBackend;
    rootScope = $rootScope;
    userService = _UserService_;


    SignupController = controller('SignupController', {
        $scope: rootScope.$new(),
        UserService: userService
      });
  }));

  it('should exist', () => {
    expect(SignupController).toBeDefined();
  });

  it('should have a form object', () => {
    expect(SignupController.form).toBeDefined();
  });


  describe('handleRegistration function', () => {
    it('it should return success if signup is succesful', () => {
      var form = {
        email: 'already@inuse.com',
        password: 'password'
      }

      SignupController.form = form;

      httpBackend
        .expect('POST','/users/signup')
        .respond(200, { success: true });

      SignupController.handleRegistration(form).then(data => {
         expect(data).toEqual('success');
       });

       httpBackend.flush();
    });

    it('should respond with an error message if an email already exists', () => {
      var form = {
        email: 'sample@user.com',
        password: 'password'
      }

      httpBackend
        .expect('POST', '/users/signup')
        .respond(409, { success: false });

        SignupController.form = form;

        SignupController.handleRegistration(form).then(data => {
          expect(data).toEqual('Sorry, that email is already in use');
        });

        httpBackend.flush();
    });

  });

});
