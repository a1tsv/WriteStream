import { Menu, Transition } from '@headlessui/react'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import {
	DropDownButton,
	DropDownLabel,
	DropDownMenu,
	DropDownWrapper
} from '@shared/ui/Dropdown/ui/StyledDropdown'
import { FC, Fragment } from 'react'

interface IDropDownProps {
	button: string
	selected: string
	onChangeCb: (value: string) => void
	items: IDropDownItem[]
}

export const Dropdown: FC<IDropDownProps> = ({
	button,
	onChangeCb,
	items,
	selected
}) => {
	return (
		<div>
			<Menu>
				<DropDownWrapper>
					<DropDownLabel>{selected || button}</DropDownLabel>
					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<DropDownMenu>
							{items.map(item => (
								<Menu.Item key={item.title}>
									{({ active }) => (
										<DropDownButton
											active={active || item.title === selected}
											onClick={() => onChangeCb(item.title)}
										>
											{item.title}
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
