import { createContext } from 'react'
import { type useBoard } from './use-board'
import { type Nullable } from '../lib/types/nullable'

export const BoardContext = createContext<Nullable<ReturnType<typeof useBoard>>>(null)
