import { Meta, StoryObj } from '@storybook/react'
import { FilterUsers } from '@/app/(dashboard)/admin/usuarios/_components/filter-users'
import { Popover, PopoverTrigger, PopoverContent } from './dashboard/popover'
import { LuFilter, LuSearch, LuX } from 'react-icons/lu'
import { Button } from './button'
import { ButtonFilter, FormFilter } from './dashboard/filter'
import { Input } from './input'

const meta: Meta<typeof FilterUsers> = {
  title: 'Components/FilterUsers',
  component: FilterUsers,
  argTypes: {
    name: {
      control: 'text',
      description: 'Busca usuários cujo nome contenha os caracteres digitados.',
    },
    email: {
      control: 'text',
      description:
        'Busca usuários cujo e-mail contenha os caracteres digitados.',
    },
  },
  parameters: {
    docs: {
      description: {
        // descrição do componente.
        component:
          'O componente de filtro de usuários permite ao usuário realizar buscas dinâmicas com base no nome e/ou e-mail dos usuários cadastrados no sistema. Ele é composto por dois campos de entrada, onde é possível digitar partes ou o valor completo do nome e e-mail para refinar a lista exibida.<br/><br/>O componente de filtro possui três funções, as quais são: "applyFilter", "clearFilter" e "checkFilters". A primeira delas aplica os filtros definidos em um formulário, atualizando a URL com os novos parâmetros de busca. Já a segunda, remove todos os filtros que foram definidos via formulário e reseta o formulário. Por fim, a última verifica se algum dos campos especificados em fields está presente nos parâmetros da URL.',
      },
    },
  },
  args: { name: '', email: '' },
} satisfies Meta<typeof FilterUsers>

export default meta

type Story = StoryObj<typeof FilterUsers>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'O formato padrão do filtro de usuários.',
      },
    },
  },
  render: (args) => (
    <Popover>
      <PopoverTrigger>
        <ButtonFilter hasFilters={false} asChild>
          <LuFilter /> Filtros
        </ButtonFilter>
      </PopoverTrigger>
      <PopoverContent>
        <FormFilter>
          <Input
            name="name"
            placeholder="Nome do usuário"
            size="sm"
            defaultValue={args.name}
          />
          <Input
            name="email"
            placeholder="E-mail do usuário"
            size="sm"
            defaultValue={args.email}
          />
          <Button size="sm" type="button">
            <LuSearch />
            Aplicar filtros
          </Button>
          <Button variant="ghost" size="sm" type="button">
            <LuX />
            Limpar filtros
          </Button>
        </FormFilter>
      </PopoverContent>
    </Popover>
  ),
}

export const HasFiltersVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'O formato do filtro após ele ser aplicado.',
      },
    },
  },
  render: () => (
    <Popover>
      <PopoverTrigger>
        <ButtonFilter hasFilters={true} asChild>
          <LuFilter /> Filtros
        </ButtonFilter>
      </PopoverTrigger>
      <PopoverContent>
        <FormFilter>
          <Input
            name="name"
            placeholder="Nome do usuário"
            size="sm"
            defaultValue={'Nome filtrado'}
          />
          <Input
            name="email"
            placeholder="E-mail do usuário"
            size="sm"
            defaultValue={'emailfiltrado@gmail.com'}
          />
          <Button size="sm" type="button">
            <LuSearch />
            Aplicar filtros
          </Button>
          <Button variant="ghost" size="sm" type="button">
            <LuX />
            Limpar filtros
          </Button>
        </FormFilter>
      </PopoverContent>
    </Popover>
  ),
}
