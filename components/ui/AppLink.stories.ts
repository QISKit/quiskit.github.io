import { Meta, Story } from '../../node_modules/@storybook/vue/types-6-0'
import AppLink from './AppLink.vue'

export default {
  title: 'UI/App/Link',
  component: AppLink
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { AppLink },
  props: Object.keys(argTypes),
  template: '<AppLink :is-static="isStatic" :segment="segment" :url="url">{{ vSlot }}</AppLink>'
})

export const Default = Template.bind({})
Default.args = {
  isStatic: false,
  segment: undefined,
  url: 'https://example.com',
  vSlot: 'Lorem ipsum'
}
