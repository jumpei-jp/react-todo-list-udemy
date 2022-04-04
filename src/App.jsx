import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  //入力する値をstate化
  const [todoText, setTodoText] = useState("");

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  // 未完了のTODOを保存
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  // 完了のTODOをstate化
  const [completeTodos, setCompleteTodos] = useState([]);

  //追加した時の動作  (配列の結合　 スプレッド構文)
  const onClickAdd = () => {
    if (todoText === "") return; //追加した時に空文字だったら処理を走らせない
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText(""); //追加したらから文字にする
  };

  //削除ボタンが押された時の動作
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); //指定したindexの要素を削除
    setIncompleteTodos(newTodos);
  };

  //完了ボタンを押した時
  const onClickComplete = (index) => {
    //未完了のToDoから削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1); //クリックされた行を削除

    //完了に追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]]; //クリックされた要素の行を取得
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    //完了のToDoから削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    //未完了のToDoから削除
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
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
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
