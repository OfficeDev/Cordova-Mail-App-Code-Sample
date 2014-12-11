(function () {
    'use strict';

    angular.module('app365').controller('mailCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicPopup', 'app365api', mailCtrl]);

    function mailCtrl($scope, $stateParams, $ionicLoading, $ionicPopup, app365api) {
        var vm = this;
        var outlookClient;

        // Get mail list.
        function getMails() {
            var filterQuery = '';

            // Get all mails flagged as important.
            if (typeof  $stateParams.important != 'undefined') {
                getImpMails();
                return;
            }

            // Get all unread mails.
            if (typeof  $stateParams.unread != 'undefined') {
                filterQuery = 'IsRead eq false';
            }          

            NProgress.start();
            // Fetch Inbox folder
            outlookClient.me.folders.getFolder("Inbox").fetch()
            .then(function (folder) {
                // Fetch mails under Inbox folder with filter.
                folder.messages.getMessages().filter(filterQuery).fetch()
                .then(function (mails) {
                    // Get current page. Use getNextPage() to fetch next set of mails.
                    vm.mails = mails.currentPage;
                    $scope.$apply();
                    NProgress.done();
                });
            });           
        };

        // Get all mails flagged as important.
        function getImpMails() {
            NProgress.start();
            // Filter to fetch all important mails received after 2000-10-20
            var filterQuery = "Importance eq 'High' and DateTimeReceived gt 2000-10-20";
            outlookClient.me.folders.getFolder("Inbox").fetch()
            .then(function (folder) {
                // Fetch all important mails sorted by DateTimeReceived.
                folder.messages.getMessages().filter(filterQuery).orderBy('Importance,DateTimeReceived desc').fetch()
                .then(function (mails) {
                    // Get current page. Use getNextPage() to fetch next set of mails.
                    vm.mails = mails.currentPage;
                    $scope.$apply();
                    NProgress.done();
                }, function (error) {
                    console.log("Error encountered while fetching mails. Error: " + error.message);
                });
            }, function (error) {
                console.log("Error encountered while fetching inbox folder. Error: " + error.message);
            });
        };

        // Delete mail
        $scope.deletemail = function (mail) {
            // Ionic pop-up to confirm delete action.
            var confirmPopup = $ionicPopup.confirm({
                title: 'Mail App',
                template: 'Are you sure you want to delete the mail?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    // Fetch the mail with specified mail id.
                    outlookClient.me.folders.getFolder("Inbox").messages.getMessage(mail.id).fetch()
                    .then(function (mail) {
                        // Delete the mail.
                        mail.delete()
                        .then((function (response) {
                            // Show the message indicating mail was deleted successfully.
                            $ionicLoading.show({ template: 'Message deleted successfully !!', noBackdrop: true, duration: 1000 });
                            // Refresh the mail list.
                            getMails();
                        }), function (error) {
                            // Log the error message when error is encountered while deleting the mail.
                            console.log('fail to delete mail. Error = ' + error.message);
                            $ionicLoading.show({
                                template: 'Failed to delete message. Error: ' + error.message
                                , noBackdrop: true, duration: 1500
                            });
                        });
                    });
                } else {
                    // do nothing when user cancel on delete confirmation dialog.                      
                }
            });              
        };

        vm.loadList = function () {
            // Get the Outlook client object.
            outlookClient = app365api.exchangeClientObj();
            // Get mails.
            getMails();

        };

        vm.loadList();
    }
})();