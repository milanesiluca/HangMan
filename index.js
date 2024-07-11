
const wordsList =["fanculo", "merda", "dupalle", "deficiente", "idiota", "cretino", "pirla", "asino", "vattelappesca"];
const okImage = document.querySelector(".response-img");
const wrongInsertedCharStr = document.querySelector(".wrong-char");
const rightWordToGuess = document.querySelector(".word");
const wordLbl = document.querySelector("#word-str")
const wrongLabel = document.querySelector("#wr-label")
const okBtn = document.querySelector(".send-char");
const inputTxtField = document.querySelector(".char-input")
const hangImage = document.querySelector(".hang-image")

const wrongCharsList = [];
const attempt = 4;


/**
 * image svg manipolation
 */

const bodyArr = []
const svgFile = document.querySelector("#hang-svg").addEventListener("load", function(){
    const doc = this.getSVGDocument();
    console.log(doc);
    const scaffold = doc.querySelector("#scaffold"); 
    const arms = doc.querySelector("#arms");
    const bodyH = doc.querySelector("#legs");
    const legs = doc.querySelector("#body");

    scaffold.setAttribute("visibility", "hidden");
    arms.setAttribute("visibility", "hidden");
    bodyH.setAttribute("visibility", "hidden");
    legs.setAttribute("visibility", "hidden");
    
    bodyArr.push(scaffold)
    bodyArr.push(arms)
    bodyArr.push(bodyH)
    bodyArr.push(legs)
});

/**
 * right word and right characters array manager
 */
const getRandomInteger = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
  
    return Math.floor(Math.random() * (max - min)) + min
}

function choseWord(){
    const availabelIndex = wordsList.length - 1;
    const choosenIndex = getRandomInteger(0, availabelIndex);
    return wordsList[choosenIndex];
}

const chosenWord = choseWord().toLowerCase();
console.log(chosenWord);
const stringLenght = choseWord.length;

const charArr = chosenWord.split("");
console.log(charArr);

rightWordToGuess.setAttribute("maxlength", charArr.length);
wordLbl.innerText += (` - ${charArr.length} Characters`)

const rightWordArray = [];
for (i = 0; i < charArr.length; i++){
    rightWordArray.push("_");
}

addRightCharToStr();

function addRightCharToStr(){
    let str = ""
    for (i = 0; i < charArr.length; i++){
        str += rightWordArray[i];
    }
    console.log(str)
    rightWordToGuess.innerText = str;
}



// end to right word manager

/**
 * wrong characters list manager
 */

const wrongCharList = [];

function addCharToWrongList(char){
    if (wrongCharList.indexOf(char) != -1){
        alert("You have already tried with this character. Try with a new one")
        return;
    }

    wrongCharList.push(char);
    if (wrongCharList.length == 4){
        rightWordToGuess.innerText = "YOU DIE!"
        wordLbl.innerText = "I am sorry, but..."
        okImage.setAttribute("src", "images/rip.jpg")
        okBtn.setAttribute("disabled", "true");
        bodyArr[3].setAttribute("visibility", "visible");
        inputTxtField.blur();
        return;
    } 
    
    let str = ""
    for (i = 0; i < wrongCharList.length; i++)
        str += wrongCharList[i];
    okImage.setAttribute("src", "images/down_no.jpg")
    wrongInsertedCharStr.innerText = str.toUpperCase();  
    
    switch (wrongCharList.length){
        case 1:
            bodyArr[0].setAttribute("visibility", "visible");
            break;
        case 2:
            bodyArr[2].setAttribute("visibility", "visible");    
            break;
        case 3:
            bodyArr[1].setAttribute("visibility", "visible");
            break;
        default:
            break;
    }
}
// end to wrong charcter manager


//game fuctionality
inputTxtField.setAttribute("maxlength", "1");
okBtn.addEventListener("click", (event) =>{
    const insertedChar = inputTxtField.value[0];
    inputTxtField.value = "";
    inputTxtField.focus();
    console.log(insertedChar);
    if (!charArr.includes(insertedChar)){
        addCharToWrongList(insertedChar);
        return;
    }

    okImage.setAttribute("src", "images/up_ok.png")
    
    const indexArray = [];
    charArr.forEach((char, index) => {
        if (char === insertedChar){
            indexArray.push(index)
        }
    });

    console.log(indexArray);
    for (let index of indexArray) {
        rightWordArray[index] = insertedChar;
    }
    addRightCharToStr();
    
    if (rightWordArray.indexOf("_") === -1){
        wrongLabel.innerText = "Congratulation, YOU WIN!"
        okImage.setAttribute("src", "images/hihi.gif");
        okBtn.setAttribute("disabled", "true");
        inputTxtField.blur();
    }

      
    
});

