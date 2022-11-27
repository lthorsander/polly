<template>
    <div>
        <div id="gameBtnArea">
            <div v-for="(words, index) in allWords" :key="index">
                <div>
                    <input v-model="words.word" placeholder="Type your word here..." />
                    <button id="removeBtn" type="button" @click="removeWord(index)">
                        X
                    </button>
                </div>
            </div>
            <button id="addBtn" type="button" @click="addWord()">
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