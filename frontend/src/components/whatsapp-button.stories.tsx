import type { Meta, StoryObj } from '@storybook/react'
import WppButton from './whatsapp-button'

const meta: Meta<typeof WppButton> = {
  title: 'Components/WppButton',
  component: WppButton,
  tags: ['autodocs'],
  argTypes: {
    cellphone: {
      control: 'text',
      description:
        'Número de celular no formato brasileiro (ex: 219999999).',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamanho do botão.',
    },
    color: {
      control: 'color',
      description: 'Cor do botão (ícone).',
    },
    className: {
      control: 'text',
      description:
        'Classe personalizada para estilização visual do botão (ex: bg, hover, rounded, shadow). Aplica-se à `<div>` interna.',
    },
    linkClassName: {
      control: 'text',
      description: 'Classe personalizada para o elemento <Link> que envolve o botão. Ideal para posicionamento.',
    },
    isFixed: {
      control: 'boolean',
      description: 'Define se o botão será fixo na tela.',
    },
  },
  args: {
    cellphone: '219999999',
    color: '#145990',
    size: 'default',
    isFixed: false,
  },
  parameters: {
    docs: {
      description: {
        component: `
**WppButton** é um botão flutuante do WhatsApp que redireciona o usuário para uma conversa com o número de telefone fornecido.

Ele suporta diferentes tamanhos e cores, sendo ideal para chamadas rápidas em interfaces responsivas.

Este componente é construído utilizando o padrão de composição (Composition Pattern), que promove reutilização e flexibilidade na interface.

🔗 Saiba mais sobre Composition Pattern: [Leia o artigo no Medium](https://vinniciusgomes.medium.com/implementando-composition-pattern-em-aplicacoes-react-4e8dc92742ff)
        `,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof WppButton>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Botão padrão com tamanho "default" e número de exemplo.',
      },
    },
  },
  args: {
    size: 'default',
    isFixed: false,
  },
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstração dos diferentes tamanhos do botão.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-10">
      <WppButton {...args} size="sm" isFixed={false} />
      <WppButton {...args} size="default" isFixed={false} />
      <WppButton {...args} size="lg" isFixed={false} />
    </div>
  ),
}

export const CustomAspects: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Possiveis estilizações do botão whatsapp.',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-12 justify-center items-center">
      <WppButton {...args} className="rounded-full bg-[#62A3CE] p-3" color='white' isFixed={false} />
      <WppButton {...args} className="bg-[hsl(140,85%,50%)] rounded-md w-[90px] h-[90px] p-3"
        isFixed={false} color="white"/>
      <WppButton {...args} isFixed={false} />
    </div>
  ),
}
