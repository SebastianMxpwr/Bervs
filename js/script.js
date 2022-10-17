const showVerb = document.getElementById("ShowVerb");
const showImage = document.getElementById("ShowImage");
const showAudio= document.getElementById("ShowAudio");
const first_verb = document.getElementById("first-verb");
const second_verb = document.getElementById("second-verb");
const third_verb = document.getElementById("third-verb");
const fourth_verb = document.getElementById("fourth-verb");
const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-answers");
const verbsContainer = document.getElementById("verbs-container");

const numberOfVerbs = verbs.length;

let answersRoullete = [0,1,1,1];
let positionsOfVerbs =[];
let rightAnswer;
let allRighAnswer = 0;

next.addEventListener('click',function(){
    ponerVerbo();
    next.style.display='none';
    
});


makeRandomList();

let lastPosition = positionsOfVerbs.length-1;

function makeRandomList(){
    for(var i = 0; i<numberOfVerbs;i++){
        positionsOfVerbs.push(i);
    }
    positionsOfVerbs=positionsOfVerbs.sort(() => Math.random() -0.5);
}

function buttonEffect(itsRight,button){
    if(itsRight){
        button.classList.add('rightAnswer');
        setTimeout(function(){
            button.classList.remove('rightAnswer');

        },1000);
        allRighAnswer = allRighAnswer+1;
    }else{
        button.classList.add('wrongAnswer');
        setTimeout(function(){
            button.classList.remove('wrongAnswer');

        },1000);
       
    }
    setTimeout(function(){
        ponerVerbo();
    },1000);
}

first_verb.addEventListener('click', function(){
    buttonEffect(isItRight_(first_verb.innerHTML),this);
});

second_verb.addEventListener('click', function(){
    buttonEffect(isItRight_(second_verb.innerHTML),this);
});

third_verb.addEventListener('click', function(){
    buttonEffect(isItRight_(third_verb.innerHTML),this);
});

fourth_verb.addEventListener('click', function(){
    buttonEffect(isItRight_(fourth_verb.innerHTML),this);
});

function shuffleAnswer(array){
    let numberOfAnswerButtons = array.length;
    
    let randomIndex;
    
    while (numberOfAnswerButtons != 0){
        randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
        numberOfAnswerButtons--; 
        [array[numberOfAnswerButtons],array[randomIndex]]=[
            array[randomIndex],array[numberOfAnswerButtons]]   
    
    }
    return array;
}

function isItRight_(answer){
    return answer==rightAnswer?true:false;
}

function randomVerbo(notThisOne){
    theOne = Math.floor(Math.random()*verbos.length);
    
    return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

function ponerVerbo(){
    answersRoullete= shuffleAnswer(answersRoullete);

    let randomPosition = positionsOfVerbs[lastPosition];
    let imgText= "<img src='../src/images/"+verbs[randomPosition]+".jpg' height='140px' width='100px'>";


    first_verb.classList.add("btn","btn-outline-primary","btn-md");
    second_verb.classList.add("btn","btn-outline-primary","btn-md");
    third_verb.classList.add("btn","btn-outline-primary","btn-md");
    fourth_verb.classList.add("btn","btn-outline-primary","btn-md");


    if(lastPosition>=0){
        var just_position = lastPosition+1;
        verbsCounter.innerHTML=""+just_position+" / "+numberOfVerbs;
        allRightCounter.innerHTML="Right Answers: "+allRighAnswer;

        showVerb.innerHTML=verbs[randomPosition];
        showImage.innerHTML = imgText;

        showAudio.src="../src/audios/"+verbs[randomPosition]+".mp3";
        showAudio.play();

        first_verb.innerHTML=!answersRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        second_verb.innerHTML=!answersRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        third_verb.innerHTML=!answersRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
        fourth_verb.innerHTML=!answersRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];

        rightAnswer=verbos[randomPosition];
        lastPosition=lastPosition - 1;


    }else{

        verbsCounter.innerHTML="0/ "+numberOfVerbs;
        allRighAnswer.innerHTML="Right anwers: "+allRighAnswer;
        showVerb.innerHTML="Thanks you";

        verbsContainer.innerHTML=" "

    }
}