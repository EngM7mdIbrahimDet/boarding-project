export interface INavBarItem {
    route: string;
    icon: any;
    label: string;
}

export interface NavBarItemProps extends INavBarItem {
    isSelected: boolean;
    onPress?:()=>void;
}