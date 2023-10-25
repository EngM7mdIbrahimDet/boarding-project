export interface INavBarItem {
    route: string;
    icon: any;
    label: string;
}

export interface NavBarItemProps extends Omit<INavBarItem, "route"> {
    route?: string;
    isSelected: boolean;
    onPress?:()=>void;
}