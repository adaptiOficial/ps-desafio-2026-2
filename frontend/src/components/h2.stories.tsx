import { Meta, StoryObj } from '@storybook/react'
import { H2 } from './titles'

const meta: Meta<typeof H2> = {
  title: 'Components/H2',
  component: H2,
  argTypes: {
    className: {
      control: 'text',
      description: 'Atributo que permite criar estilização personalizada.',
    },
    children: {
      control: 'text',
      description:
        'Atributo que permite passar o texto personalizado para o componente.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Um elemento de cabeçalho descreve brevemente o tópico da seção em que ele está.<br/><br/>Mais especificamente, O elemento HTML "h2" representa o segundo nível de título de seção. Ele é o segundo mais alto.',
      },
    },
  },
  args: { className: '', children: 'Componente de Título nível 2' },
} satisfies Meta<typeof H2>

export default meta

type Story = StoryObj<typeof H2>

export const Default: Story = {
  render: (args) => <H2 className={args.className}>{args.children}</H2>,
}
