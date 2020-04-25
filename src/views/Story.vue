<template>
    <div id="story-component" class="carousel-wrapper">
        <VueSlickCarousel
            v-if="story"
            v-bind="slickOptions"
            @afterChange="pageLoaded"
            @beforeChange="beforePageLoaded"
        >
            <div
                v-for="page in story.pages"
                v-bind:key="page.number"
                class="img-wrapper"
            >
                <img :src="page.image" class="rounded-lg" />
                <span class="content">
                    {{ page.content }}
                </span>
            </div>
        </VueSlickCarousel>

        <button v-if="playing && !paused" @click="pauseAudio">Pause</button>
        <button v-if="paused" @click="continueAudio">Continue</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

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

    mounted() {
    },

    data() {
        return {
            audio: null,
            playing: false,
            paused: false,
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
            fetchStory: "stories/fetchStoryFromCache"
        }),

        beforePageLoaded(oldSlideIndex, newSlideIndex) {
            console.log('before/after page loading: ' + oldSlideIndex + '/' + newSlideIndex)
            if (this.playing) {
                this.stopAudio()
            }
        },

        pageLoaded(slideIndex) {
            this.currentPageNumber = slideIndex + 1
            this.playAudio()
            console.log('page loaded: ' + this.currentPageNumber)
        },

        stopAudio() {
            if (this.playing) {
                this.audio.pause()
                this.playing = false
            }
        },

        playAudio() {
            let page = this.story.pages[this.currentPageNumber - 1]
            this.audio = new Audio(page.audio)
            this.audio.play()
            this.playing = true
        },

        pauseAudio() {
            console.log('Pause audio')
            if (this.playing) {
                this.audio.pause()
                this.paused = true
            }
        },

        continueAudio() {
            console.log('Continue audio')
            if (this.paused) {
                this.audio.play()
                this.paused = false
            }
        },

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
    border: 2px solid theme("colors.white");
}
</style>
