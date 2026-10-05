import { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    className: {
      control: 'text',
      description: 'Atributo que permite criar estilização personalizada.',
    },
    disabled: {
      control: 'boolean',
      description: 'Especifica se o campo está desabilitado ou não.',
    },
    error: {
      control: 'text',
      description: 'Mostra o erro, caso ocorra.',
    },
    placeholder: {
      control: 'text',
      description: 'Especifica uma dica curta que descreve o valor esperado.',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Variações do tamanho do input.',
    },
    type: {
      control: 'select',
      options: ['text', 'file'],
      description: 'Variações do tipo de input.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Esta tag especifica um campo de entrada onde o usuário pode inserir dados.',
      },
    },
  },
  args: {
    className: '',
    disabled: false,
    error: '',
    placeholder: 'Digite algo aqui...',
    size: 'default',
    type: 'text',
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'O formato padrão do input.',
      },
    },
  },
  render: (args) => <Input {...args} />,
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variação do campo input desabilitado.',
      },
    },
  },
  render: (args) => <Input {...args} disabled />,
}

export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variação com erro no campo input.',
      },
    },
  },
  render: (args) => <Input {...args} error="Algo foi digitado errado." />,
}

export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variações de tamanho do input.',
      },
    },
  },
  render: (args) => (
    <div className="space-y-2">
      <Input {...args} size="lg" />
      <Input {...args} size="default" />
      <Input {...args} size="sm" />
    </div>
  ),
}

export const TypeFile: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variação do tipo File do input.',
      },
    },
  },
  render: (args) => <Input {...args} type="file" />,
}
