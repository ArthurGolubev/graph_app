import { useQuery } from '@apollo/client'
import * as React from 'react'
import { GET_GRAPH } from './query'

export const Graph = () => {

    const {data, loading, error} = useQuery(GET_GRAPH)


    return <div>
        <button onClick={()=>console.log('data -> ', data)} className='btn btn-sm btn-success' type='button'>data fdrm graph</button>
    </div>
}