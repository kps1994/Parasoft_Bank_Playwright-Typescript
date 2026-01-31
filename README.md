Clone the Project:
Open new window in VS code or any IDE
Click on Clone git Repository (Git should configured before)
Provide the url in input: https://github.com/kps1994/Parasoft_Bank_Playwright-Typescript.git

How to run:
npm init playwright@latest
npx install playwright

Covered Test cases in this project :
Test Case 1:
Manual Steps:

Open this url https://parabank.parasoft.com/parabank/index.htm
Click On Register Link.
Add Valid Register Data.
Click On Register Button.
Verify that user is able to Register successfully in the ParaBank application after providing the valid Register Test Data.
Test Case 2:
Manual Steps:

Open this url https://parabank.parasoft.com/parabank/index.htm
Enter the Valid UserName.
Enter the Valid Password.
Click the Login button. 5.Verify that user is able to login successfully in the ParaBank application after providing the valid username and password.
Test Case 3:
Manual Steps:

Open this url https://parabank.parasoft.com/parabank/index.htm
Enter the Valid UserName.
Enter the Valid Password.
Click the Login button.
Navigate to my account page.
Click on Open New Account.
Verify that field What type of Account would you like to open? is displayed.
Test Case 4:
Manual Steps:

Open this url https://parabank.parasoft.com/parabank/index.htm
Enter the InValid UserName.
Enter the Valid Password.
Click the Login button.
Verify that appropriate error message is displayed