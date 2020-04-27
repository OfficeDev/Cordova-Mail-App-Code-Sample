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
## Application cliente Cordova Mail

Cet application exemple explique comment créer une application Cordova à l’aide de l’infrastructure Ionic et des services Outlook O365 à partir de zéro.

Nous vous recommandons vivement de passer en revue [Outils Visual Studio pour Apache Cordova](http://www.visualstudio.com/en-us/explore/cordova-vs.aspx) et [Prise en main des Outils Visual Studio pour Apache Cordova](http://msdn.microsoft.com/en-us/library/dn771545.aspx) pour la configuration de l’environnement de développement Cordova.

Ce tutoriel vous montre comment effectuer les opérations suivantes :

1. Créer un Cordova vide à l’aide de Visual Studio
2. Ajouter une infrastructure Ionic
3. Ajouter des services Office 365 à l’application
4. Définir des autorisations sur la messagerie O365 pour accorder l’accès approprié à l’application
5. Créer une structure de dossiers d’applications, routage et disposition d’interface utilisateur à l’aide de commandes et navigation Ionic
6. Acquérir un jeton d’accès et obtenir le client Outlook services à l’aide de AngularJS Factory
7. Utiliser l’API O365 pour extraire a.) Les e-mails marqués comme importants, b.) Les e-mails non lus et c.) Tous les e-mails.
8. Utiliser l’API O365 pour supprimer un e-mail
9. Exécuter l’application !

![Page de connexion de l’application](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/login.png)
![Affichage des e-mails de l’application](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-list.png)
![Boîte de dialogue de confirmation de suppression d’e-mail de l’application](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-delete.png)

### Étape 1 : Créer un Cordova vide à l’aide de Visual Studio
Créer un projet Cordova dans Visual Studio en sélectionnant Fichier--> Nouveau projet--> JavaScript--> Applications Cordova Apache--> Modèle d’application vide. Cet exemple utilise du code JavaScript, mais vous pouvez également écrire votre application Cordova dans TypeScript.

### Étape 2 : Ajouter une infrastructure Ionic
1.	Sur le site Web de l’infrastructure Ionic, sélectionnez Télécharger la version bêta.
2.	Extrayez le fichier zip
3.	Créez un dossier nommé lib sous Projet Cordova dans l’Explorateur de solutions Visual Studio et copiez le contenu extrait sous le dossier lib.

![Structure de dossier pour Projet](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Ionic.png)

**Mettre à jour les références de script** :
dans index.html, ajoutez les références Ionic suivantes dans l’élément ```< head >```, après les références de script Cordova et platformOverrides.

```html
<script src="lib/ionic/js/ionic.bundle.min.js"></script>
```
- Dans index.html, ajouter la référence CSS Ionic suivante.
```html
 <link href="lib/ionic/css/ionic.min.css" rel="stylesheet" />
```
### Étape 3 : Ajouter des services Office 365 à l’application
Consultez la documentation[Configurer votre environnement de développement Office 365](http://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment) sur l’inscription à un site développeur Office 365 et configurez l’accès à Azure Active Directory pour votre site de développeur.

Procédez comme suit pour ajouter et configurer des API Office 365 à l’aide du gestionnaire de services dans Visual Studio.

1. Téléchargez et installez les outils d’API Office 365 à partir de la galerie Visual Studio.
2. Sur le nœud de projet, cliquez avec le bouton droit, puis sélectionnez **Ajouter--> Service connecté**
3. Dans la partie supérieure de la boîte de dialogue Gestionnaire des services, sélectionnez le lien Office 365, puis sélectionnez Enregistrer votre application. Connectez-vous à l’aide d’un compte d’administrateur client pour votre organisation Office 365 Developer.
![Connexion à la boîte de dialogue Gestionnaire des services O365](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/ServiceManager.png)

### Étape 4 : Définir des autorisations sur la messagerie O365 pour accorder l’accès approprié à l’application
Sélectionnez Mail, cliquez sur le lien Autorisations... dans le volet droit, puis sélectionnez l’option d’accès en lecture et écriture à la messagerie de l’utilisateur car l’application devra effectuer une opération de lecture et suppression d’e-mail. De même, si vous voulez que votre application envoie des e-mails, sélectionnez l’option Envoyer un e-mail en tant qu’utilisateur.

![Étendues d’autorisations O365 pour la boîte de dialogue mail](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-permission.png)

Cliquez sur Appliquer, puis sur OK pour définir l’autorisation et ajouter l’API Office 365 au projet. Cette opération ajoute un dossier de Service contenant des bibliothèques JavaScript au projet.

![Arborescence des dossiers de projets après ajout d’autorisations](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/service-folder.png)

Dans index.html, ajoutez les références O365 suivantes dans l’élément ```<tête>```.
```html
<script src="services/office365/scripts/o365loader.js"></script>  
<script src="services/office365/settings/settings.js"></script>
```
**Étape 5 : Créer une structure de dossiers d’applications, routage et disposition d’interface utilisateur à l’aide des contrôles et de la navigation Ionic**

1. Créez un dossier d’application sous le nœud racine du projet. Le dossier d’application contiendra les fichiers spécifiques à l’application. Chaque composant d’interface utilisateur qui récupère et lie les données à l’interface utilisateur disposera d’un contrôleur correspondant, comme l’interface utilisateur et le modèle de code. Par exemple, mail-list.html affiche le contrôle de liste pour afficher les e-mails de l’utilisateur et mail-list-ctrl.js contient du code pour extraire les e-mails des utilisateurs à l’aide de l’API O365.

![Structure arborescente des dossiers de projets pour l’application](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Mail-app-folder.png)

**Détail de dossier et fichier :**
-**authentification** contient l’interface utilisateur et du code pour la connexion et la déconnexion
-**disposition** contient l’interface utilisateur pour afficher le contenu de l’application et la navigation, comme le volet ion, les menus côté ion, la barre de navigation ion et le code pour lier le nom d’utilisateur.
-**app.js** contient le routage d’interface utilisateur pour accéder à différentes pages
-**service-o365.js** contient une fonction utilitaire pour obtenir un jeton d’accès, créer un objet client Outlook services, se déconnecter et obtenir un nom d’utilisateur. Ceci est implémenté comme une Angular factory de sorte que ces fonctions puissent être exposées en tant que fonction utilitaire sur différentes pages.

**Exemple d’app.js définissant le routage d’interface utilisateur**
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
**Créer une page d’onglets Mail pour afficher les e-mails importants, non lus et tous les e-mails sous différents onglets**
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

### Étape 6 : Acquérir un jeton d’accès et obtenir le client Outlook services à l’aide de AngularJS Factory

**Acquérir un jeton d’accès**
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
### Étape 7 : Utiliser l’API O365 pour extraire a.) Les e-mails marqués comme importants, b.) Les e-mails non lus et c.) Tous les e-mails.

**Extraire tous les e-mails marqués comme importants**
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

**Extraire tous les e-mails non lus**
```javascript
var filterQuery = 'IsRead eq false';
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().filter(filterQuery).fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 });     
```
**Extraire tous les e-mails**
```javascript
outlookClient.me.folders.getFolder("Inbox").messages.getMessages().fetch()            
.then(function (mails) {
    // Get current page. Use getNextPage() to fetch next set of mails.
    vm.mails = mails.currentPage;
    $scope.$apply();                   
 }); 
```

### Étape 8 : Utiliser l’API O365 pour supprimer un e-mail
L’objet client Outlook peut être utilisé pour supprimer les e-mails. Commencez par récupérer l’e-mail que vous voulez supprimer à l’aide de son ID, puis appelez delete() sur l’objet de l’e-mail pour supprimer l’e-mail en question. La fonction delete() supprime définitivement l’e-mail. Pour déplacer l’e-mail vers les éléments supprimés, utilisez la fonction move().
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

### Étape 9 : Exécuter l’application

1. Sélectionnez Android et la cible comme émulateur ou appareil Android. Veuillez noter que Ripple n’est actuellement pas pris en charge pour l’authentification O365.

![Barre de sélection de plateforme cible](https://github.com/abhikum/mobiledev/blob/gh-pages/O365AppImages/Android%20-%20Run.PNG)

**F5 pour exécuter l’application**

Voir [Déployer et exécuter votre application conçue avec Visual Studio Tools pour Apache Cordova](http://msdn.microsoft.com/en-us/library/dn757049.aspx) pour plus d’informations sur l’exécution de l’application Cordova sur différentes plateformes.


Ce projet a adopté le [Code de conduite Open Source de Microsoft](https://opensource.microsoft.com/codeofconduct/). Pour en savoir plus, reportez-vous à la [FAQ relative au code de conduite](https://opensource.microsoft.com/codeofconduct/faq/) ou contactez [opencode@microsoft.com](mailto:opencode@microsoft.com) pour toute question ou tout commentaire.
