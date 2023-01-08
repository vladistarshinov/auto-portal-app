import { NextPage } from 'next'

export type TypeRoles = {
	isOnlyAdmin?: boolean
	isOnlyUser?: boolean
};

export type NextAuthPage<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthField = { Component: TypeRoles }