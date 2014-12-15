(function () {
    'use strict';

    angular.module('app365').controller('mailDetailCtrl', ['$scope', '$stateParams', 'app365api', mailDetailCtrl]);

    function mailDetailCtrl($scope, $stateParams, app365api) {
        var vm = this;

        // Get mail detail.
        vm.getMail = function () {
            // Get Outlook client object.
            var outlookClient = app365api.exchangeClientObj();
            NProgress.start();

            // Fetch Inbox folder
            outlookClient.me.folders.getFolder("Inbox").messages.getMessage($stateParams.id).fetch()           
                .then(function (mail) {
                    // Mail subject
                    vm.subject = mail.subject;
                    // Mail received date
                    vm.dateTimeReceived = mail.dateTimeReceived;
                    // Mail body text preview
                    vm.bodyPreview = mail.bodyPreview;
                    // From email address
                    vm.from = mail.from.emailAddress.name;
                    // List of mail To recipients
                    var toRecipients;
                    mail.toRecipients.forEach(function (toRecipient) {
                        if (typeof toRecipients == 'undefined') {
                            toRecipients = toRecipient.emailAddress.name
                        } else {
                            toRecipients += "," + toRecipient.emailAddress.name;
                        }
                    });

                    vm.toRecipients = toRecipients;
                    $scope.$apply();
                    NProgress.done();
                });                      
        };       

        vm.getMail();
    }
})();