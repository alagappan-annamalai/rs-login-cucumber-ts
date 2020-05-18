import {Given, Then, When, setDefaultTimeout} from "cucumber";
import {browser, by, element, ElementFinder, ExpectedConditions} from "protractor";
import { loginPO } from '../pages/loginRS_PO'
let login_pageObject = new loginPO();
setDefaultTimeout(100*1000);
let elm_loginPage_email = element(by.name("email"));
let elm_loginPage_password = element(by.name("password"));
let elm_loginPage_submitButton = element(by.className("auth0-lock-submit"));
import {expect} from "chai";


let elm_homepage_root = element(by.id("app"));
let elm_userProfileTitle = elm_homepage_root.element(by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfileTitle"));
let elm_userProfile = elm_homepage_root.element(by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfile::sr"));
let elm_profile_dropdown_button = elm_userProfileTitle.element(by.css_sr("pebble-icon"));
let elm_profile_dropdown_button_logout = elm_userProfile.element(by.css('span[title="Logout"]'));

let elm_home_root_widget = elm_homepage_root.element(by.css_sr("::sr #contentViewManager::sr rock-content-view::sr app-dashboard::sr rock-dashboard-widgets::sr rock-widget-panel::sr"));
let elm_home_taskSummary = elm_home_root_widget.element(by.css_sr('#rock-task-list::sr rock-task-list::sr div[class = "base-grid-structure-child-2"]'));
let elm_home_myToDo = elm_home_root_widget.element(by.css_sr('#rock-my-todos::sr rock-my-todos::sr #rock-my-todos-tabs::sr div[class = "base-grid-structure-child-2"]'));
let elm_home_savedSearches = elm_home_root_widget.element(by.css_sr('#rock-saved-searches::sr rock-saved-searches::sr #rock-saved-searches-tabs::sr div[class = "base-grid-structure-child-2"]'));

//Expected Conditions
let ecWaitForelm_userProfile = ExpectedConditions.and(ExpectedConditions.presenceOf(elm_userProfile));
let ecWaitForelm_userProfileTitle = ExpectedConditions.and(ExpectedConditions.presenceOf(elm_userProfileTitle));
let ecWaitForLoginPageToLoad = ExpectedConditions.and(ExpectedConditions.visibilityOf(elm_loginPage_email), ExpectedConditions.elementToBeClickable(elm_loginPage_submitButton));
let ecWaitFordropdown_button = ExpectedConditions.and(ExpectedConditions.presenceOf(elm_profile_dropdown_button));
let ecWaitFordropdown_button1 = ExpectedConditions.and(ExpectedConditions.presenceOf(elm_profile_dropdown_button_logout));
let ecWaitForHomePageToLoad =  ExpectedConditions.and(ExpectedConditions.presenceOf(elm_homepage_root));
let ecWaitFortaskSummary =  ExpectedConditions.and(ExpectedConditions.presenceOf(elm_home_taskSummary), ExpectedConditions.visibilityOf(elm_home_taskSummary));
let ecWaitFormyToDo =  ExpectedConditions.and(ExpectedConditions.presenceOf(elm_home_myToDo), ExpectedConditions.visibilityOf(elm_home_myToDo));
let ecWaitForsavedSearches =  ExpectedConditions.and(ExpectedConditions.presenceOf(elm_home_savedSearches), ExpectedConditions.visibilityOf(elm_home_savedSearches));
            

Given(/^I navigate to the RS URL "([^"]*)"$/,async(url:string)=>{
await browser.waitForAngularEnabled(false);
//await login_pageObject.fn_URLNavigation(url);
//await browser.get("https://rdwengg-az-qa8.riversand.com/");
expect(await login_pageObject.fn_URLNavigation(url)).to.equal("Riversand Platform");
//await browser.driver.sleep(10000);
} );

When (/^I enter email as "([^"]*)"$/,async(email:string)=>{
    await elm_loginPage_email.sendKeys(email);
} );

When (/^valid password as "([^"]*)"$/,async(password:string)=>{
    await elm_loginPage_password.sendKeys(password);
} );

When (/^clicking submit button$/,async()=>{
    await elm_loginPage_submitButton.click();
});

Then (/^I should validate the login success and Home page loads$/,async()=>{
    await browser.wait(ecWaitForHomePageToLoad, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
    await browser.wait(ecWaitFortaskSummary, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
    await browser.wait(ecWaitFormyToDo, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
    await browser.wait(ecWaitForsavedSearches, browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
   expect(await elm_userProfileTitle.isPresent()).to.be.true;
   
});