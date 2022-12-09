import * as Typography from "../../global/styles/Typography"
import * as Sc from "./style"
import { motion } from "framer-motion"

export function CardAccountMovement({ entrada, saida, saldo }) {
  return (
    <Sc.Container>
      <Sc.SubContainerCard>
        <Typography.SubTittle weight="bold" size="intermediate" position="left">
          Resumo
        </Typography.SubTittle>
        <Sc.WrapperText>
          <Sc.SubContainerText>
            <Typography.Text as="span" size="small" weight="500">
              Entradas
            </Typography.Text>
            <Typography.Text
              as={motion.span}
              layout
              size="small"
              weight="500"
              color="lightPurple"
            >
              {entrada}
            </Typography.Text>
          </Sc.SubContainerText>
          <Sc.SubContainerText>
            <Typography.Text as="span" size="small" weight="500">
              Saídas
            </Typography.Text>
            <Typography.Text
              as={motion.span}
              layout
              size="small"
              weight="500"
              color="orange"
            >
              {saida}
            </Typography.Text>
          </Sc.SubContainerText>
        </Sc.WrapperText>
        <Sc.Line />
        <Sc.SubContainerText>
          <Typography.Text as="span" weight="bold">
            Saldo
          </Typography.Text>
          <Typography.Text
            as={motion.span}
            layout
            size="small"
            weight="500"
            color="blue"
          >
            {saldo}
          </Typography.Text>
        </Sc.SubContainerText>
      </Sc.SubContainerCard>
    </Sc.Container>
  )
}
