import { Meta, StoryObj } from '@storybook/react'
import {
  MVVCard,
  MVVContainer,
  MVVContent,
  MVVDescription,
  MVVHeader,
  MVVIcon,
  MVVTittle,
} from './mvv'
import { LuEye, LuGoal, LuSparkles } from 'react-icons/lu'

const meta = {
  title: 'Components/MVV',
  component: MVVContainer,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Variações de estilo do componente.',
    },
    className: {
      control: 'text',
      description: 'Atributo que permite criar estilização personalizada.',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de Missão, visão e valores, desenvolvido com o padrão [composition partner](https://vinniciusgomes.medium.com/implementando-composition-pattern-em-aplicacoes-react-4e8dc92742ff).',
      },
    },
  },
  args: { variant: 'default' },
} satisfies Meta<typeof MVVContainer>
export default meta

type Card = StoryObj<typeof MVVContainer>

export const Default: Card = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Estado padrão do MVV.',
      },
    },
  },
  render: (args) => (
    <MVVContainer variant={args.variant}>
      <MVVCard variant={args.variant}>
        <MVVHeader>
          <MVVIcon variant={args.variant}>
            <LuGoal className="w-20 h-20" />
          </MVVIcon>
        </MVVHeader>
        <MVVContent>
          <MVVTittle>MISSÃO</MVVTittle>
          <MVVDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            ipsam, numquam officia doloribus optio quos excepturi recusandae
            rerum laboriosam doloremque ipsum dolore quam veritatis maxime
            repudiandae non aperiam sit et.
          </MVVDescription>
        </MVVContent>
      </MVVCard>

      <MVVCard variant={args.variant}>
        <MVVHeader>
          <MVVIcon variant={args.variant}>
            <LuEye className="w-20 h-20" />
          </MVVIcon>
        </MVVHeader>
        <MVVContent>
          <MVVTittle>VISÃO</MVVTittle>
          <MVVDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            ipsam, numquam officia doloribus optio quos excepturi recusandae
            rerum laboriosam doloremque ipsum dolore quam veritatis maxime
            repudiandae non aperiam sit et.
          </MVVDescription>
        </MVVContent>
      </MVVCard>

      <MVVCard variant={args.variant}>
        <MVVHeader>
          <MVVIcon variant={args.variant}>
            <LuSparkles className="w-20 h-20" />
          </MVVIcon>
        </MVVHeader>
        <MVVContent>
          <MVVTittle>VALORES</MVVTittle>
          <MVVDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum est
            quibusdam ratione deleniti rerum perferendis deserunt at corrupti
            accusamus illo quasi dignissimos numquam dolorem, doloribus ad
            nesciunt quas temporibus consequuntur?
          </MVVDescription>
        </MVVContent>
      </MVVCard>
    </MVVContainer>
  ),
}
export const Variant: Card = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Variante card do MVV.',
      },
    },
  },
  render: () => (
    <MVVContainer variant={'card'}>
      <MVVCard variant={'card'}>
        <MVVHeader>
          <MVVIcon variant={'card'}>
            <LuGoal className="w-20 h-20" />
          </MVVIcon>
        </MVVHeader>
        <MVVContent>
          <MVVTittle>MISSÃO</MVVTittle>
          <MVVDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
            tempore corporis distinctio, iste voluptas nemo tenetur cum neque
            cumque vel. Voluptatibus impedit necessitatibus eius corporis
            temporibus aperiam delectus ipsa aliquid!
          </MVVDescription>
        </MVVContent>
      </MVVCard>

      <MVVCard variant={'card'}>
        <MVVHeader>
          <MVVIcon variant={'card'}>
            <LuEye className="w-20 h-20" />
          </MVVIcon>
        </MVVHeader>
        <MVVContent>
          <MVVTittle>VISÃO</MVVTittle>
          <MVVDescription>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
            accusantium distinctio quos ut repudiandae iste porro! Architecto
            iste dolorem, cupiditate, quas rem vero doloribus ad iusto fugiat
            esse impedit obcaecati.
          </MVVDescription>
        </MVVContent>
      </MVVCard>

      <MVVCard variant={'card'}>
        <MVVHeader>
          <MVVIcon variant={'card'}>
            <LuSparkles className="w-20 h-20" />
          </MVVIcon>
        </MVVHeader>
        <MVVContent>
          <MVVTittle>VALORES</MVVTittle>
          <MVVDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum ipsam
            amet unde, tempora natus ullam. Dicta unde veniam possimus,
            inventore, optio vitae ex, quia odit voluptatibus blanditiis fugiat
            harum deserunt?
          </MVVDescription>
        </MVVContent>
      </MVVCard>
    </MVVContainer>
  ),
}
