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
class login_PO {
    constructor() {
        //Functions to use
        this.fn_URLNavigation = (url) => __awaiter(this, void 0, void 0, function* () {
            if (yield login_PO.elm_userProfileTitle.isPresent()) {
                yield this.fn_logout();
                yield this.fn_URLNavigation(url);
            }
            else {
                yield protractor_1.browser.get(url);
                for (var i = 1; i < 100; i++) {
                    protractor_1.browser.sleep(5000);
                    if (!(yield (login_PO.elm_loginPage_submitButton.isPresent()))) {
                        protractor_1.browser.refresh();
                    }
                    else {
                        break;
                    }
                }
                yield protractor_1.browser.wait(login_PO.ecWaitForLoginPageToLoad, 200000, 'Timeout: PageLoadError');
                return protractor_1.browser.getTitle();
            }
        });
        this.fn_loginToApplication = (email, password) => __awaiter(this, void 0, void 0, function* () {
            yield login_PO.elm_loginPage_email.sendKeys(email);
            yield login_PO.elm_loginPage_password.sendKeys(password);
            yield login_PO.elm_loginPage_submitButton.click();
            yield perf.start('login');
            yield protractor_1.browser.wait(login_PO.ecWaitForHomePageToLoad, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(login_PO.ecWaitFortaskSummary, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(login_PO.ecWaitFormyToDo, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(login_PO.ecWaitForsavedSearches, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            login_PO.results = perf.stop('login');
            console.log("Login Page load in Seconds", login_PO.results.preciseWords); // in words
        });
        this.fn_logout = () => __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(login_PO.ecWaitForelm_userProfileTitle, protractor_1.browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(login_PO.ecWaitFordropdown_button, protractor_1.browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
            yield login_PO.elm_profile_dropdown_button.click();
            yield protractor_1.browser.wait(login_PO.ecWaitForelm_userProfile, protractor_1.browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
            yield protractor_1.browser.wait(login_PO.ecWaitFordropdown_button1, protractor_1.browser.params.expectedConditionShortTimeLimit, 'Timeout: PageLoadError');
            yield login_PO.elm_profile_dropdown_button_logout.click();
            yield perf.start('logout');
            yield protractor_1.browser.wait(login_PO.ecWaitForLoginPageToLoad, protractor_1.browser.params.expectedConditionLargeTimeLimit, 'Timeout: PageLoadError');
            login_PO.results = perf.stop('logout');
            console.log("Logout in Seconds", login_PO.results.preciseWords); // in words
        });
    }
}
exports.login_PO = login_PO;
//Elements in the page
login_PO.elm_loginPage_email = protractor_1.element(protractor_1.by.name("email"));
login_PO.elm_loginPage_password = protractor_1.element(protractor_1.by.name("password"));
login_PO.elm_loginPage_submitButton = protractor_1.element(protractor_1.by.className("auth0-lock-submit"));
login_PO.elm_homepage_root = protractor_1.element(protractor_1.by.id("app"));
login_PO.elm_userProfileTitle = login_PO.elm_homepage_root.element(protractor_1.by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfileTitle"));
login_PO.elm_userProfile = login_PO.elm_homepage_root.element(protractor_1.by.css_sr("::sr app-common::sr rock-profile-title::sr #userProfile::sr"));
login_PO.elm_profile_dropdown_button = login_PO.elm_userProfileTitle.element(protractor_1.by.css_sr("pebble-icon"));
login_PO.elm_profile_dropdown_button_logout = login_PO.elm_userProfile.element(protractor_1.by.css('span[title="Logout"]'));
login_PO.elm_home_root_widget = login_PO.elm_homepage_root.element(protractor_1.by.css_sr("::sr #contentViewManager::sr rock-content-view::sr app-dashboard::sr rock-dashboard-widgets::sr rock-widget-panel::sr"));
login_PO.elm_home_taskSummary = login_PO.elm_home_root_widget.element(protractor_1.by.css_sr('#rock-task-list::sr rock-task-list::sr div[class = "base-grid-structure-child-2"]'));
login_PO.elm_home_myToDo = login_PO.elm_home_root_widget.element(protractor_1.by.css_sr('#rock-my-todos::sr rock-my-todos::sr #rock-my-todos-tabs::sr div[class = "base-grid-structure-child-2"]'));
login_PO.elm_home_savedSearches = login_PO.elm_home_root_widget.element(protractor_1.by.css_sr('#rock-saved-searches::sr rock-saved-searches::sr #rock-saved-searches-tabs::sr div[class = "base-grid-structure-child-2"]'));
//Expected Conditions
login_PO.ecWaitForelm_userProfile = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(login_PO.elm_userProfile));
login_PO.ecWaitForelm_userProfileTitle = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(login_PO.elm_userProfileTitle));
login_PO.ecWaitForLoginPageToLoad = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.visibilityOf(login_PO.elm_loginPage_email), protractor_1.ExpectedConditions.elementToBeClickable(login_PO.elm_loginPage_submitButton));
login_PO.ecWaitFordropdown_button = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(login_PO.elm_profile_dropdown_button));
login_PO.ecWaitFordropdown_button1 = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(login_PO.elm_profile_dropdown_button_logout));
login_PO.ecWaitForHomePageToLoad = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(login_PO.elm_homepage_root));
login_PO.ecWaitFortaskSummary = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(login_PO.elm_home_taskSummary), protractor_1.ExpectedConditions.visibilityOf(login_PO.elm_home_taskSummary));
login_PO.ecWaitFormyToDo = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(login_PO.elm_home_myToDo), protractor_1.ExpectedConditions.visibilityOf(login_PO.elm_home_myToDo));
login_PO.ecWaitForsavedSearches = protractor_1.ExpectedConditions.and(protractor_1.ExpectedConditions.presenceOf(login_PO.elm_home_savedSearches), protractor_1.ExpectedConditions.visibilityOf(login_PO.elm_home_savedSearches));
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5SU19QTy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdlcy9sb2dpblJTX1BPLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQW1GO0FBRW5GLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7QUFDekMsTUFBYSxRQUFRO0lBQXJCO1FBOEJJLGtCQUFrQjtRQUNsQixxQkFBZ0IsR0FBRyxDQUFPLEdBQUcsRUFBRSxFQUFFO1lBQzdCLElBQUksTUFBTSxRQUFRLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2pELE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUN2QixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDSCxNQUFNLG9CQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQixvQkFBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUU7d0JBQzVELG9CQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNILE1BQU07cUJBQ1Q7aUJBQ0o7Z0JBQ0QsTUFBTSxvQkFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixDQUFDLENBQUM7Z0JBQ3hGLE9BQU8sb0JBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBQSxDQUFDO1FBQ0YsMEJBQXFCLEdBQUcsQ0FBTyxLQUFLLEVB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