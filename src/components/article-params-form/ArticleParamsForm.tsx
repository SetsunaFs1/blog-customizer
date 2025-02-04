import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { useState, SyntheticEvent, useEffect, useRef } from 'react';

interface IProps {
	onSubmit: (styles: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: IProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentwidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const handleChangeFontFamily = (selected: OptionType) => {
		setFontFamily(selected);
	};
	const handleChangeFontSize = (value: OptionType) => {
		setFontSize(value);
	};
	const handleChangeFontColor = (selected: OptionType) => {
		setFontColor(selected);
	};
	const handleChangeBackgroundColor = (selected: OptionType) => {
		setBackgroundColor(selected);
	};
	const handleChangeContentWidth = (selected: OptionType) => {
		setContentWidth(selected);
	};

	const handleReset = (event: SyntheticEvent) => {
		event.preventDefault();

		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		props.onSubmit(defaultArticleState);
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		const newArticleState = {
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentwidth,
			fontSizeOption: fontSize,
		};

		props.onSubmit(newArticleState);
	};

	const ref = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!isOpen) return;

		const handleOverlay = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				ref.current &&
				!ref.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};
		window.addEventListener('mousedown', handleOverlay);

		return () => {
			window.removeEventListener('mousedown', handleOverlay);
		};
	}, [isOpen, ref]);

	return (
		<div ref={ref}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((prevState) => !prevState)}
			/>
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text weight={800} size={31} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={fontFamily}
						onChange={handleChangeFontFamily}
						options={fontFamilyOptions}
						title='шрифт'></Select>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						selected={fontSize}
						onChange={handleChangeFontSize}
						title={'размер шрифта'}></RadioGroup>
					<Select
						selected={fontColor}
						onChange={handleChangeFontColor}
						options={fontColors}
						title='цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={backgroundColor}
						onChange={handleChangeBackgroundColor}
						options={backgroundColors}
						title='цвет фона'></Select>
					<Select
						selected={contentwidth}
						onChange={handleChangeContentWidth}
						options={contentWidthArr}
						title='ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
