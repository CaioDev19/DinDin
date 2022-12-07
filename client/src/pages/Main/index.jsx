import * as Sc from "./style"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useAuth } from "../../hooks/useAuth"
import { Header } from "../../components/Header"
import { Button } from "../../global/styles/Button"
import { CardAccountMovement } from "../../components/CardAccountMovement"
import * as api from "../../services/api"
import filterBtn from "../../assets/images/filter.svg"
import { centsToReais } from "../../utils/centsToReais"
import { Table } from "../../components/Table"
import { signOut } from "../../hooks/useLocalStorage"
import { TransactionsModal } from "../../components/Modals/Transactions"
import { useQuery } from "react-query"
import { DropDownFilters } from "../../components/DropDownFilters"

export function Main() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [filters, setFilters] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
	const [auth, setAuth] = useAuth()
	const navigate = useNavigate()
	const extractQuery = useQuery(
		["extract", auth.token],
		() => {
			return api.extract(auth.token)
		},
		{
			enabled: Boolean(auth.token)
		}
	)
	const categoriesQuery = useQuery(
		["categories", auth.token],
		() => {
			return api.categories(auth.token)
		},
		{
			enabled: Boolean(auth.token)
		}
	)

	const handleSignOut = useCallback(function () {
		signOut()
		setAuth(null)
		navigate("/login")
	}, [setAuth, navigate])

	if (extractQuery.isError || categoriesQuery.isError) {
		handleSignOut()
	}

	function handleFilter(category) {
		const copyFilters = [...filters]
		const indexCategory = copyFilters.indexOf(category.descricao)

		if (indexCategory !== -1) {
			copyFilters.splice(indexCategory, 1)
			setFilters([...copyFilters])
		} else {
			copyFilters.push(category.descricao)
			setFilters([...copyFilters])
		}
	}

	function resetFilters() {
		setFilters([])
		setSearchParams({})
	}

	function applyFilters() {
		setSearchParams({ filtro: filters })
	}

	useEffect(() => {
		setFilters(searchParams.getAll("filtro"))
	}, [searchParams])

	return (
		<>
			<Header
				userName={auth.usuario.nome.split(" ")[0]}
				handleSignOut={handleSignOut}
			/>
			<Sc.Container>
				<Sc.Wrapper>
					<Sc.Filter
						size="small"
						letterColor="black"
						onClick={() => setIsCategoriesOpen((prev) => !prev)}
					>
						<img
							src={filterBtn}
							alt="Filtro"
						/>
						Filtrar
					</Sc.Filter>
					<Sc.WrapperLeftContent>
						<AnimatePresence>
							{isCategoriesOpen &&
								<DropDownFilters
									categoriesQuery={categoriesQuery}
									filters={filters}
									handleFilter={handleFilter}
									resetFilters={resetFilters}
									applyFilters={applyFilters}
								/>
							}
						</AnimatePresence>
						<Sc.LeftContent
							as={motion.div}
							layout
						>
							<Table
								handleSignOut={handleSignOut}
								filters={searchParams.getAll("filtro")}
							/>
						</Sc.LeftContent>
					</Sc.WrapperLeftContent>
					<Sc.RightContent>
						<CardAccountMovement
							entrada={extractQuery.isSuccess &&
								centsToReais(extractQuery.data.data.entrada)
							}
							saida={extractQuery.isSuccess &&
								centsToReais(extractQuery.data.data.saida)
							}
							saldo={extractQuery.isSuccess &&
								centsToReais(extractQuery.data.data.entrada - extractQuery.data.data.saida)
							}
						/>
						<Button
							size="small"
							spacer="extraLarge"
							letterColor="white"
							onClick={() => setIsModalOpen(true)}
						>
							Adicionar Registro
						</Button>
						<AnimatePresence>
							{isModalOpen &&
								<TransactionsModal
									title="Adicionar Registro"
									typeQuery="add"
									closeModal={() => setIsModalOpen(false)}
								/>
							}
						</AnimatePresence>
					</Sc.RightContent>
				</Sc.Wrapper>
			</Sc.Container>
		</>
	)
}