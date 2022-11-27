<template>
    <div>
        <div id="gameBtnArea">
            <div v-for="(theWord, index) in allWords" :key="index">
                <div>
                    <input v-model="theWord.word" placeholder="Type your word here..." />
                    <button id="removeBtn" type="button" @click="removeWord(index)">
                        X
                    </button>
                </div>
            </div>
            <button id="addBtn" type="button" @click="addWord()">
                ADD WORD
            </button>
            <button id="nextBtn" v-on:click="nextStep()">NEXT STEP</button>
        </div>
    </div>
</template>
  
<script>
import io from 'socket.io-client';
const socket = io();

export default {
    name: "OneWord",
    data() {
        return {
            allWords: [
                {
                    word: "",
               },
            ],
        };
    },
    methods: {
        addWord() {
            this.allWords.push({
                word: "",
            });
        },
        removeWord(index) {
            this.allWords.splice(index, 1);
        },
        nextStep() {
            console.log(this.allWords[0].word)
            socket.emit("listOfWords", {
                theWords: this.allWords
            })
        }
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#gameBtnArea button {
    color: white;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    padding: 0.5em;
    margin-top: 1em;
}

#removeBtn{
    background-color: #C00000;
    width: 70px;
}
#addBtn {
    width: 600px;
    background-color: #32C7D1;
}

input {
    padding-left: 1em;
    padding-right: 1em;
    width: 430px;
    height: 70px;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    margin: 0.3em;
}

#nextBtn{
    width: 300px;
    background-color: #548135;
    margin-bottom: 1em;
}
</style>