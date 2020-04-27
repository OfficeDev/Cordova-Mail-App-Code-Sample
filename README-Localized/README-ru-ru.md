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
## Приложение почтового клиента Cordova

В этом примере приложения шаг за шагом показано, как создать приложение Cordova с использованием Ionic Framework и O365 Outlook с нуля.

Настоятельно рекомендуется пройти через [инструменты Visual Studio для Apache Cordova](http://www.visualstudio.com/en-us/explore/cordova-vs.aspx) и [Начало работы с инструментами Visual Studio для Apache Cordova](http://msdn.microsoft.com/en-us/library/dn771545.aspx) для настройки среды разработки Cordova.

В этом уроке вы будете эти шаги

1. Создание Blank Cordova в среде Visual Studio
2. Добавить Ionic Framework
3. Добавить сервисы O365 в приложение
4. Установите разрешения для почтового принципа O365, чтобы предоставить соответствующий доступ к приложению
5. Создание структуры папок приложения, маршрутизации и макета пользовательского интерфейса с использованием элементов управления и навигации Ionic.
6. Получите токен доступа и получите клиент служб Outlook, используя фабрику AngularJS
7. Используйте O365 API для получения a.) Сообщения, помеченные как важные, б.) Непрочитанные письма и с.) Все письма
8. Используйте O365 API для удаления почты
9. Запуск приложения!

![Страница входа в приложение](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/login.png)
![Просмотр почты приложения](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-list.png)
![Диалоговое окно подтверждения удаления приложения](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-delete.png)

### Шаг 1. Создание Blank Cordova в среде Visual Studio
Чтобы создать новый проект Cordova в Visual Studio, выберите File --> New project --> JavaScript --> Apache Cordova Apps --> Blank App template. В этом примере используется код JavaScript, но вы также можете написать свое приложение Cordova на TypeScript.

### Шаг 2. Добавить Ionic Framework
1.	На веб-сайте Ionic Framework выберите Загрузить бета-версию.
2.	Извлечение ZIP-архива
3.	Создайте новую папку с именем lib в проекте Cordova в обозревателе решений Visual Studio и скопируйте извлеченный контент в папку lib.

![Структура папок для Project](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Ionic.png)

**обновить ссылки на скрипты**
— in. HTML, добавьте указанные ниже ионные ссылки в ``` < головка > ```, после того как ссылаются на platformOverrides.

```html
<script src="lib/ionic/js/ionic.bundle.min.js"></script>
```
- В index. HTML добавьте ниже ионную ссылку CSS.
```html
 <link href="lib/ionic/css/ionic.min.css" rel="stylesheet" />
```
### Этап 3. Добавить сервисы O365 в приложение
См. документацию [Настройка среды разработки Office 365](http://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment) в разделе Регистрация на сайте разработчика Office 365 и настройка доступа Azure Active Directory к сайту разработчика.

Выполните следующие действия, чтобы добавить и настроить API-интерфейсы Office 365 с помощью диспетчера служб в Visual Studio.

1. Загрузите и установите инструменты Office 365 API из галереи Visual Studio
2. На узле проекта щелкните правой кнопкой мыши и выберите **Добавить -> Подключенная служба**
3. В верхней части диалогового окна «Диспетчер служб» выберите ссылку Office 365, а затем выберите «Зарегистрировать приложение». Войдите в систему с учетной записью администратора клиента для вашей организации-разработчика Office 365.
![Вход в O365 Services Manager](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/ServiceManager.png)

### Шаг 4. Установите разрешения для почтового принципа O365, чтобы предоставить соответствующий доступ к приложению
Выберите «Почта» и щелкните ссылку «Разрешения...» на правой панели, а затем выберите чтение и запись в почту пользователя, так как приложению потребуется выполнить операцию чтения и удаления почты. Точно так же, если вы хотите, чтобы ваше приложение отправляло почту, выберите почту в качестве опции пользователя.

![Области разрешений O365 для почтового диалога](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-permission.png)

Нажмите Apply и Ok, чтобы установить разрешение и добавить O365 API в проект. Это добавит в проект папку Service, содержащую библиотеки JavaScript.

![дерево папок проекта после добавления разрешений](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/service-folder.png)

В index.html добавьте следующие ссылки O365 в элемент ``` <head> ```.
```html
<script src="services/office365/scripts/o365loader.js"></script>  
<script src="services/office365/settings/settings.js"></script>
```
**Шаг 5 Создание структуры папок приложения, маршрутизации пользовательского интерфейса и макета с использованием элементов управления Ionic и навигации **

1. Создайте папку приложения под корневым узлом проекта. Папка приложения будет содержать файлы, специфичные для приложения. Каждый компонент пользовательского интерфейса, который выполняет выборку и привязку данных к пользовательскому интерфейсу, будет иметь соответствующий контроллер, аналогичный пользовательскому интерфейсу и шаблону кода. Например, mail-list.html покажет элемент управления списком для отображения почтовых сообщений пользователей, а mail-list-ctrl.js будет содержать код для получения почты пользователей с помощью API O365.

![древовидная структура папок проекта для приложения](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-app-folder.png)

**папка и сведения о файлах.**
- **проверка подлинности** содержат пользовательский интерфейс и код для входа в систему и выхода из нее
- **макет** содержит элементы пользовательского интерфейса и элементы навигации, такие как литий-и управляющие элементы, которые представляют собой ионную и программную панель навигации, а также код для привязки имени пользователя.
— **app.js** содержит функцию маршрутизации пользовательского интерфейса для перехода на различные страницы.
- **service-o365.js** содержит служебную функцию для получения маркера доступа, создания объекта клиента служб Outlook, выхода и получения имени пользователя. Это реализовано как Angular factory, так что эти функции могут быть представлены в виде служебной функции на разных страницах.

**Пример app.js, определяющий маршрутизацию пользовательского интерфейса**
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
**Create Mail tab page to show important, unread and all mails under different tabs**
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

### Шаг 6. Получите токен доступа и получите клиент служб Outlook, используя фабрику AngularJS

**получить маркер доступа**
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
**create Outlook services client object**
```javascript
var outlookClient = new Microsoft.OutlookServices.Client('https://outlook.office365.com/api/v1.0', authtoken.getAccessTokenFn('https://outlook.office365.com'));
```
### Этап 7. Используйте O365 API для получения a.) Сообщения, помеченные как важные, б.) Непрочитанные письма и с.) Все письма

**Извлечение всех писем, помеченных как важные функции**
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

**Получить все непрочитанные письма**
```javascript
var filterQuery = 'IsRead eq false';
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().filter(filterQuery).fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 });     
```
**Получить все непрочитанные письма**
```javascript
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 }); 
```

### Шаг 8. Используйте O365 API для удаления почты
Клиентский объект Outlook можно использовать для удаления почты, сначала получите почту, которую вы хотите удалить, с помощью почтового идентификатора, а затем вызовите delete () для почтового объекта, чтобы удалить конкретную почту. delete () навсегда удаляет почту, чтобы переместить почту в Удаленные, используйте функцию move ().
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

### Этап 9. Запуск приложения

1. Выберите Android и выберите его в качестве Android Emulator или устройства. Обратите внимание, что в настоящее время Ripple не поддерживается для аутентификации O365.

![панель выбора целевой платформы](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Android%20-%20Run.PNG)

**F5 для запуска приложения**

Ознакомьтесь [развертывании и запуске приложения, созданного с помощью средств Visual Studio Tools для Apache Cordova](http://msdn.microsoft.com/en-us/library/dn757049.aspx) Подробнее о том, как запустить приложение Cordova на разных платформах.


Этот проект соответствует [Правилам поведения разработчиков открытого кода Майкрософт](https://opensource.microsoft.com/codeofconduct/). Дополнительные сведения см. в разделе [часто задаваемых вопросов о правилах поведения](https://opensource.microsoft.com/codeofconduct/faq/). Если у вас возникли вопросы или замечания, напишите нам по адресу [opencode@microsoft.com](mailto:opencode@microsoft.com).
