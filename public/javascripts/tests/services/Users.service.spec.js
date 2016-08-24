describe('Users Service', () => {
  beforeEach(angular.mock.module('app'));

  var httpBackend,
      userService,
      win;

  beforeEach(inject(($httpBackend, _UserService_, $window) => {
    httpBackend = $httpBackend;
    userService = _UserService_;
    win = $window;
  }));

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('logOut function', () => {
    it('should have a that clears window.localStorage', () => {
      win.localStorage['id'] = 1;
      win.localStorage['token'] = 'token';
      win.localStorage['user'] = 'sample@user.com';

      userService.logOut();

      expect(win.localStorage.id).toBeUndefined();
      expect(win.localStorage.token).toBeUndefined();
      expect(win.localStorage.user).toBeUndefined();
    });
  });

  describe('login function', () => {
    it('should populate the window object with a users id token and email', () => {

      httpBackend
        .expect('POST', '/users/login')
        .respond(200, {
          id: 1,
          token: 'token',
          user: 'sample@email.com'
        });



        userService.login({ email: 'sample@user.com', password: 'password' }).then(data => {
                    
        })
        .catch(err => {
          console.log(err);
        });


    });
  });

});
