import { clsx, type ClassValue } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export function handleSearchParams(
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  name: string,
  value: string | null
) {
  const newParams = new URLSearchParams(searchParams.toString())
  if (value === null) {
    newParams.delete(name)
  }
  if (typeof value === 'string') {
    newParams.set(name, value)
  }
  return newParams
}