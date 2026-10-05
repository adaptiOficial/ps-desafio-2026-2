import type { Meta, StoryObj } from '@storybook/react'
import {
  BlogCard,
  BlogCardHeader,
  BlogCardImage,
  BlogCardContent,
  BlogCardTitle,
  BlogCardInformation,
  BlogCardButton,
} from './blogCard'

const meta = {
  title: 'Components/BlogCard',
  component: BlogCard,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'horizontal', 'vertical'],
      description: 'Variações de estilo do componente.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente de card de produto, desenvolvido com o padrão [composition partner](https://vinniciusgomes.medium.com/implementando-composition-pattern-em-aplicacoes-react-4e8dc92742ff).',
      },
    },
  },
  args: { variant: 'default' },
} satisfies Meta<typeof BlogCard>
export default meta

type Story = StoryObj<typeof BlogCard>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado padrao do card.',
      },
    },
  },
  render: (args) => (
    <BlogCard {...args}>
      <BlogCardHeader>
        <BlogCardImage
          src="storybook/blogCard/blogcard.jpg"
          alt="Imagem blogCard"
          width={10}
          height={10}
        />
      </BlogCardHeader>
      <BlogCardContent>
        <BlogCardTitle>A importância de se ter um site seguro</BlogCardTitle>
        <BlogCardInformation>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis fuga
          maiores et voluptates atque illo quas minus reiciendis.
        </BlogCardInformation>
        <BlogCardButton>Continuar Lendo</BlogCardButton>
      </BlogCardContent>
    </BlogCard>
  ),
}

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado padrao do card.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col  items-center  justify-center">
        <h1 className="text-center text-xl">default</h1>
        <BlogCard {...args} variant="default">
          <BlogCardHeader>
            <BlogCardImage
              src="storybook/blogCard/blogcard.jpg"
              alt="Imagem blogCard"
              width={10}
              height={10}
            />
          </BlogCardHeader>
          <BlogCardContent>
            <BlogCardTitle>
              A importância de se ter um site seguro
            </BlogCardTitle>
            <BlogCardInformation>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              fuga maiores et voluptates atque illo quas minus reiciendis.
            </BlogCardInformation>
            <BlogCardButton>Continuar Lendo</BlogCardButton>
          </BlogCardContent>
        </BlogCard>
      </div>
      <div className="flex flex-col">
        <h1 className="text-center text-xl">horizontal</h1>
        <BlogCard {...args} variant="horizontal">
          <BlogCardHeader>
            <BlogCardImage
              src="storybook/blogCard/blogcard.jpg"
              alt="Imagem blogCard"
              width={10}
              height={10}
            />
          </BlogCardHeader>
          <BlogCardContent>
            <BlogCardTitle>
              A importância de se ter um site seguro
            </BlogCardTitle>
            <BlogCardInformation>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              fuga maiores et voluptates atque illo quas minus reiciendis.
            </BlogCardInformation>
            <BlogCardButton>Continuar Lendo</BlogCardButton>
          </BlogCardContent>
        </BlogCard>
      </div>
      <div className="flex  flex-col items-center  justify-center">
        <h1 className="text-center text-xl">vertical</h1>
        <BlogCard {...args} variant="vertical">
          <BlogCardHeader>
            <BlogCardImage
              src="storybook/blogCard/blogcard.jpg"
              alt="Imagem blogCard"
              width={10}
              height={10}
            />
          </BlogCardHeader>
          <BlogCardContent>
            <BlogCardTitle>
              A importância de se ter um site seguro
            </BlogCardTitle>
            <BlogCardInformation>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              fuga maiores et voluptates atque illo quas minus reiciendis.
            </BlogCardInformation>
            <BlogCardButton>Continuar Lendo</BlogCardButton>
          </BlogCardContent>
        </BlogCard>
      </div>
    </div>
  ),
}
