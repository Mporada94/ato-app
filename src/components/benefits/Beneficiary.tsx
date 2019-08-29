import React, { useEffect, useState } from 'react';
import { fetchEmployeeByName, Employee } from '../../api/employee';
import { CancelTokenSource, Canceler } from 'axios';

type BeneficiaryProps = {
    employee: string | undefined
}

type PromiseFn = <T, A>(args: A) => {
    promise: Promise<T>
    source: CancelTokenSource
}

// const useJestCienszko = <T, A>(promiseFn: PromiseFn<T, A>, param: A | undefined) => {
    // const [data, setData] = useState<T | undefined>(undefined)
// 
    // let source: CancelTokenSource
// 
    // useEffect(() => {
        // if (param) {
            // const request = promiseFn(param)
            // source = request.source
            // request.promise.then(response => setData(response))
        // } else {
            // setData(undefined)
        // }
        // 
        // return () => {
            // source.cancel()
        // }
    // }, [employee])
// }

export const Beneficiary = ({ employee }: BeneficiaryProps) => {
    console.log('render')
    const [employeeData, setEmployeeData] = useState<Employee | undefined>(undefined)

    const [count, setCount] = useState(0)

    // const asynkoweData = useJestCienszko(fetchEmployeeByName, employee)

    // if(employee) {
    //     fetchEmployeeByName(employee).then()
    // }

    let source: CancelTokenSource

    useEffect(() => {
        if (employee) {
            const request = fetchEmployeeByName(employee)
            source = request.source
            request.promise.then(response => setEmployeeData(response))
        } else {
            setEmployeeData(undefined)
        }
        
        return () => {
            source.cancel()
        }
    }, [employee])

    if (Math.random() < 0.2){
        throw new Error('Beneficiary padło')
    }
    
    return <div>
        pracownik: { employee }
        { employeeData && <ul>
            <li>{ employeeData.salary }</li>
            <li>{ employeeData.title }</li>
        </ul>}
        <button onClick={() => setCount(count + 1)}>+1, {count}</button>
    </div>
}