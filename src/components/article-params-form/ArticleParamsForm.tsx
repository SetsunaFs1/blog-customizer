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
import { useState, SyntheticEvent } from 'react';

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

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
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
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
