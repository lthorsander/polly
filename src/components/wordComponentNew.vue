<template>
    <div>
        <div id="WordCompGameBtnArea">
            <div v-for="(words, index) in allWords" :key="index">
                <div id="WordCompInputArea">
                    <input v-model="words.word" placeholder="Type your word here..." />
                    <img id="removeBtn" @click="removeWord(index)"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/cross-icon.png"
                        alt="">
                </div>
            </div>
            <button id="WordCompAddBtn" ref="addBtn" type="button" @click="addWord()">
                ADD WORD
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "wordComp",
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
            this.$emit('scrollDown');
        },
        removeWord(index) {
            this.allWords.splice(index, 1);
        },
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#WordCompAddBtn {
    color: white;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    height: 70px;
    width: 600px;
    background-color: #32C7D1;
}

#removeBtn {
    justify-self: center;
    height:70px;
}


#WordCompInputArea {
    margin: 1em;
    display: flex;
    justify-content: center;
}

input {
    padding-left: 1em;
    padding-right: 1em;
    width: 430px;
    height: 70px;
    border-radius: 0.5em;
    font-size: 2em;
    font-weight: 600;
    margin-right: 0.5em;
}
</style>