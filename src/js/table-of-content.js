// Audit report table of content menu
(function($, _, Backbone, Drupal) {
  Drupal.behaviors.toc = {
    attach: function attach(context, settings) {
      // Move table of content
      $('.sidebar').prependTo($('.layout--onecol:last-child'));

      // mobile toggle click
      $('.audit-toc-mobile').click(function() {
        $('.audit-toc').toggle();
      });

      titles = [];

      $('.toc-headings').each(function(key, obj) {
        var id = obj.innerText.replace(/\s+/g, '-').toLowerCase();

        var ifFirstLevel = $(this)
          .parent()
          .hasClass('field--name-field-heading');
        if (
          !$(this)
            .parent()
            .hasClass('field--name-field-overview-text')
        ) {
          if ($(this).attr('id') == 'appendices') {
            ifFirstLevel = true;
          }
          var item = {
            title: obj.innerText,
            link: '#' + id,
            level: ifFirstLevel ? 'toc-node-level-1' : 'toc-node-level-2'
          };
          // Already added id identifier from global js
          // $(obj).attr('id', id);
          titles.push(item);
        }
      });

      var TableOfContentsView = Backbone.View.extend({
        items: [],

        initialize: function(attrs) {
          this.items = attrs.items;
          this.render();
        },

        render: function() {
          var template = _.template(
            "<ul class='coc_toc--list'><%_.each(items, function(item){ if(item.title.length > 2){%>" +
              "<li class='<%= item.level %>'><a href='<%= item.link %>'><%= item.title %></a><% }}) %></li>" +
              '</ul>'
          );
          this.$el.prepend(template({ items: this.items }));
        }
      });

      var tocView = new TableOfContentsView({
        el: $('.audit-toc'),
        items: titles
      });
    }
  };
})(jQuery, _, Backbone, Drupal);
