import { ModalsEnum } from '@app/providers/ModalsProvider/model'
import { IDropDownItem } from '@shared/ui/Dropdown/model'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'

export const dropdownItems: IDropDownItem[] = [
	{
		icon: <AiFillDelete />,
		title: 'Delete comment',
		value: ModalsEnum.DELETE_COMMENT
	},
	{
		icon: <AiOutlineEdit />,
		title: 'Edit comment',
		value: 'true'
	}
]
