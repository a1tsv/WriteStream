import { Menu, Transition } from '@headlessui/react'
import { useCheckBottomSpacing } from '@shared/hooks/useCheckBottomSpacing'
import { IDropDownProps } from '@shared/ui/Dropdown/model/Dropdown.interface'
import {
	DropDownButton,
	DropdownContent,
	DropDownLabel,
	DropDownMenu,
	DropDownWrapper
} from '@shared/ui/Dropdown/ui/StyledDropdown'
import { FC, Fragment, memo, useRef, useState } from 'react'

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
		const dropdownWrapperRef = useRef<HTMLDivElement>(null)
		const dropdownWrapperHeight = dropdownWrapperRef.current?.scrollHeight

		// handlers

		const handleDropdownToggle = (open: boolean) => {
			setOpenState(open)
		}

		useCheckBottomSpacing(
			dropdownContentRef,
			setOffset,
			openState,
			dropdownWrapperHeight
		)

		return (
			<div>
				<Menu>
					{({ open }) => (
						<DropDownWrapper isSelect={!!select} sx={sx}>
							<div ref={dropdownWrapperRef}>
								<DropDownLabel>
									{dropdownLabel}
									{open ? 'true' : 'false'}
								</DropDownLabel>
							</div>
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
