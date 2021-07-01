import React from 'react';
import './EmptyFlashcard.scss';

// I use Aspect Ratio in EmptyFlashcards styles, unfortunalety it is not yet working on safari.

const EmptyFlashcard = ({whiteText, greyText, additionalStyles}) => (
	<div className={['EmptyFlashcard', additionalStyles].join(' ')}>
		<span className="GreyText">{greyText}</span>
		<span className="WhiteText">{whiteText}</span>
	</div>
);

export default EmptyFlashcard;
