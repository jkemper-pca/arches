define([
    'jquery',
    'underscore',
    'backbone',
    'knockout',
    'moment',
    'arches',
    'viewmodels/alert',
    'bindings/scrollTo',
    'bootstrap'
], function($, _, Backbone, ko, moment, arches,  AlertViewModel) {
    /**
    * A backbone view representing a basic page in arches.  It sets up the
    * viewModel defaults, optionally accepts additional view model data and
    * binds the view model to the entire page.  When using, no other views
    * should bind data to the DOM.
    *
    * @augments Backbone.View
    * @constructor
    * @name PageView
    */
    var PageView = Backbone.View.extend({
        el: $('body'),

        /**
        * Creates an instance of PageView, optionally using a passed in view
        * model
        *
        * @memberof PageView.prototype
        * @param {object} options
        * @param {object} options.viewModel - an optional view model to be
        *                 bound to the page
        * @return {object} an instance of PageView
        */
        constructor: function (options) {
            var self = this;
            this.viewModel = (options && options.viewModel) ? options.viewModel : {};

            _.defaults(this.viewModel, {
                alert: ko.observable(null),
                loading: ko.observable(false),
                helploaded: ko.observable(false),
                helploading: ko.observable(false),
                showTabs: ko.observable(false),
                tabsActive: ko.observable(false),
                menuActive: ko.observable(false),
                recentsActive: ko.observable(false),
                dirty: ko.observable(false),
                showConfirmNav: ko.observable(false),
                navDestination: ko.observable(''),
                provisionalEdits: ko.observableArray(),
                urls: arches.urls,
                navigate: function(url, bypass) {
                    if (!bypass && self.viewModel.dirty()) {
                        self.viewModel.navDestination(url);
                        self.viewModel.alert(new AlertViewModel('ep-alert-blue', arches.confirmNav.title, arches.confirmNav.text, function(){
                            self.viewModel.showConfirmNav(false);
                        }, function() {
                            self.viewModel.navigate(self.viewModel.navDestination(), true);
                        }));
                        return;
                    }
                    self.viewModel.alert(null)
                    self.viewModel.loading(true);
                    window.location = url;
                },
                getHelp: function(template) {
                    if (!self.viewModel.helploaded()) {
                        self.viewModel.helploading(true);
                        var el = $('.ep-help-content');
                        $.ajax({
                            type: "GET",
                            url: arches.urls.help_template,
                            data: {'template': template},
                            success : function(data) {
                                el.html(data);
                                self.viewModel.helploaded(true);
                                self.viewModel.helploading(false);
                                $('.ep-help-topic-toggle').click(function () {
                                    var sectionEl = $(this).closest('div');
                                    contentEl = $(sectionEl).find('.ep-help-topic-content').first();
                                    contentEl.slideToggle();
                                });
                                $('.reloadable-img').click(function(){
                                    $(this).attr('src', $(this).attr('src'));
                                });
                            }
                        });
                    }
                },
                getProvisionalHistory: function() {
                    self.viewModel.helploading(true);
                    self.viewModel.provisionalEdits.removeAll();
                    $.ajax({
                        type: 'GET',
                        url: arches.urls.tile_history
                    }).done(function(data) {
                        self.viewModel.helploaded(true);
                        self.viewModel.helploading(false);
                        self.viewModel.provisionalEdits(_.map(data, function(edit) {
                            edit.displaytime = moment(edit.lasttimestamp).format('DD-MM-YYYY hh:mm a');
                            return edit;
                        }));
                    });
                }
            });

            window.addEventListener('beforeunload', function(event) {
                self.viewModel.loading(true);
            });

            Backbone.View.apply(this, arguments);
            return this;
        },

        initialize: function(options) {
            ko.applyBindings(this.viewModel);
            $('[data-toggle="tooltip"]').tooltip();

            $('.ep-help-toggle').click(function (){
                $('#ep-help-panel').toggle('slide', { direction: 'right' });
            });

            $('.ep-edits-toggle').click(function (){
                $('#ep-edits-panel').toggle('slide', { direction: 'right' });
            });
        }
    });
    return PageView;
});
