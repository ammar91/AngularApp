(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('ConfirmDialog', ConfirmDialog);

    ConfirmDialog.$inject = ['$modalInstance'];

    function ConfirmDialog($modalInstance) {
        var confirmDialog = this;

        confirmDialog.close = close;
        confirmDialog.confirm = confirm;

        function close() {
            $modalInstance.dismiss();
        }

        function confirm() {
            $modalInstance.close();
        }
    }
})();
