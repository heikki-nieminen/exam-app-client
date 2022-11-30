import React, {useReducer} from 'react'
import ReactDOM from 'react-dom/client'
import Navigation from "./components/Navigation"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Content from "./components/Content"
import {ContentContext, ContentDispatchContext} from "./components/context/ContentContext"
import {reducer} from "./components/reducer/app"
import {App} from "./components/App"





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</React.StrictMode>
)

