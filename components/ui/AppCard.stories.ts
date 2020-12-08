import { Meta, Story } from '../../node_modules/@storybook/vue/types-6-0'
import AppCard from './AppCard.vue'

export default {
  title: 'UI/App/Card',
  component: AppCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xh0oqTfxDeCMsMmoBAYHWW/Qiskit-components?node-id=6%3A86'
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { AppCard },
  props: Object.keys(argTypes),
  template: '<AppCard :cta-label="ctaLabel" :image="image" :tags="tags" :title="title" :to="to">{{ vSlot }}</AppCard>'
})

export const Default = Template.bind({})
Default.args = {
  ctaLabel: 'Learn more',
  image: 'https://via.placeholder.com/300',
  tags: ['documentation', 'news'],
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  to: 'https://example.com',
  vSlot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}
