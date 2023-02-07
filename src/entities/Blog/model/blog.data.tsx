import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { AiOutlineEdit } from 'react-icons/ai'

export const dropdownItems: IDropDownItem[] = [
	{
		icon: <AiOutlineEdit />,
		title: 'Delete blog',
		value: ModalsEnum.DELETE_BLOG
	}
]
