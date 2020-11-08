<template>
    <div class="max-w-xl bg-white rounded overflow-hidden shadow-md mb-5 
    transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-teal-100">
        <div class="flex place-content-evenly flex-wrap">
            <div class="w-full md:w-11/12 lg:w-11/12 xl:w-11/12 ">
            <div class="px-8 py-6">
                    <div id="title" class="font-bold text-xl mb-2">
                        {{postModel.id + ') ' + postModel.title}}
                    </div>
                <p id="message" class="text-gray-700 text-base">
                    {{postModel.message}}
                </p>
                </div>  
            </div>
            <div class="grid grid-rows-1 place-items-stretch">
                <button id="moveup" v-if="postModel.index > 0" @click="moveUp" class="w-4 h-4 place-items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                </button> 
                <button id="movedown" v-if="postModel.index < 4" @click="moveDown" class="w-4 h-4 place-content-end">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import PostModel from '@/models/post.model';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Post extends Vue{
    @Prop() postModel: PostModel | undefined;

    moveUp(){
        this.$store.dispatch('moveUpPost', this.postModel);
    }
    moveDown(){
        this.$store.dispatch('moveDownPost', this.postModel);
    }
}
</script>