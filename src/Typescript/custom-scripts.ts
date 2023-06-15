//======> Tornado UI Core Base <=======//
import './Base/Tornado';
import Tornado from './Base/Tornado';

document.addEventListener('DOMContentLoaded', DReady => {
    /*===> Sidemenu Submenus Class <===*/
    Tornado.getElements('.header-side > ul li ul').forEach(SideSubMenu => {
        var parentElement = SideSubMenu.parentNode as HTMLElement
        parentElement.classList.add('submenu');
    });

    /*===> Sidemenu Submenus Toggle <===*/
    Tornado.getElements('.header-side li.submenu > a').forEach(SideDropdown => {
        //===== Toggle Active Class =====//
        SideDropdown.addEventListener('click', function (event) {
            event.preventDefault();
            var dropDown =  SideDropdown.parentNode.querySelector('ul'),
                parentElement = SideDropdown.parentNode as HTMLElement;
            //====== Toggle Active ======//
            Tornado.slideToggle(dropDown,300);
            parentElement.classList.toggle('active');

            //==== Close Siblings Panels ====//
            var parentSiblings = Tornado.getSiblings({element:SideDropdown.parentNode});

            Array.from(parentSiblings).forEach(function (sibling:any) {
                var siblingPanel = sibling.querySelector('ul');
                //==== Close Other Activated Siblings ====//
                sibling.classList.remove('active');
                //==== Close Siblings Panels ====//
                Tornado.slideUp(siblingPanel,300);
            });
        });
    });

    //===> Side Toggle <===//
    Tornado.getElement('.side-toggle')?.addEventListener('click', event => {
        event.preventDefault();
        var siteWraper = Tornado.getElement('.site-wraper').classList;
        if(siteWraper.contains('closed-side')) {
            siteWraper.add('opened-side');
            siteWraper.remove('closed-side');
        } else if (Tornado.viewport.width() < 1100) {
            siteWraper.add('closed-side');
            siteWraper.toggle('opened-side');
            siteWraper.toggle('closed-side');
        } else {
            siteWraper.remove('opened-side');
            siteWraper.add('closed-side');
        }
    });

    //====> Hero Slider <====//
    Tornado.slider('.image-slider', {
        animation : 'gallery',
    });

    //====> Print Table <====//
    Tornado.getElements('.print-table').forEach(btn => {
        btn.addEventListener('click', event => {
            var tableId = btn.getAttribute('data-print'),
                printing = Tornado.getElement(`#${tableId}`),
                printingData = printing.innerHTML;

            var newWindow = window.open();
            newWindow.document.write(
                `<style>
                    *{direction:${Tornado.direction('page')};}
                    table {
                        border-collapse: separate;
                        border-spacing: 0;
                        font-size:15px;
                    }
                    table td {
                        padding:10px 15px;
                        border:1px solid rgba(0,0,0, 0.1);
                    }
                    table th {
                        background:#4FB3FF;
                        color:#FFF;
                        padding:10px 15px;
                        border:1px solid rgba(0,0,0, 0.1);
                    }
                </style>
                ${printingData}
                `
            );
            newWindow.print()
            newWindow.close();
        });
    });

    //====> Steps Handler <====//
    Tornado.getElements('.steps-form')?.forEach(element => {
        var firstStep = element.querySelector('.steps-list li:first-child');
        firstStep?.classList.add('active');

        //====> Next Button <=====//
        element.querySelector('.next-step')?.addEventListener('click',event => {
            var currentStep = element.querySelector('.steps-list li.active'),
                nextStep = Tornado.getNextSibling({element : currentStep,filter : 'li'});
            if(nextStep) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            } else {
                element.submit();
            }
        });

        //====> Previos Button <=====//
        element.querySelector('.prev-step')?.addEventListener('click',event => {
            var currentStep = element.querySelector('.steps-list .active'),
                prevStep = Tornado.getPrevSibling({element : currentStep,filter : 'li'});
            if (prevStep) {
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
            }
        }) 
    });

    //====> Test Handler <====//
    Tornado.getElements('.test-play-btn')?.forEach(element => {
        element.addEventListener('click', event => {
            //====> Show the Quizz <====//
            event.preventDefault();
            var quizzBlock = Tornado.getElement('.quizz-block'),
                firstQuession = quizzBlock.querySelector('.quessions li:first-child');
                
            Tornado.getElement('.quizz-block').style.display = "block";
            
            //====> Timer Function <====//
            function startTimer(duration:any, display) {
                //====> Timer Data <====//
                var timer:number = duration,
                    minutes:any = timer / 60,
                    seconds:any = timer % 60;
                //====> Counter Down <====//
                return setInterval(() => {
                    minutes = timer / 60;
                    seconds = timer % 60;
                    //====> Convert Duraction <====//
                    minutes = parseInt(minutes, 10);
                    seconds = parseInt(seconds, 10);
                    //====> Convert Duraction <====//
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;
                    //====> Convert Duraction <====//
                    display.textContent = minutes + ":" + seconds;
                    if (--timer < 0) timer = duration;
                }, 1000);
            }
            
            //====> First Quession Timer <====///
            firstQuession.classList.add('active');
            var TimerClc = startTimer(firstQuession.getAttribute('data-timer'), Tornado.getElement('.quizz-block .timer'));
            
            //====> Next Button <=====//
            quizzBlock.querySelector('.next-quession').addEventListener('click',event => {
                var currentQ = quizzBlock.querySelector('.quessions li.active'),
                    nextq = Tornado.getNextSibling({element : currentQ,filter : 'li'});
                if(nextq) {
                    currentQ.classList.remove('active');
                    nextq.classList.add('active');
                    clearInterval(TimerClc);
                    TimerClc = startTimer(nextq.getAttribute('data-timer'), Tornado.getElement('.quizz-block .timer'));
                }
            });

            //====> Previos Button <=====//
            quizzBlock.querySelector('.prev-quession').addEventListener('click',event => {
                var currentQ = quizzBlock.querySelector('.quessions .active'),
                    prevQ = Tornado.getPrevSibling({element : currentQ,filter : 'li'});
                if (prevQ) {
                    currentQ.classList.remove('active');
                    prevQ.classList.add('active');
                    clearInterval(TimerClc);
                    TimerClc = startTimer(prevQ.getAttribute('data-timer'), Tornado.getElement('.quizz-block .timer'));
                }
            });
        });
    });

    //====> News Slider <====//
    Tornado.slider('.news-slider', {
        flow : "vertical",
        controls : false,
        uniuqClass:'news-slider-outer'
    });

    //====> Play Video in new Window <====//  
    Tornado.getElements('.video-in-window').forEach(element => {
        element.addEventListener('click',event => {
            event.preventDefault();
            var videoUrl = element.getAttribute('data-video'),
                video = `<video src="${videoUrl}" style="width:100%" autoplay="true" controls></video>`,
                newWindow = window.open('_blank', 'play', 'height="100vh", width="100vw" ,scrollbars=auto, resizable=no, location=no, status=no');
            newWindow.document.write(video);
            newWindow.document.close();
        });
    });

    //====> Backgrounds Slider <====//
    Tornado.slider('.bg-slider', {
        animation : 'gallery',
        controls : false,
        duration    : 5000,
        uniuqClass:'bg-slider-outer'
    });
});