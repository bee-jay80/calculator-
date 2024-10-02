// color mode
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");

const lightMode = document.querySelector(".light")
const darkMode = document.querySelector(".dark")

const modeOverlay = document.querySelector(".lightning-overlay")

console.log(systemSettingDark.matches)
console.log(systemSettingLight.matches)



if(systemSettingDark.matches){
    document.querySelector("html").setAttribute("data-theme","dark")
}else {
    document.querySelector("html").setAttribute("data-theme","light")
}

function storeTheme(){
    localStorage.setItem("theme", document.querySelector("html").getAttribute("data-theme"))
}

lightMode.addEventListener("click", ()=>{
    document.querySelector("html").setAttribute("data-theme","light")
    if(document.querySelector("html").getAttribute("data-theme") == "light"){
        modeOverlay.classList.add("overlay-position")
    }else {
        modeOverlay.classList.remove("overlay-position")
    }
    storeTheme()
})

darkMode.addEventListener("click", ()=>{
    document.querySelector("html").setAttribute("data-theme","dark")
    if(document.querySelector("html").getAttribute("data-theme") == "dark"){
        modeOverlay.classList.remove("overlay-position")
    }else{
        modeOverlay.classList.remove("overlay-position")
    }
    storeTheme()
})

window.addEventListener("load", ()=>{
    const storedTheme = localStorage.getItem("theme")
    if(storedTheme){
        document.querySelector("html").setAttribute("data-theme", storedTheme)
    }
})