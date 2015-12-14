/**
 *
 * @param instanceId
 * @param container
 * @param pluginHandler {RcmAdminPlugin}
 * @constructor
 */
var RcmVimeoEdit = function (instanceId, container, pluginHandler) {

    var self = this;

    self.instanceConfig = pluginHandler.instanceConfig;

    var ajaxPluginEditHelper = new AjaxPluginEditHelper(instanceId, container, pluginHandler);

    /**
     * initEdit
     */
    self.initEdit = function () {
        pluginHandler.getInstanceConfig(
            function (instanceConfig, defaultInstanceConfig) {
                self.instanceConfig = instanceConfig;
            }
        )
    };

    /**
     *
     * @returns {null|*}
     */
    self.getSaveData = function () {
        return self.instanceConfig;
    };

    /**
     * showEditDialog
     */
    self.showEditDialog = function () {

        var videoIdInput = jQuery.dialogIn(
            'text',
            'Video Id or Video page URL',
            self.instanceConfig.videoId
        );

        $('<form></form>')
            .addClass('simple')
            .append(videoIdInput)
            .dialog(
                {
                    title: 'Properties',
                    modal: true,
                    width: 620,
                    zIndex: 2000000,
                    buttons: {
                        Cancel: function () {
                            $(this).dialog("close");
                        },
                        Ok: function () {

                            self.instanceConfig.videoId = self.parseUrl(videoIdInput.val());

                            $(this).dialog("close");
                        }
                    }
                }
            );
    };

    /**
     *
     * @param url
     * @returns {*}
     */
    self.parseUrl = function(url) {
        var values = url.split("/");

        return values.slice(-1)[0];
    };

    /**
     * attachPropertiesDialog
     */
    ajaxPluginEditHelper.attachPropertiesDialog(
        self.showEditDialog
    );
};
