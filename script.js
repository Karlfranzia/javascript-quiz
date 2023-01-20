var main = document.querySelector("#main")
var button = document.createElement("button")
var h1 = document.createElement("h1")
var p = document.createElement("p")
var secondsleft = 15
var score = 0


function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }


function init() {
    
    main.appendChild(h1)
    main.appendChild(p)
    main.appendChild(button)
    h1.textContent = "Coding Quiz Challenge"
    p.textContent = " Press start and try and answer as many wuestions as you can before the time runs out. You have 15 seconds. Be careful though, every wrong answer removes time left!"
    button.textContent = "begin"
    button.addEventListener("click", start)
}



function start() {
    main.removeChild(h1)
    main.removeChild(p)
    main.removeChild(button)

    var timerInterval = setInterval(function() {
        secondsleft--;
        timer = main.appendChild(p)
        timer.textContent = (secondsleft + "seconds left")

        if(secondsleft === 0) {
          
          clearInterval(timerInterval);
          
          
        }
    
    }, 1000);

    function question1(){
        main.appendChild(h1)
        var correct = main.appendChild (button)
        var wrong1 = main.appendChild (button)
        var wrong2 = main.appendChild (button)
        var wrong3 = main.appendChild (button)

        h1.textContent = ""
        correct.textContent = ""
        wrong1.textContent = ""
        wrong2.textContent = ""
        wrong3.textContent = ""

        button.addEventListener("click", function(event) {
            var element = event.target;               
            if (element.matches(correct) === true) {
              score ++
              question2()
            } else {
                secondsleft --
                question2()
            }
          });
    }
  
    
    function question2(){
        main.removeChild(correct)
        main.removeChild(wrong1)
        main.removeChild(wrong2)
        main.removeChild(wrong3)
               
        var wrong1 = main.appendChild (button)
        var correct = main.appendChild (button)
        var wrong2 = main.appendChild (button)
        var wrong3 = main.appendChild (button)

        h1.textContent = ""
        correct.textContent = ""
        wrong1.textContent = ""
        wrong2.textContent = ""
        wrong3.textContent = ""

        button.addEventListener("click", function(event) {
            var element = event.target;               
            if (element.matches(correct) === true) {
              score ++
              question3()
            } else {
                secondsleft --
                question3()
            }
          });
    }
    
}


init()