import { mount, createLocalVue } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import Vuex from 'vuex'
import PostModel from '@/models/post.model'
import ActionLogModel from '@/models/actionLog.model'

const localVue = createLocalVue()
localVue.use(Vuex)

const postList: PostModel[] = [
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

describe('Home.vue', () => {

  let getters: any
  let store: any
  let actions: any

  beforeEach(() => {
    getters = {
      getPostList: () => postList,
      getActionList: () => actionList
    }

    actions = {
      moveUpPost: jest.fn(),
      moveDownPost: jest.fn(),
      addActionLog: jest.fn(),
      timeTravelPost: jest.fn()
    }

    store = new Vuex.Store({
      getters,
      actions,
    })
  })

  it('renders post list when page loads.', () => {
    const wrapper = mount(Home, { store, localVue })
    expect(wrapper.findAll('#title').length).toBe(getters.getPostList().length)
    expect(wrapper.find('#title').text()).toMatch(getters.getPostList()[0].title)
  })

  it('renders action list when store has data.', () => {
    const wrapper = mount(Home, { store, localVue })
    expect(wrapper.findAll('#actionlogmessage').length).toBe(getters.getActionList().length)
    expect(wrapper.find('#actionlogmessage').text()).toMatch(getters.getActionList()[0].message)
  })

  it('move up, down methods dispatches relevant methods', () => {
    const wrapper = mount(Home, { store, localVue })
    const btnmoveup = wrapper.find('#moveup')
    btnmoveup.trigger('click');
    expect(actions.moveUpPost).toHaveBeenCalled()
    const btnmovedown = wrapper.find('#movedown')
    btnmovedown.trigger('click');
    expect(actions.moveDownPost).toHaveBeenCalled()
    // expect(actions.addActionLog).toHaveBeenCalledTimes(2)
  })

  it('time travel method dispatches relevant methods and mutations', async () => {
    const wrapper = mount(Home, { store, localVue })
    const btntimeTravel = wrapper.find('#timeTravel')
    await btntimeTravel.trigger('click');
    expect(actions.timeTravelPost).toHaveBeenCalled()
  })
})