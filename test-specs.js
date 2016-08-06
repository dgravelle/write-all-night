describe('splash page', function () {

  beforeEach(function() {
    browser.get('http://localhost:3000');
  });

  it('should land on the splash page', function () {

    expect(browser.getTitle()).toEqual('Write All Night')
  });

  it('should have a link to the sign up page', function() {
    var signupBtn = element(by.css('#signUp'));

    expect(signupBtn.getText()).toEqual('SIGNUP');
  })
})
