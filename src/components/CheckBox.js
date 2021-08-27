import React, { forwardRef, useEffect, useRef } from 'react';

const CheckBox = forwardRef(({indeterminate, ...rest},ref)=>{
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef;
    useEffect(()=>{
        resolvedRef.current.indeterminate = indeterminate

    }, [resolvedRef, indeterminate]);

    return (
        <div>
            <input type="checkbox"  ref={resolvedRef} {...rest}/>
        </div>
    )
})

export default CheckBox
