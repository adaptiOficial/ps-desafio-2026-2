import { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    className: {
      control: "text",
      description: "Atributo que permite criar estilização personalizada.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "O Skeleton é um elemento visual que simula o layout do conteúdo enquanto os dados reais ainda estão sendo carregados.",
      },
    },
  },
  args: { className: "h-6 w-16" },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Para que o Skeleton seja visível, é necessário definir suas dimensões height e weight. Neste caso, é utilizado "h-6 w-16".',
      },
    },
  },
  render: (args) => <Skeleton className={args.className} />,
};

export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplos de possíveis, mas não restritos, tamanhos.",
      },
    },
  },
  render: () => (
    <>
      <div className="space-y-1">
        <Skeleton className="size-9" />
        <Skeleton className="size-10" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-6 w-full" />
      </div>
    </>
  ),
};
