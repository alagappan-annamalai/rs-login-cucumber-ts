import {Given, Then, When, setDefaultTimeout} from "cucumber";
import {browser, by, element, ElementFinder, ExpectedConditions} from "protractor";

const perf = require('execution-time')();
export class loginPO {
    //Elements in the page
    public static elm_loginPage_email = element(by.name("email"));
    public static elm_loginPage_password = element(by.name("password"));
    public static elm_loginPage_submitButton = element(by.className("auth0-lock-submit"));
    
    public static elm_homepage_root = element(by.id("app"));
    public static elm_userProfileTitle = loginPO.elm_homepage_root.element(by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfileTitle"));
    public static elm_userProfile = loginPO.elm_homepage_root.element(by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfile::sr"));
    public static elm_profile_dropdown_button = loginPO.elm_userProfileTitle.element(by.css_sr("pebble-icon"));
    public static elm_profile_dropdown_button_logout = loginPO.elm_userProfile.element(by.css('span[title="Logout"]'));
    
    public static elm_home_root_widget = loginPO.elm_homepage_root.element(by.css_sr("::sr #contentViewManager::sr rock-content-view::sr app-dashboard::sr rock-dashboard-widgets::sr rock-widget-panel::sr"));
    public static elm_home_taskSummary = loginPO.elm_home_root_widget.element(by.css_sr('#rock-task-list::sr rock-task-list::sr div[class = "base-grid-structure-child-2"]'));
    public static elm_home_myToDo = loginPO.elm_home_root_widget.element(by.css_sr('#rock-my-todos::sr rock-my-todos::sr #rock-my-todos-tabs::sr div[class = "base-grid-structure-child-2"]'));
    public static elm_home_savedSearches = loginPO.elm_home_root_widget.element(by.css_sr('#rock-saved-searches::sr rock-saved-searches::sr #rock-saved-searches-tabs::sr div[class = "base-grid-structure-child-2"]'));
    
    //Expected Conditions
    public static ecWaitForelm_userProfile = ExpectedConditions.and(ExpectedConditions.presenceOf(loginPO.elm_userProfile));
    public static ecWaitForelm_userProfileTitle = ExpectedConditions.and(ExpectedConditions.presenceOf(loginPO.elm_userProfileTitle));
    public static ecWaitForLoginPageToLoad = ExpectedConditions.and(ExpectedConditions.visibilityOf(loginPO.elm_loginPage_email), ExpectedConditions.elementToBeClickable(loginPO.elm_loginPage_submitButton));
    public static ecWaitFordropdown_button = ExpectedConditions.and(ExpectedConditions.presenceOf(loginPO.elm_profile_dropdown_button));
    public static ecWaitFordropdown_button1 = ExpectedConditions.and(ExpectedConditions.presenceOf(loginPO.elm_profile_dropdown_button_logout));
    public static ecWaitForHomePageToLoad =  ExpectedConditions.and(ExpectedConditions.presenceOf(loginPO.elm_homepage_root));
    public static ecWaitFortaskSummary =  ExpectedConditions.and(ExpectedConditions.presenceOf(loginPO.elm_home_taskSummary), ExpectedConditions.visibilityOf(loginPO.elm_home_taskSummary));
    public static ecWaitFormyToDo =  ExpectedConditions.and(ExpectedConditions.presenceOf(loginPO.elm_home_myToDo), ExpectedConditions.visibilityOf(loginPO.elm_home_myToDo));
    public static ecWaitForsavedSearches =  ExpectedConditions.and(ExpectedConditions.presenceOf(loginPO.elm_home_savedSearches), ExpectedConditions.visibilityOf(loginPO.elm_home_savedSearches));
                
    //Temporary varibales used in the functions
    public static results;
    //Functions to use
    fn_URLNavigation = async (url:string) => {
        if (await loginPO.elm_userProfileTitle.isPresent()) {
            await this.fn_logout();
            await this.fn_URLNavigation(url);
        } else {
            await browser.get(url);
            for (var i = 1; i < 100; i++) {
                browser.sleep(5000);
                if (!(await (loginPO.elm_loginPage_submitButton.isPresent()))) {
                    browser.refresh();
                } else {
                    break;
                }
            }
            await browser.wait(loginPO.ecWaitForLoginPageToLoad, 200000, 'Timeout: PageLoadError');
            return browser.getTitle();
        }
    };
    fn_loginToApplication = async (email, password) => {
        await loginPO.elm_loginPage_email.sendKeys(email);
        await loginPO.elm_loginPage_password.sendKeys(password);
        await loginPO.elm_loginPage_submitButton.click();
        await perf.start('login');
        await browser.wait(loginPO.ecWaitForHomePageToLoad, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
        await browser.wait(loginPO.ecWaitFortaskSummary, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
        await browser.wait(loginPO.ecWaitFormyToDo, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
        await browser.wait(loginPO.ecWaitForsavedSearches, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
        loginPO.results = perf.stop('login');
        console.log("Login Page load in Seconds",loginPO.results.preciseWords); // in words
    };
    fn_logout = async () => {
        await browser.wait(loginPO.ecWaitForelm_userProfileTitle, browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
        await browser.wait(loginPO.ecWaitFordropdown_button, browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
        await loginPO.elm_profile_dropdown_button.click();
        await browser.wait(loginPO.ecWaitForelm_userProfile, browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
        await browser.wait(loginPO.ecWaitFordropdown_button1, browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
        await loginPO.elm_profile_dropdown_button_logout.click();
        await perf.start('logout');
        await browser.wait(loginPO.ecWaitForLoginPageToLoad, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
        loginPO.results = perf.stop('logout');
        console.log("Logout in Seconds",loginPO.results.preciseWords); // in words
    };
    
};