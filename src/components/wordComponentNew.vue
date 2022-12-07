<template>
    <div>
        <div id="WordCompGameBtnArea">
            <div v-for="(words, index) in allWords" :key="index">
                <div id="WordCompInputArea">
                    <input id="WordCompInput" v-model="words.word" placeholder="Type your word here..." />
                    <img @click="removeWord(index)" src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/cross-icon.png" alt="">
                </div>
            </div>
            <button id="WordCompAddBtn" type="button" @click="addWord()">
                ADD WORD
            </button>
        </div>
    </div>
</template>
  
<script>
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
</style>