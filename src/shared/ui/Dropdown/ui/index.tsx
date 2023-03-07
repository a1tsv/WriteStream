import { Menu, Transition } from '@headlessui/react'
import { IDropDownProps } from '@shared/ui/Dropdown/model/Dropdown.interface'
import {
	DropDownButton,
	DropdownContent,
	DropDownLabel,
	DropDownMenu,
	DropDownWrapper
} from '@shared/ui/Dropdown/ui/StyledDropdown'
import { FC, Fragment, memo, useEffect, useRef, useState } from 'react'

export const Dropdown: FC<IDropDownProps> = memo(
	({ button, onChangeCb, items, selected, select, sx }) => {
		// Button configuration
		const ButtonComponent = button
		const DropdownButton = <ButtonComponent aria-label='dropdown button' />

		// Local states
		const [offset, setOffset] = useState('0')
		const [openState, setOpenState] = useState(false)

		// Vars
		const dropdownLabel = select ? selected || DropdownButton : DropdownButton
		const dropdownContentRef = useRef<HTMLDivElement>(null)
		const dropdownContentEl = dropdownContentRef.current
		const dropdownWrapperRef = useRef<HTMLDivElement>(null)

		// handlers

		const handleDropdownToggle = (open: boolean) => {
			setOpenState(open)
		}

		useEffect(() => {
			const dropdownHeight = dropdownContentRef.current?.scrollHeight
			if (dropdownContentEl && dropdownHeight) {
				const dropdownCords = dropdownContentEl?.getBoundingClientRect()
				if (dropdownCords.bottom > window.innerHeight) {
					setOffset(`${dropdownCords.bottom - window.innerHeight}px`)
				}
			} else {
				setOffset(`0px`)
			}
		}, [openState])

		return (
			<div>
				<Menu>
					{({ open }) => (
						<DropDownWrapper
							isSelect={!!select}
							sx={sx}
							ref={dropdownWrapperRef}
						>
							<DropDownLabel>
								{dropdownLabel}
								{open ? 'true' : 'false'}
							</DropDownLabel>
							<Transition
								as={Fragment}
								enter='transition-opacity'
								enterFrom='opacity-0'
								enterTo='opacity-1'
								leave='transition-opacity'
								leaveFrom='opacity-1'
								leaveTo='opacity-0'
								show={open}
								beforeEnter={() => handleDropdownToggle(open)}
								afterLeave={() => handleDropdownToggle(open)}
							>
								<DropdownContent
									dropdownIndent={offset}
									ref={dropdownContentRef}
								>
									<DropDownMenu>
										{items.map(item => (
											<Menu.Item key={item.title}>
												{({ active }) => (
													<DropDownButton
														active={!!active || item.title === selected}
														onClick={() => onChangeCb(item.value)}
													>
														<>
															{item.icon}
															{item.title}
														</>
													</DropDownButton>
												)}
											</Menu.Item>
										))}
									</DropDownMenu>
								</DropdownContent>
							</Transition>
							{/* )} */}
						</DropDownWrapper>
					)}
				</Menu>
			</div>
		)
	}
)
