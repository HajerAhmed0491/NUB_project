import translations from "./translations.js";

const languageLink = document.getElementById("languageLink");
languageLink.addEventListener("click", () => {
    const currentLanguage = languageLink.getAttribute("data-title");
    const newLanguage = currentLanguage === "ar" ? "en" : "ar";
    if (newLanguage === "ar") {
        var linkElement = document.getElementById('myLink');        
        linkElement.href = '/dist/css/tornado-rtl.css';
        document.getElementById("myLinkLtr").remove();
    }else{
        var linkElement = document.getElementById('myLink');        
        linkElement.href = '/dist/css/tornado.css';
        var linkElemenLtr = document.getElementById('myLinkLtr');        
        linkElemenLtr.href = '/dist/css/style_ltr.css';
    }
    setLanguage(newLanguage);
    localStorage.setItem("lang", newLanguage);
});

document.addEventListener("DOMContentLoaded", () => {
    const language = localStorage.getItem("lang") || "ar";
    var linkElement = document.getElementById('myLink');        
        linkElement.href = '/dist/css/tornado-rtl.css';
    setLanguage(language);
});

const setLanguage = (language) => {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n");
        element.textContent = translations[language][translationKey];
    });
    languageLink.setAttribute("data-title", language);
};

