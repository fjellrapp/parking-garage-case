import { AppDispatch, RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
/**
 * This is a custom hook mainly use to pre-type useDispatch and useSelector
 * From Redux Toolkit on useAppDispatch: "Adding a pre-typed useDispatch hook keeps you from forgetting to import AppDispatch where its needed."
 * From Redux Toolkit on useAppSelector: "...it saves you the need to type (state: RootState) every time.
 */
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
