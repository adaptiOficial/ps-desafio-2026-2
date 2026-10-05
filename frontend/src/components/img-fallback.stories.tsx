import { Meta, StoryObj } from '@storybook/react'
import { ImgSuspense } from './img-fallback'
import { LuImageOff } from 'react-icons/lu'
import { Skeleton } from './skeleton'

const meta: Meta<typeof ImgSuspense> = {
  title: 'Components/ImgSuspense',
  component: ImgSuspense,
  argTypes: {
    className: {
      control: 'text',
      description: 'Atributo que permite criar estilização personalizada.',
    },
    loadingFallback: {
      control: false,
      description:
        'Atributo que permite desingar o que será mostrado enquanto o processo de carregamento da imagem estiver acontecendo.',
    },
    errorFallback: {
      control: false,
      description:
        'Atributo que permite desingar o que será mostrado enquanto o processo de carregamento da imagem resultar em ERRO.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Este componente tem como objetivo melhorar o controle visual de imagens, exibindo um entre três possíveis estados.',
      },
    },
  },
  args: { className: 'size-10 rounded aspect-square object-cover' },
} satisfies Meta<typeof ImgSuspense>

export default meta

type Story = StoryObj<typeof ImgSuspense>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'O estado Default ocorre quando a imagem é carregada normalmente.',
      },
    },
  },
  render: (args) => (
    <ImgSuspense
      src={'storybook/logo.png'}
      className={args.className}
      loadingFallback={<Skeleton className="size-10 rounded" />}
      errorFallback={
        <div className="size-10 rounded bg-muted flex justify-center items-center">
          <LuImageOff className="text-muted-foreground" />
        </div>
      }
    />
  ),
}

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'O estado de carregamento (loading) representa o período em que o caminho da imagem está sendo acessado, mas ainda não houve retorno.',
      },
    },
  },
  render: () => <Skeleton className="size-10 rounded" />,
}

export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'O estado de erro é exibido quando não é possível carregar a imagem.',
      },
    },
  },
  render: (args) => (
    <ImgSuspense
      src={'invalidPath.png'}
      className={args.className}
      loadingFallback={<Skeleton className="size-10 rounded" />}
      errorFallback={
        <div className="size-10 rounded bg-muted flex justify-center items-center">
          <LuImageOff className="text-muted-foreground" />
        </div>
      }
    />
  ),
}
