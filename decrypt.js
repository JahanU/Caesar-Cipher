/***
	 * @Jahan Ulhaque 
	 * Ceasar cipher - Decrypt message
	 * 
	 ***/


//Decrypt section:
//var showEncryptedM = document.getElementById("showDecryptedMessage");
//var showDecryptedMessage = document.getElementById("showDecryptedMessage");

var btnDecrypt = document.getElementById("btnDecrypt");
var decryptedMessasgeResult = document.getElementById("decryptedMessasgeResult");

btnDecrypt.addEventListener("click", function() {
    decryptMessage();
})



function CHR(ord)
{
    return String.fromCharCode(ord);
}

function ORD(chr)
{
    return chr.charCodeAt(0);
}


function decryptMessage() {

    var getEncryptedM = document.getElementById("getDecryptedMessage").value;

    var shiftedCiphers = new Array (26);
    var getLetterFreq = new Array (26);
    var chiArray = new Array (26);


    for (let i = 0; i < 26; i++) getLetterFreq[i] = 0;


    for (var i = 0; i < 26; i++) { // i is referring to the amount of shifts that will take place
        var decryptedM = ""; // decrypted message will be stored here

        for (var y = 0; y < getEncryptedM.length; y++) {
            var ch = getEncryptedM.charAt(y);

            if (ch == " ") {
                decryptedM += " ";
            }
        

            if (ch.charCodeAt(0) >= "a".charCodeAt(0) && ch.charCodeAt(0) <= "z".charCodeAt(0)) {
                ch = (ch.charCodeAt(0) - i);

                if (ch < "a".charCodeAt(0)) {
                    ch = ch + 26;
                }

                decryptedM += CHR(ch);
                getLetterFreq[getEncryptedM[y].charCodeAt(0)-"a".charCodeAt(0)]++;
                console.log(222, getLetterFreq.slice(0));

            }
            else {

                if (ch.charCodeAt(0) >= "A".charCodeAt(0) && ch.charCodeAt(0) <= "Z".charCodeAt(0)) {
                    ch = (ch.charCodeAt(0) - i);

                    if (ch < "A".charCodeAt(0)) {
                        ch = ch + 26;
                    }
                    
                    decryptedM += CHR(ch);
            getLetterFreq[getEncryptedM[y].charCodeAt(0)-"A".charCodeAt(0)]++;
            console.log(333, getLetterFreq.slice(0));
                }
            }

        } // end message/char.at() for loop

        shiftedCiphers[i] = decryptedM;

    } // end shift for loop

    // var list = document.getElementById('AllCiphers');

    // for (var x = 0; x < shiftedCiphers.length; x++) {
    //     var ciphers = shiftedCiphers[x];
    //     var entry = document.createElement('li');
    //     entry.appendChild(document.createTextNode(ciphers));
    //     list.appendChild(entry);
    // }


    loopChi(chiArray, shiftedCiphers, getLetterFreq);
}



function loopChi(chiArray, shiftedCiphers, getLetterFreq) {

    var minChi = 0;
    for (var shiftNum = 0; shiftNum < 26; shiftNum++) {
        chiArray[shiftNum] = calcChi(shiftedCiphers[0], getLetterFreq, shiftNum); //each shifted cipher score is stored
    }


    minChi = findMinIndex(chiArray); //prints the shifted cipher with the lowest chi value.

	decryptedMessasgeResult.innerHTML = shiftedCiphers[minChi];


}

function findMinIndex(chiArray) {
    // var minValue = 0;
    // var minIndex = chiArray[0];
    // var i = 0;

    // while (i < 26) {
    //     if (chiArray[i] < minIndex) {
    //         minIndex = chiArray[i];
    //         minValue = i;
    //     }
    //     i++;
    // }
    
    // return minValue;

    var minVal = Math.min(...chiArray);

    return chiArray.findIndex(v => v === minVal);
}

function calcChi(newDecryptedMessage, letterFreq, shift) {
    var knownFreq = [0.0855, 0.0160, 0.0316, 0.0387, 0.1210,
        0.0218, 0.0209, 0.0496, 0.0733, 0.0022,
        0.0081, 0.0421, 0.0253, 0.0717, 0.0747,
        0.0207, 0.0010, 0.0633, 0.0673, 0.0894,
        0.0268, 0.0106, 0.0183, 0.0019, 0.0172,
        0.0011];
    var total = 0;

    console.log(111, shift, letterFreq);

    for (var i = 0; i < 26; i++) {
        var indexValue = (i + shift) % 26;
        
        console.log(indexValue, letterFreq[indexValue], newDecryptedMessage.length, knownFreq[i]);

        total += Math.pow(((letterFreq[indexValue]/newDecryptedMessage.length) - knownFreq[i]), 2) / knownFreq[i]

    }

    console.log(total);

    return total;
};