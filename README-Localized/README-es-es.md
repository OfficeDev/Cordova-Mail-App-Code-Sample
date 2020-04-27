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
## Aplicación cliente de correo de Cordova

Esta aplicación de ejemplo muestra paso a paso cómo crear desde cero una aplicación de Cordova con el marco Ionic y los servicios de Outlook de O365.

Le recomendamos encarecidamente que vea [Visual Studio Tools para Apache Cordova](http://www.visualstudio.com/en-us/explore/cordova-vs.aspx) e [Introducción a Visual Studio Tools para Apache Cordova](http://msdn.microsoft.com/en-us/library/dn771545.aspx) para instalar el entorno de desarrollo de Cordova.

En este tutorial, aprenderá los siguientes pasos:

1. Crear Cordova en blanco con Visual Studio.
2. Agregar el marco Ionic.
3. Agregar los servicios de O365 a la aplicación.
4. Establecer los permisos para el inquilino de correo de O365 para conceder el acceso apropiado a la aplicación.
5. Crear una estructura de carpetas de aplicaciones, enrutamiento y diseño de la interfaz de usuario con la navegación y controles de Ionic.
6. Adquirir un token de acceso y obtener el cliente de servicios de Outlook con la factoría de AngularJS.
7. Usar la API de O365 para recuperar: a) Correo marcado como importante, b) Correo no leído y c) Todos los correos.
8. Usar la API de O365 para eliminar correos.
9. ¡Ejecutar la aplicación!

![Página de inicio de sesión de la aplicación](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/login.png)
![Vista de correo de la aplicación](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-list.png)
![Cuadro de diálogo de confirmación de la aplicación para eliminar correo](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-delete.png)

### Paso 1: Crear Cordova en blanco con Visual Studio
Cree un nuevo proyecto de Cordova en Visual Studio, eligiendo Archivo: --> Nuevo proyecto: --> JavaScript, --> Aplicaciones de Apache Cordova --> Plantilla de aplicación vacía. Este ejemplo usa código JavaScript, pero también puede escribir la aplicación de Cordova en TypeScript.

### Paso 2: Agregar el marco Ionic
1.	Desde el sitio web del marco Ionic, elija Descargar beta.
2.	Descomprima el archivo zip
3.	Cree una nueva carpeta denominada lib en el proyecto de Cordova en el explorador de soluciones de Visual Studio y copie el contenido descomprimido en la carpeta lib.

![Estructura de carpetas para el proyecto](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Ionic.png)

**Actualizar las referencias al script**
- En index.html, agregue las siguientes referencias a Ionic en el elemento ``` <head> ```, después de las referencias al script de Cordova y platformOverrides.

```html
<script src="lib/ionic/js/ionic.bundle.min.js"></script>
```
- En index.html, agregue las siguientes referencias de CSS Ionic.
```html
 <link href="lib/ionic/css/ionic.min.css" rel="stylesheet" />
```
### Paso 3: Agregar servicios de O365 a la aplicación
Consulte la documentación [Configurar el entorno de desarrollo de Office 365](http://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment) para  suscribirse a un sitio para desarrolladores de Office 365 y configurar el acceso de Azure Active Directory para su sitio de desarrolladores.

Siga estos pasos para agregar y configurar las API de Office 365 mediante el Administrador de servicios en Visual Studio.

1. Asegúrese de descargar e instalar las herramientas de la API de Office 365 desde la Galería de Visual Studio.
2. En el nodo proyecto, haga clic con el botón derecho y elija **Agregar --> Servicio conectado**
3. En la parte superior del cuadro de diálogo del Administrador de servicios, elija el vínculo Office 365 y luego seleccione Registrar su aplicación. Conéctese con una cuenta de Administrador de espacios empresariales de su organización de desarrolladores de Office 365.
![Inicio de sesión del administrador de servicios de O365](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/ServiceManager.png)

### Paso 4: Establecer los permisos para el inquilino de correo de O365 para conceder el acceso apropiado a la aplicación
Seleccione Mail y haga clic en el vinculo Permissions... en el panel de la derecha y, a continuación, seleccione Read and write to user's mail ya que la aplicación tendrá que realizar la operación de lectura y eliminación de correo. De forma similar, si quiere que la aplicación envíe correo, seleccione la opción Send mail as user.

![Cuadro de diálogo del ámbito de permisos de O365 para el inquilino de correo](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-permission.png)

Haga clic en Apply y OK para establecer el permiso y agregar la API de O365 al proyecto. Esto agregará la carpeta Servicio que contiene las bibliotecas de JavaScript del proyecto.

![Árbol de carpetas del proyecto después de agregar permisos](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/service-folder.png)

En index.html, agregue las siguientes referencias de O365 al elemento ``` <head> ```
```html
<script src="services/office365/scripts/o365loader.js"></script>  
<script src="services/office365/settings/settings.js"></script>
```
**Paso 5: Crear una estructura de carpetas de aplicaciones, enrutamiento y diseño de la interfaz de usuario con la navegación y controles de Ionic**

1. Cree una carpeta de aplicación en el nodo raíz del proyecto. La carpeta de aplicación contendrá archivos específicos de la aplicación. Cada componente de la interfaz de usuario que recupera y enlaza datos a la interfaz de usuario, tendrá un controlador correspondiente muy similar a la interfaz de usuario y patrones de código subyacentes. Por ejemplo, mail-list.html mostrará el control de lista para mostrar correos de usuario y mail-list-ctrl.js contendrá código para recuperar correo de usuarios mediante la API de O365.

![Estructura de árbol de las carpetas del proyecto para la aplicación](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-app-folder.png)

**Detalle de archivo y carpetas:**
- **auth** contiene la interfaz de usuario y el código para iniciar y cerrar sesión
- **layout** contiene la interfaz de usuario para mostrar el contenido y para la navegación de la aplicación como el panel de ion, los menús laterales de ion, la barra de navegación de ion y código para enlazar el nombre de usuario.
-**app.js** contiene el enrutamiento de la interfaz de usuario para ir a las distintas páginas:
- **service-o365.js** contiene una función de utilidad para obtener el token de acceso, crear un objeto de cliente de servicios de Outlook, cerrar sesión y obtener el nombre del usuario. Esto se implementa como una factoría de Angular para que las funciones puedan exponerse como una función de utilidad en diferentes páginas.

**Aplicación de ejemplo app.js que define el enrutamiento de la interfaz de usuario**
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
**Diseño de la aplicación (menú, nav-bar)**
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
**Crear una página de pestañas de correo para mostrar correo importante, no leído y todos los correos en diferentes pestañas**
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

### Paso 6: Adquirir un token de acceso y obtener el cliente de servicios de Outlook con la factoría de AngularJS

**Adquirir un token de acceso**
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
**crear un objeto de cliente para servicios de Outlook**
```javascript
var outlookClient = new Microsoft.OutlookServices.Client('https://outlook.office365.com/api/v1.0', authtoken.getAccessTokenFn('https://outlook.office365.com'));
```
### Paso 7: Usar la API de O365 para recuperar: a) Correo marcado como importante, b) Correo no leído y c) Todos los correos

**Recuperar todos los correos marcados como importantes**
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

**Recuperar todos los correos no leídos**
```javascript
var filterQuery = 'IsRead eq false';
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().filter(filterQuery).fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 });     
```
**Recuperar todos los correos**
```javascript
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 }); 
```

### Paso 8: Usar la API de O365 para eliminar correos
El objeto de cliente de Outlook se puede usar para eliminar correo. Primero, obtenga el correo que desea eliminar mediante mail id y luego llame a delete() en el objeto de correo para eliminar el correo específico; delete() elimina el correo de forma permanente. Para mover el correo a Elementos eliminados, use la función move().
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

### Paso 9: Ejecutar la aplicación

1. Seleccione Android, ya sea en un emulador o dispositivo de Android. Tenga en cuenta que actualmente no se permite Ripple para la autenticación de O365.

![barra de selección de plataforma de destino](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Android%20-%20Run.PNG)

**Presione F5 para ejecutar la aplicación**

Consulte [Implementar y ejecutar una aplicación para Apache Cordova creada con Visual Studio Tools](http://msdn.microsoft.com/en-us/library/dn757049.aspx) para ver información adicional sobre cómo ejecutar la aplicación de Cordova en distintas plataformas.


Este proyecto ha adoptado el [Código de conducta de código abierto de Microsoft](https://opensource.microsoft.com/codeofconduct/). Para obtener más información, vea [Preguntas frecuentes sobre el código de conducta](https://opensource.microsoft.com/codeofconduct/faq/) o póngase en contacto con [opencode@microsoft.com](mailto:opencode@microsoft.com) si tiene otras preguntas o comentarios.
