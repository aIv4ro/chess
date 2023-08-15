import { createContext } from 'react'
import { useBoard } from './use-board'
import { Nullable } from '../types/nullable'

export const BoardContext = createContext<Nullable<ReturnType<typeof useBoard>>>(null)
