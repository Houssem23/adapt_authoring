define(function(require) {

	var Origin = require('coreJS/app/origin');
  var OriginView = require('coreJS/app/views/originView');
  var EditorContentObjectModel = require('coreJS/editor/models/editorContentObjectModel');

  var EditorMenuLayerView = OriginView.extend({

      className: 'editor-menu-layer',

  		preRender: function(options) {
        if (options._parentId) {
          this._parentId = options._parentId;
        }
  		},

      events: {
        'click .editor-menu-layer-add': 'addMenuItem'
      },

  		postRender: function() {

  		},

      addMenuItem: function() {
        console.log('add menu item');
        event.preventDefault();

        new EditorContentObjectModel({
          _parentId: this._parentId,
          _courseId: Origin.editor.course.get('_id'),
          title: 'Placeholder title',
          body: 'Placeholder body text',
          linkText: 'test',
          graphic: {
            alt: 'test',
            src: 'test'
          },
          _type: 'page',
          tenantId: 'noidyet'
        }).save(null, {
          error: function() {
            alert('An error occurred doing the save');
          },
          success: function(model) {
            console.log('saved');
            Origin.trigger('editor:fetchData');
            Origin.trigger('editorSidebar:addEditView', model);
            //Backbone.history.navigate('#/editor/' + Origin.editor.course.get('_id')+ '/page/' + newPage.get('_id'), {trigger: true});
          }
        });


        /*var newPage = new EditorContentObjectModel();

        newPage.save({
          _parentId: Origin.editor.course.get('_id'),
          _courseId: Origin.editor.course.get('_id'),
          title: 'Placeholder title',
          body: 'Placeholder body text',
          linkText: 'test',
          graphic: {
            alt: 'test',
            src: 'test'
          },
          _type: 'page',
          tenantId: 'noidyet'},
          {
            error: function() {
              alert('An error occurred doing the save');
            },
            success: function(model) {
              Backbone.history.navigate('#/editor/' + Origin.editor.course.get('_id')+ '/page/' + newPage.get('_id'), {trigger: true});
            }
          }
        );*/
      }

  	}, {
  		template: 'editorMenuLayer'
  });

  return EditorMenuLayerView;

});