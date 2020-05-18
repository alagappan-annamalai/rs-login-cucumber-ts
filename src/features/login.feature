Feature: Verify Login to RS Application

Scenario: Login with valid Credentials
Given I navigate to the RS URL "https://rdwengg-az-qa8.riversand.com/"
When I enter email as "rdwadmin@riversand.com"
And valid password as "rdwadmin"
And clicking submit button
Then I should validate the login success and Home page loads