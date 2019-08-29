import React from 'react';
import { Benefit } from '../../api/benefits';

type BenefitSummaryProps = {
  benefits: Benefit[]
}

if (Math.random() < 0.2){
  throw new Error('Beneficiary padło')
}

const getTotalMonthlyBenefitCost = (benefits: Benefit[]) => {
  console.log('hejo')
  return benefits
    .reduce( (sum, b) => sum + b.monthlyFee, 0 )
}

export const BenefitSummary = ({ benefits }: BenefitSummaryProps) => {
  return <div>
    <h5>summary</h5>
    total monthly cost: ${ getTotalMonthlyBenefitCost(benefits) }
  </div>
}