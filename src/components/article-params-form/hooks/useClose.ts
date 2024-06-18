import { useEffect } from 'react';

type TUseClose = {
	isMenuOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLFormElement>;
};
// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export function useClose({ isMenuOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isMenuOpen) return; // останавливаем действие эффекта, если закрыто

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node && // проверяем, что это `DOM`-элемент
				rootRef.current &&
				!rootRef.current.contains(target); // проверяем, что кликнули на элемент, который находится не внутри нашего блока
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		//  обязательно удаляем обработчики в `clean-up`- функции
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// обязательно следим за `isMenuOpen`, чтобы срабатывало только при открытии, а не при любой перерисовке компонента
	}, [isMenuOpen, onClose, rootRef]);
}
