import React from 'react';
import { useUserStore } from "../use-user-store";
import { Observer } from "mobx-react-lite";

export interface AuthViewProps {
	authorized: () => JSX.Element;
	unauthorized: () => JSX.Element;
}

export function AuthView(props: AuthViewProps) {
	const userStore = useUserStore();

	return (<Observer>{() => {
		return userStore.isLoggedIn ? props.authorized() : props.unauthorized();
	}}</Observer>);
}