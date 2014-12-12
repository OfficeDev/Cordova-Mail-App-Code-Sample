## Cordova Mail Client App

This sample app shows step by step how to create a Cordova app using Ionic framework and O365 Outlook services from scratch.

It is highly recommended to go through [Visual Studio Tools for Apache Cordova](http://www.visualstudio.com/en-us/explore/cordova-vs.aspx) and [Getting Started with Visual Studio Tools for Apache Cordova](http://msdn.microsoft.com/en-us/library/dn771545.aspx) to setup Cordova development environment.

In this tutorial, you'll these steps

1. Create Blank Codrova using Visual Studio
2. Add Ionic framework
3. Add O365 services to app
4. Set permissions to O365 mail tenet to grant appropiate access to app
5. Create app folder structure, UI routing and layout using Ionic controls and navigation
6. Acquire an access token and get the Outlook services client using AngularJS factory
7. Use O365 API to fetch a.) Mails flagged as Important, b.) Unread mails and c.) All mails
8. Use O365 API to delete mail

![](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/login.png)
![](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-list.png)
![](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-delete.png)

### Step 1: Create Blank Codrova using Visual Studio
Create a new Cordova project in Visual Studio by choosing File --> New project --> JavaScript --> Apache Cordova Apps --> Blank App template. This sample uses JavaScript code, but you can also write your Cordova app in TypeScript.

### Step 2: Add Ionic framework
1.	From the Ionic framework website, choose Download beta.
2.	Extract the zip
3.	Create new folder named lib under Cordova project in Visual Studio solution explorer and copy the extracted content under lib folder.

![](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Ionic.png)

### Step 3: Add O365 services to app







