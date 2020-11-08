import { shallowMount } from '@vue/test-utils'
import Post from '@/components/Post.vue'
import PostModel from '@/models/post.model'

describe('Post.vue', () => {
  it('renders props when passed', () => {
    const postModel: PostModel = {
      id: 1,
      index: 0,
      message: 'Test Message',
      title: 'Test Title'
    }
    const wrapper = shallowMount(Post, {
      propsData: { postModel: postModel }
    })
    expect(wrapper.find('#title').text()).toMatch(postModel.title);
    expect(wrapper.find('#message').text()).toMatch(postModel.message);
  })
})
