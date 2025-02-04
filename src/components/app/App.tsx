import clsx from 'clsx';
import { useState, CSSProperties } from 'react';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import styles from './App.module.scss';

export const App = () => {
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption.value
	);
	const [fontSize, setFontSize] = useState(
		defaultArticleState.fontSizeOption.value
	);
	const [fontColor, setFontColor] = useState(
		defaultArticleState.fontColor.value
	);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor.value
	);
	const [contentwidth, setContentWidth] = useState(
		defaultArticleState.contentWidth.value
	);

	const handleChangeStyles = (styles: ArticleStateType) => {
		setFontFamily(styles.fontFamilyOption.value);
		setFontSize(styles.fontSizeOption.value);
		setFontColor(styles.fontColor.value);
		setBackgroundColor(styles.backgroundColor.value);
		setContentWidth(styles.contentWidth.value);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamily,
					'--font-size': fontSize,
					'--font-color': fontColor,
					'--container-width': contentwidth,
					'--bg-color': backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleChangeStyles} />
			<Article />
		</main>
	);
};
