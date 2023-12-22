import React, { ChangeEvent } from 'react';
import { z } from 'zod';


const InputProps = z.object({
    state: z.any(),
    setState: z.function().args(z.any()).returns(z.any()),
    value: z.string().optional(),
    placeHolder: z.string(),
    withoutLabel: z.boolean().optional(),
});


export function Input({ state, setState, value, placeHolder, withoutLabel = false }: z.infer<typeof InputProps>) {
    function handleChangeState(e: ChangeEvent<HTMLInputElement>) {
        if (!value) setState(e.target.value);
        else setState({ ...state, [value]: e.target.value });
    }

    function checkValue() {
        if (value) return state[value];
        else return state ?? "";
    }

    return (
        <div className={checkValue()?.length ? 'active-input inputBox' : 'inputBox'}>
            <input
                type="text"
                required
                value={value ? state[value] : state}
                onChange={handleChangeState}
                placeholder={withoutLabel ? placeHolder : ' '}
            />
            {withoutLabel ? null : <label>{placeHolder}</label>}
        </div>
    );
}