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
img{
    width: 2em;
    height: 2em;
}
</style>