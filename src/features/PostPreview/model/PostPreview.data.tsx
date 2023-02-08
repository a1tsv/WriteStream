import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'

export const dropdownItems: IDropDownItem[] = [
	{
		icon: <AiFillDelete />,
		title: 'Delete post',
		value: ModalsEnum.DELETE_POST
	},
	{
		icon: <AiOutlineEdit />,
		title: 'Edit post',
		value: ModalsEnum.ADD_POST
	}
]
