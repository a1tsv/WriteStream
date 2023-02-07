import { Menu, Transition } from '@headlessui/react'
import { SXType } from '@shared/types'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import {
	DropDownButton,
	DropDownLabel,
	DropDownMenu,
	DropDownWrapper
} from '@shared/ui/Dropdown/ui/StyledDropdown'
import { FC, memo } from 'react'

interface IDropDownProps {
	button: string
	selected: string
	onChangeCb: (value: string) => void
	items: IDropDownItem[]
	sx?: SXType
}

export const Dropdown: FC<IDropDownProps> = memo(
	({ button, onChangeCb, items, selected, sx }) => {
		return (
			<div>
				<Menu>
					<DropDownWrapper sx={sx}>
						<DropDownLabel>{selected || button}</DropDownLabel>
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
)
