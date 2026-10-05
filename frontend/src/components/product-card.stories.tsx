import type { Meta, StoryObj } from '@storybook/react'
import {
  ProductCard,
  ProductCardBody,
  ProductCardButton,
  ProductCardDescription,
  ProductCardFav,
  ProductCardFooter,
  ProductCardHeader,
  ProductCardImage,
  ProductCardPrice,
  ProductCardTitle,
} from './product-card'

const meta = {
  title: 'Components/ProductCard',
  component: ProductCardFooter,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'vertical'],
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
} satisfies Meta<typeof ProductCardFooter>
export default meta

type Story = StoryObj<typeof ProductCardFooter>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado padrao do card.',
      },
    },
  },
  render: (args) => (
    <ProductCard>
      <ProductCardHeader>
        <ProductCardImage
          src="storybook/productCard/imageProductcard.jpg"
          alt="imagem do card"
        />
        <ProductCardFav />
      </ProductCardHeader>
      <ProductCardBody>
        <ProductCardTitle>Camiseta</ProductCardTitle>
        <ProductCardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing Recusandae
        </ProductCardDescription>
      </ProductCardBody>
      <ProductCardFooter {...args}>
        <ProductCardPrice>R$60,00</ProductCardPrice>
        <ProductCardButton>Comprar</ProductCardButton>
      </ProductCardFooter>
    </ProductCard>
  ),
}
export const Variant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variações de estilo do card.',
      },
    },
  },
  render: (args) => (
    <div className="flex space-x-10">
      <div>
        <h1 className=" text-center text-xl ">Default</h1>
        <ProductCard>
          <ProductCardHeader>
            <ProductCardImage
              src="storybook/productCard/imageProductcard.jpg"
              alt="imagem do card"
            />
            <ProductCardFav />
          </ProductCardHeader>
          <ProductCardBody>
            <ProductCardTitle>Camiseta</ProductCardTitle>
            <ProductCardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing Recusandae
            </ProductCardDescription>
          </ProductCardBody>
          <ProductCardFooter {...args} variant="default">
            <ProductCardPrice>R$60,00</ProductCardPrice>
            <ProductCardButton>Comprar</ProductCardButton>
          </ProductCardFooter>
        </ProductCard>
      </div>
      <div>
        <h1 className=" text-center text-xl">Vertical</h1>
        <ProductCard>
          <ProductCardHeader>
            <ProductCardImage
              src="storybook/productCard/imageProductcard.jpg"
              alt="imagem do card"
            />
            <ProductCardFav />
          </ProductCardHeader>
          <ProductCardBody>
            <ProductCardTitle>Camiseta</ProductCardTitle>
            <ProductCardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing Recusandae
            </ProductCardDescription>
          </ProductCardBody>
          <ProductCardFooter {...args} variant="vertical">
            <ProductCardPrice>R$60,00</ProductCardPrice>
            <ProductCardButton>Comprar</ProductCardButton>
          </ProductCardFooter>
        </ProductCard>
      </div>
    </div>
  ),
}
