import { shallowMount } from '@vue/test-utils'
import ActionLog from '@/components/ActionLog.vue'
import ActionLogModel from '@/models/actionLog.model'

describe('ActionLog.vue', () => {
  it('renders props when passed', () => {
    const actionLogModel: ActionLogModel = {
      oldIndex: 0,
      newIndex: 1,
      message: 'Test Message',
    }
    const wrapper = shallowMount(ActionLog, {
      propsData: { actionLogModel: actionLogModel }
    })
    expect(wrapper.find('#actionlogmessage').text()).toMatch(actionLogModel.message);
  })
})
