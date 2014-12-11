angular.module("app365", ["ionic"])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

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

    // Sign-out page
        .state('app.sign-out', {
            url: "/sign-out",
            views: {
                'mainContent': {
                    templateUrl: "app/auth/sign-out.html"
                }
            }
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
    })

    // Unread mail list page
    .state('app.mail.unread', {
        url: "/unread/id:unread",
        views: {
            "tab-unread-mail": {
                templateUrl: "app/mail/mail-list.html"
            }
        }
    })

    // All mail list page
    .state('app.mail.all', {
        url: "/all/id:all",
        views: {
            "tab-all-mail": {
                templateUrl: "app/mail/mail-list.html"
            }
        }
    });

    // Navigate to sign-in page when app starts.
    $urlRouterProvider.otherwise('sign-in');
})