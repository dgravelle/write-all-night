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
    it('should clear window.localStorage of users id, token and email', () => {
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

  describe('getUser function', () => {
    it('should set and return the currentUser', () => {
      var response = {
        id: 1,
        token: 'token',
        user: 'sample@user.com'
      }

      httpBackend
        .expect('GET', '/users/1')
        .respond(200, response);


        userService.getUser(1).then(data => {
          expect(userService.currentUser).toEqual(response);
        });

        httpBackend.flush();
    });
  });

  describe('createUser function', () => {
    it('should create and login a new user', () => {
      var response = {
        id: 1,
        token: 'token',
        user: 'sample@user.com'
      }

      httpBackend
        .expect('POST', '/users/signup')
        .respond(200, response);


        userService.createUser({ email: 'sample@user.com', password: 'password' }).then(data => {
          expect(win.localStorage.id).toEqual('1');
          expect(win.localStorage.token).toEqual('token');
          expect(win.localStorage.user).toEqual('sample@user.com');
        });

        httpBackend.flush();
    });
  });

});
