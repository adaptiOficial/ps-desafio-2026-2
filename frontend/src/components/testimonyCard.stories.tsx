import type { Meta, StoryObj } from '@storybook/react'

import {
  TestimonyCard,
  TestimonyBody,
  TestimonyFooter,
  TestimonyAvatar,
  TestimonyName,
  TestimonyHeader,
  TestimonyIcon,
  TestimonyAuthor,
} from './testimonyCard'

const meta = {
  title: 'Components/TestimonyCard',
  component: TestimonyCard,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente de Testimony Card, desenvolvido com o padrão [composition partner](https://vinniciusgomes.medium.com/implementando-composition-pattern-em-aplicacoes-react-4e8dc92742ff).',
      },
    },
  },
} satisfies Meta<typeof TestimonyCard>
export default meta

type Story = StoryObj<typeof TestimonyCard>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado padrao do card.',
      },
    },
  },
  render: (args) => (
    <TestimonyCard {...args}>
      <TestimonyBody>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
        quisquam officia incidunt consequuntur tenetur nisi reprehenderit optio,
        sed alias nihil temporibus sapiente illo deleniti aliquid, adipisci
        possimus expedita sunt quas.
      </TestimonyBody>
      <TestimonyFooter>
        <TestimonyAvatar
          src={'storybook/testimonyCard/foto.jpg'}
          alt={'fotinha para teste'}
        />
        <TestimonyName>Moça</TestimonyName>
      </TestimonyFooter>
    </TestimonyCard>
  ),
}
export const Variant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado secundario do card.',
      },
    },
  },
  render: (args) => (
    <TestimonyCard {...args}>
      <TestimonyHeader>
        <TestimonyIcon />
      </TestimonyHeader>
      <TestimonyBody>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis,
        quisquam officia incidunt consequuntur tenetur nisi reprehenderit optio,
        sed alias nihil temporibus sapiente illo deleniti aliquid, adipisci
        possimus expedita sunt quas
      </TestimonyBody>
      <TestimonyFooter>
        <TestimonyAuthor>Paulinelle</TestimonyAuthor>
      </TestimonyFooter>
    </TestimonyCard>
  ),
}
