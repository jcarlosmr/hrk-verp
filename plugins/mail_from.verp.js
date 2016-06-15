// mail_from.verp

// documentation via: haraka -c /home/jmendoza/Programacion/hrk-mta -h plugins/mail_from.verp

// Put your plugin code here
// type: `haraka -h Plugins` for documentation on how to create a plugin
exports.register = function() {
    var plugin = this;
    plugin.load_verp_domain_ini();
    plugin.register_hook('data_post', 'set_verp_mail_from');
};

exports.set_verp_mail_from = function (next, connection) {
    var transaction = connection.transaction;
    var verp = ("" + transaction.uuid + "-RJ-" + transaction.rcpt_to).replace(/@/,"=").replace(/>/,"").replace(/</,"") + '@' + this.cfg.rpdomain.server;
    transaction.mail_from = verp;
    this.loginfo("Writing Mail-From: " + transaction.mail_from);
    next();
};

exports.load_verp_domain_ini = function () {
    var plugin = this;
    plugin.cfg = plugin.config.get('verp_domain.ini', function () {
        plugin.load_bounce_ini();
    });
};
/*
exports.load_bounce_ini = function () {
    var plugin = this;
    plugin.cfg = plugin.config.get('bounce.ini', {
        booleans: [
            '-check.reject_all',
            '+check.single_recipient',
            '-check.empty_return_path',
            '+check.bad_rcpt',
            '+check.bounce_spf',
            '+check.non_local_msgid',

            '+reject.single_recipient',
            '-reject.empty_return_path',
            '-reject.bounce_spf',
            '-reject.non_local_msgid',
        ],
    }, function () {
        plugin.load_bounce_ini();
    });

    // Legacy config handling
    if (plugin.cfg.main.reject_invalid) {
        plugin.logerror("bounce.ini is out of date, please update!");
        plugin.cfg.check.single_recipient=true;
        plugin.cfg.reject.single_recipient=true;
    }

    if (plugin.cfg.main.reject_all) {
        plugin.logerror("bounce.ini is out of date, please update!");
        plugin.cfg.check.reject_all=true;
    }
};
*/
