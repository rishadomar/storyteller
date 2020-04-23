<template>
    <div id="stories-component">
        <h2 class="text-white text-2xl font-semibold mt-6">Latest Stories</h2>
        <ul class="p-2 mt-6">
            <li v-for="story in stories" :key="story.id">
                <a class="story-link flex flex-row items-center justify-center" @click="selectStory(story.id)">
                    <div class="thumbnail rounded-lg mr-4" v-bind:style="{ backgroundImage: 'url(' + story.image + ')' }"></div>
                    <p class="text-white hover:text-purple font-bold">{{story.titles['en']}}</p>
                </a>
            </li>
        </ul>
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
#stories-component a {
    cursor: pointer;
}

.story-link .thumbnail {
    width: 50px;
    height: 50px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
