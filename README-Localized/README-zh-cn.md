---
page_type: sample
products:
- office-365
- office-outlook
languages:
- javascript
extensions:
  contentType: samples
  createdDate: 12/9/2014 3:58:58 PM
---
## Cordova 邮件客户端应用

此示例应用分步显示了如何使用 Ionic 框架和 O365 Outlook 服务从头开始创建 Cordova 应用。

若要设置 Cordova 开发环境，强烈建议查看 [Visual Studio Tools for Apache Cordova](http://www.visualstudio.com/en-us/explore/cordova-vs.aspx) 和 [Visual Studio Tools for Apache Cordova 入门](http://msdn.microsoft.com/en-us/library/dn771545.aspx)。

在本教程中，你将执行以下步骤

1. 使用 Visual Studio 创建空白的 Codrova
2. 添加 Ionic 框架
3. 向应用添加 O365 服务
4. 设置 O365 邮件 tenet 的权限，以授予对应用的适当访问权限
5. 使用 Ionic 控件和导航创建应用文件夹结构、UI 路由和布局
6. 使用 AngularJS factory 获取访问令牌和 Outlook 服务客户端
7. 使用 O365 API 提取：a.) 标记为重要的邮件，b.) 未读邮件和 c.) 所有邮件
8. 使用 O365 API 删除邮件
9. 运行应用！

![应用登录页面](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/login.png)
![应用邮件视图](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-list.png)
![应用删除邮件确认对话框 ](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-delete.png)

### 步骤 1：使用 Visual Studio 创建空白的 Codrova
通过选择“文件”-->“新建项目”-->“JavaScript”-->“Apache Cordova 应用”-->“空白应用模板”，在 Visual Studio 中创建新的 Cordova 项目。此示例使用了 JavaScript 代码，但你也可使用 TypeScript 编写 Cordova 应用。

### 步骤 2：添加 Ionic 框架
1.	从 Ionic 框架网站，选择“下载 beta 版”。
2.	提取 zip 包
3.	在 Visual Studio 解决方案资源管理器中的 Cordova 项目下新建名为 lib 的文件夹，并将提取到的内容复制到 lib 文件夹下。

![项目的文件夹结构](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Ionic.png)

**更新脚本引用**
- 在 index.html 中，在 Cordova 和 platformOverrides 脚本引用后面的 ``` <head> ``` 元素中添加以下 Ionic 引用。

```html
<script src="lib/ionic/js/ionic.bundle.min.js"></script>
```
- 在 index.html 中，添加以下 ionic css 引用。
```html
 <link href="lib/ionic/css/ionic.min.css" rel="stylesheet" />
```
### 第 3 步：向应用添加 O365 服务
请参阅[设置 Office 365 开发环境](http://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment)文档，了解如何注册 Office 365 开发人员网站以及如何为开发人员网站设置 Azure Active Directory 访问权限。

按照以下步骤，在 Visual Studio 中使用服务管理器添加和配置 Office 365 API。

1. 从 Visual Studio 库下载和安装 Office 365 API 工具
2. 在项目节点上，右键单击并选择**“添加”-->“连接的服务”**
3. 在“服务管理器”对话框的顶部，选择 Office 365 链接，然后选择“注册应用”。使用 Office 365 开发人员组织所用的租户管理员租户进行登录。
![“O365 服务管理器”对话框登录](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/ServiceManager.png)

### 步骤 4：设置 O365 邮件 tenet 的权限，以授予对应用的适当访问权限
选择“邮件”并单击右窗格上的“权限... ”链接，然后读取和写入用户邮件，同时应用将需要执行读取和删除邮件操作。类似地，如果希望应用程序发送邮件，然后选择邮件作为用户选项。

![“O365 邮件 tenet 权限范围”对话框](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-permission.png)

单击“应用”和“确定”以设置权限，并向项目添加 O365 API。这会将包含 JavaScript 库的“服务”文件夹添加到项目中。

![添加权限后的项目文件夹树](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/service-folder.png)

在 index.html 中，在 ``` <head> ``` 元素中添加以下 O365 引用。
```html
<script src="services/office365/scripts/o365loader.js"></script>  
<script src="services/office365/settings/settings.js"></script>
```
**步骤 5：使用 Ionic 控件和导航创建应用文件夹结构、UI 路由和布局**

1. 在项目根节点下创建应用文件夹。该文件夹将包含应用特定的文件。会提取数据并将其绑定到 UI 的每个 UI 组件都将具有与 UI 和模式背后代码非常类似的相应控制器。例如，mail-list.html 将提供列表控件以显示用户邮件，mail-list-ctrl.js 将包含代码以使用 O365 API 提取用户邮件。

![应用程序的项目文件夹树结构](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-app-folder.png)

**文件夹和文件详细信息：**
- **auth** 包含用于登录和注销的 UI 和代码。
- **layout** 包含用于显示应用内容和导航的 UI（例如 ion-pane、ion-side-menus 和 ion-nav-bar），以及用于绑定用户名的代码。
- **app.js** 包含用于导航到不同页面的 UI 路由。
- **service-o365.js** 包含用于获取访问令牌、创建 Outlook 服务客户端对象、进行注销和获取用户名的实用工具函数。这是作为 Angular factory 实现的，因此这些函数可作为实用工具函数在不同的页面上公开。

**示例 app.js 定义 ui 路由**
```javascript
// Layout page
    .state('app', {
        abstract: true,
        url: "/app",
        templateUrl: "app/layout/layout.html"
    })

    // Sign-in page
     .state('sign-in', {
         url: "/sign-in",
         templateUrl: "app/auth/sign-in.html"
     })   

    // Mail list page
    .state('app.mail', {
        url: "/mail",
        views: {
            'mainContent': {
                templateUrl: "app/mail/mail-tabs.html"
            }
        }
    })

    // Mail list containing mails flagged as important
    .state('app.mail.imp', {
        url: "/imp/id:important",
        views: {
            "tab-imp-mail": {
                templateUrl: "app/mail/mail-list.html"
            }
        }
    })

    // Mail detail page
    .state('app.mail-detail', {
        url: "/mail/:id",
        views: {
            'mainContent': {
                templateUrl: "app/mail/mail-detail.html"
            }
        }
    });   

    // Navigate to sign-in page when app starts.
    $urlRouterProvider.otherwise('sign-in');
```
**App layout (menu, nav-bar)**
```html
<ion-side-menus ng-controller="layoutCtrl as vm">
    <ion-pane ion-side-menu-content>
        <ion-nav-bar class="bar-positive">
            <ion-nav-back-button class="button-clear icon ion-ios7-arrow-back"></ion-nav-back-button>
            <button menu-toggle="left" class="button button-icon icon ion-navicon"></button>
        </ion-nav-bar>
        <ion-nav-view name="mainContent" animation="slide-left-right"></ion-nav-view>
    </ion-pane>

    <ion-side-menu side="left">
        <header class="bar bar-header bar-positive">
            <h1 class="title">{{vm.userName}}</h1>
        </header>
        <ion-content class="has-header">
            <ion-list>                            
                <ion-item nav-clear menu-close ui-sref="app.sign-out">Sign-out</ion-item>
            </ion-list>
    </ion-side-menu>
</ion-side-menus>
```
**创建邮件选项卡页面，显示“重要”、“未读”和不同选项卡下的全部邮件**
```html
<ion-view>
    <ion-tabs class="tabs-positive tabs-icon-top">
        <ion-tab title="Imp" icon="ion-star" ui-sref="app.mail.imp">
            <ion-nav-view name="tab-imp-mail"></ion-nav-view>
        </ion-tab>
        <ion-tab title="Unread" icon="ion-ios7-email-outline" ui-sref="app.mail.unread">
            <ion-nav-view name="tab-unread-mail"></ion-nav-view>
        </ion-tab>
        <ion-tab title="All" icon="ion-email" ui-sref="app.mail.all">
            <ion-nav-view name="tab-all-mail"></ion-nav-view>
        </ion-tab>
    </ion-tabs>
</ion-view>
```

### 步骤 6：使用 AngularJS factory 获取访问令牌和 Outlook 服务客户端

**获取访问令牌**
```javascript
var authContext = new O365Auth.Context();
authContext.getIdToken("https://outlook.office365.com/")
.then((function (token) {
     // Get auth token
     authtoken = token;
     // Get user name from token object.
     userName = token.givenName + " " + token.familyName;
    }), function (error) {
      // Log sign-in error message.
      console.log('Failed to login. Error = ' + error.message);
 });
```
**创建 Outlook 服务客户端对象**
```javascript
var outlookClient = new Microsoft.OutlookServices.Client('https://outlook.office365.com/api/v1.0', authtoken.getAccessTokenFn('https://outlook.office365.com'));
```
### 第 7 步：使用 O365 API 提取：a.) 标记为重要的邮件，b.) 未读邮件和 c.) 所有邮件

**提取标记为重要的所有邮件**
```javascript
 function getImpMails() {          
 // Filter to fetch all important mails received after 2000-10-20
var filterQuery = "Importance eq 'High' and DateTimeReceived gt 2000-10-20";
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().filter(filterQuery)
.orderBy('Importance,DateTimeReceived desc').fetch()           
 .then(function (mails) {
   // Get current page. Use getNextPage() to fetch next set of mails.
   vm.mails = mails.currentPage;
   $scope.$apply();                   
  }, function (error) {
     console.log("Error encountered while fetching mails. Error: " + error.message);
    });            
 };
```

**提取所有未读邮件**
```javascript
var filterQuery = 'IsRead eq false';
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().filter(filterQuery).fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 });     
```
**提取所有邮件**
```javascript
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 }); 
```

### 步骤 8：使用 O365 API 删除邮件
Outlook 客户端可用于删除邮件，首先使用邮件 ID 获取想要删除的邮件，随后在邮件对象上调用 delete()，以删除特殊的邮件。delete() 永久删除邮件，若要移动邮件至已删除项，使用 move() 功能。
```javascript
 outlookClient.me.folders.getFolder("Inbox").messages.getMessage(mail.id).fetch()
 .then(function (mail) {
     // Delete the mail.
     mail.delete()
     .then((function (response) {
          console.log('Mail deleted successfully.');
      }), function (error) {                            
          console.log('Fail to delete mail. Error = ' + error.message);                            
  });
});
```

### 步骤 9：运行应用

1. 选择 Android，并面向 Android Emulator 或设备。请注意，O365 身份验证当前不支持 Ripple。

![目标平台选择栏](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Android%20-%20Run.PNG)

**按 F5 运行应用**

要更详细地了解如何在不同平台上运行 Cordova 应用，请参阅[部署和运行使用 Visual Studio Tools for Apache Cordova 构建的应用](http://msdn.microsoft.com/en-us/library/dn757049.aspx)。


此项目已采用 [Microsoft 开源行为准则](https://opensource.microsoft.com/codeofconduct/)。有关详细信息，请参阅[行为准则 FAQ](https://opensource.microsoft.com/codeofconduct/faq/)。如有其他任何问题或意见，也可联系 [opencode@microsoft.com](mailto:opencode@microsoft.com)。
