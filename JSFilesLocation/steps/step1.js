"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
const loginRS_PO_1 = require("../pages/loginRS_PO");
let login_pageObject = new loginRS_PO_1.loginPO();
cucumber_1.setDefaultTimeout(100 * 1000);
let elm_loginPage_email = protractor_1.element(protractor_1.by.name("email"));
let elm_loginPage_password = protractor_1.element(protractor_1.by.name("password"));
let elm_loginPage_submitButton = protractor_1.element(protractor_1.by.className("auth0-lock-submit"));
const chai_1 = require("chai");
let elm_homepage_root = protractor_1.element(protractor_1.by.id("app"));
let elm_userProfileTitle = elm_homepage_root.element(protractor_1.by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfileTitle"));
let elm_userProfile = elm_homepage_root.element(protractor_1.by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfile::sr"));
let elm_profile_dropdown_button = elm_userProfileTitle.element(protractor_1.by.css_sr("pebble-icon"));
let elm_profile_dropdown_button_logout = elm_userProfile.element(protractor_1.by.css('span[title="Logout"]'));
let elm_home_root_widget = elm_homepage_root.element(protractor_1.by.css_sr("::sr #contentViewManager::sr rock-content-view::sr app-dashboard::sr rock-dashboard-widgets::sr rock-widget-panel::sr"));
let elm_home_taskSummary = elm_home_root_widget.element(protractor_1.by.css_sr('#rock-task-list::sr rock-task-list::sr div[class = "base-grid-structure-child-2"]'));
let elm_home_myToDo = elm_home_root_widget.element(protractor_1.by.css_sr('#rock-my-todos::sr rock-my-todos::sr #rock-my-todos-tabs::sr div[class = "base-grid-structure-child-2"]'));
let elm_home_savedSearches = elm_home_root_widget.element(protractor_1.by.css_sr('#rock-saved-searches::sr rock-saved-searches::sr #rock-saved-searches-tabs::sr div[class = "base-grid-structure-child-2"]'));
//Expected Conditions
let ecWaitForelm_userProfile = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elm_userProfile));
let ecWaitForelm_userProfileTitle = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elm_userProfileTitle));
let ecWaitForLoginPageToLoad = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.visibilityOf(elm_loginPage_email), protractor_1.ExpectedConditions.elementToBeClickable(elm_loginPage_submitButton));
let ecWaitFordropdown_button = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elm_profile_dropdown_button));
let ecWaitFordropdown_button1 = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elm_profile_dropdown_button_logout));
let ecWaitForHomePageToLoad = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elm_homepage_root));
let ecWaitFortaskSummary = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elm_home_taskSummary), protractor_1.ExpectedConditions.visibilityOf(elm_home_taskSummary));
let ecWaitFormyToDo = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elm_home_myToDo), protractor_1.ExpectedConditions.visibilityOf(elm_home_myToDo));
let ecWaitForsavedSearches = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(elm_home_savedSearches), protractor_1.ExpectedConditions.visibilityOf(elm_home_savedSearches));
cucumber_1.Given(/^I navigate to the RS URL "([^"]*)"$/, (url) => __awaiter(void 0, void 0, void 0, function* () {
    yield protractor_1.browser.waitForAngularEnabled(false);
    //await login_pageObject.fn_URLNavigation(url);
    //await browser.get("https://rdwengg-az-qa8.riversand.com/");
    chai_1.expect(yield login_pageObject.fn_URLNavigation(url)).to.equal("Riversand Platform");
    //await browser.driver.sleep(10000);
}));
cucumber_1.When(/^I enter email as "([^"]*)"$/, (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield elm_loginPage_email.sendKeys(email);
}));
cucumber_1.When(/^valid password as "([^"]*)"$/, (password) => __awaiter(void 0, void 0, void 0, function* () {
    yield elm_loginPage_password.sendKeys(password);
}));
cucumber_1.When(/^clicking submit button$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield elm_loginPage_submitButton.click();
}));
cucumber_1.Then(/^I should validate the login success and Home page loads$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield protractor_1.browser.wait(ecWaitForHomePageToLoad, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
    yield protractor_1.browser.wait(ecWaitFortaskSummary, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
    yield protractor_1.browser.wait(ecWaitFormyToDo, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
    yield protractor_1.browser.wait(ecWaitForsavedSearches, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
    chai_1.expect(yield elm_userProfileTitle.isPresent()).to.be.true;
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RlcHMvc3RlcDEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBOEQ7QUFDOUQsMkNBQW1GO0FBQ25GLG9EQUE2QztBQUM3QyxJQUFJLGdCQUFnQixHQUFHLElBQUksb0JBQU8sRUFBRSxDQUFDO0FBQ3JDLDRCQUFpQixDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixJQUFJLG1CQUFtQixHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3BELElBQUksc0JBQXNCLEdBQUcsb0JBQU8sQ0FBQyxlQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsSUFBSSwwQkFBMEIsR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0FBQzVFLCtCQUE0QjtBQUc1QixJQUFJLGlCQUFpQixHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzlDLElBQUksb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGVBQUUsQ0FBQyxNQUFNLENBQUMsOERBQThELENBQUMsQ0FBQyxDQUFDO0FBQ2hJLElBQUksZUFBZSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxlQUFFLENBQUMsTUFBTSxDQUFDLDZEQUE2RCxDQUFDLENBQUMsQ0FBQztBQUMxSCxJQUFJLDJCQUEyQixHQUFHLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxlQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDekYsSUFBSSxrQ0FBa0MsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLGVBQUUsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0FB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