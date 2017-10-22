describe("angular login", function() {

    var user = element(by.id("user"));
    var password =  element(by.id("password"));
    var login = element(by.id("login"));


    beforeEach(function() {
        browser.get("http://localhost:8080#/login");
    });

    it("should login", function() {
        user.sendKeys("ali");
        password.sendKeys("5f4dcc3b5aa765d61d8327deb882cf99");
        login.click();

        var buckets = element.all(by.css(".box"));
        expect(buckets.count()).toEqual(2);

    });

    it("should not login", function() {
        user.sendKeys("ali");
        password.sendKeys("nopassword");
        login.click();

        var buckets = element.all(by.css(".box"));
        expect(buckets.count()).toEqual(0);
    });

});