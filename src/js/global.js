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

  // Add anchor id to h2 and h3
  Drupal.behaviors.addAnchor = {
    attach: function(context, settings) {
      function addAnchorToHeading(eleName) {
        $(eleName).each(function() {
          var anchorHeading = $.trim($(this).text());
          var anchorFinalHeading = anchorHeading
            .replace(/\s+/g, '-')
            .toLowerCase();

          $(this).attr('id', anchorFinalHeading);
        });
      }
      // Add heading id identifier
      addAnchorToHeading('h2');
      addAnchorToHeading('h3');

      $('.node--type-audit-report .layout--onecol:last-child h2').each(
        function() {
          $(this).attr('class', 'toc-headings');
        }
      );
      $('.node--type-audit-report .layout--onecol:last-child h3').each(
        function() {
          $(this).attr('class', 'toc-headings');
        }
      );
    }
  };

  // Audit program accordion function
  Drupal.behaviors.auditProgramAccordion = {
    attach: function(context, settings) {
      $('.view-audits .view-content > .views-row .btn.btn-link').click(
        function() {
          var content = $(this)
            .parent()
            .next('div');

          $(this).toggleClass('collapsed');

          if (content.css('display') === 'none') {
            content.slideDown();
          } else {
            content.slideUp();
          }
        }
      );
    }
  };

  // Same height tile
  Drupal.behaviors.sameHeightTile = {
    attach: function(context, settings) {
      var highestDes = 0;
      var fieldDes = $(
        '.node--type-blog-post:not(.node--view-mode-featured-articles-posts) .card-right'
      );
      fieldDes.each(function() {
        if ($(this).height() > highestDes) {
          highestDes = $(this).height();
        }
      });
      fieldDes.height(highestDes);
    }
  };

  // Add index to timeline component
  Drupal.behaviors.timelineIndex = {
    attach: function(context, settings) {
      $('.field--name-field-figure-paragraphs').each(function() {
        if ($(this).find('.paragraph--type--timeline-item').length > 0) {
          $(this)
            .find('.paragraph--type--timeline-item')
            .last()
            .find('.field--name-field-colour-picker')
            .addClass('timeline-timepicker-last')
            .siblings('.field--name-field-text')
            .addClass('timeline-timepicker-text-last');
        }
      });

      $('.field--name-field-colour-picker>div').each(function() {
        var colorClass = $(this).attr('class');
        $(this)
          .parent()
          .siblings('.field--name-field-title')
          .addClass(colorClass);
      });

      // Call svg use external library javascript
      svg4everybody();
    }
  };
})(jQuery, Drupal);
