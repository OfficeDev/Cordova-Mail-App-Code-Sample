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
## Cordova メール クライアント アプリ

このサンプル アプリは、Ionic フレームワークおよび O365 Outlook サービスを使用して一から Cordova アプリを作成する方法を段階的に説明します。

「[Visual Studio Tools for Apache Cordova](http://www.visualstudio.com/en-us/explore/cordova-vs.aspx)」および「[Getting Started with Visual Studio Tools for Apache Cordova (Visual Studio Tools for Apache Cordova の使用を開始する)](http://msdn.microsoft.com/en-us/library/dn771545.aspx)」を経て Cordova 開発環境をセットアップすることを強くお勧めします。

このチュートリアルでは、次の手順を実行します

1. Visual Studio を使用して空白の Cordova を作成する
2. Ionic フレームワークを追加する
3. O365 サービスをアプリに追加する
4. O365 メールの原則のアクセス許可を設定して、アプリへの適切なアクセス許可を付与する
5. Ionic コントロールとナビゲーションを使用して、アプリのフォルダー構造、UI ルーティング、レイアウトを作成する
6. アクセス トークンを取得し、AngularJS ファクトリを使用して Outlook サービス クライアントを取得します
7. O365 API を使用して  a.) "重要"のフラグ付きメールをフェッチする b.) 未読メールをフェッチする c.) すべてのメールをフェッチする
8. O365 API を使用してメールを削除する
9. アプリを実行する 

![アプリケーション ログイン ページ](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/login.png)
![アプリケーション メール ビュー](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-list.png)
![アプリケーション メール削除の確認ダイアログ](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-delete.png)

### 手順 1: Visual Studio を使用して空白の Cordova を作成する
[ファイル] --> [新しいプロジェクト] --> [JavaScript] --> [Apache Cordova アプリ] --> [空白のアプリ テンプレート] を選択して、Visual Studio で新しい Cordova プロジェクトを作成します。このサンプルでは JavaScript コードを使用していますが、TypeScript で Cordova アプリを作成することもできます。

### 手順 2:Ionic フレームワークを追加する
1.	Ionic フレームワークの Web サイトから、[ベータ版のダウンロード] を選びます。
2.	ZIP を解凍する
3.	Visual Studio ソリューション エクスプローラーの Cordova プロジェクトの下に lib という名前の新しいフォルダーを作成し、展開したコンテンツを lib フォルダーの下にコピーします。

![project 用のフォルダー構造](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Ionic.png)

**スクリプト参照を更新する**
- index.html で、Cordova および platformOverrides スクリプト参照の後に、次の Ionic 参照を ```<head>``` 要素に追加します。

```html
<script src="lib/ionic/js/ionic.bundle.min.js"></script>
```
- index.html で、次の Ionic CSS 参照を追加します。
```html
 <link href="lib/ionic/css/ionic.min.css" rel="stylesheet" />
```
### 手順 3:O365 サービスをアプリに追加する
「[Office 365 開発環境のセットアップ](http://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment)」ドキュメントを参照して、Office 365 開発者向けサイトにサインアップし、開発者向けサイトの Azure Active Directory アクセスをセットアップします。

Visual Studio のサービス マネージャーを使用して Office 365 API を追加して構成するには、次の手順に従います。

1. Visual Studio ギャラリーから Office 365 API ツールをダウンロードしてインストールする
2. プロジェクト ノードを右クリックして、**[追加] > [接続済みサービス]** を選ぶ
3. [サービス マネージャー] ダイアログ ボックスの上部にある [Office 365] リンクをクリックして、[アプリを登録する] を選択します。Office 365 開発者の組織のテナント管理者アカウントでサインインします。
![O365 サービス マネージャーのダイアログ サインイン](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/ServiceManager.png)

### 手順 4: O365 メールの原則のアクセス許可を設定して、アプリへの適切なアクセス許可を付与する
[メール] を選択し、右側のウィンドウの [アクセス許可...] リンクをクリックします。アプリは、メールの読み取りと削除の操作が必要になるため、[ユーザーのメールの読み取りと書き込み] を選択します。同様に、アプリでメールを送信する場合は、[ユーザーとしてメールを送信] オプションを選択します。

![メールの原則のダイアログの O365 アクセス許可スコープ](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-permission.png)

[適用] および [OK] をクリックしてアクセス許可を設定し、O365 API をプロジェクトに追加します。これにより、JavaScript ライブラリを含む Service フォルダーがプロジェクトに追加されます。

![アクセス許可を追加した後の project フォルダー ツリー](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/service-folder.png)

index.html で、次の O365 参照を ```<head>``` 要素に追加します。
```html
<script src="services/office365/scripts/o365loader.js"></script>  
<script src="services/office365/settings/settings.js"></script>
```
**手順 5:Ionic コントロールとナビゲーションを使用して、アプリのフォルダー構造、UI ルーティング、レイアウトを作成する**

1. プロジェクト ルート ノードの下に app フォルダーを作成します。app フォルダーには、アプリ固有のファイルが含まれます。データをフェッチして UI にバインドする各 UI コンポーネントには、UI およびコード ビハインド パターンと同様に、対応するコントローラーがあります。たとえば、mail-list.html はリスト コントロールを表示してユーザーのメールを表示し、mail-list-ctrl.js には O365 API を使用してユーザーのメールをフェッチするコードが含まれます。

![アプリケーション用のプロジェクト フォルダー ツリー構造](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-app-folder.png)

**フォルダーとファイルの詳細**:
- **auth** には、サインインおよびサインアウトのための UI とコードが含まれています
- **layout** には、アプリ コンテンツや ion-pane、ion-side-menus、ion-nav-bar、およびユーザー名をバインドするコードなどのナビゲーションを表示するための UI が含まれています。
- **app.js** には、さまざまなページに移動するための UI ルーティングが含まれています
- **service-o365.js** には、アクセス トークンを取得し、Outlook サービス クライアント オブジェクトを作成し、サインアウトしてユーザー名を取得するためのユーティリティ関数が含まれています。これは Angular ファクトリとして実装されているため、これらの関数はさまざまなページにわたってユーティリティ関数として公開できます。

**Sample app.js defining ui routing**
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
**重要とフラグ付けされたメール、未読メール、全てのメールをそれぞれ表示する、個別のメール タブのページを作成してください**
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

### 手順 6: アクセス トークンを取得し、AngularJS ファクトリを使用して Outlook サービス クライアントを取得します

**アクセストークンの取得**
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
**Outlook サービス クライアント オブジェクトを作成する**
```javascript
var outlookClient = new Microsoft.OutlookServices.Client('https://outlook.office365.com/api/v1.0', authtoken.getAccessTokenFn('https://outlook.office365.com'));
```
### 手順 7:O365 API を使用して  a.) "重要"のフラグ付きメールをフェッチする b.) 未読メールをフェッチする c.) すべてのメールをフェッチする

**重要としてフラグ付けされたメールをすべてフェッチする**
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

**未読メールをすべてフェッチする**
```javascript
var filterQuery = 'IsRead eq false';
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().filter(filterQuery).fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 });     
```
**すべてのメールをフェッチする**
```javascript
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 }); 
```

### 手順 8: O365 API を使用してメールを削除する
Outlook クライアント オブジェクトを使用してメールを削除できます。まず、メール ID を使用して削除するメールを受信し、メール オブジェクトで delete() を呼び出して特定のメールを削除します。delete() はメールを完全に削除します。メールを削除済みアイテムに移動するには、move() 関数を使用します。
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

### 手順 9: アプリを実行する

1. Android を選択し、Android エミュレーターまたはデバイスとしてターゲットにします。現在、Ripple は O365 認証でサポートされていないことにご注意ください。

![ターゲット プラットフォームの選択バー](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Android%20-%20Run.PNG)

**F5 キーを押してアプリを実行する**

異なるプラットフォームに渡り Cordova アプリを実行する方法の詳細については、「[Deploy and Run Your App Built with Visual Studio Tools for Apache Cordova (Visual Studio Tools for Apache Cordova で構築されたアプリの展開と実行)](http://msdn.microsoft.com/en-us/library/dn757049.aspx)」を参照してください。


このプロジェクトでは、[Microsoft Open Source Code of Conduct (Microsoft オープン ソース倫理規定)](https://opensource.microsoft.com/codeofconduct/) が採用されています。詳細については、「[倫理規定の FAQ](https://opensource.microsoft.com/codeofconduct/faq/)」を参照してください。また、その他の質問やコメントがあれば、[opencode@microsoft.com](mailto:opencode@microsoft.com) までお問い合わせください。
