import React, { useState } from 'react';

type BenefitEditorProps = {
    onUpdate: ( amount: number, benefitType: string ) => void
}

export const BenefitEditor = ({ onUpdate }: BenefitEditorProps) => {
    const [amount, setAmount] = useState(0)
    const [benefitType, setBenefitType] = useState('lunch-card')

    const handleClick = () => {
        if (amount) {
            onUpdate(amount, benefitType)
        }
    }

    return <div>
        <h4>Edit {benefitType}</h4>
    <input type="number" step={10} 
        value={amount}
        onChange={ (e) => setAmount(parseFloat(e.target.value))}
    />
    <button onClick={ handleClick }>update</button>
</div>
}