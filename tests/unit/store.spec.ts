// This Test suite tests the vuex store functionality. 
// The vuex store state is persistent across different tests. Therefore the test order is important.

import { createLocalVue } from "@vue/test-utils"
import Vuex from 'vuex'
import storeConfig from '@/store/storeconfig'
import PostModel from '@/models/post.model'
import ActionLogModel from '@/models/actionLog.model'
  
const localVue = createLocalVue()
localVue.use(Vuex)
const initialPostList: PostModel[] = [
    {
      id: 1,
      index: 0,
      message: 'test 1',
      title: 'test 1'
    },
    {
      id: 2,
      index: 1,
      message: 'test 2',
      title: 'test 2'
    },
    {
      id: 3,
      index: 2,
      message: 'test 3',
      title: 'test 3'
    }
  ]

  const actionList: ActionLogModel[] = [
    {
      newIndex: 1,
      oldIndex: 0,
      message: 'test 1',
    },
  ]

describe('store.index.ts', () => {
    let store: any
    let postList: any
    beforeEach(() => {
        var cloneStore = Object.assign({}, storeConfig)
        store = new Vuex.Store(cloneStore)
        postList = Object.assign([], initialPostList)
    })
   

    it('store initial state getters values', () => {
        expect(store.getters.getPostList).toHaveLength(0)
        expect(store.getters.getActionList).toHaveLength(0)
    })

    it('updates postlist getters when add post list method is called.', () => {
        store.dispatch('addPostList', postList)
        expect(store.getters.getPostList).toHaveLength(postList.length)
    })

    it('updates post position with move down action.', () => {
        const postId1 = store.getters.getPostList.filter((obj: PostModel) => obj.id == 1)[0]
        store.dispatch('moveDownPost', postId1)
        const postId1New = store.getters.getPostList.filter((obj: PostModel) => obj.id == 1)[0]
        expect(postId1New.index).toBe(1)
        expect(store.getters.getActionList).toHaveLength(1)
    })

    it('updates post positions with move up action.', () => {
        const postId1 = store.getters.getPostList.filter((obj: PostModel) => obj.id == 1)[0]
        store.dispatch('moveUpPost', postId1)
        const postId1New = store.getters.getPostList.filter((obj: PostModel) => obj.id == 1)[0]
        expect(postId1New.index).toBe(0)
        expect(store.getters.getActionList).toHaveLength(2)
    })

    it('updates post position and actionlog list with time travel action.', () => {
        store.dispatch('timeTravelPost')
        const postId1 = store.getters.getPostList.filter((obj: PostModel) => obj.id == 1)[0]
        expect(postId1.index).toBe(1)
        expect(store.getters.getActionList).toHaveLength(1)
    })
})