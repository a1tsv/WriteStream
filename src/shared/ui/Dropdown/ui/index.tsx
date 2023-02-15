import { Menu, Transition } from '@headlessui/react'
import { IDropDownProps } from '@shared/ui/Dropdown/model/Dropdown.interface'
import {
	DropDownButton,
	DropDownLabel,
	DropDownMenu,
	DropDownWrapper
} from '@shared/ui/Dropdown/ui/StyledDropdown'
import { FC, memo } from 'react'

export const Dropdown: FC<IDropDownProps> = memo(
	({ button, onChangeCb, items, selected, select, sx }) => {
		const dropdownLabel = select ? selected || button : button

		return (
			<div>
				<Menu>
					<DropDownWrapper isSelect={!!select} sx={sx}>
						<DropDownLabel>{dropdownLabel}</DropDownLabel>
						<Transition
							as='div'
							enter='transition-opacity'
							enterFrom='opacity-0'
							enterTo='opacity-1'
							leave='transition-opacity'
							leaveFrom='opacity-1'
							leaveTo='opacity-0'
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
						</Transition>
					</DropDownWrapper>
				</Menu>
			</div>
		)
	}
)
