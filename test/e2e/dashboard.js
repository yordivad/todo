describe("dashboard", function() {

    var progress = element(by.id("progress"));
    var completed =  element(by.id("completed"));
    var add =  element(by.css("mat-button-ripple"));


    beforeEach(function() {
        browser.get("http://localhost:8080#/login");
        element(by.id("user")).sendKeys("ali");
        element(by.id("password")).sendKeys("5f4dcc3b5aa765d61d8327deb882cf99");
        element(by.id("login")).click();
    });

    it("should add a new item", function() {


    });



});