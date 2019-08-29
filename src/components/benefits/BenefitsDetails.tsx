import React from 'react';
import { Benefit } from '../../api/benefits';
import { BenefitIcon } from './BenefitIcon';

type BenefitDetailsProps = {
    benefit: Benefit
}

export const BenefitDetails = ({ benefit }: BenefitDetailsProps) => <div>
    <a href={'mailto:' + benefit.beneficiary.email}>Mail to: {benefit.beneficiary.name}</a>, 
    { benefit.service }
    <BenefitIcon service={ benefit.service }/>
    , ${ benefit.monthlyFee }
</div>