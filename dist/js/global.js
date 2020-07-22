/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {
  'use strict';

  Drupal.behaviors.qao = {
    attach: function(context, settings) {}
  };

  // Header responsive Search box
  Drupal.behaviors.menuSearch = {
    attach: function(context, settings) {
      $('.region-header-form button.search-toggle').click(function(e) {
        $(this)
          .siblings('.js-form-submit')
          .toggle();
        $(this)
          .parent()
          .siblings('fieldset.js-form-type-search')
          .toggle();
        $(this)
          .parentsUntil('.navbar-collapse')
          .siblings('.menu--main')
          .toggle();
        $(this)
          .children('i')
          .toggleClass('fa fa-times');
        return false;
      });

      $('.region-header-form .form-search').keypress(function(e) {
        if (e.which == 13) {
          $('form#search-block-form').submit();
          return false;
        }
      });

      $(document).keyup(function(e) {
        if (e.key === 'Escape') {
          $('.region-header-form .js-form-type-search').hide();
          $('.navbar-collapse')
            .children('.menu--main')
            .show();
          $('.region-header-form .js-form-wrapper .js-form-submit').hide();
          $('.region-header-form .js-form-wrapper .search-toggle')
            .children('i')
            .removeClass('fa fa-times');
        }
      });
    }
  };

  // Sub menu
  Drupal.behaviors.subMenu = {
    attach: function(context, settings) {
      $('.menu-item--expanded').each(function() {
        $(this).hover(
          function() {
            $(this).addClass('js-open');
          },
          function() {
            $(this).removeClass('js-open');
          }
        );
      });
      $('.menu-item--expanded>.dropdown-menu').each(function() {
        $(this).hover(
          function() {
            $(this)
              .parent()
              .addClass('js-open');
          },
          function() {
            $(this)
              .parent()
              .removeClass('js-open');
          }
        );
      });
    }
  };

  // Mobile menu
  Drupal.behaviors.mobileMenu = {
    attach: function(context, settings) {
      // Submenu toggle display
      $('.menu-item--expanded .toggle').each(function() {
        $(this).click(function() {
          $(this)
            .parent()
            .toggleClass('js-open');
        });
        $(this)
          .siblings('.nav-link')
          .click(function() {
            window.open($(this).attr('href'), '_self');
          });
      });
    }
  };
})(jQuery, Drupal);

//# sourceMappingURL=global.js.map
