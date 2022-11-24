<template>
    <div>
        <input type="text" v-model="question" placeholder="Type your word here...">
    </div>
</template>
    
<script>
export default {
    name: 'OneWord',
    props: {
        word: Object
    },
    data: function () {
        return {
        }
    },
    methods: {
    }
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input{
        padding-left: 1em;
        padding-right: 1em;
        width: 530px;
        height: 70px;
        border-radius: 0.5em;
        font-size: 2em;
        font-weight: 600;   
        margin: 0.3em;
    }
    
</style>
    