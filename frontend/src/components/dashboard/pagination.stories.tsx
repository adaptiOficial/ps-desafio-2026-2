import { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './pagination'
import { cn } from '@/lib/utils'
import { LuChevronsLeft, LuChevronsRight } from 'react-icons/lu'
import { Button } from '../button'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    lastPage: {
      control: false,
      description:
        'Serve para controlar a navegação, limitar o range de páginas e esconder botões desnecessários.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Este componente é o de paginação. O propósito principal dele é permitir que o usuário navegue por diferentes páginas de conteúdo, com botões para avançar e retroceder entre as páginas, além de exibir um conjunto de números de página no meio.',
      },
    },
  },
  args: { lastPage: 3 },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '...',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" disabled={true}>
        <LuChevronsLeft />
      </Button>
      <Button
        variant={'default'}
        size="icon"
        className={cn({
          hidden: false && args.lastPage < 3 && args.lastPage !== 1,
        })}
      >
        {1}
      </Button>
      <Button
        variant={'outline'}
        size="icon"
        className={cn({ hidden: args.lastPage === 1 })}
      >
        {2}
      </Button>
      <Button
        variant={'outline'}
        size="icon"
        className={cn({ hidden: true && args.lastPage < 3 })}
      >
        {3}
      </Button>
      <Button variant="outline" size="icon" disabled={false}>
        <LuChevronsRight />
      </Button>
    </div>
  ),
}

export const OnePage: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (args) => (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" disabled={true}>
        <LuChevronsLeft />
      </Button>
      <Button
        variant={'default'}
        size="icon"
        className={cn({
          hidden: false && args.lastPage < 3 && args.lastPage !== 1,
        })}
      >
        {1}
      </Button>
      <Button variant="outline" size="icon" disabled={true}>
        <LuChevronsRight />
      </Button>
    </div>
  ),
}

export const TwoPages: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button variant="outline" size="icon" disabled={true}>
          <LuChevronsLeft />
        </Button>
        <Button
          variant={'default'}
          size="icon"
          className={cn({
            hidden: false && args.lastPage < 3 && args.lastPage !== 1,
          })}
        >
          {1}
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className={cn({ hidden: args.lastPage === 1 })}
        >
          {2}
        </Button>
        <Button variant="outline" size="icon" disabled={false}>
          <LuChevronsRight />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" disabled={false}>
          <LuChevronsLeft />
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className={cn({
            hidden: false && args.lastPage < 3 && args.lastPage !== 1,
          })}
        >
          {1}
        </Button>
        <Button
          variant={'default'}
          size="icon"
          className={cn({ hidden: args.lastPage === 1 })}
        >
          {2}
        </Button>
        <Button variant="outline" size="icon" disabled={true}>
          <LuChevronsRight />
        </Button>
      </div>
    </div>
  ),
}

export const ThreePages: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button variant="outline" size="icon" disabled={true}>
          <LuChevronsLeft />
        </Button>
        <Button
          variant={'default'}
          size="icon"
          className={cn({
            hidden: false && args.lastPage < 3 && args.lastPage !== 1,
          })}
        >
          {1}
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className={cn({ hidden: args.lastPage === 1 })}
        >
          {2}
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className={cn({ hidden: args.lastPage === 1 })}
        >
          {3}
        </Button>
        <Button variant="outline" size="icon" disabled={false}>
          <LuChevronsRight />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" disabled={false}>
          <LuChevronsLeft />
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className={cn({
            hidden: false && args.lastPage < 3 && args.lastPage !== 1,
          })}
        >
          {1}
        </Button>
        <Button
          variant={'default'}
          size="icon"
          className={cn({ hidden: args.lastPage === 1 })}
        >
          {2}
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className={cn({ hidden: args.lastPage === 1 })}
        >
          {3}
        </Button>
        <Button variant="outline" size="icon" disabled={false}>
          <LuChevronsRight />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" disabled={false}>
          <LuChevronsLeft />
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className={cn({
            hidden: false && args.lastPage < 3 && args.lastPage !== 1,
          })}
        >
          {1}
        </Button>
        <Button
          variant={'outline'}
          size="icon"
          className={cn({ hidden: args.lastPage === 1 })}
        >
          {2}
        </Button>
        <Button
          variant={'default'}
          size="icon"
          className={cn({ hidden: args.lastPage === 1 })}
        >
          {3}
        </Button>
        <Button variant="outline" size="icon" disabled={true}>
          <LuChevronsRight />
        </Button>
      </div>
    </div>
  ),
}
