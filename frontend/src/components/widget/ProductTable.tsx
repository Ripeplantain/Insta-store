import React from 'react'

const ProductTable = () => {
    return (
        <div>
            <h1>Product Table</h1>
        </div>
    )
}

const MemoizedProductTable = React.memo(ProductTable)
export default MemoizedProductTable