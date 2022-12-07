import * as Sc from "./style"
import { motion } from "framer-motion"
import { Text } from "../../global/styles/Typography"

export function DropDownFilters({
  categoriesQuery,
  filters,
  handleFilter,
  resetFilters,
  applyFilters
}) {
  return (
    <Sc.ContainerCategories
      as={motion.div}
      initial={{ opacity: 0, y: "-50%" }}
      animate={{ opacity: 1, y: "0%" }}
      exit={{ opacity: 0, y: "-50%", transition: { duration: "0.35" } }}
      transition={{ type: "spring", stiffness: "150", duration: "0.75" }}
    >
      <Sc.WrapperCategories>
        <Text
          as="h3"
          color="gray"
          size="small"
          weight="400"
        >
          Categoria
        </Text>
        <Sc.Categories>
          {categoriesQuery.isSuccess &&
            categoriesQuery.data.data.map((category) => {
              return (
                <Sc.FilterButton
                  key={category.id}
                  letterColor={
                    filters.includes(category.descricao)
                      ? "white"
                      : "black"
                  }
                  background={
                    filters.includes(category.descricao)
                      ? "purple"
                      : "white"
                  }
                  onClick={() => handleFilter(category)}
                >
                  {category.descricao}
                  <span>
                    {
                      filters.includes(category.descricao)
                        ? "x"
                        : "+"
                    }
                  </span>
                </Sc.FilterButton>
              )
            })}
        </Sc.Categories>
        <Sc.WrapperBtn>
          <Sc.CategorieChoiceBtn
            background="white"
            letterColor="black"
            size="small"
            onClick={resetFilters}
          >
            Limpar Filtros
          </Sc.CategorieChoiceBtn>
          <Sc.CategorieChoiceBtn
            background="purple"
            size="small"
            onClick={applyFilters}
          >
            Aplicar Filtros
          </Sc.CategorieChoiceBtn>
        </Sc.WrapperBtn>
      </Sc.WrapperCategories>
    </Sc.ContainerCategories>
  )
}