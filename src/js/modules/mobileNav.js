class ToggleMobileNav {
    constructor(hamburgerBtn, hamburgerBtnIcon, hamburgerBtnIconActive, mobileNav, mobileNavActive){
        this.hamburgerBtn = document.querySelector(hamburgerBtn);
        this.hamburgerBtnIcon = document.querySelector(hamburgerBtnIcon);
        this.mobileNav = document.querySelector(mobileNav);
        this.hamburgerBtnIconActive = hamburgerBtnIconActive;
        this.mobileNavActive = mobileNavActive;
        this.body = document.querySelector('body');
        this.toggleMenu()
    }

    toggleMenu = () => {
        this.hamburgerBtn.addEventListener('click', () =>{
            this.hamburgerBtnIcon.classList.toggle(this.hamburgerBtnIconActive);
            this.mobileNav.classList.toggle(this.mobileNavActive);
            this.body.classList.toggle('disable-scroll');
        })
    }
}

export default ToggleMobileNav;