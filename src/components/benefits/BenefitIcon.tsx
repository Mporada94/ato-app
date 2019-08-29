import React from 'react';
import { Benefit } from '../../api/benefits';

// type ServiceType = keyof typeof icons

type StringToString = {
    [key: string]: string
}

const icons: StringToString = {
    'healthcare': '❤',
    'lunch-card': '🍔',
    'sport-system': '⚽',
    'cafeteria.io': '💻'
}

type BenefitIconProps = {
    // service: ServiceType
    service: Benefit['service']
}

export const BenefitIcon = ({ service }: BenefitIconProps) => 
<span aria-label={service}>{ icons[service] }</span>