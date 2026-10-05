import { Meta, StoryObj } from '@storybook/react'
import {
  Footer,
  FooterBaseboard,
  FooterBody,
  FooterClaim,
  FooterInformationDescription,
  FooterInformationSection,
  FooterInformationTitle,
  FooterInformations,
  FooterLogo,
  FooterSocialMedia,
  FooterSocialMediaLink,
} from './footer'
import { LuFacebook, LuInstagram, LuLinkedin } from 'react-icons/lu'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    className: {
      control: 'text',
      description:
        'O className é responsável por sobrepor propriedades do tailwind a fim de poder editar as propriedades do componente sem alterá-lo no arquivo fonte.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente de footer, desenvolvido com o padrão [composition partner](https://vinniciusgomes.medium.com/implementando-composition-pattern-em-aplicacoes-react-4e8dc92742ff).',
      },
    },
  },
} satisfies Meta<typeof Footer>
export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {
  render: (args) => (
    <Footer {...args}>
      <FooterBody>
        <FooterLogo
          src="storybook/logo.png"
          alt="Logo da empresa"
          width={200}
          height={200}
        />
        <FooterInformations>
          <FooterInformationSection>
            <FooterInformationTitle>Sobre</FooterInformationTitle>
            <FooterInformationDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
              odio Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ipsa, necessitatibus.
            </FooterInformationDescription>
          </FooterInformationSection>
          <FooterInformationSection>
            <FooterInformationTitle>Contatos</FooterInformationTitle>
            <FooterInformationDescription>
              E-mail: fulano@gmail.com
            </FooterInformationDescription>
            <FooterInformationDescription>
              Telefone: (77)77777-7777
            </FooterInformationDescription>
            <FooterInformationDescription>
              Telefone: (77)77777-7777
            </FooterInformationDescription>
            <FooterInformationDescription>
              Instagram: @fulano
            </FooterInformationDescription>
          </FooterInformationSection>
        </FooterInformations>
      </FooterBody>
      <FooterBaseboard>
        <FooterSocialMedia>
          <FooterSocialMediaLink href="#">
            <LuFacebook />
          </FooterSocialMediaLink>
          <FooterSocialMediaLink href="#">
            <LuInstagram />
          </FooterSocialMediaLink>
          <FooterSocialMediaLink href="#">
            <LuLinkedin />
          </FooterSocialMediaLink>
        </FooterSocialMedia>
        <FooterClaim />
      </FooterBaseboard>
    </Footer>
  ),
}
