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
const protractor_1 = require("protractor");
const perf = require('execution-time')();
class loginPO {
    constructor() {
        //Functions to use
        this.fn_URLNavigation = (url) => __awaiter(this, void 0, void 0, function* () {
            if (yield loginPO.elm_userProfileTitle.isPresent()) {
                yield this.fn_logout();
                yield this.fn_URLNavigation(url);
            }
            else {
                yield protractor_1.browser.get(url);
                for (var i = 1; i < 100; i++) {
                    protractor_1.browser.sleep(5000);
                    if (!(yield (loginPO.elm_loginPage_submitButton.isPresent()))) {
                        protractor_1.browser.refresh();
                    }
                    else {
                        break;
                    }
                }
                yield protractor_1.browser.wait(loginPO.ecWaitForLoginPageToLoad, 200000, 'Timeout: PageLoadError');
                return protractor_1.browser.getTitle();
            }
        });
        this.fn_loginToApplication = (email, password) => __awaiter(this, void 0, void 0, function* () {
            yield loginPO.elm_loginPage_email.sendKeys(email);
            yield loginPO.elm_loginPage_password.sendKeys(password);
            yield loginPO.elm_loginPage_submitButton.click();
            yield perf.start('login');
            yield protractor_1.browser.wait(loginPO.ecWaitForHomePageToLoad, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(loginPO.ecWaitFortaskSummary, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(loginPO.ecWaitFormyToDo, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(loginPO.ecWaitForsavedSearches, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            loginPO.results = perf.stop('login');
            console.log("Login Page load in Seconds", loginPO.results.preciseWords); // in words
        });
        this.fn_logout = () => __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(loginPO.ecWaitForelm_userProfileTitle, protractor_1.browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(loginPO.ecWaitFordropdown_button, protractor_1.browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
            yield loginPO.elm_profile_dropdown_button.click();
            yield protractor_1.browser.wait(loginPO.ecWaitForelm_userProfile, protractor_1.browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(loginPO.ecWaitFordropdown_button1, protractor_1.browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
            yield loginPO.elm_profile_dropdown_button_logout.click();
            yield perf.start('logout');
            yield protractor_1.browser.wait(loginPO.ecWaitForLoginPageToLoad, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            loginPO.results = perf.stop('logout');
            console.log("Logout in Seconds", loginPO.results.preciseWords); // in words
        });
    }
}
exports.loginPO = loginPO;
//Elements in the page
loginPO.elm_loginPage_email = protractor_1.element(protractor_1.by.name("email"));
loginPO.elm_loginPage_password = protractor_1.element(protractor_1.by.name("password"));
loginPO.elm_loginPage_submitButton = protractor_1.element(protractor_1.by.className("auth0-lock-submit"));
loginPO.elm_homepage_root = protractor_1.element(protractor_1.by.id("app"));
loginPO.elm_userProfileTitle = loginPO.elm_homepage_root.element(protractor_1.by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfileTitle"));
loginPO.elm_userProfile = loginPO.elm_homepage_root.element(protractor_1.by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfile::sr"));
loginPO.elm_profile_dropdown_button = loginPO.elm_userProfileTitle.element(protractor_1.by.css_sr("pebble-icon"));
loginPO.elm_profile_dropdown_button_logout = loginPO.elm_userProfile.element(protractor_1.by.css('span[title="Logout"]'));
loginPO.elm_home_root_widget = loginPO.elm_homepage_root.element(protractor_1.by.css_sr("::sr #contentViewManager::sr rock-content-view::sr app-dashboard::sr rock-dashboard-widgets::sr rock-widget-panel::sr"));
loginPO.elm_home_taskSummary = loginPO.elm_home_root_widget.element(protractor_1.by.css_sr('#rock-task-list::sr rock-task-list::sr div[class = "base-grid-structure-child-2"]'));
loginPO.elm_home_myToDo = loginPO.elm_home_root_widget.element(protractor_1.by.css_sr('#rock-my-todos::sr rock-my-todos::sr #rock-my-todos-tabs::sr div[class = "base-grid-structure-child-2"]'));
loginPO.elm_home_savedSearches = loginPO.elm_home_root_widget.element(protractor_1.by.css_sr('#rock-saved-searches::sr rock-saved-searches::sr #rock-saved-searches-tabs::sr div[class = "base-grid-structure-child-2"]'));
//Expected Conditions
loginPO.ecWaitForelm_userProfile = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(loginPO.elm_userProfile));
loginPO.ecWaitForelm_userProfileTitle = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(loginPO.elm_userProfileTitle));
loginPO.ecWaitForLoginPageToLoad = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.visibilityOf(loginPO.elm_loginPage_email), protractor_1.ExpectedConditions.elementToBeClickable(loginPO.elm_loginPage_submitButton));
loginPO.ecWaitFordropdown_button = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(loginPO.elm_profile_dropdown_button));
loginPO.ecWaitFordropdown_button1 = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(loginPO.elm_profile_dropdown_button_logout));
loginPO.ecWaitForHomePageToLoad = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(loginPO.elm_homepage_root));
loginPO.ecWaitFortaskSummary = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(loginPO.elm_home_taskSummary), protractor_1.ExpectedConditions.visibilityOf(loginPO.elm_home_taskSummary));
loginPO.ecWaitFormyToDo = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(loginPO.elm_home_myToDo), protractor_1.ExpectedConditions.visibilityOf(loginPO.elm_home_myToDo));
loginPO.ecWaitForsavedSearches = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(loginPO.elm_home_savedSearches), protractor_1.ExpectedConditions.visibilityOf(loginPO.elm_home_savedSearches));
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5SU19QTy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYWdlcy9sb2dpblJTX1BPLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQW1GO0FBRW5GLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7QUFDekMsTUFBYSxPQUFPO0lBQXBCO1FBOEJJLGtCQUFrQjtRQUNsQixxQkFBZ0IsR0FBRyxDQUFPLEdBQVUsRUFBRSxFQUFFO1lBQ3BDLElBQUksTUFBTSxPQUFPLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2hELE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN2QixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDSCxNQUFNLG9CQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQixvQkFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUU7d0JBQzNELG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNILE1BQU07cUJBQ1Q7aUJBQ0o7Z0JBQ0QsTUFBTSxvQkFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixDQUFDLENBQUM7Z0JBQ3ZGLE9BQU8sb0JBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBQSxDQUFDO1FBQ0YsMEJBQXFCLEdBQUcsQ0FBTyxLQUFL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