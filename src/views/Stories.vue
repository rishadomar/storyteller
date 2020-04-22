<template>
    <div id="stories-component">
        <h1>Stories</h1>
        <p v-for="story in stories" :key="story.id" @click="selectStory(story.id)">{{story.titles['en']}}</p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Stories",

    components: {
    },

    created() {
        this.fetchTitles()
    },

    data() {
        return {
        };
    },

    methods: {
        ...mapActions({
            fetchTitles: "stories/fetchTitles"
        }),

        selectStory: function(id) {
            this.$router.push({
                path: "story/" + id
            });
        },
    },

    computed: {
        ...mapGetters({
            stories: "stories/getTitles",
        })
    }
};
</script>

<style scoped>

</style>