import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
