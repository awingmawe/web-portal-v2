'use client'

import { GenericResponse } from '@/constant/types/GeneralProps'
import { City } from '@/constant/types/LocationProps'
import { ManifestUser } from '@/constant/types/ManifestProps'
import { createContext, useContext } from 'react'

type ArticleContextProps = {}

export const ArticleContext = createContext<ArticleContextProps>({})

export const useArticle = () => useContext(ArticleContext)
