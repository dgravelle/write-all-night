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
          user: 'sample@user.com'
        });

        userService.login({ email: 'sample@user.com', password: 'password' }).then(data => {
          expect(win.localStorage.id).toEqual('1');
          expect(win.localStorage.token).toEqual('token');
          expect(win.localStorage.user).toEqual('sample@user.com');
        });

        httpBackend.flush();
    });
  });

});
