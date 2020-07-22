(function($) {
  // Audit reports JS
  Drupal.behaviors.auditReport = {
    attach: function(context, settings) {
      var fixedpoint = $('.sidebar').offset().top;

      var $auditToc = $('.audit-toc');
      var $auditTocMobile = $('.audit-toc-mobile');
      var $returnToTop = $('.return-to-top');

      $returnToTop.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
      });

      // Add fix position onload
      if (
        $(window).scrollTop() > $auditToc.offset().top &&
        $(window).scrollTop() > fixedpoint
      ) {
        $auditToc.addClass('fixed');
      } else if ($(window).scrollTop() < fixedpoint) {
        $auditToc.removeClass('fixed');
      }

      $(window).scroll(function() {
        if (
          $(this).scrollTop() > $auditToc.offset().top &&
          $(this).scrollTop() > fixedpoint - 100
        ) {
          $auditToc.addClass('fixed');
        } else if ($(this).scrollTop() < fixedpoint) {
          $auditToc.removeClass('fixed');
        }

        if (
          $(this).scrollTop() > $auditTocMobile.offset().top &&
          $(this).scrollTop() > fixedpoint &&
          $(window).width() < 992
        ) {
          $auditTocMobile.addClass('fixed');
        } else if ($(this).scrollTop() < fixedpoint) {
          $auditTocMobile.removeClass('fixed');
        }

        if ($(this).scrollTop() > 500) {
          $returnToTop.addClass('visible');
        } else {
          $returnToTop.removeClass('visible');
        }

        // TODO: remove content selection and use index for class
        $('.toc-headings').each(function(index, anchor) {
          $currentMenuItem = jQuery(
            '.coc_toc--list li:nth-of-type(' + (index + 1) + ')'
          );

          if ($(window).scrollTop() >= $(this).offset().top - 80) {
            $('.coc_toc--list>li').removeClass('open');
            $('.coc_toc--list>li').removeClass('active');

            $currentMenuItem = jQuery(
              '.coc_toc--list>li:nth-of-type(' + (index + 1) + ')'
            );

            $currentMenuItem.addClass('active');
            if (!$currentMenuItem.hasClass('toc-node-level-1')) {
              expandMenu($currentMenuItem);
            } else if (!$currentMenuItem.next().hasClass('toc-node-level-1')) {
              $currentMenuItem.addClass('expandable');
            }

            $currentMenuItem.nextUntil('.toc-node-level-1').addClass('open');

            var distance =
              $('.coc_toc--list .active').offset().top -
              $('.audit-toc').offset().top;
            var height = $('.audit-toc').height();
            if (distance < 0 || distance > height) {
              $currentMenuItem.get(0).scrollIntoView(true);
            }
          } else {
            return false;
          }
        });

        function expandMenu($menuItem) {
          $menuItem
            .prevUntil('.toc-node-level-1')
            .addBack()
            .prev('.toc-node-level-1')
            .addBack()
            .addClass('open');
        }
      });

      // Smooth scrolling with links
      $('a[href*=\\#]').on('click', function(event) {
        var targetName = this.hash.slice(1);
        // event.preventDefault();
        jQuery('html,body').animate(
          {
            scrollTop: jQuery('#' + targetName).offset().top - 60
          },
          100
        );
      });

      // Add th values to data-key attributes for responsive layouts.
      $('.tablefield-wrapper table, table.qao-table').each(function(
        index,
        $table
      ) {
        $($table)
          .find('th')
          .each(function(i, th) {
            var heading = $(th).text();
            i = i + 1;
            $($table)
              .find('td:nth-of-type(' + i + ')')
              .attr('data-key', heading);
          });
      });

      $('.audit-toc a').on('click', function() {
        if ($('.audit-toc-mobile').hasClass('fixed')) {
          $('.audit-toc').hide();
        }
      });

      $('.toggle').on('click', function() {
        $(this).toggleClass('open');
      });
      // Sticky table header
      $('.paragraph--type--figure .tablefield').floatThead();
    }
  };
})(jQuery);
