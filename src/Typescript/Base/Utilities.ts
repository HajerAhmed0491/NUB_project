//======> Import Tornado UI Helpers <=======//
import Tornado from './Tornado';
import DataTable from './DataTable';

/**======> Referance By Comment <======
 * ===> 01 - Item Remover
 * ===> 02 - Dynamic Backgrounds
 * ===> 03 - Images lazyLoading
 * ===> 04 - Sticky Elements
 * ===> 05 - Responsive Tooltips
 * ===> 06 - Animated Counters
 * ===> 07 - ViewPort Detactor
 * ===> 08 - Activate Smoth Scroll
 * ===> 09 - Activate Scroll Spy
 * ===> 10 - Activate Date Counter
 * ===> 11 - Activate Dropdown Buttons
 * ===> 12 - Activate Data Tables
 * ===> 13 - Activate Tabs
 * ===> 14 - Activate Accordion 
 * ===> 15 - Activate Dropdowns
 * ===> 16 - Activate Popups
*/

document.addEventListener('DOMContentLoaded', domReady => {
    //======> Remove ITem Access <======//
    Tornado.getElements('.remove-item')?.forEach(element => {
        //=====> Accessibility <=====//
        Tornado.setAttributes(element,{
            "tabindex":0,
            "role":"button",
            "aria-pressed":"false",
        });
    });

    //======> Item Remover <======//
    Tornado.liveEvent('.remove-item', 'click', event => {
        event.preventDefault();
        var thisButton = event.target; //===> for Fewer Linter Warnings
        //=== Remove Specific Target by ID ===//
        if (thisButton.hasAttribute('data-target')) {
            //=== Get Target ID ===//
            var target = thisButton.getAttribute('data-target');
            //=== Remove the Target ===//
            Tornado.getElement('#' + target).remove();
        } else if (thisButton.hasAttribute('data-tag')) {
            //=== Get the Targeted HTML Tag ===//
            var parentTag = thisButton.getAttribute('data-closest');
            //=== Remove the Target ===//
            thisButton.closest(parentTag).remove();
        } else {
            //=== Remove Direct Parent ===//
            thisButton.parentNode.remove();
        }
    });

    //====> Dynamic Backgrounds <====//
    Tornado.setBackground('[data-src]',true);

    //====> Images lazyLoading <====//
    Tornado.lazyLoading('[data-lazyload]');

    //====> Sticky Elements <====//
    Tornado.sticky('[data-sticky]');

    //======> Animated Counters <======//
    Tornado.getElements('[data-counter]').forEach(element => {
        function animateNumbers () {
            if (Tornado.inView(element)) {
                if(!element.classList.contains('counted')) {
                    //====== Animate on Load =====//
                    Tornado.counter ({
                        element: element,
                        steps: 10,
                        duration:2000,
                    });
                }

                element.classList.add('counted');
            }
        }

        animateNumbers();
        //====> Reanimate When its Visible <======//
        window.addEventListener('scroll', event => animateNumbers());
    });

    //======> ViewPort Detactor <======//
    Tornado.getElements('.view-status').forEach(element => {
        var animName = element.getAttribute('data-animation'),
            animDelay = element.getAttribute('data-delay') || 0,
            animDuration = element.getAttribute('data-duration') || 1000;
        //=====> Activate View <=====//
        function activateView() {
            if (Tornado.inView(element)) {
                //====> Activate the Element <=====//
                element.classList.add('view-active');
                //====> Add CSS Animation <=====//
                if (animName) element.style.animationName = animName;
                if (animDuration) element.style.animationDuration = animDuration;
                if (animDelay) element.style.animationDelay = animDelay;
            }
        }
        //====> Activate While Scroll
        window.addEventListener('scroll', event => activateView());
    });

    //====> Activate Smoth Scroll <====//
    Tornado.smothScroll({
        selector : '.smoth-scroll',
        duration : 1500,
    });

    //====> Activate Scroll Spy <====//
    Tornado.scrollSpy({
        selector : '.scrollspy',
        duration : 1500,
    });

    //====> Activate Date Counter <====//
    Tornado.dateCounter({selector : '.date-counter'});

    //====> Activate Data Tables <====//
    DataTable('.data-table');
    
    //====> Activate Tabs <====//
    Tornado.tabs('.tabs-menu [data-tab]');

    //====> Activate Accordion <====//
    Tornado.accordion('.accordion-item .accordion-title');

    //====> Activate Dropdowns <====//
    Tornado.dropdown('.dropdown .dropdown-btn');

    //====> Activate Popups <====//
    Tornado.popup('.modal-box');

    //====> Activate Lightbox <====//
    Tornado.lightbox('[data-lightbox]');
});
