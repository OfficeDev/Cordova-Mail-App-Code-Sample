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

**Update the script references**
- In index.html, add the following Ionic references in the ``` <head> ``` element, after the Cordova and platformOverrides script references.

```html
<script src="lib/ionic/js/ionic.bundle.min.js"></script>
```
- In index.html, add following ionic css reference.
```html
 <link href="lib/ionic/css/ionic.min.css" rel="stylesheet" />
```
### Step 3: Add O365 services to app
Refer [Set up your Office 365 development environment](http://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment) documentation on Signing up for an Office 365 Developer Site and Set up Azure Active Directory access for your Developer Site.

Follow these steps to add and configure Office 365 APIs by using the Services Manager in Visual Studio.

1. Download and install the Office 365 API tools from the Visual Studio Gallery
2. On the project node, right click and choose **Add --> Connected Service**
3. At the top of the Services Manager dialog box, choose the Office 365 link, and then choose Register your app. Sign in with a tenant administrator account for your Office 365 developer organization.
![](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/ServiceManager.png)

### Step 4: Set permissions to O365 mail tenet to grant appropiate access to app
Select Mail and click on Permissions... link on right pane and then select read and write to user's mail as app will need to perform read and delete mail operation. Similarly if you want your app to send mail then select mail as a user option.

![](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-permission.png)

Click Apply and Ok to set the permission and add O365 API to project. This will add Service folder containing JavaScript libraries to the project.

![](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/service-folder.png)

In index.html, add the following O365 references in the ``` <head> ``` element.
```html
<script src="services/office365/scripts/o365loader.js"></script>  
<script src="services/office365/settings/settings.js"></script>
```
**Step 5: Create app folder structure, UI routing and layout using Ionic controls and navigation**

1. Create app folder under project root node. app folder will contain files specific to app. Each UI component which does fetching and binding the data to UI will have corresponding controller much like UI and code behind pattern. For example mail-list.html will show list control to display user mails and mail-list-ctrl.js will contain code to fetch users mail using O365 API.

![](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-app-folder.png)

**Folder and file detail:**
- **auth** contains UI and code for signing-in and sign-out
- **layout** contains UI to display app content and navigation like ion-pane, ion-side-menus, ion-nav-bar and code to bind the user name.
- **app.js** contains ui routing to navigate to different pages
- **service-o365.js** contains utility function to get access token, create Outlook services client object, signout and get user name. This is implemented as Angular factory so that these functions can be exposed as utility function across different pages.






