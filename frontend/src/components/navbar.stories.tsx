import type { Meta, StoryObj } from '@storybook/react'
import {
  Navbar,
  NavbarActions,
  NavbarHeader,
  NavbarLink,
  NavbarLinkItems,
  NavbarLogo,
  NavbarMain,
} from './navbar'
import { Button } from './button'

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'float'],
      description: 'Variações de estilo do componente.',
    },
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
          'Componente de navbar, desenvolvido com o padrão [composition partner](https://vinniciusgomes.medium.com/implementando-composition-pattern-em-aplicacoes-react-4e8dc92742ff).',
      },
    },
  },
  args: { variant: 'default' },
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Estado normal da navbar.',
      },
    },
  },
  render: (args) => (
    <Navbar {...args}>
      <NavbarHeader>
        <NavbarLogo
          src="/storybook/logo.png"
          alt="Logo"
          width={40}
          height={46.7}
        />
      </NavbarHeader>
      <NavbarActions>
        <NavbarMain>
          <NavbarLinkItems>
            <NavbarLink href="/">Inicio</NavbarLink>
            <NavbarLink href="#">Sobre Nós</NavbarLink>
            <NavbarLink href="#">Produtos</NavbarLink>
            <NavbarLink href="#">Parceiros</NavbarLink>
            <NavbarLink href="#">Blog</NavbarLink>
            <NavbarLink href="#">Contato</NavbarLink>
          </NavbarLinkItems>
        </NavbarMain>
        <Button variant="default-inverse">Login</Button>
      </NavbarActions>
    </Navbar>
  ),
}

export const Variant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Variações de estilo da navbar.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap gap-5 justify-around">
      <div>
        <h1 className="text-center text-xl">Default</h1>
        <Navbar {...args} variant="default">
          <NavbarHeader>
            <NavbarLogo
              src="/storybook/logo.png"
              alt="Logo"
              width={40}
              height={46.7}
            />
          </NavbarHeader>
          <NavbarActions>
            <NavbarMain>
              <NavbarLinkItems>
                <NavbarLink href="/">Inicio</NavbarLink>
                <NavbarLink href="#">Sobre Nós</NavbarLink>
                <NavbarLink href="#">Produtos</NavbarLink>
                <NavbarLink href="#">Parceiros</NavbarLink>
                <NavbarLink href="#">Blog</NavbarLink>
                <NavbarLink href="#">Contato</NavbarLink>
              </NavbarLinkItems>
            </NavbarMain>
            <Button variant="default-inverse">Login</Button>
          </NavbarActions>
        </Navbar>
      </div>
      <div>
        <h1 className="text-center text-xl">Float</h1>
        <div className="px-2">
          <Navbar {...args} variant="float">
            <NavbarHeader>
              <NavbarLogo
                src="/storybook/logo.png"
                alt="Logo"
                width={40}
                height={46.7}
              />
            </NavbarHeader>
            <NavbarActions>
              <NavbarMain>
                <NavbarLinkItems>
                  <NavbarLink href="/">Inicio</NavbarLink>
                  <NavbarLink href="#">Sobre Nós</NavbarLink>
                  <NavbarLink href="#">Produtos</NavbarLink>
                  <NavbarLink href="#">Parceiros</NavbarLink>
                  <NavbarLink href="#">Blog</NavbarLink>
                  <NavbarLink href="#">Contato</NavbarLink>
                </NavbarLinkItems>
              </NavbarMain>
              <Button variant="default-inverse">Login</Button>
            </NavbarActions>
          </Navbar>
        </div>
      </div>
    </div>
  ),
}
