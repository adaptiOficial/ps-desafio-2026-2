import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { LuRotateCw } from 'react-icons/lu'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'default-inverse',
        'secondary',
        'secondary-inverse',
        'destructive',
        'destructive-inverse',
        'outline',
        'ghost',
        'link',
      ],
      description: 'Variações de estilo do componente.',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
      description: 'Tamanho do botão.',
    },
    pending: {
      control: 'boolean',
      description: 'Quando ativado, ativa o estado de carregamento.',
    },
    asChild: {
      control: 'boolean',
      description:
        'A propriedade `asChild` permite que um componente seja renderizado como um elemento filho de outro, mantendo sua funcionalidade e estilo. Isso evita a criação de elementos HTML extras. Exemplo: `<Button asChild><a href="/home">Home</a></Button>` renderiza apenas um `<a>` (link) em vez de um `<button>`, mantendo o comportamento do `Button`.',
    },
    children: {
      control: 'text',
      description: 'Titulo do botão.',
    },
    pendingFallback: {
      control: 'text',
      type: 'string',
      description:
        'Ao habilitar o estado "pending", o texto inserido e o ícone de carregamento serão adicionados.',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    pending: false,
    asChild: false,
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado normal do botão.',
      },
    },
  },
  args: {
    children: 'Default',
  },
}

export const Pending: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'O Pending desabilita o clique (igual o disabled)  e adiciona ao texto um ícone de carregamento.',
      },
    },
  },
  args: {
    children: 'Aguarde',
    pending: true,
  },
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variações de tamanhos do botão.',
      },
    },
  },
  render: (args) => (
    <div className=" flex flex-wrap gap-5">
      <Button {...args} size="sm" className="h-fit">
        Small Button
      </Button>
      <Button {...args} size="default" className="h-fit">
        Default Button
      </Button>
      <Button {...args} size="lg" className="h-fit">
        Large Button
      </Button>
      <Button {...args} size="icon">
        <LuRotateCw />
      </Button>
    </div>
  ),
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variações de estilo do botão.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap gap-5 justify-around">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="default-inverse">
        Default Inverse
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="secondary-inverse">
        Secondary Inverse
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="destructive-inverse">
        Destructive Inverse
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
}
