<template>
    <div id="stories-component">
        <h2 class="text-white text-2xl font-semibold mt-6">Latest Stories</h2>
        <ul class="px-6 mt-6">
            <li v-for="story in stories" :key="story.id">
                <a class="story-link flex flex-col items-center justify-center hover:text-purple " @click="selectStory(story.id)">
                    <div class="thumbnail rounded-lg" v-bind:style="{ backgroundImage: 'url(' + story.image + ')' }"></div>
                    <p class="text-white font-bold mt-2 text-xl">{{story.titles['en']}}</p>
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

.story-link {
    position: relative;
}

.story-link::after {
    content: "";
    z-index: 1;
    position: absolute;
    bottom:0;
    left: 0;
    width: 100%;
    height: 50px;
    background: -moz-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
    background: -webkit-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
    border-radius: 0.5rem;
}

.story-link .thumbnail {
    width: 100%;
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: all .3s ease;
}

.story-link p {
    position: absolute;
    z-index: 2;
    left: 10px;
    bottom: 10px;
}

.story-link:hover p {
    color: theme('colors.primary');
}

</style>
