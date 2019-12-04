export const MOVE_RIGHT = "@datepicker/keyboard-moveRight";
export const MOVE_LEFT = "@datepicker/keyboard-moveLeft";
export const MOVE_UP = "@datepicker/keyboard-moveUp";
export const MOVE_DOWN = "@datepicker/keyboard-moveDown";
export const GO_TO_HOME = "@datepicker/keyboard-home";

export interface MoveRightAction {
	type: typeof MOVE_RIGHT;
}

export interface GoToHomeAction {
	type: typeof GO_TO_HOME;
}

export interface MoveDownAction {
	type: typeof MOVE_DOWN;
}

export interface MoveLeftAction {
	type: typeof MOVE_LEFT;
}

export interface MoveUpAction {
	type: typeof MOVE_UP;
}

export function moveRight(): MoveRightAction {
	return { type: MOVE_RIGHT };
}

export function moveDown(): MoveDownAction {
	return { type: MOVE_DOWN };
}

export function moveUp(): MoveUpAction {
	return { type: MOVE_UP };
}

export function moveLeft(): MoveLeftAction {
	return { type: MOVE_LEFT };
}

export function goToHome(): GoToHomeAction {
	return { type: GO_TO_HOME };
}
