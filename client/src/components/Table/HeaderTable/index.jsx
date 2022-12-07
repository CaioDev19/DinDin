import * as Sc from "./style"
import arrowUp from "../../../assets/images/arrowKeyUp.svg"
import { motion } from "framer-motion"

export function HeaderTable({ handleSort, isAsc }) {
  return (
    <Sc.HeaderTable>
      <tr>
        <Sc.DateItem
          size="small"
          weight="bold"
          as="th"
          position="left"
          onClick={handleSort}
        >
          Data
          <Sc.Arrow
            as={motion.img}
            src={arrowUp}
            alt="Arrow up"
            animate={{ rotate: isAsc ? 180 : 0 }}

          />
        </Sc.DateItem>
        <Sc.TableItemHeader
          size="small"
          weight="bold"
          as="th"
        >
          Dia da semana
        </Sc.TableItemHeader>
        <Sc.TableItemHeader
          size="small"
          weight="bold"
          as="th"
        >
          Descrição
        </Sc.TableItemHeader>
        <Sc.TableItemHeader
          size="small"
          weight="bold"
          as="th"
        >
          Categoria
        </Sc.TableItemHeader>
        <Sc.TableItemHeader
          size="small"
          weight="bold"
          as="th"
        >
          Valor
        </Sc.TableItemHeader>
        <Sc.TableItemHeader
          size="small"
          weight="bold"
          as="th"
        >
          &nbsp;
        </Sc.TableItemHeader>
      </tr>
    </Sc.HeaderTable>
  )
}