
const wordss = [
    'Hello',
    'programming',
    'engineer',
    'father',
    'sally',
    'marah',
    'rahaf',
    'rawan',
    'yousef',
    'rami',
    'madeha',
    'solaf',
    'environment',
    'sorry',
    'sawsan',
    'mervat',
    'merna',
    'doctor',
    'mahmoud',
    'haneen',
    'hadeel',
    'yara',
    'issa',
    'alosh',
    'raghad',
    'razan',
    'batool',
    'hiam',
    'shahera',
    'kamel',
];

const lvls = {
    'Easy' : 6,
    'Normal' : 4,
    'Hard' : 3,
};
let defaultLevelName = '';
let defaultLevelSeconds = '';
let words;


let startButtom = document.querySelector('.start')
let lvlnamespan = document.querySelector('.message .lvl')
let secondspan = document.querySelector('.message .seconds');
let theWord = document.querySelector('.the-word')
let upcomingWords = document.querySelector('.upcoming-words')
let input = document.querySelector('.input')
let timeleftspan = document.querySelector('.time span')
let scoreGot = document.querySelector('.score .got')
let scoreTotal = document.querySelector('.score .total')
let finishMessage = document.querySelector('.finish')
let playerName = document.querySelector('.inputName')


lvlnamespan.innerHTML = defaultLevelName;
secondspan.innerHTML = defaultLevelSeconds
timeleftspan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = wordss.length;



    



input.onpaste = function(){
    return false;
}
startButtom.onclick = function(){
    var levelChecked = document.querySelector('input[name = "level"]:checked');
    if(playerName.value !='' && levelChecked != null){
    levelCheck(levelChecked.value);
    lessWord(levelChecked.value)
    this.remove();
    input.focus();
    genWords();
  
    
  
} 
input.onblur = function(){
    addDataToLocalStorage(playerName.value,levelChecked.value)
}

       
    // console.log(defaultLevelSeconds)
    // console.log(words)
    //   addDataToLocalStorage(playerName.value,levelChecked.value)
}
// if(finishMessage.firstChild){
//     console.log(finishMessage.firstChild);
// }



function genWords(){
    let randomWord = words[Math.floor(Math.random()*words.length)];
    let wordIndex = words.indexOf(randomWord);
    theWord.innerHTML = randomWord
    words.splice(wordIndex,1);
    console.log(words);
    upcomingWords.innerHTML = '';
    for(let i=0;i<words.length;i++){
        let div= document.createElement('div');
        let divText = document.createTextNode(words[i]);
        div.appendChild(divText)
        upcomingWords.appendChild(div);
    }
    startPlay()

}

function startPlay(){
    timeleftspan.innerHTML= defaultLevelSeconds;
let start = setInterval(()=>{
    timeleftspan.innerHTML--;
    if(timeleftspan.innerHTML==='0'){
        clearInterval(start);
       if(theWord.innerHTML.toLowerCase()===input.value.toLowerCase()){
        
            input.value='';
            scoreGot.innerHTML++;

            if(words.length>0){
                genWords()
            }
            else{
                input.blur();
                let span= document.createElement('span');
                span.className = 'good';
                span.appendChild(document.createTextNode('Congrate'));
                finishMessage.appendChild(span);
                upcomingWords.remove()
            }
       }
       else{
        input.blur();
        let span= document.createElement('span');
        span.className = 'bad';
        span.appendChild(document.createTextNode('GAME OVER'));
        finishMessage.appendChild(span)
       }
    }

},1000)
}

function  levelCheck(checkedval){
    defaultLevelName = checkedval;
    defaultLevelSeconds = lvls[checkedval]
}

function lessWord(less){
    console.log(less)
    if(less ==='Easy'){
        words = wordss.filter((word)=>{
            return word.length <=4;
         })
        return (words)
    }
    else if(less ==='Normal'){
        words= wordss.filter((word)=>{
            return word.length <=5;
         })
         return(words)
    }
    else{
       words= wordss.filter((word)=>{
            return word;
         })
        return(words)
    }
    // console.log(words)
}
let arrayInfo= []
function addDataToLocalStorage(playname,levelPlay){
    const players= {
        id : Date.now(),
        name : playname,
        level : levelPlay,
        score : scoreGot.innerHTML,
    };
    arrayInfo.push(players);
    window.localStorage.setItem('history', JSON.stringify(arrayInfo))
    }

