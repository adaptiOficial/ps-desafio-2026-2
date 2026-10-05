import { Meta, StoryObj } from '@storybook/react'
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from './popover'
import { Button } from '../button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          'Popover é um tipo de caixa flutuante que aparece quando o usuário interage com algum elemento. Ele serve para mostrar informações extras ou opções sem sair da tela atual.<br/><br/> Obs: O elemento "PopoverContent" possui um atributo de className, ou seja, é possível estilizar o conteúdo do Popover. Contudo, por conta de limitações do padrão Composition Pattern que está sendo utilizado, não é possível alterá-lo nessa História. ',
      },
    },
  },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Formato Default do Popover.',
      },
    },
  },
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button>Clique Aqui</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Conteúdo do Popover</p>
      </PopoverContent>
    </Popover>
  ),
}

export const AnchorVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Formato Variant do Popover baseado em Anchor (Âncora). O Anchor permite que o posicionamento do conteúdo do popover seja diferente da posição padrão (que é próximo ao Trigger). Para isso, é necessário envolver o elemento na tag "PopoverAnchor" para ele servir como âncora do popover.',
      },
    },
  },
  render: () => (
    <Popover>
      <div className="flex max-sm:flex-col max-sm:gap-10 sm:items-center sm:gap-32">
        <PopoverTrigger>
          <Button>Abrir Popover</Button>
        </PopoverTrigger>

        <PopoverAnchor>
          <span className="text-sm text-muted-foreground">
            ⚓ Aqui é o anchor
          </span>
        </PopoverAnchor>
      </div>
      <PopoverContent>
        <p>Conteúdo do Popover</p>
      </PopoverContent>
    </Popover>
  ),
}
