<template>
    <div>
        <div id="WordCompGameBtnArea">
            <div v-for="(words, index) in allWords" :key="index">
                <div id="WordCompInputArea">
                    <input id="WordCompInput" v-model="words.word" placeholder="Type your word here..." />
                    <img id="removeBtn" @click="removeWord(index)" src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/cross-icon.png" alt="">
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
#WordCompGameBtnArea button {
    color: white;
    border-radius: 1em;
    font-size: 2em;
    font-weight: 600;
    padding: 0.5em;
    margin-top: 1em;
    background-color: #32C7D1;
    width: 10em;
}

#removeBtn{
    width: 50px;
}

input {
    padding-left: 1em;
    padding-right: 1em;
    width: 8em;
    height: 70px;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    margin: 0.3em;
}

@media only screen and (max-width: 600px) {}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 601px) {
  input {
    width: 12em;
    /* font-size: 2em; */
  }

}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}

</style>