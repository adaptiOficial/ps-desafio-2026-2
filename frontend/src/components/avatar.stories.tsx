import { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    className: {
      control: 'text',
      description: 'Atributo que permite criar estilização personalizada.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'O Avatar é um elemento de interface gráfica usado para representar visualmente um usuário com uma imagem de perfil ou, caso a imagem não esteja disponível, com um fallback. No nosso caso, o fallback normalmente é a letra inicial do nome.',
      },
    },
  },
  args: { className: '' },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comportamento padrão, quando a imagem é carregada com sucesso.',
      },
    },
  },
  render: (args) => (
    <Avatar className={args.className}>
      <AvatarImage
        src={'storybook/logo.png'}
        className="object-cover"
        alt="avatar"
      />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comportamento de fallback, quando a imagem NÃO é carregada com sucesso.',
      },
    },
  },
  render: (args) => (
    <Avatar className={args.className}>
      <AvatarImage src={''} className="object-cover" alt="avatar" />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  ),
}
