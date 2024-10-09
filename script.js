// Buttons
const buttons = document.querySelectorAll(".number") // [<button class="number">,<button class="number">,<button class="number">]
const signs = document.querySelectorAll(".sign") // [<button class="sign">,<button class="sign">,<button class="sign">]

// equation
let screen = document.querySelector(".equation") //  <p class="equation"></p>

// operations
const clear = document.querySelector(".clear") //  <button class="clear">AC</button>
const del = document.querySelector(".delete") // <svg class="delete">

// solve
const solve = document.getElementById("solve") // <button id="solve">=</button>
const result = document.querySelector(".solution") // <h2 class="solution"></h2>
const answer = document.querySelector(".result") // <span class="result"></span>

// theme setting
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");

const lightMode = document.querySelector(".light") // <svg class="light">
const darkMode = document.querySelector(".dark") // <svg class="dark">

const modeOverlay = document.querySelector(".lightning-overlay") // <div class="lightning-overlay"></div>

console.log("Dark = ",systemSettingDark.matches)
console.log("Light = ",systemSettingLight.matches)


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

    if(systemSettingDark.matches){
        document.querySelector("html").setAttribute("data-theme","dark")
    }else {
        document.querySelector("html").setAttribute("data-theme","light")
    }
    
})


buttons.forEach(btn => {
    btn.addEventListener("click",()=> {
        if (result.classList.contains("add-solution")){
            result.classList.remove("add-solution")
            screen.classList.remove("remove-equation")
            screen.innerHTML = "";
            answer.innerHTML = "";
        }
        screen.innerHTML += btn.innerHTML + " ";
    })
})

signs.forEach(sign => {
    sign.addEventListener("click",()=> {
        let signs = ["÷","×","–","+"]
        if(signs.includes(screen.innerHTML.trim().slice(screen.innerHTML.trim().length - 1)) && screen.innerHTML.trim().slice(screen.innerHTML.trim().length - 1) == sign.innerHTML){
            // screen.innerHTML = screen.innerHTML.slice(0, -1) + " " + sign.innerHTML + " ";
        }else {
            screen.innerHTML += sign.innerHTML + " ";
        }
    })
})


clear.addEventListener("click",()=> {
    screen.innerHTML = "";
    result.classList.remove("add-solution")
    screen.classList.remove("remove-equation")
})

del.addEventListener("click",()=> {
    if(screen.innerHTML.trim().length == 1){
        screen.innerHTML = screen.innerHTML.trim().slice(0, -1);
        answer.innerHTML = "";
        result.classList.remove("add-solution")
        screen.classList.remove("remove-equation")
    }
    else{
        screen.innerHTML = screen.innerHTML.trim().slice(0, -1);
    }
})


solve.addEventListener("click",()=> {
    // let question = screen.innerHTML.trim();
    let split_equation = screen.innerHTML.trim().split(" ")
        let signs = ["÷","×","–","+"]
    let new_equation = split_equation.map(x => (x == "÷")? "/":x).map(x => (x == "×")? "*":x).map(x => (x == "–")? "-":x).join("")
    console.log(new_equation)
    let ans = eval(new_equation);
    answer.innerHTML = ans;
    result.classList.add("add-solution")
    screen.classList.add("remove-equation")
})