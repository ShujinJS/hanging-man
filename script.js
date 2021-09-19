let theWord = document.getElementById("word");  
let letterBtn = document.querySelectorAll(".letter");   // letter inputlar
let exe = document.getElementById("executioner");   // seçilen kelimenin div'i
let dashList = document.getElementById("secrets");  // dash list div'i
let words = ["Bardak", "Tabak", "Kapı", "Telefon"];
let lives = 6;
var point = 0;
var selectedWord;
var char;
var li;
// words array'inden random bir kelime seçtim, harf sayısı kadar "_" oluşturdum
(function randomize () {
    // Random sayı alarak kelime seçme
    let rnd = parseInt(Math.random() * words.length);
    // words array'inden random bir kelimeyi seç
    selectedWord = words[rnd];
    selectedWord = selectedWord.toLowerCase();

    function secrete(arr){
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];                   
            arr = arr.toString().replace(",", "").replace(element, "-");
            li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.display = "inline-block";
            li.innerHTML = arr[index];
            dashList.appendChild(li);
        }
    }
    secrete(selectedWord);
})();

// her bir harf tuşuna event ekledim
(function guessIt(buttons, arr){
    for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        element.addEventListener("click", function showGuess(event){
            var char = event.target.value.toLowerCase();
            // kelimedeki eşleşen harfler, matchedChar
            let matchedChar = 0; 
            for (let i = 0; i < arr.length; i++) {
                if(char==arr[i]){
                    matchedChar++;
                    dashList.getElementsByTagName("li")[i].innerHTML = char;
                    element.disabled = true;
                }
            };    
            // her eşleşen harf için 1 point kazan
            point += matchedChar;
            // hiçbir harf eşleşmediyse, çubukları visible yap
            if(matchedChar==0){
                let hiddenClass = document.getElementsByClassName(`adm-${lives}`);
                hiddenClass[0].style.visibility = "visible";
                lives--;  
                if(lives==0){
                    setTimeout(function(){
                        alert("Üzgünüm, kaybettin...");              
                    },1000);
                    // letterBtn HTML Collection geldiği için, Array'e döndürüp forEach kullandım
                    Array.from(letterBtn).forEach(child =>{
                        child.disabled = true;
                    })
                }
            }
            if(point==selectedWord.length){
                setTimeout(function(){
                    alert("Tebrikler, kazandın!");              
                },1000);
            }
        });
    };
})(letterBtn,selectedWord);