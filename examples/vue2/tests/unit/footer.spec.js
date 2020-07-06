import { shallowMount } from '@vue/test-utils'
import myFooter from '@/components/Footer.vue'

describe('Footer.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(myFooter)
    expect(wrapper.text()).toMatch('TodoMVC')
  })
})
