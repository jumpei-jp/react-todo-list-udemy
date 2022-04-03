import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  //入力する値をstate化
  const [todoText, setTodoText] = useState("");

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  // 未完了のTODOを保存
  const [incompleteTodos, setIncompleteTodos] = useState(["aaa", "bbb"]);

  // 完了のTODOをstate化
  const [completeTodos, setCompleteTodos] = useState(["ccc"]);

  //追加した時の動作  (配列の結合　 スプレッド構文)
  const onClickAdd = () => {
    if (todoText === "") return; //追加した時に空文字だったら処理を走らせない
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText(""); //追加したらから文字にする
  };
  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>完了</button>
                <button>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
