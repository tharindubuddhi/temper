import ActionLogModel from '@/models/actionLog.model'
import { PostState } from '@/models/postState.model'
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

Vue.use(Vuex)
const store: StoreOptions<PostState> = {
  state: {
    postList: [],
    actionList: [],
  },
  getters: {
    getPostList(state){
      return state.postList;
    },
    getActionList(state){
      return state.actionList;
    }
  },
  mutations: {
    moveUpPost(state, index){
      state.postList[index].index = index - 1;
      state.postList[index - 1].index = index;
      state.postList.splice(index - 1, 0, state.postList.splice(index, 1)[0]);
    },
    moveDownPost(state, index){
      state.postList[index].index = index + 1;
      state.postList[index + 1].index = index;
      state.postList.splice(index + 1, 0, state.postList.splice(index, 1)[0]);
    },

    addPostList(state, posts){
      state.postList = posts;
    },

    addActionLog(state, action){
      state.actionList.push(action);
    },

    timeTravelPost(state){
      state.actionList.pop();
    }
  },
  actions: {
    moveUpPost(context, data){
        const newIndex = data.index -1;
        const actionLog: ActionLogModel = {
            message: 'Moved post ' + data.id + ' from index ' + data.index + ' to index ' + newIndex,
            newIndex: newIndex,
            oldIndex: data.index,
        };
        context.commit('addActionLog', actionLog);
        context.commit('moveUpPost', data.index);
    },

    moveDownPost(context, data){
        const newIndex = data.index + 1;
        const actionLog: ActionLogModel = {
            message: 'Moved post ' + data.id + ' from index ' + data.index + ' to index ' + newIndex,
            newIndex: newIndex,
            oldIndex: data.index,
        };
        context.commit('addActionLog', actionLog);
        context.commit('moveDownPost', data.index);
    }, 

    addPostList(context, posts){
      context.commit('addPostList', posts);
    },

    timeTravelPost(context){
      if(this.state.actionList.length > 0){
        const actionLog = this.state.actionList[this.state.actionList.length - 1];
        if(actionLog.newIndex > actionLog.oldIndex) {
            context.commit('moveUpPost', actionLog.newIndex);
        }
        else {
            context.commit('moveDownPost', actionLog.newIndex);
        }
        context.commit('timeTravelPost');
      }   
    }
  },
  modules: {
  }
}

export default store