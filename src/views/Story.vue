<template>
    <div id="story-component" class="carousel-wrapper">
        <VueSlickCarousel
            v-if="story && story.pages.length > 0"
            v-bind="slickOptions"
        >
            <div
                v-for="page in story.pages"
                v-bind:key="page.number"
                class="img-wrapper"
            >
                <img :src="page.image" class="rounded-lg"/>
                <span class="content">
                    {{ page.content }}
                </span>
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
    name: "Story",

    components: {
        VueSlickCarousel
    },

    props: {
        storyId: {
            type: String,
            required: true
        }
    },

    created() {
        this.fetchStory({ storyId: this.storyId });
    },

    data() {
        return {
            currentPageNumber: 1,
            slickOptions: {
                slidesToShow: 1,
                arrows: true,
                infinite: false,
                verticle: false
            }
        };
    },

    methods: {
        ...mapActions({
            fetchStory: "stories/fetchStory"
        }),

        gotoNextPage: function() {
            this.currentPageNumber++;
        },

        gotoPreviousPage: function() {
            this.currentPageNumber--;
        }
    },

    computed: {
        ...mapGetters({
            story: "stories/getStory"
        }),

        currentPage: function() {
            if (this.story && this.story.pages && this.story.pages.length > 0) {
                return this.story.pages.find(
                    page => page.number == this.currentPageNumber
                );
            } else {
                return null;
            }
        },

        nextPageAvailable: function() {
            return this.currentPageNumber < this.story.pages.length
                ? true
                : false;
        },

        previousPageAvailable: function() {
            return this.currentPageNumber > 1 ? true : false;
        }
    }
};
</script>

<style>
.carousel-wrapper {
    padding: 40px;
}
.img-wrapper img {
    margin: 0 auto 1rem;
    max-width: 100%;
    height: 200px;
    background-image: linear-gradient(gray 100%, transparent 0);
    border: 2px solid theme('colors.white');
}
</style>
