// const c = console.log.bind(document);  
 

class Modale {
    display() {
        if (this.checkDisplay()) {
            this.addStyle(); 
            this.HTMLTemplate(); 
            this.setEventListeners(); 
        }
    }

    checkDisplay() {
        let savedInfo = localStorage.getItem('closed-modale-sdis'); 
        return savedInfo === null; 
    }

    addStyle() {
        //. . .
        let style = document.createElement('style'); 
        style.id = "modale_style"; 
        let randomColors = ['#FFB300', '#1E88E5', '#E91E63', '#00897B']; 
        let mainColor = '#142269'; 
        style.textContent = `
            .modale_container {
                z-index: 5; 
                width: 100vw; 
                height: 100vh; 
                position: fixed; 
                display: flex;
                justify-content: center;
                align-items: center; 
            }
            .modale_background {
                background: rgba(0,0,0,.4); 
                width: 100%;
                height: 100vh; 
            }
            .modale_content {
                background-color: ${mainColor}; 
                box-shadow: 12px 12px 48px 0px #00000052; 
                color: #fff; 
                position: fixed;
                width: 95%;
                max-width: 840px; 
                margin: auto;
                border-radius: 12px; 
                display: flex; 
                flex-direction: column; 
                background-image: url('${ PATH }/assets/images/modale-bg.png');
                background-size: cover; 
            }
            .modale_content button#modale_close {
                background: #fff;
                color: ${mainColor};
                border-radius: 0 12px 0 12px;
                width: 36px;
                height: 36px;
                align-self: flex-end;
                position: relative;
                bottom: 9px;
                left: 9px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0;
            }

            .text-container h2 {
                font-weight: normal;
                position: relative;
                left: 72px;
                top: 7px; 
            }

            .modale_content .accroche {
                
                padding: 2em;
                font-weight: 300;
                font-size: 1.125em; 
                clip-path: path('M 0 0 h 69 v 10 h 280 v -10 h 475 v 429 h -820 z');
            }
            
            @media screen and (min-width: 680px) {
                .modale_content .accroche {
                    padding-left: 50%;
                }
            }


            .modale_content .bottom-line {
                display: flex; 
                padding: 2em;
            }
            @media screen and (max-width: 720px) {
                .modale_content .bottom-line {
                    flex-direction: column; 
                }
                .check-case__container {
                    margin-bottom: 1em; 
                }
            }


            input#checkbox {
                display: inline;
                width: auto;
            }

            

            .modale_content .cta-container a, .modale_content .cta-container button {
                color: white; 
                width: 168px; 
                border-radius: 9px;
                display: block;
                text-align: center;
                font-size: 18px;
                padding: 3px; 
                transition: all ease-in-out 320ms;
                border: solid white 1px;
                margin: 0 9px;
            }
            .modale_content .cta-container a:hover, .modale_content .cta-container button:hover {
                background-color: #fff; 
                color: ${mainColor}; 
            }

            .modale_content .cta-container .btn-main {
                color: ${mainColor}; 
                background: #fff; 
            }
            .modale_content .cta-container .btn-main:hover {
                background-color: #ffc434; 
            }

            .modale_container .features-container {
                display: grid; 
                grid-template-row: repeat(2, 1fr); 
                grid-template-columns: repeat(1, 1fr); 
                gap: 1em; 
            }
            .feature__item { 
                box-shadow: 4px 4px 16px rgba(0,0,0,.25); 
                border-radius: 6px; 
                padding: 1em; 
                display: flex;
                align-items: center; 
            }

            @media screen and (min-width: 540px) {
                .modale_container .features-container {
                    grid-template-columns: repeat(2, 1fr);
                }
                .feature__item { 
                    height: 78px; 
                }
            }

            @media screen and (min-width: 620px) {
                .modale_container .features-container {
                    grid-template-columns: repeat(7, 1fr);
                    gap: 2em;
                }

                .modale_container .item--1 {
                    grid-column: 1 / span 3; 
                }
                .modale_container .item--2 {
                    grid-column: 4 / span 3; 
                }
                .modale_container .item--3 {
                    grid-column: 2 / span 3; 
                }
                .modale_container .item--4 {
                    grid-column: 5 / span 3; 
                }
            }
            
            

            .feature__item .ico {
                width: 42px; 
                margin-right: 1em;
                mix-blend-mode: overlay;
            }

            .feature__item img {
                width: 100%; 
            }


            @media screen and (min-width: 490px) {
                .modale_content .accroche {
                    border: solid 1px white;
                    border-left: none;
                    border-bottom: none; 
                    margin-right: 36px;
                }
                .modale_content .features-container {
                    border: solid white 1px;
                    border-right: none;
                    margin-left: 36px;
                    margin-right: 36px;
                    margin-bottom: 1em; 
                    padding: 2em;
                }
                .modale_content .cta-container {
                    margin-left: auto; 
                    display: flex; 
                }
            }

            @media screen and (max-width: 490px) {
                .text-container h2 {
                    position: static; 
                    border-bottom: solid #fff 1px; 
                    margin-bottom: 1em;
                    padding: 12px; 
                }
                .modale_content .cta-container a, .modale_content .cta-container button {
                    width: 100%; 
                    margin: 12px 0; 
                }
                .modale_content .accroche {
                    font-size: 16px;
                    padding: 12px; 
                }
                .modale_container .features-container {
                    gap: 0; 
                    font-size: 16px;
                }
            }



            @media screen and (max-width: 599px) {
                .accroche {
                    border: none; 
                    margin: 0; 
                }
                .ico {
                    display: none; 
                }
            }
            
            `; 
        document.head.appendChild(style); 
         
    }

    HTMLTemplate() {
        let modaleHTML = `<div class="modale_container">
            <div class="modale_content">
                <button id="modale_close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                <div class="text-container">
                    <h2>Nouvelle plateforme SUAP</h2>
                    <p class="accroche">Votre plateforme de consultation des formations SUAP tome 1 (<em>Théorie</em>) et tome 2 (<em>Fiches pratiques</em>) évolue</p>
                    <div class="features-container">
                        <div class="feature__item item--1">
                            <div class="ico">${this.icons().search}</div>
                            <div class="txt">Recherche globale et navigation facilitée</div>
                        </div>
                        <div class="feature__item item--2">
                            <div class="ico">${this.icons().responsive}</div>
                            <div class="txt">Mise en page optimisée mobile et tablette</div>
                        </div>
                        <div class="feature__item item--3">
                            <div class="ico">${this.icons().offline}</div>
                            <div class="txt">Utilisation en mode<br/>hors-ligne</div>
                        </div>
                        <div class="feature__item item--4">
                            <div class="ico">${this.icons().install}</div>
                            <div class="txt">Installation directe sur votre appareil</div>
                        </div>
                    </div>
                </div>
                <div class="bottom-line">
                    <div class="check-case__container">
                        <input type="checkbox" id="checkbox">
                        <label><em>Ne plus afficher ce message</em></label>
                    </div>
                    <div class="cta-container">
                        <a class="cta-btn btn-secondary" href="./installation">Installer</a>
                        <button class="cta-btn btn-main" id="cta-ok" style="margin-right: 0; ">Compris</button>
                    </div>
                </div>
            </div>

            <div class="modale_background"></div>
        </div>`; 
        document.querySelector('body').insertAdjacentHTML('afterbegin', modaleHTML); 
    }

    setEventListeners() {
        const fadeOut = (elts, delay) => {
            elts.forEach(elt => {
                elt.style.transition = "opacity ease 420ms"; 
                elt.style.opacity = 0; 
                setTimeout(() => {
                    elt.remove(); 
                }, 420); 
            })
        }
        const removeAllThat = () => {
            if (document.querySelector('#checkbox').checked) {
                localStorage.setItem('closed-modale-sdis', Date.now()); 
            }
            // document.querySelector(".modale_container").remove(); 
            // document.querySelector("#modale_style").remove();
            fadeOut([document.querySelector(".modale_container"), document.querySelector("#modale_style")]); 
        }
        document.querySelector('#cta-ok').addEventListener('click', event => {
            removeAllThat(); 
        })
        document.querySelector('#modale_close').addEventListener('click', event => {
            removeAllThat(); 
        })
        document.querySelector('.modale_background').addEventListener('click', event => {
            removeAllThat(); 
        })

    }


    icons() {
        return {
            search: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFG0lEQVRogc2ZXYiUVRjHf/POjKvbqluafZBZaYFJSSmBdaGZQnVRF0V4U0HZhVBttReVkBQmVERQJH0ZRUVBG91VIuUqlVJCH7RdlNnXRqurpauzu+3X/Lt4zjTDzntmzjszO/aHwzsz57zPeZ7zfJ9JSQJIARcBdwPXAu3ABCDqxxbgeSACMsBoA2j+h4x73gBsA+Y2kjh2ADPd5zOAW4FuYF+jNoiwk3+NxjMPJkDefZ4ArgdeAs5t1AYR0AGc2iiCFTABHAEuA14F5jeCaISdSrOQcs81mNYX1kswAk6pl0iNuAbTxAX1EIko2ujJwErMJ2o2p4jGhMp6sAZ4kxqFiBrLS9W9ZnnmVgI7gMuTEs1UX9Iw5IBngQ+B8Zj5mUAb5ujBVtEMAcbccxj4AL/ZpoC0Z86LqTahCLgSaMGYq+RzwnJFIp5SkvqAM+tgshomgB6gn+rMRcBnwKZQ4s0woTSwNMH6kSTEKwnwlxupCmuqoQ04K+E7w0kW+wT4FdgI7MZOsBYhBCwCXsQKxlC0JtnEJ8AXwDtJCHnQC2zHL8AA0AcMYQK3AAeTbOATYDmwHviB+kyoHVgb8/s+YA/wOXAAOIGVNK3E5wgvKkWhIeAwJkCtJjQLE6KAfuAF4G3gxxpolqGSE7cCCxqxicPXwP2YXxUwDViM9SMRpoleEpiRT4A88A2m3ogwDeSB6cAqLPqU4jtgHcVTbwVuB27Girjpbo9RzC8+AV4G9lfdVVKfyrFL0hJJp0mak2DMk7RJ0mAJrUFJKyThxmJJH0k6EbNvAROSeiTdUvJe7PBpIAf85p5J8SfFHkPAk8Be9/1i4C2srayECFgCbMX8aJtvoc+JR7HCay/hTjzm6KwDznHv/OSYzQFnY3X/6gBapfgFuBO7zSiHx4QahaedqlOSbquDTpekGUpgQmDxeIjwECosKBQyaR54z32eC2wIpBOHZZgm90ye8AkwALxB0XZDhBgHTsfUvRS7QvnZzbUDlwSzW47zseQaLMDHwL01bnYYuzIZpniNOJv6bz8WEdOt+QSYj/WpvxPeYAjIAisc3XzJZtmEzMYhloZPgCuA14E/SJbIWjDzybqRdnPHscYmHf9qEPqI6eYqOfF5btSKOVgM/xs4BhzCQmktyGHZvAzVGppewvNAHrPzC933GcDVmD8cAbqwe9ha0AN8GTfhS2TfAg9htRCECVDwgQ7gDuxwdmO1EZhp7QDmJWAczPw68WVjxSeyd+OSRuC4SdIxR+cfSVe539OS1teQxEYldfr285nQKuABrCoMbSkLeaCDYjXaAjyHRbQcFhjagCfcXAiy2C2FgGfKZj0akKQRSccTjpyk/CQ6eUmvSIpKNLFa0k5Jw7LKs3TtuKwS3SBpY8n8iNNEOkQDYM3GtMBTqoQUVvsPAI9gCW4n5h+XAtdh/pHBCrdu4FOsuclimnrY8fIUVjRuxcLylBdzk/G+rM9oUbhPZSVtkflTAfe535sugCQdlfS4pGWSFkiaLSkjM402932yEJGkx2QmV0CnpGwzrhZ9yGPx/SuseRrHEl0/8Kjnnc3AgxTLintOhgaqoVt+c0rJzGncrR1t5v8DoThaYU5YIBgDbgQOZGjuvzQhqHaoeczEuoBDGRLehDUBQ4Hrvgc7/V1Txkpt2J5kcUrScuwy9/9gSvux1vF46AsRFsY6p4qjBDgI3EUC5sE0AFawrcVK6IVY2p7q/48LBeIgVutvxtl1EvwLVHC6JKH+sDMAAAAASUVORK5CYII=">`,
            responsive: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAAAsTAAALEwEAmpwYAAACMElEQVRYhe3YP2sUQRjH8c+tF6NRNETtrLUzrWCroChYWQiCWFgIgo2g70DbIEa0sxAUQYha2OkriEUCItgoRglYBIPEJF4ei7mQzeWy91fuhPvCwuztPLO/eW7m2ecZEaHmuhwRc9E7vkTExYgYKkWEHOfwGGN6yzzu5sVleIoLPZO0meksd7Mbe3ulpA7DeXGBtV4pqUNkjfv0joG4dslq2sO9ElKPcq69ghf4hNUCmzWMYBzHsOtfiasNwlCSdm6hHXbiFG7gZPelma235hoJW++zjNc4j/vdVLVO3nNHcUjjWJdhAR9Qqf62B89xpovaZsvSV+EmLmG/5JUi75WwJHntDr7iF+7hBPZ1TV5E3O4gg5iMiKFI2cxwRLzrLCHZxEyGsx3M7TSOVNvL+Nixt3JkONiB/SgO5O6XOlJTQ6a53bkdtclCqTM5m/lvPl99x0BcuwzEtctAXLsMxLVLP4sr9bO4vi2qV/G23KBTRco8GvWrxx/8rrabyVZKUoaziIeYLHrpvJSG/8QtqcZohSnpOC1rQVxFSvunKfbII0xU20vVF+1sQdwMXrXQfwtFsxq1sZvH1J9IqcC+naWwZYDtSsGr1eeLuGL7sLNdJn0c16pjrNvukMrKl/jRUF1ETHVQIb2PiMOxcZ480YTNt4gYj61n0VuuDA+kRdgqC1Kln7cdacKu6fBVxhtpV16XKvdKoUUafAXP8KTm2XfMSXGq9u8O6RTrs40QU8hfGnEaBDJLNi0AAAAASUVORK5CYII=">`,
            offline: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAElElEQVRYhcWZW6hUVRjHf2ccQ/OWYqYZkhKZUpGWIkgXEkKNDIPqoXqQbnh6SH2IIgiNMPI2PmUoEZRUqKEgJIUFFeTdY2p4j4yy4Oix1FIT/fWw9u5M0+yZvfeMxz8MA2t931q/vfZa3/rW2i0qDag/MAG4BbgZGAUMALoDF4EzwD5gP3AE+BY4lrezlhywLcAU4FHgfmBYBt924BtgHfAJ8FemntUsv0fULTZHB9VWtXfa/tNC3qqubxJkpdrUSc2CfVo9cZlAY11Q56oteWEL6vzLDFmpj9U+WWEL6oouBo31hdqvGlcS7JtXBLNTa9WiKWBnVDjuUtd0GWanStaBHal2VDitieoWdRlmpx40Abaofp7gtDiyWVyj4b/Vk4b42aZ+rx5X/2wA9ge1fzXY6XUck4C/UyeoQ9WBhtXc1xDsB6rXqqPV59XP1N8zAs+LGePttgBsA8bW2fCWA63AAmBOVLYbWAqMjPyvA3oDZ4E/gF2RTRuwE+gHPAM8B4xIsckeB0YD7fGoTk75lCvUbpFPKeMIqe5R31CvN4z8y+qZFH6vWDYNPqhjfFC9T+2uvq4utP4crqXT6hLDlBmuflnHfotaRL1G/bmG4UbDHLxD3VFWHgMvyQmselSdGrXzTg27S+o41Ck1jD6MGnrC6q/rbcN+XqooX6HerU5T56ifqmdrgLwW9TOvBktrgZAwJ+kk8CKwEuhVpe48IDA7WmSxRgETo7r1wGPAjZHdTxXttADzCIv2XA2WcajLajxNklarQwyh6dWykUmaw0ejURuh9jRMnYsZ+9yE+lUGhwvqzAisVf21rG5BHWANG8T8yO4Bs6We+1H3ZnB43BC6ViXUL1N7WD9j26IOVseq51P2/WMR6FZjnlTqIcJmML5K3WnCoXEk8CzhsDgroZ3xwGZgI2FDSqNC1pGtpnb1JcO22k+9Xb3LxuJwNR1F3dxAA1+rwwyLbZF6zBCKVJfaXOBDqO/ldO4wRIOp6m8JNiWbB7ytCBzIMGfL1Qf4HLgNKCbYzIr+Z0f/cxLs0uhwETic07kIjKlSfgo4CAwFhhCAW+gEzwu8E8N8a2/Ca1J9yxCSiobF9oJ6Lqor2diUuCfOutY1hBi0yJAnLFB3qyvVq9Wn7NytSuYD3qteFcM+2SDoiQis8lS8Pmp/T1lZyezACy3LZ3sYzjt5tc8wqtsrys+pg/z/2W6J6YFPqzdZcQab2QDsLxHs+xXlbVHbW6v4pAVeHjOWw/byv68rq2YYTqIbDAnLVnWMIWlPymXrAXeoN1SDRb3XkFnlUYf6cNTOYMMV1Fj1UB2/Wsf8OMNLvJGZmxM21g7D6G4y3CWk0WJD2CvXasMD/8tW7ea7AHxEyO6vlHYBk4CO8sKka/q+wFrCNXxX6wgwmSo7a1IueQqYTgDuSu0kARSoe/NdsLGjdhatUgfU4qkHG/+mqQcuE+QJw3muLkdaWAwxdK4hwW6GThkC/vC0DHm+gw0CZhDOYxNzzMu9wAbgXTLm0nlgyzUeuBMYR/jK2B/oSVi4l4ALhPBzhLB4tgObCJcjmfUPo2C//PgXYqkAAAAASUVORK5CYII=" />`,
            install: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAACRElEQVRYhe2YvWsUQRjGf7N3px5EBWMgKqJdELFLYQKHjaRMYaEYLQX/AFsLOytbsRBNIKYTCy0E+0vsNV2afICQRDQqBBN9LGYX9ja7t7Nf7hX5wRa38847z70zs/vsGElEuA48Ai4BBjgQUCIesA48AWZ7WiSFrwlJv1UPD8JaTKhi54El4CywBdwFvvhVqwIBI8ALf2yAaeBtuGLHJHV95d8kTam3klVeY5LW/LF3JF0JKtYE5oAZX/UG8AE4WlGlouwCk8CY/3sF6BhJ94Fn/0mEK7NG0ifgct1KImx4wJm6VcTQ9oC/dauIQV7dCpI4FJaVQ2FZaRbouwes0t99jAJDeZIXEbYKjGNfKUnMATfzJC8iTMAvbOWS2M+bvMgaawINh5jcyfvxE/gBHIncN1jPluZuvwNfY+L+YN3LyaSORtImcDqh/TN2jawBrZjkOynihjj4p/b9+y+BqYR+20jaTLG8XUknSjSGDUnzKWNuuayxCeAdMOwQm0YLeAXcSQt0Xfwd4A1wqoCoJvAUuOUU7TCV0Wk9l2P62g7T1zOVWYVJ0lJGcW1JCxnHyCVMkhYlDVckSnJc/HFcxa65fhuiATwHbucZoMiTP9gQceIa2C+vmZg2J4rang7wHusiAlrAAnCvSOIy/Ng49rM+qNw8OR1FmLRXUha62LOOGyXk2i5ie6JMlphrcK21x2CKMx7Wcw0aex7wum4VMSwbSaPAInCxZjEBu8C14KjzAvAYu7OOU+2BcBzGF7QMPAQ+/gM4jpCzrYwJFQAAAABJRU5ErkJggg==">`
        }
    }

}




class UserChoice {
    constructor(message = "Voulez-vous continuer ?", confirm = "Confirmer", cancel = "Annuler", input = null, value = null) {
        this.id = this.createHash();  
        this.message = message; 
        this.confirm = confirm; 
        this.cancel = cancel; 
        this.input = input; 
        this.value = value; 
    }

    applyStyle() {
        let style = `
            #popin-${this.id}.user-choice-popin {
                position: fixed;
                top: 0; 
                left: 0; 
                width: 100%;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1999; 
            }
            .popin-background {
                position: absolute;
                width: 300%;
                height: 300%;
                background: #282828;
                opacity: .6;
            }
            .popin-content {
                position: absolute;
                max-width: 95%;
                z-index: 1;
                padding: 1em; 
                border-radius: 4px;
                padding-bottom: 0; 
                background: #fff;
                box-shadow: 4px 4px 24px rgb(0 0 0 / 40%);
            }
            .message__container {
                padding: 1em;
                line-height: 1.6; 
            }
            .btn-container {
                text-align: right;
                border-top: solid 1px #d5d5d5;
                padding: 12px 0;
            }
            #cancel-btn {
                background: transparent;
            }
            #cancel-btn:hover {
                color: #b00020; 
            }
            #confirm-btn:hover {
                background-color: #01579B; 
            }
            
            `; 

        let moreStyle = document.createElement('style'); 
        moreStyle.id = `style-for-${this.id}`; 
        moreStyle.textContent = style; 
        document.head.append(moreStyle); 
    }

    returnTemplate() {
        return `
        <div id="popin-${this.id}" class="user-choice-popin" >
            <div class="popin-content">
                <p class="message__container" id="choice-text">${this.message}</p>
                ${this.input ? `<input type="date" id="date" value="${this.value}">` : '' }
                <div class="btn-container">
                    ${ this.cancel ? `<button id="cancel-btn">${this.cancel}</button>` : ''}
                    ${ this.confirm ? `<button id="confirm-btn">${this.confirm}</button>` : ''}
                </div>
            </div>
            <div class="popin-background"></div>
        </div>`; 
    }

    waitFor() {
        let html = this.returnTemplate(); 
        this.applyStyle(); 
        document.body.insertAdjacentHTML('afterbegin', html); 
        return new Promise((resolve, reject) => {
            if (document.querySelector(`#popin-${this.id} #confirm-btn`)) {
                document.querySelector(`#popin-${this.id} #confirm-btn`).addEventListener('click', event => {
                    let response = ''; 
                    if(document.getElementById('date')) { response = document.getElementById('date').value }; 
                    
                    document.querySelector(`#popin-${this.id}`).remove(); 
                    document.querySelector(`#style-for-${this.id}`).remove(); 
                    
                    resolve(response); 
                })
            }
            if (document.querySelector(`#popin-${this.id} #cancel-btn`)) {
                document.querySelector(`#popin-${this.id} #cancel-btn`).addEventListener('click', event => {
                    document.querySelector(`#popin-${this.id}`).remove(); 
                    document.querySelector(`#style-for-${this.id}`).remove(); 
                    reject(); 
                })
            }
            document.querySelector('.popin-background').addEventListener('click', event => {
                document.querySelector(`#popin-${this.id}`).remove(); 
                document.querySelector(`#style-for-${this.id}`).remove(); 
                reject(); 
            })
        })
    }

    createHash(length = 16) {
        const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ1234567890"; 
        let res = ''; 
        for (let i = 0; i < length; i++) {
            res += c[ Math.floor(Math.random() * c.length) ]; 
        }
        return res; 
    }

    
}







class Snackbar {
    constructor(msg) {
        this.msg = msg; 
        this.id = this.randomKey(16); 
    }

    display(msg = this.msg, autoremove = true, delay = 4000) {
        this.addStyle(); 

        if (!document.querySelector('.ui-alert__container')) {
            document.body.insertAdjacentHTML('beforeend', `<div class="ui-alert__container"></div>`); 
        }
        
        let newID = this.randomKey(8); 
        document.querySelector('.ui-alert__container').insertAdjacentHTML('afterbegin', `<div id="${newID}" class="ui-alert__content">${msg}<div>`);  

        document.querySelector(`#${newID}`).addEventListener('click', (event) => this.removeAlert(event.currentTarget)); 

        if (autoremove) {
            this.waitFor(delay).then(() => this.removeAlert(document.querySelector(`#${newID}`))); 
        }
    }


    styleContent() {
        return `
            .ui-alert__container {
                width: 480px; 
                left: calc(50% - 240px);
                z-index: 2999; 
            }
            .ui-alert__container { 
                position: fixed;
                bottom: 1em; 
                left: 1em; 
                width: calc(100% - 2em); 
            }

            .ui-alert__content {
                padding: 1em; 
                margin: auto; 
                border: solid 1px #e1e1e1; 
                border-radius: 4px; 
                background-color: #e5f6fd; 
                color: #014361; 
                box-shadow: 4px 4px 12px #0000006b;
            }
            .ui-alert__content + .ui-alert__content {
                margin-top: .4em; 
            }

            .ui-alert__content:hover {
                animation-name: shake;
                animation-duration: 320ms;
                // animation-iteration-count: infinite;
            }
            @keyframes shake {
                0% { transform: translateX(0); }
                25% { transform: translateX(6px); }
                50% { transform: translateX(-6px); }
                75% { transform: translateX(6px); }
                100% { transform: translateX(0); }
            }
        `; 
    }

    addStyle() {
        if (!document.querySelector(`#ui-alert__style`)) {
            let style = document.createElement('style'); 
            style.id = "ui-alert__style"; 
            style.textContent = this.styleContent(); 
            document.head.appendChild(style); 
        }
    }

    
    removeAlert(elt, delay = 1640) {
        elt.style.transition = "all ease "+delay+"ms"; 
        elt.style.opacity = 0; 
        this.waitFor(delay)
            .then(() => elt.remove()); 
    }


    waitFor(delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(); 
            }, delay); 
        })
    }

    randomKey(length) {
        let possibles = "abcdefghijklmnopqsrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        let output = ''; 
        for (let i = 0; i < length; i++) {
            output += possibles[Math.floor(Math.random()*possibles.length)]; 
        }
        return output; 
    }
}








