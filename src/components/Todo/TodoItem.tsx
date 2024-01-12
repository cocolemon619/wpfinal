import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { TbProgress } from "react-icons/tb";
import { RiZzzFill } from "react-icons/ri";

type Status = "Done" | "Progress" | "Incomplete" | "";

export type TodoItemProps = {
	id: number | null | string;
	title: string;
	content: string;
	status: Status | string;
	assign: string;
};

const TodoItem = (props: TodoItemProps): JSX.Element => {
	// 状態に応じてクラス名を取得する
	let statusClassName = {
		text: "",
		textColor: "",
		bgColor: "",
	};

	// 状態に応じてクラス名を取得する
	let statusValues = {
		text: "",
		textColor: "",
		bgColor: "",
		iconDom: undefined as JSX.Element | undefined, // iconDom プロパティの型を追加
	};

	switch (props.status) {
		case "Done":
			statusClassName.text = "完了";
			statusClassName.textColor = "text-emerald-500";
			statusClassName.bgColor = "bg-emerald-500";
			statusValues.iconDom = (
				<FaCheckCircle className="w-6 h-6 text-white fill-current" />
			);
			break;
		case "Progress":
			statusClassName.text = "実行中";
			statusClassName.textColor = "text-blue-600";
			statusClassName.bgColor = "bg-blue-600";
			// ここでElementをそのまま変数に入れてる
			statusValues.iconDom = (
				<TbProgress className="w-6 h-6 text-white fill-current" />
			);
			break;
		case "Incomplete":
			statusClassName.text = "未対応";
			statusClassName.textColor = "text-gray-600";
			statusClassName.bgColor = "bg-gray-600";
			statusValues.iconDom = (
				<RiZzzFill className="w-6 h-6 text-white fill-current" />
			);
			break;
	}

	return (
		<div className="flex w-full border border-gray-300 max-w-sm overflow-hidden mb-1 bg-white rounded-lg shadow dark:bg-gray-800">
			<div
				className={`flex items-center justify-center w-12 ${statusClassName.bgColor}`}>
				{statusValues.iconDom}
			</div>

			<div className="px-4 py-2 w-80">
				<div className="mx-3">
					<div className="flex">
						<div className="mr-1">{props.id}{props.id && "."}</div>
						<p className="me-1 mb-0 text-gray-700">{props.title}</p>
						<span className={`ml-auto font-semibold ${statusClassName.textColor}`}>
							{statusClassName.text}
						</span>
					</div>
					<span className="text-sm text-gray-600 dark:text-gray-200 me-1">
						{props.content}
					</span>

				</div>
				<div className="px-3">
					<span className="text-sm text-gray-600 dark:text-gray-200 me-1">
						{props.assign}
					</span>
				</div>
			</div>
		</div>
	);
};

export default TodoItem;
