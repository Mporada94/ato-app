import React from 'react'
import { fetchBenefits, Benefit, patchBenefit } from '../../api/benefits';
import { BenefitDetails } from './BenefitsDetails';
import { BenefitEditor } from './BenefitEditor';
import { produce } from 'immer';
import { Beneficiary } from './Beneficiary';
import { BenefitSummary } from './BenefitSummary';
import { HandleUnavailable } from '../../shared/HandleUnavailable';

type BenefitContainerProps = {

}

type BenefitContainerState = {
    benefits: Benefit[] | undefined,
    loading: Boolean,
    chosenEmployee: string | undefined
}

export class BenefitContainer extends React.Component<
    BenefitContainerProps,
    BenefitContainerState
> {
    state = {
        benefits: undefined,
        loading: true,
        chosenEmployee: undefined
    } as BenefitContainerState

    async componentDidMount() {
        const benefits = await fetchBenefits()
        this.setState({
            benefits,
            loading: false
        })
    }

    onUpdate = async (amount: number, type: string) => {

        this.setState({ loading: true })

        const promises = this.state.benefits!
            .filter(b => b.service === type)
            .map(b => patchBenefit(b.id, { monthlyFee: b.monthlyFee + amount }))

        await Promise.all(promises)
    
        this.setState(
        produce((draft: BenefitContainerState) => {
            draft.loading = false
            draft.benefits!
                .filter(b => b.service === type)
                .forEach(b => b.monthlyFee += amount)
        }))

        // bug here:
        // const benefits = this.state.benefits!
        //     .filter(b => b.service === type)
        //     .map(b => ({ ...b, monthlyFee: b.monthlyFee + amount }))

        // this.setState({ benefits })
    }


    getTotalMonthlyBenefitCost = () => {
        return this.state.benefits!
            .reduce( (sum, b) => sum + b.monthlyFee, 0)
    }

    render() {
        return <>
            <h2>Employee Benefits</h2>

            {/* <div>
                <h5>summary</h5>
                { this.state.loading
                ? 'LOADING...'
                : <>
                    total monthly cost: ${ this.getTotalMonthlyBenefitCost() }
                </>}
            </div> */}
            { this.state.benefits &&
                <BenefitSummary benefits={this.state.benefits} />
            }

            <BenefitEditor onUpdate={this.onUpdate} />
            <HandleUnavailable>
                <Beneficiary employee={this.state.chosenEmployee} />
            </HandleUnavailable>
            
            {this.state.loading && 'LOADING...'}
            {this.state.benefits && this.state.benefits.map((b) =>
                <> 
                    <BenefitDetails benefit={b} key={b.id} />
                    <button onClick={() => {
                        this.setState({ chosenEmployee: b.beneficiary.name })
                    }}>show</button>
                </>
            )}
          </>
    }
}