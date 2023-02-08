import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'

export const dropdownItems: IDropDownItem[] = [
	{
		icon: <AiFillDelete />,
		title: 'Delete blog',
		value: ModalsEnum.DELETE_BLOG
	},
	{
		icon: <AiOutlineEdit />,
		title: 'Edit blog',
		value: ModalsEnum.ADD_BLOG
	}
]
