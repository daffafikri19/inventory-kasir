"use client"
import { Check } from "lucide-react"
import React, { ReactElement, cloneElement, useEffect, useState } from "react";


interface ListProps {
    children: ReactElement<ListItemProps>[];
    selectable?: boolean;
    onItemClick?: (value: any) => void;
    defaultValue?: any;
    className?: string;
}

interface ListItemProps {
    children: React.ReactNode;
    value?: any;
    defaultValue?: any;
    onClick?: () => void;
    selected?: boolean;
    className?: string;
}


export function List(props: ListProps) {
    const { children, selectable, onItemClick, defaultValue } = props;
    const [selectedValue, setSelectedValue] = useState<any>(null);

    useEffect(() => {
        if (defaultValue && selectable && selectedValue === null) {
            setSelectedValue(defaultValue);
            if (onItemClick) {
                onItemClick(defaultValue);
            }
        }
    }, [defaultValue, selectable, selectedValue, onItemClick]);

    const handleItemClick = (value: any) => {
        setSelectedValue(value);
        if (onItemClick) {
            onItemClick(value);
        }
    };

    return (
        <ul className='w-full space-x-2 flex items-center'>
            {React.Children.map(children, (child, index) => {
                if (selectable) {
                    return cloneElement(child, {
                        onClick: () => handleItemClick(child.props.value),
                        selected: selectedValue === child.props.value,
                    });
                } else {
                    return child;
                }
            })}
        </ul>
    );
}


export function ListItem(props: ListItemProps) {
    const { children, value, onClick, selected, defaultValue, className } = props;

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <li
            onClick={handleClick}
            className={`p-4 border-primary-foreground rounded-lg min-w-[200px] min-h-[200px] ${selected ? "border-4 border-primary" : ""} ${className}`}
        >
            {children}
        </li>
    );
}
