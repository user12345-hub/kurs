import React from 'react'

export const FormErrors = ({formErrors}) =>
	<div className='formErrors'>
		<p key={formErrors}>{formErrors}</p>
	</div>