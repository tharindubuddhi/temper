<template>
    <div class="flex place-content-evenly flex-wrap">
        <div class="w-full lg:w-5/12 xl:w-5/12 ">
            <h1 class="font-bold">Sortable Post List</h1>
            <Post v-for="post in postList" 
            :key="post.index" :postModel="post"/>
        </div>
        <div class="w-full lg:w-5/12 xl:w-5/12 ">
            <div v-if="actionLogList.length > 0" class="max-w-xl rounded overflow-hidden shadow-md">
                <div class="p-3">
                  <h1 class="font-bold">List of actions commited</h1>
                </div>
                <div class="bg-gray-300 p-2">
                    <ActionLog v-for="(log, index) in actionLogList" 
                    :key="index" :actionLogModel="log"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Post from '@/components/Post.vue';
  import ActionLog from '@/components/ActionLog.vue';
  import PostModel from '@/models/post.model.ts';
  import apiService from '@/services/apiservice.ts';

  @Component({
    components: {
      Post,
      ActionLog
    },
  })
  export default class Home extends Vue {

    created() {
      this.loadPosts();
    }

    get postList(): PostModel[] {
      if(this.$store.getters.getPostList && this.$store.getters.getPostList.length > 0){
        return this.$store.getters.getPostList;
      }
      else {
         return [];
      }
    }

    get actionLogList(): PostModel[] {
      if(this.$store.getters.getActionList && this.$store.getters.getActionList.length > 0){
        return this.$store.getters.getActionList.slice().reverse();
      }
      else {
         return [];
      }
    }

    loadPosts() {
      apiService.sendGetRequest('posts', { _limit: 5}).then(response => {
        let i = 0;
        const postList: PostModel[] = [];
        for(const item of response){
          const post: PostModel = {
            title: item.title,
            message: item.body,
            index: i,
            id:item.id
          };
          postList.push(post); 
          i++;
        }
        this.$store.dispatch('addPostList', postList);
      });
    }
  }
  </script>
